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
export { WhenNoParent };
