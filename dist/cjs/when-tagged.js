"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhenTagged = void 0;
var WhenTagged = (function () {
    function WhenTagged(tag, tagValue) {
        this.tag = tag;
        this.tagValue = tagValue;
    }
    Object.defineProperty(WhenTagged.prototype, "type", {
        get: function () {
            return WhenTagged;
        },
        enumerable: false,
        configurable: true
    });
    WhenTagged.for = function (tag, value) {
        return new WhenTagged(tag, value);
    };
    return WhenTagged;
}());
exports.WhenTagged = WhenTagged;
