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
export { WhenNoParentIs };
