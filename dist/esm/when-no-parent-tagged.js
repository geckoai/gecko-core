var WhenNoParentTagged = (function () {
    function WhenNoParentTagged(tag, tagValue) {
        this.tag = tag;
        this.tagValue = tagValue;
    }
    Object.defineProperty(WhenNoParentTagged.prototype, "type", {
        get: function () {
            return WhenNoParentTagged;
        },
        enumerable: false,
        configurable: true
    });
    WhenNoParentTagged.for = function (tag, value) {
        return new WhenNoParentTagged(tag, value);
    };
    return WhenNoParentTagged;
}());
export { WhenNoParentTagged };
