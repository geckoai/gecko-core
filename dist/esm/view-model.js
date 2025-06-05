import { Subject } from 'rxjs';
import { useEffect, useState } from "react";
export class ViewModel extends Subject {
    current;
    constructor(current) {
        super();
        this.current = current;
        this.asState = this.asState.bind(this);
        this.next = this.next.bind(this);
        if (current) {
            this.next(current);
        }
    }
    next(value) {
        this.current = value;
        super.next(value);
    }
    asState() {
        const [state, setState] = useState(this.current);
        useEffect(() => {
            const subscribe = this.subscribe(setState);
            return () => subscribe.unsubscribe();
        }, [state, setState]);
        return [state, (callback) => {
                if (typeof callback === 'function') {
                    this.next(callback(this.current));
                }
                else {
                    this.next(callback);
                }
            }];
    }
    static for(value) {
        return new ViewModel(value);
    }
}
