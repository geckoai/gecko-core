export class ConstantValueProvider {
    provide;
    useConstantValue;
    constructor(provide, useConstantValue) {
        this.provide = provide;
        this.useConstantValue = useConstantValue;
    }
    static create(provide, value) {
        return new ConstantValueProvider(provide, value);
    }
}
export class DynamicValueProvider {
    provide;
    useDynamicValue;
    scope;
    constructor(provide, useDynamicValue, scope) {
        this.provide = provide;
        this.useDynamicValue = useDynamicValue;
        this.scope = scope;
    }
    static create(provide, builder, scope) {
        return new DynamicValueProvider(provide, builder, scope);
    }
}
export class ConstructorProvider {
    provide;
    scope;
    constructor(provide, scope) {
        this.provide = provide;
        this.scope = scope;
    }
    static create(provide, scope) {
        return new ConstructorProvider(provide, scope);
    }
}
export class ClassProvider {
    provide;
    useClass;
    scope;
    constructor(provide, useClass, scope) {
        this.provide = provide;
        this.useClass = useClass;
        this.scope = scope;
    }
    static create(provide, newable, scope) {
        return new ClassProvider(provide, newable, scope);
    }
}
export class ExistingProvider {
    provide;
    useExisting;
    constructor(provide, useExisting) {
        this.provide = provide;
        this.useExisting = useExisting;
    }
    static create(provide, useExisting) {
        return new ExistingProvider(provide, useExisting);
    }
}
export class FactoryProvider {
    provide;
    useFactory;
    constructor(provide, useFactory) {
        this.provide = provide;
        this.useFactory = useFactory;
    }
    static create(provide, useFactory) {
        return new FactoryProvider(provide, useFactory);
    }
}
export class ResolvedValueProvider {
    provide;
    useResolvedValueFactory;
    deps;
    scope;
    constructor(provide, useResolvedValueFactory, deps, scope) {
        this.provide = provide;
        this.useResolvedValueFactory = useResolvedValueFactory;
        this.deps = deps;
        this.scope = scope;
    }
    static create(options) {
        return new ResolvedValueProvider(options.provide, options.useResolvedValueFactory, options.deps, options.scope);
    }
}
export const ProviderFactory = {
    ConstantValueProvider: ConstantValueProvider.create,
    DynamicValueProvider: DynamicValueProvider.create,
    ConstructorProvider: ConstructorProvider.create,
    ClassProvider: ClassProvider.create,
    ExistingProvider: ExistingProvider.create,
    FactoryProvider: FactoryProvider.create,
    ResolvedValueProvider: ResolvedValueProvider.create
};
