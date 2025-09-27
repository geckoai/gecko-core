var WhenNoAncestor = (function () {
    function WhenNoAncestor(constraint) {
        this.constraint = constraint;
    }
    Object.defineProperty(WhenNoAncestor.prototype, "type", {
        get: function () {
            return WhenNoAncestor;
        },
        enumerable: false,
        configurable: true
    });
    WhenNoAncestor.for = function (constraint) {
        return new WhenNoAncestor(constraint);
    };
    return WhenNoAncestor;
}());
export { WhenNoAncestor };
