var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
define(["require", "exports", "@geckoai/class-mirror", "inversify", "./interfaces", "./constants"], function (require, exports, class_mirror_1, inversify_1, interfaces_1, constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Bootstrap = void 0;
    var Bootstrap = (function () {
        function Bootstrap() {
        }
        Bootstrap.run = function (app) {
            return Bootstrap.module(app).container.get(app);
        };
        Bootstrap.runWithProvide = function (app, providers) {
            var container = new inversify_1.Container();
            for (var _i = 0, providers_1 = providers; _i < providers_1.length; _i++) {
                var provider = providers_1[_i];
                if (typeof provider === 'function') {
                    container.bind(provider).to(provider);
                    continue;
                }
                var _a = provider, scope = _a.scope, provide = _a.provide, useConstantValue = _a.useConstantValue, useDynamicValue = _a.useDynamicValue, useFactory = _a.useFactory, useClass = _a.useClass, useExisting = _a.useExisting, useResolvedValueFactory = _a.useResolvedValueFactory, deps = _a.deps;
                if (useConstantValue) {
                    container.bind(provide).toConstantValue(useConstantValue);
                    continue;
                }
                if (useDynamicValue) {
                    Bootstrap.useScope(container.bind(provide).toDynamicValue(useDynamicValue));
                }
                if (useClass && typeof useClass === 'function') {
                    Bootstrap.useScope(container.bind(provide).to(useClass), scope);
                    continue;
                }
                if (useFactory) {
                    container.bind(provide).toFactory(useFactory);
                    continue;
                }
                if (useExisting) {
                    container.bind(provide).toService(useExisting);
                    continue;
                }
                if (useResolvedValueFactory) {
                    Bootstrap.useScope(container.bind(provide).toResolvedValue(useResolvedValueFactory, deps));
                    continue;
                }
                Bootstrap.useScope(container.bind(provide).to(provide));
            }
            return Bootstrap.module(app, container).container.get(app);
        };
        Bootstrap.runModuleWithProvide = function (app, providers) {
            var container = new inversify_1.Container();
            for (var _i = 0, providers_2 = providers; _i < providers_2.length; _i++) {
                var provider = providers_2[_i];
                if (typeof provider === 'function') {
                    container.bind(provider).to(provider);
                    continue;
                }
                var _a = provider, scope = _a.scope, provide = _a.provide, useConstantValue = _a.useConstantValue, useDynamicValue = _a.useDynamicValue, useFactory = _a.useFactory, useClass = _a.useClass, useExisting = _a.useExisting, useResolvedValueFactory = _a.useResolvedValueFactory, deps = _a.deps;
                if (useConstantValue) {
                    container.bind(provide).toConstantValue(useConstantValue);
                    continue;
                }
                if (useDynamicValue) {
                    Bootstrap.useScope(container.bind(provide).toDynamicValue(useDynamicValue));
                }
                if (useClass && typeof useClass === 'function') {
                    Bootstrap.useScope(container.bind(provide).to(useClass), scope);
                    continue;
                }
                if (useFactory) {
                    container.bind(provide).toFactory(useFactory);
                    continue;
                }
                if (useExisting) {
                    container.bind(provide).toService(useExisting);
                    continue;
                }
                if (useResolvedValueFactory) {
                    Bootstrap.useScope(container.bind(provide).toResolvedValue(useResolvedValueFactory, deps));
                    continue;
                }
                Bootstrap.useScope(container.bind(provide).to(provide));
            }
            return Bootstrap.module(app, container);
        };
        Bootstrap.runWithParent = function (app, parent) {
            return Bootstrap.module(app, parent).container.get(app);
        };
        Bootstrap.runModuleWithParent = function (app, parent) {
            return Bootstrap.module(app, parent);
        };
        Bootstrap.useScope = function (bind, scope) {
            switch (scope) {
                case 'Transient':
                    bind.inTransientScope();
                    break;
                case 'Request':
                    bind.inRequestScope();
                    break;
                default:
                    bind.inSingletonScope();
            }
        };
        Bootstrap.module = function (module, parent) {
            var classMirror = class_mirror_1.ClassMirror.reflect(module);
            var allDecorates = classMirror.getAllDecorates(interfaces_1.GeckoModuleDecorate);
            var container = new inversify_1.Container({ parent: parent });
            container.bind(constants_1.Constants.module).toConstantValue(module);
            container.bind(class_mirror_1.ClassMirror).toConstantValue(classMirror);
            if (parent)
                container.bind(constants_1.Constants.parent).toConstantValue(parent);
            container.bind(inversify_1.Container).toConstantValue(container);
            var object = {
                providers: [],
                exports: [],
                imports: []
            };
            allDecorates.forEach(function (decorator) {
                var _a, _b, _c;
                var _d = decorator.metadata || {}, providers = _d.providers, imports = _d.imports, exports = _d.exports;
                if (providers)
                    (_a = object.providers).push.apply(_a, __spreadArray(__spreadArray([], providers, false), providers.flatMap(function (it) { var _a; return ((_a = it === null || it === void 0 ? void 0 : it.providers) !== null && _a !== void 0 ? _a : []); }), false));
                if (imports)
                    (_b = object.imports).push.apply(_b, imports);
                if (exports)
                    (_c = object.exports).push.apply(_c, exports);
            });
            for (var _i = 0, _a = Array.from(new Set(object.providers)); _i < _a.length; _i++) {
                var provider = _a[_i];
                if (typeof provider === 'function') {
                    container.bind(provider).to(provider);
                    continue;
                }
                var _b = provider, scope = _b.scope, provide = _b.provide, useConstantValue = _b.useConstantValue, useDynamicValue = _b.useDynamicValue, useFactory = _b.useFactory, useClass = _b.useClass, useExisting = _b.useExisting, useResolvedValueFactory = _b.useResolvedValueFactory, deps = _b.deps;
                if (useConstantValue) {
                    container.bind(provide).toConstantValue(useConstantValue);
                    continue;
                }
                if (useDynamicValue) {
                    Bootstrap.useScope(container.bind(provide).toDynamicValue(useDynamicValue));
                }
                if (useClass && typeof useClass === 'function') {
                    Bootstrap.useScope(container.bind(provide).to(useClass), scope);
                    continue;
                }
                if (useFactory) {
                    container.bind(provide).toFactory(useFactory);
                    continue;
                }
                if (useExisting) {
                    container.bind(provide).toService(useExisting);
                    continue;
                }
                if (useResolvedValueFactory) {
                    Bootstrap.useScope(container.bind(provide).toResolvedValue(useResolvedValueFactory, deps));
                    continue;
                }
                Bootstrap.useScope(container.bind(provide).to(provide));
            }
            var loadedModules = Array.from(new Set(object.imports)).map(function (imp) {
                var _a;
                var result = Bootstrap.module(imp, container);
                if (object.exports.includes(imp)) {
                    (_a = object.exports).push.apply(_a, result.exports);
                }
                return result;
            });
            container.bind(constants_1.Constants.children).toConstantValue(loadedModules.map(function (it) { return it.container; }));
            var _loop_1 = function (exp) {
                if (typeof exp === 'function') {
                    if (!(parent === null || parent === void 0 ? void 0 : parent.isCurrentBound(exp))) {
                        parent === null || parent === void 0 ? void 0 : parent.bind(exp).toResolvedValue(function () { return container.get(exp); });
                    }
                    return "continue";
                }
                var provide = exp.provide;
                if (!(parent === null || parent === void 0 ? void 0 : parent.isCurrentBound(provide))) {
                    parent === null || parent === void 0 ? void 0 : parent.bind(provide).toResolvedValue(function () { return container.get(provide); });
                }
            };
            for (var _c = 0, _d = Array.from(new Set(object.exports)); _c < _d.length; _c++) {
                var exp = _d[_c];
                _loop_1(exp);
            }
            container.bind(module).toSelf().inSingletonScope();
            container.bind(constants_1.Constants.instance).toService(module);
            return {
                module: module,
                instance: container.get(module),
                container: container,
                loadedModules: loadedModules,
                imports: object.imports,
                exports: object.exports,
            };
        };
        return Bootstrap;
    }());
    exports.Bootstrap = Bootstrap;
});
