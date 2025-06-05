import { Subject } from 'rxjs';
import {Dispatch, SetStateAction, useEffect, useState} from "react";
export class ViewModel<T> extends Subject<T>{
  public constructor(public current: T) {
    super()
    this.asState = this.asState.bind(this);
    this.next = this.next.bind(this);
    if (current) { this.next(current); }
  }

  public next(value: T) {
    this.current = value;
    super.next(value);
  }

  public asState(): [T, Dispatch<SetStateAction<T>>] {
    const [state, setState] = useState(this.current)
    useEffect(() => {
      const subscribe = this.subscribe((value) => {
        setState(value);
      });
      return () => subscribe.unsubscribe();
    }, [state, setState])

    return [state, (callback) => {
      if (typeof callback === 'function') {
        this.next((callback as any)(this.current));
      }  else {
        this.next(callback);
      }
    }]
  }

  public static for<T>(value: T) {
    return new ViewModel<T>(value)
  }
}