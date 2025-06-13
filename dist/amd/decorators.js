define(["require", "exports", "@geckoai/class-mirror", "inversify", "./interfaces", "inversify"], function (require, exports, class_mirror_1, inversify_1, interfaces_1, inversify_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UseBase = exports.Module = exports.ApplyClassDecorators = exports.Container = exports.unmanaged = exports.tagged = exports.preDestroy = exports.postConstruct = exports.optional = exports.named = exports.multiInject = exports.injectable = exports.inject = void 0;
    Object.defineProperty(exports, "inject", { enumerable: true, get: function () { return inversify_2.inject; } });
    Object.defineProperty(exports, "injectable", { enumerable: true, get: function () { return inversify_2.injectable; } });
    Object.defineProperty(exports, "multiInject", { enumerable: true, get: function () { return inversify_2.multiInject; } });
    Object.defineProperty(exports, "named", { enumerable: true, get: function () { return inversify_2.named; } });
    Object.defineProperty(exports, "optional", { enumerable: true, get: function () { return inversify_2.optional; } });
    Object.defineProperty(exports, "postConstruct", { enumerable: true, get: function () { return inversify_2.postConstruct; } });
    Object.defineProperty(exports, "preDestroy", { enumerable: true, get: function () { return inversify_2.preDestroy; } });
    Object.defineProperty(exports, "tagged", { enumerable: true, get: function () { return inversify_2.tagged; } });
    Object.defineProperty(exports, "unmanaged", { enumerable: true, get: function () { return inversify_2.unmanaged; } });
    Object.defineProperty(exports, "Container", { enumerable: true, get: function () { return inversify_2.Container; } });
    function ApplyClassDecorators() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return function (target) {
            args.forEach(function (arg) { return arg(target); });
        };
    }
    exports.ApplyClassDecorators = ApplyClassDecorators;
    function Module() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var arg = args[0];
        if (typeof arg === 'function') {
            return ApplyClassDecorators(class_mirror_1.ClassMirror.createDecorator(new interfaces_1.GeckoModuleDecorate(null)), (0, inversify_1.injectable)())(arg);
        }
        var _a = args, metadata = _a[0], scope = _a[1];
        return ApplyClassDecorators(class_mirror_1.ClassMirror.createDecorator(new interfaces_1.GeckoModuleDecorate(metadata)), (0, inversify_1.injectable)(scope));
    }
    exports.Module = Module;
    function UseBase(arg) {
        if (typeof arg === 'function') {
            return (0, inversify_1.injectFromBase)()(arg);
        }
        return (0, inversify_1.injectFromBase)(arg);
    }
    exports.UseBase = UseBase;
});
