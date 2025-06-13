var Constants = (function () {
    function Constants() {
    }
    Constants.parent = Symbol.for("parent");
    Constants.children = Symbol.for("children");
    Constants.module = Symbol.for("module");
    Constants.instance = Symbol.for("instance");
    return Constants;
}());
export { Constants };
