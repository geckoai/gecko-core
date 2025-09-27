"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bootstrap = void 0;
var class_mirror_1 = require("@geckoai/class-mirror");
var inversify_1 = require("inversify");
var interfaces_1 = require("./interfaces");
var constants_1 = require("./constants");
var when_1 = require("./when");
var when_any_ancestor_1 = require("./when-any-ancestor");
var when_any_ancestor_is_1 = require("./when-any-ancestor-is");
var when_any_ancestor_named_1 = require("./when-any-ancestor-named");
var when_any_ancestor_tagged_1 = require("./when-any-ancestor-tagged");
var when_parent_is_1 = require("./when-parent-is");
var when_parent_named_1 = require("./when-parent-named");
var when_parent_tagged_1 = require("./when-parent-tagged");
var when_parent_1 = require("./when-parent");
var when_no_parent_1 = require("./when-no-parent");
var when_no_parent_is_1 = require("./when-no-parent-is");
var when_no_parent_named_1 = require("./when-no-parent-named");
var when_no_parent_tagged_1 = require("./when-no-parent-tagged");
var when_no_ancestor_1 = require("./when-no-ancestor");
var when_no_ancestor_is_1 = require("./when-no-ancestor-is");
var when_no_ancestor_named_1 = require("./when-no-ancestor-named");
var when_no_ancestor_tagged_1 = require("./when-no-ancestor-tagged");
var when_named_1 = require("./when-named");
var when_tagged_1 = require("./when-tagged");
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
            Bootstrap.useProvider(container, provider);
        }
        return Bootstrap.module(app, container).container.get(app);
    };
    Bootstrap.runModuleWithProvide = function (app, providers) {
        var container = new inversify_1.Container();
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
            case when_1.When:
                return bind.when(when.constraint);
            case when_named_1.WhenNamed:
                return bind.whenNamed(when.name);
            case when_tagged_1.WhenTagged:
                return bind.whenTagged(when.tag, when.tagValue);
            case when_any_ancestor_1.WhenAnyAncestor:
                return bind.whenAnyAncestor(when.constraint);
            case when_any_ancestor_is_1.WhenAnyAncestorIs:
                return bind.whenAnyAncestorIs(when.serviceIdentifier);
            case when_any_ancestor_named_1.WhenAnyAncestorNamed:
                return bind.whenAnyAncestorNamed(when.name);
            case when_any_ancestor_tagged_1.WhenAnyAncestorTagged:
                return bind.whenAnyAncestorTagged(when.tag, when.tagValue);
            case when_no_ancestor_1.WhenNoAncestor:
                return bind.whenNoAncestor(when.constraint);
            case when_no_ancestor_is_1.WhenNoAncestorIs:
                return bind.whenNoAncestorIs(when.serviceIdentifier);
            case when_no_ancestor_named_1.WhenNoAncestorNamed:
                return bind.whenNoAncestorNamed(when.name);
            case when_no_ancestor_tagged_1.WhenNoAncestorTagged:
                return bind.whenNoAncestorTagged(when.tag, when.tagValue);
            case when_parent_1.WhenParent:
                return bind.whenParent(when.constraint);
            case when_parent_is_1.WhenParentIs:
                return bind.whenParentIs(when.serviceIdentifier);
            case when_parent_named_1.WhenParentNamed:
                return bind.whenParentNamed(when.name);
            case when_parent_tagged_1.WhenParentTagged:
                return bind.whenParentTagged(when.tag, when.tagValue);
            case when_no_parent_1.WhenNoParent:
                return bind.whenNoParentIs(when.constraint);
            case when_no_parent_is_1.WhenNoParentIs:
                return bind.whenNoParentIs(when.serviceIdentifier);
            case when_no_parent_named_1.WhenNoParentNamed:
                return bind.whenNoParentNamed(when.name);
            case when_no_parent_tagged_1.WhenNoParentTagged:
                return bind.whenNoParentTagged(when.tag, when.tagValue);
            default:
                return bind.whenDefault();
        }
    };
    Bootstrap.module = function (module, parent) {
        var classMirror = class_mirror_1.ClassMirror.reflect(module);
        var allDecorates = classMirror.getAllDecorates(interfaces_1.GeckoModuleDecorate);
        if (allDecorates.length == 0) {
            throw new Error("The imported module ".concat(module.name, " must be decorated with @Module"));
        }
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
            var _a, _b;
            var _c = decorator.metadata || {}, providers = _c.providers, imports = _c.imports, exports = _c.exports;
            if (providers) {
                providers.forEach(function (provider) {
                    var _a, _b, _c, _d;
                    var _e, _f, _g, _h, _j, _k;
                    (_a = object.providers).push.apply(_a, providers);
                    (_b = object.providers).push.apply(_b, (_f = (_e = provider === null || provider === void 0 ? void 0 : provider.metadata) === null || _e === void 0 ? void 0 : _e.providers) !== null && _f !== void 0 ? _f : []);
                    (_c = object.imports).push.apply(_c, (_h = (_g = provider === null || provider === void 0 ? void 0 : provider.metadata) === null || _g === void 0 ? void 0 : _g.imports) !== null && _h !== void 0 ? _h : []);
                    (_d = object.exports).push.apply(_d, (_k = (_j = provider === null || provider === void 0 ? void 0 : provider.metadata) === null || _j === void 0 ? void 0 : _j.exports) !== null && _k !== void 0 ? _k : []);
                });
            }
            ;
            if (imports)
                (_a = object.imports).push.apply(_a, imports);
            if (exports)
                (_b = object.exports).push.apply(_b, exports);
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
        container.bind(constants_1.Constants.children).toConstantValue(loadedModules.map(function (it) { return it.container; }));
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
