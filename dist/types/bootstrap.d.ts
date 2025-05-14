import { Container, Newable } from 'inversify';
import { Provider } from './interfaces';
export interface LoadedModule<T = unknown> {
    instance: T;
    module: Newable<T>;
    container: Container;
    exports: Provider[];
    imports: Newable[];
    loadedModules: LoadedModule[];
}
export declare class Bootstrap {
    static run<T extends object>(app: Newable<T>): {
        instance: T;
        container: Container;
    };
    private static useScope;
    private static module;
}
