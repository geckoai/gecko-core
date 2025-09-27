define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WhenAnyAncestorTagged = void 0;
    var WhenAnyAncestorTagged = (function () {
        function WhenAnyAncestorTagged(tag, tagValue) {
            this.tag = tag;
            this.tagValue = tagValue;
        }
        Object.defineProperty(WhenAnyAncestorTagged.prototype, "type", {
            get: function () {
                return WhenAnyAncestorTagged;
            },
            enumerable: false,
            configurable: true
        });
        WhenAnyAncestorTagged.for = function (tag, value) {
            return new WhenAnyAncestorTagged(tag, value);
        };
        return WhenAnyAncestorTagged;
    }());
    exports.WhenAnyAncestorTagged = WhenAnyAncestorTagged;
});
