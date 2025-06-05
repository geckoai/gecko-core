import { Subject } from 'rxjs';
import { Dispatch, SetStateAction } from "react";
export declare class ViewModel<T> extends Subject<T> {
    current: T;
    constructor(current: T);
    next(value: T): void;
    asState(): [T, Dispatch<SetStateAction<T>>];
    static for<T>(value: T): ViewModel<T>;
}
