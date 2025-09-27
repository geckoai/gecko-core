var WhenAnyAncestorNamed = (function () {
    function WhenAnyAncestorNamed(name) {
        this.name = name;
    }
    Object.defineProperty(WhenAnyAncestorNamed.prototype, "type", {
        get: function () {
            return WhenAnyAncestorNamed;
        },
        enumerable: false,
        configurable: true
    });
    WhenAnyAncestorNamed.for = function (name) {
        return new WhenAnyAncestorNamed(name);
    };
    return WhenAnyAncestorNamed;
}());
export { WhenAnyAncestorNamed };
