var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "@geckoai/class-mirror"], function (require, exports, class_mirror_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GeckoModuleDecorate = void 0;
    var GeckoModuleDecorate = (function (_super) {
        __extends(GeckoModuleDecorate, _super);
        function GeckoModuleDecorate() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return GeckoModuleDecorate;
    }(class_mirror_1.ClassDecorate));
    exports.GeckoModuleDecorate = GeckoModuleDecorate;
});
