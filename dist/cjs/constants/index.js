var Constants = (function () {
    function Constants() {
    }
    Constants.parent = Symbol.for("parent");
    Constants.children = Symbol.for("children");
    Constants.module = Symbol.for("module");
    return Constants;
}());
export { Constants };
