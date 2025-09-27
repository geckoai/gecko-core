"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.When = void 0;
var When = (function () {
    function When(constraint) {
        this.constraint = constraint;
    }
    Object.defineProperty(When.prototype, "type", {
        get: function () {
            return When;
        },
        enumerable: false,
        configurable: true
    });
    When.for = function (constraint) {
        return new When(constraint);
    };
    return When;
}());
exports.When = When;
