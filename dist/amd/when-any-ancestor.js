define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WhenAnyAncestor = void 0;
    var WhenAnyAncestor = (function () {
        function WhenAnyAncestor(constraint) {
            this.constraint = constraint;
        }
        Object.defineProperty(WhenAnyAncestor.prototype, "type", {
            get: function () {
                return WhenAnyAncestor;
            },
            enumerable: false,
            configurable: true
        });
        WhenAnyAncestor.for = function (constraint) {
            return new WhenAnyAncestor(constraint);
        };
        return WhenAnyAncestor;
    }());
    exports.WhenAnyAncestor = WhenAnyAncestor;
});
