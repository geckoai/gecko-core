"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhenAnyAncestorIs = void 0;
var WhenAnyAncestorIs = (function () {
    function WhenAnyAncestorIs(serviceIdentifier) {
        this.serviceIdentifier = serviceIdentifier;
    }
    Object.defineProperty(WhenAnyAncestorIs.prototype, "type", {
        get: function () {
            return WhenAnyAncestorIs;
        },
        enumerable: false,
        configurable: true
    });
    WhenAnyAncestorIs.for = function (serviceIdentifier) {
        return new WhenAnyAncestorIs(serviceIdentifier);
    };
    return WhenAnyAncestorIs;
}());
exports.WhenAnyAncestorIs = WhenAnyAncestorIs;
