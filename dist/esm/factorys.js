var ConstantValueProvider = (function () {
    function ConstantValueProvider(provide, useConstantValue, when) {
        this.provide = provide;
        this.useConstantValue = useConstantValue;
        this.when = when;
    }
    ConstantValueProvider.create = function (provide, value, when) {
        return new ConstantValueProvider(provide, value, when);
    };
    return ConstantValueProvider;
}());
export { ConstantValueProvider };
var DynamicValueProvider = (function () {
    function DynamicValueProvider(provide, useDynamicValue, scope, when) {
        this.provide = provide;
        this.useDynamicValue = useDynamicValue;
        this.scope = scope;
        this.when = when;
    }
    DynamicValueProvider.create = function (provide, builder, scope, when) {
        return new DynamicValueProvider(provide, builder, scope);
    };
    DynamicValueProvider.createForWhen = function (provide, builder, when, scope) {
        return new DynamicValueProvider(provide, builder, scope, when);
    };
    return DynamicValueProvider;
}());
export { DynamicValueProvider };
var ConstructorProvider = (function () {
    function ConstructorProvider(provide, scope, metadata, when) {
        this.provide = provide;
        this.scope = scope;
        this.metadata = metadata;
        this.when = when;
    }
    ConstructorProvider.create = function (provide, scope, metadata, when) {
        return new ConstructorProvider(provide, scope, metadata);
    };
    ConstructorProvider.createForWhen = function (provide, when, scope, metadata) {
        return new ConstructorProvider(provide, scope, metadata, when);
    };
    return ConstructorProvider;
}());
export { ConstructorProvider };
var ClassProvider = (function () {
    function ClassProvider(provide, useClass, scope, metadata, when) {
        this.provide = provide;
        this.useClass = useClass;
        this.scope = scope;
        this.metadata = metadata;
        this.when = when;
    }
    ClassProvider.create = function (provide, newable, scope, metadata, when) {
        return new ClassProvider(provide, newable, scope, metadata, when);
    };
    ClassProvider.createForWhen = function (provide, newable, when, scope, metadata) {
        return new ClassProvider(provide, newable, scope, metadata, when);
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
    function FactoryProvider(provide, useFactory, when) {
        this.provide = provide;
        this.useFactory = useFactory;
        this.when = when;
    }
    FactoryProvider.create = function (provide, useFactory, when) {
        return new FactoryProvider(provide, useFactory, when);
    };
    return FactoryProvider;
}());
export { FactoryProvider };
var ResolvedValueProvider = (function () {
    function ResolvedValueProvider(provide, useResolvedValueFactory, deps, scope, when) {
        this.provide = provide;
        this.useResolvedValueFactory = useResolvedValueFactory;
        this.deps = deps;
        this.scope = scope;
        this.when = when;
    }
    ResolvedValueProvider.create = function (options) {
        return new ResolvedValueProvider(options.provide, options.useResolvedValueFactory, options.deps, options.scope, options.when);
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
