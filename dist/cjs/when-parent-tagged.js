"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhenParentTagged = void 0;
var WhenParentTagged = (function () {
    function WhenParentTagged(tag, tagValue) {
        this.tag = tag;
        this.tagValue = tagValue;
    }
    Object.defineProperty(WhenParentTagged.prototype, "type", {
        get: function () {
            return WhenParentTagged;
        },
        enumerable: false,
        configurable: true
    });
    WhenParentTagged.for = function (tag, value) {
        return new WhenParentTagged(tag, value);
    };
    return WhenParentTagged;
}());
exports.WhenParentTagged = WhenParentTagged;
