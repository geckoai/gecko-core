define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WhenNoParent = void 0;
    var WhenNoParent = (function () {
        function WhenNoParent(constraint) {
            this.constraint = constraint;
        }
        Object.defineProperty(WhenNoParent.prototype, "type", {
            get: function () {
                return WhenNoParent;
            },
            enumerable: false,
            configurable: true
        });
        WhenNoParent.for = function (constraint) {
            return new WhenNoParent(constraint);
        };
        return WhenNoParent;
    }());
    exports.WhenNoParent = WhenNoParent;
});
