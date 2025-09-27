var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { ClassMirror } from '@geckoai/class-mirror';
import { Container } from 'inversify';
import { GeckoModuleDecorate } from './interfaces';
import { Constants } from './constants';
import { When } from "./when";
import { WhenAnyAncestor } from "./when-any-ancestor";
import { WhenAnyAncestorIs } from "./when-any-ancestor-is";
import { WhenAnyAncestorNamed } from "./when-any-ancestor-named";
import { WhenAnyAncestorTagged } from "./when-any-ancestor-tagged";
import { WhenParentIs } from "./when-parent-is";
import { WhenParentNamed } from "./when-parent-named";
import { WhenParentTagged } from "./when-parent-tagged";
import { WhenParent } from "./when-parent";
import { WhenNoParent } from "./when-no-parent";
import { WhenNoParentIs } from "./when-no-parent-is";
import { WhenNoParentNamed } from "./when-no-parent-named";
import { WhenNoParentTagged } from "./when-no-parent-tagged";
import { WhenNoAncestor } from "./when-no-ancestor";
import { WhenNoAncestorIs } from "./when-no-ancestor-is";
import { WhenNoAncestorNamed } from "./when-no-ancestor-named";
import { WhenNoAncestorTagged } from "./when-no-ancestor-tagged";
import { WhenNamed } from "./when-named";
import { WhenTagged } from "./when-tagged";
var Bootstrap = (function () {
    function Bootstrap() {
    }
    Bootstrap.run = function (app) {
        return Bootstrap.module(app).container.get(app);
    };
    Bootstrap.runWithProvide = function (app, providers) {
        var container = new Container();
        for (var _i = 0, providers_1 = providers; _i < providers_1.length; _i++) {
            var provider = providers_1[_i];
            Bootstrap.useProvider(container, provider);
        }
        return Bootstrap.module(app, container).container.get(app);
    };
    Bootstrap.runModuleWithProvide = function (app, providers) {
        var container = new Container();
        for (var _i = 0, providers_2 = providers; _i < providers_2.length; _i++) {
            var provider = providers_2[_i];
            Bootstrap.useProvider(container, provider);
        }
        return Bootstrap.module(app, container);
    };
    Bootstrap.runWithParent = function (app, parent) {
        return Bootstrap.module(app, parent).container.get(app);
    };
    Bootstrap.runModuleWithParent = function (app, parent) {
        return Bootstrap.module(app, parent);
    };
    Bootstrap.useProvider = function (container, provider) {
        if (typeof provider === 'function') {
            container.bind(provider).to(provider);
            return;
        }
        var _a = provider, scope = _a.scope, provide = _a.provide, useConstantValue = _a.useConstantValue, useDynamicValue = _a.useDynamicValue, useFactory = _a.useFactory, useClass = _a.useClass, useExisting = _a.useExisting, useResolvedValueFactory = _a.useResolvedValueFactory, deps = _a.deps, when = _a.when;
        if (useConstantValue) {
            Bootstrap.useWhen(container.bind(provide).toConstantValue(useConstantValue), when);
            return;
        }
        if (useDynamicValue) {
            Bootstrap.useWhen(Bootstrap.useScope(container.bind(provide).toDynamicValue(useDynamicValue)), when);
            return;
        }
        if (useClass && typeof useClass === 'function') {
            Bootstrap.useWhen(Bootstrap.useScope(container.bind(provide).to(useClass), scope), when);
            return;
        }
        if (useFactory) {
            Bootstrap.useWhen(container.bind(provide).toFactory(useFactory), when);
            return;
        }
        if (useExisting) {
            container.bind(provide).toService(useExisting);
            return;
        }
        if (useResolvedValueFactory) {
            Bootstrap.useWhen(Bootstrap.useScope(container.bind(provide).toResolvedValue(useResolvedValueFactory, deps)), when);
            return;
        }
        Bootstrap.useWhen(Bootstrap.useScope(container.bind(provide).to(provide)), when);
    };
    Bootstrap.useScope = function (bind, scope) {
        switch (scope) {
            case 'Transient':
                return bind.inTransientScope();
            case 'Request':
                return bind.inRequestScope();
            default:
                return bind.inSingletonScope();
        }
    };
    Bootstrap.useWhen = function (bind, when) {
        if (!when)
            return bind;
        switch (when.type) {
            case When:
                return bind.when(when.constraint);
            case WhenNamed:
                return bind.whenNamed(when.name);
            case WhenTagged:
                return bind.whenTagged(when.tag, when.tagValue);
            case WhenAnyAncestor:
                return bind.whenAnyAncestor(when.constraint);
            case WhenAnyAncestorIs:
                return bind.whenAnyAncestorIs(when.serviceIdentifier);
            case WhenAnyAncestorNamed:
                return bind.whenAnyAncestorNamed(when.name);
            case WhenAnyAncestorTagged:
                return bind.whenAnyAncestorTagged(when.tag, when.tagValue);
            case WhenNoAncestor:
                return bind.whenNoAncestor(when.constraint);
            case WhenNoAncestorIs:
                return bind.whenNoAncestorIs(when.serviceIdentifier);
            case WhenNoAncestorNamed:
                return bind.whenNoAncestorNamed(when.name);
            case WhenNoAncestorTagged:
                return bind.whenNoAncestorTagged(when.tag, when.tagValue);
            case WhenParent:
                return bind.whenParent(when.constraint);
            case WhenParentIs:
                return bind.whenParentIs(when.serviceIdentifier);
            case WhenParentNamed:
                return bind.whenParentNamed(when.name);
            case WhenParentTagged:
                return bind.whenParentTagged(when.tag, when.tagValue);
            case WhenNoParent:
                return bind.whenNoParentIs(when.constraint);
            case WhenNoParentIs:
                return bind.whenNoParentIs(when.serviceIdentifier);
            case WhenNoParentNamed:
                return bind.whenNoParentNamed(when.name);
            case WhenNoParentTagged:
                return bind.whenNoParentTagged(when.tag, when.tagValue);
            default:
                return bind.whenDefault();
        }
    };
    Bootstrap.module = function (module, parent) {
        var classMirror = ClassMirror.reflect(module);
        var allDecorates = classMirror.getAllDecorates(GeckoModuleDecorate);
        if (allDecorates.length == 0) {
            throw new Error("The imported module ".concat(module.name, " must be decorated with @Module"));
        }
        var container = new Container({ parent: parent });
        container.bind(Constants.module).toConstantValue(module);
        container.bind(ClassMirror).toConstantValue(classMirror);
        if (parent)
            container.bind(Constants.parent).toConstantValue(parent);
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
                (_a = object.providers).push.apply(_a, __spreadArray(__spreadArray([], providers, false), providers.flatMap(function (it) { var _a; return ((_a = it === null || it === void 0 ? void 0 : it.providers) !== null && _a !== void 0 ? _a : []); }), false));
            if (imports)
                (_b = object.imports).push.apply(_b, imports);
            if (exports)
                (_c = object.exports).push.apply(_c, exports);
        });
        for (var _i = 0, _a = Array.from(new Set(object.providers)); _i < _a.length; _i++) {
            var provider = _a[_i];
            Bootstrap.useProvider(container, provider);
        }
        var loadedModules = Array.from(new Set(object.imports)).map(function (imp) {
            var _a;
            var result = Bootstrap.module(imp, container);
            if (object.exports.includes(imp)) {
                (_a = object.exports).push.apply(_a, result.exports);
            }
            result.exports.forEach(function (it) {
                if (typeof it === 'function') {
                    if (!(parent === null || parent === void 0 ? void 0 : parent.isCurrentBound(it))) {
                        parent === null || parent === void 0 ? void 0 : parent.bind(it).toResolvedValue(function () { return result.container.get(it); });
                    }
                    return;
                }
                var provide = it.provide;
                if (!(parent === null || parent === void 0 ? void 0 : parent.isCurrentBound(provide))) {
                    parent === null || parent === void 0 ? void 0 : parent.bind(provide).toResolvedValue(function () { return result.container.get(provide); });
                    result.container.onDeactivation(provide, function () {
                        parent === null || parent === void 0 ? void 0 : parent.unbind(provide);
                    });
                }
            });
            return result;
        });
        container.bind(Constants.children).toConstantValue(loadedModules.map(function (it) { return it.container; }));
        container.bind(module).toSelf().inSingletonScope();
        container.bind(Constants.instance).toService(module);
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
