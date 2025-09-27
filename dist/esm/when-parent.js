var WhenParent = (function () {
    function WhenParent(constraint) {
        this.constraint = constraint;
    }
    Object.defineProperty(WhenParent.prototype, "type", {
        get: function () {
            return WhenParent;
        },
        enumerable: false,
        configurable: true
    });
    WhenParent.for = function (constraint) {
        return new WhenParent(constraint);
    };
    return WhenParent;
}());
export { WhenParent };
