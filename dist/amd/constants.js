define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Constants = void 0;
    var Constants = (function () {
        function Constants() {
        }
        Constants.parent = Symbol.for("parent");
        Constants.children = Symbol.for("children");
        Constants.module = Symbol.for("module");
        Constants.instance = Symbol.for("instance");
        return Constants;
    }());
    exports.Constants = Constants;
});
