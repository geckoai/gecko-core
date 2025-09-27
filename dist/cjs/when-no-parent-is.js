"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhenNoParentIs = void 0;
var WhenNoParentIs = (function () {
    function WhenNoParentIs(serviceIdentifier) {
        this.serviceIdentifier = serviceIdentifier;
    }
    Object.defineProperty(WhenNoParentIs.prototype, "type", {
        get: function () {
            return WhenNoParentIs;
        },
        enumerable: false,
        configurable: true
    });
    WhenNoParentIs.for = function (serviceIdentifier) {
        return new WhenNoParentIs(serviceIdentifier);
    };
    return WhenNoParentIs;
}());
exports.WhenNoParentIs = WhenNoParentIs;
