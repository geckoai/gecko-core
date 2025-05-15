var ConstantValueProvider = (function () {
    function ConstantValueProvider(provide, useConstantValue) {
        this.provide = provide;
        this.useConstantValue = useConstantValue;
    }
    ConstantValueProvider.create = function (provide, value) {
        return new ConstantValueProvider(provide, value);
    };
    return ConstantValueProvider;
}());
export { ConstantValueProvider };
var DynamicValueProvider = (function () {
    function DynamicValueProvider(provide, useDynamicValue, scope) {
        this.provide = provide;
        this.useDynamicValue = useDynamicValue;
        this.scope = scope;
    }
    DynamicValueProvider.create = function (provide, builder, scope) {
        return new DynamicValueProvider(provide, builder, scope);
    };
    return DynamicValueProvider;
}());
export { DynamicValueProvider };
var ConstructorProvider = (function () {
    function ConstructorProvider(provide, scope) {
        this.provide = provide;
        this.scope = scope;
    }
    ConstructorProvider.create = function (provide, scope) {
        return new ConstructorProvider(provide, scope);
    };
    return ConstructorProvider;
}());
export { ConstructorProvider };
var ClassProvider = (function () {
    function ClassProvider(provide, useClass, scope) {
        this.provide = provide;
        this.useClass = useClass;
        this.scope = scope;
    }
    ClassProvider.create = function (provide, newable, scope) {
        return new ClassProvider(provide, newable, scope);
    };
    return ClassProvider;
}());
export { ClassProvider };
var ExistingProvider = (function () {
    function ExistingProvider(provide, useExisting) {
        this.provide = provide;
        this.useExisting = useExisting;
    }
    ExistingProvider.create = function (provide, useExisting) {
        return new ExistingProvider(provide, useExisting);
    };
    return ExistingProvider;
}());
export { ExistingProvider };
var FactoryProvider = (function () {
    function FactoryProvider(provide, useFactory) {
        this.provide = provide;
        this.useFactory = useFactory;
    }
    FactoryProvider.create = function (provide, useFactory) {
        return new FactoryProvider(provide, useFactory);
    };
    return FactoryProvider;
}());
export { FactoryProvider };
var ResolvedValueProvider = (function () {
    function ResolvedValueProvider(provide, useResolvedValueFactory, deps, scope) {
        this.provide = provide;
        this.useResolvedValueFactory = useResolvedValueFactory;
        this.deps = deps;
        this.scope = scope;
    }
    ResolvedValueProvider.create = function (options) {
        return new ResolvedValueProvider(options.provide, options.useResolvedValueFactory, options.deps, options.scope);
    };
    return ResolvedValueProvider;
}());
export { ResolvedValueProvider };
export var ProviderFactory = {
    ConstantValueProvider: ConstantValueProvider.create,
    DynamicValueProvider: DynamicValueProvider.create,
    ConstructorProvider: ConstructorProvider.create,
    ClassProvider: ClassProvider.create,
    ExistingProvider: ExistingProvider.create,
    FactoryProvider: FactoryProvider.create,
    ResolvedValueProvider: ResolvedValueProvider.create
};
