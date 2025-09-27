var WhenAnyAncestor = (function () {
    function WhenAnyAncestor(constraint) {
        this.constraint = constraint;
    }
    Object.defineProperty(WhenAnyAncestor.prototype, "type", {
        get: function () {
            return WhenAnyAncestor;
        },
        enumerable: false,
        configurable: true
    });
    WhenAnyAncestor.for = function (constraint) {
        return new WhenAnyAncestor(constraint);
    };
    return WhenAnyAncestor;
}());
export { WhenAnyAncestor };
