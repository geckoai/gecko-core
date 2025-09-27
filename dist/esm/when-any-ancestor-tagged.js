var WhenAnyAncestorTagged = (function () {
    function WhenAnyAncestorTagged(tag, tagValue) {
        this.tag = tag;
        this.tagValue = tagValue;
    }
    Object.defineProperty(WhenAnyAncestorTagged.prototype, "type", {
        get: function () {
            return WhenAnyAncestorTagged;
        },
        enumerable: false,
        configurable: true
    });
    WhenAnyAncestorTagged.for = function (tag, value) {
        return new WhenAnyAncestorTagged(tag, value);
    };
    return WhenAnyAncestorTagged;
}());
export { WhenAnyAncestorTagged };
