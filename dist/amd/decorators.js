define(["require", "exports", "@geckoai/class-mirror", "inversify", "./interfaces", "inversify"], function (require, exports, class_mirror_1, inversify_1, interfaces_1, inversify_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Container = exports.injectable = exports.inject = void 0;
    exports.ApplyClassDecorators = ApplyClassDecorators;
    exports.GeckoModule = GeckoModule;
    Object.defineProperty(exports, "inject", { enumerable: true, get: function () { return inversify_2.inject; } });
    Object.defineProperty(exports, "injectable", { enumerable: true, get: function () { return inversify_2.injectable; } });
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
    function GeckoModule() {
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
});
