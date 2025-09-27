"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhenParentIs = void 0;
var WhenParentIs = (function () {
    function WhenParentIs(serviceIdentifier) {
        this.serviceIdentifier = serviceIdentifier;
    }
    Object.defineProperty(WhenParentIs.prototype, "type", {
        get: function () {
            return WhenParentIs;
        },
        enumerable: false,
        configurable: true
    });
    WhenParentIs.for = function (serviceIdentifier) {
        return new WhenParentIs(serviceIdentifier);
    };
    return WhenParentIs;
}());
exports.WhenParentIs = WhenParentIs;
