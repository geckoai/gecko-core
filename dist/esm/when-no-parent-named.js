var WhenNoParentNamed = (function () {
    function WhenNoParentNamed(name) {
        this.name = name;
    }
    Object.defineProperty(WhenNoParentNamed.prototype, "type", {
        get: function () {
            return WhenNoParentNamed;
        },
        enumerable: false,
        configurable: true
    });
    WhenNoParentNamed.for = function (tag) {
        return new WhenNoParentNamed(tag);
    };
    return WhenNoParentNamed;
}());
export { WhenNoParentNamed };
