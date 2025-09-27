define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WhenNoAncestorIs = void 0;
    var WhenNoAncestorIs = (function () {
        function WhenNoAncestorIs(serviceIdentifier) {
            this.serviceIdentifier = serviceIdentifier;
        }
        Object.defineProperty(WhenNoAncestorIs.prototype, "type", {
            get: function () {
                return WhenNoAncestorIs;
            },
            enumerable: false,
            configurable: true
        });
        WhenNoAncestorIs.for = function (serviceIdentifier) {
            return new WhenNoAncestorIs(serviceIdentifier);
        };
        return WhenNoAncestorIs;
    }());
    exports.WhenNoAncestorIs = WhenNoAncestorIs;
});
