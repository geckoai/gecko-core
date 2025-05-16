/**
 * MIT License
 *
 * Copyright (c) 2021 @geckoai/gecko-core RanYunLong<549510622@qq.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import { BindingScope, DynamicValueBuilder, Newable, ResolutionContext, ServiceIdentifier } from 'inversify';
import { MapToResolvedValueInjectOptions } from './interfaces';
export declare class ConstantValueProvider<T = unknown> {
    provide: ServiceIdentifier<T>;
    useConstantValue: T;
    constructor(provide: ServiceIdentifier<T>, useConstantValue: T);
    static create<T>(provide: ServiceIdentifier<T>, value: T): ConstantValueProvider<T>;
}
export declare class DynamicValueProvider<T = unknown> {
    provide: ServiceIdentifier<T>;
    useDynamicValue: DynamicValueBuilder<T>;
    scope?: BindingScope;
    constructor(provide: ServiceIdentifier<T>, useDynamicValue: DynamicValueBuilder<T>, scope?: BindingScope);
    static create<T>(provide: ServiceIdentifier<T>, builder: DynamicValueBuilder<T>, scope?: BindingScope): DynamicValueProvider<T>;
}
export declare class ConstructorProvider<T = unknown> {
    provide: Newable<T>;
    scope?: BindingScope;
    constructor(provide: Newable<T>, scope?: BindingScope);
    static create<T>(provide: Newable<T>, scope?: BindingScope): ConstructorProvider<T>;
}
export declare class ClassProvider<T = unknown> {
    provide: ServiceIdentifier<T>;
    useClass: Newable<T>;
    scope?: BindingScope;
    constructor(provide: ServiceIdentifier<T>, useClass: Newable<T>, scope?: BindingScope);
    static create<T>(provide: ServiceIdentifier<T>, newable: Newable<T>, scope?: BindingScope): ClassProvider<T>;
}
export declare class ExistingProvider<T = unknown> {
    provide: ServiceIdentifier<T>;
    useExisting: ServiceIdentifier<T>;
    constructor(provide: ServiceIdentifier<T>, useExisting: ServiceIdentifier<T>);
    static create<T>(provide: ServiceIdentifier<T>, useExisting: ServiceIdentifier<T>): ExistingProvider<T>;
}
export declare class FactoryProvider<T = unknown> {
    provide: ServiceIdentifier<T>;
    useFactory: <T>(context?: ResolutionContext) => T;
    constructor(provide: ServiceIdentifier<T>, useFactory: <T>(context?: ResolutionContext) => T);
    static create<T>(provide: ServiceIdentifier<T>, useFactory: <T>(context?: ResolutionContext) => T): FactoryProvider<T>;
}
export declare class ResolvedValueProvider<T = unknown, A = unknown> {
    provide: ServiceIdentifier<T>;
    useResolvedValueFactory: A extends [] ? <TArgs extends A>(...args: TArgs) => T : () => T;
    deps: A extends [] ? MapToResolvedValueInjectOptions<A> : null;
    scope?: BindingScope;
    constructor(provide: ServiceIdentifier<T>, useResolvedValueFactory: A extends [] ? <TArgs extends A>(...args: TArgs) => T : () => T, deps: A extends [] ? MapToResolvedValueInjectOptions<A> : null, scope?: BindingScope);
    static create<T, A extends []>(options: ResolvedValueProvider<T, A>): ResolvedValueProvider<T, A>;
}
export declare const ProviderFactory: {
    ConstantValueProvider: typeof ConstantValueProvider.create;
    DynamicValueProvider: typeof DynamicValueProvider.create;
    ConstructorProvider: typeof ConstructorProvider.create;
    ClassProvider: typeof ClassProvider.create;
    ExistingProvider: typeof ExistingProvider.create;
    FactoryProvider: typeof FactoryProvider.create;
    ResolvedValueProvider: typeof ResolvedValueProvider.create;
};
