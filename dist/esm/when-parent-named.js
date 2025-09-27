var WhenParentNamed = (function () {
    function WhenParentNamed(name) {
        this.name = name;
    }
    Object.defineProperty(WhenParentNamed.prototype, "type", {
        get: function () {
            return WhenParentNamed;
        },
        enumerable: false,
        configurable: true
    });
    WhenParentNamed.for = function (tag) {
        return new WhenParentNamed(tag);
    };
    return WhenParentNamed;
}());
export { WhenParentNamed };
