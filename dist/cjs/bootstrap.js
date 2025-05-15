import { ClassMirror } from '@geckoai/class-mirror';
import { Container } from 'inversify';
import { GeckoModuleDecorate } from './interfaces';
import { Constants } from './constants';
var Bootstrap = (function () {
    function Bootstrap() {
    }
    Bootstrap.run = function (app) {
        return Bootstrap.module(app);
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
        var classMirror = ClassMirror.reflect(module);
        var allDecorates = classMirror.getAllDecorates(GeckoModuleDecorate);
        var container = new Container({ parent: parent });
        container.bind(Constants.module).toConstantValue(module);
        container.bind(ClassMirror).toConstantValue(classMirror);
        if (parent) {
            container.bind(Constants.parent).toConstantValue(parent);
        }
        container.bind(Container).toConstantValue(container);
        var object = {
            providers: [],
            exports: [],
            imports: []
        };
        allDecorates.forEach(function (decorator) {
            var _a, _b, _c;
            var _d = decorator.metadata || {}, providers = _d.providers, imports = _d.imports, exports = _d.exports;
            if (providers)
                (_a = object.providers).push.apply(_a, providers);
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
        container.bind(Constants.children).toConstantValue(loadedModules.map(function (it) { return it.container; }));
        var _loop_1 = function (exp) {
            if (typeof exp === 'function') {
                parent === null || parent === void 0 ? void 0 : parent.bind(exp).toResolvedValue(function () { return container.get(exp); });
                return "continue";
            }
            var provide = exp.provide;
            parent === null || parent === void 0 ? void 0 : parent.bind(provide).toResolvedValue(function () { return container.get(provide); });
        };
        for (var _c = 0, _d = Array.from(new Set(object.exports)); _c < _d.length; _c++) {
            var exp = _d[_c];
            _loop_1(exp);
        }
        container.bind(module).toSelf().inSingletonScope();
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
export { Bootstrap };
