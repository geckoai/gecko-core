"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorModule = void 0;
var src_1 = require("../src");
var UserService_1 = require("./UserService");
var ErrorModule = (function () {
    function ErrorModule() {
    }
    ErrorModule = __decorate([
        (0, src_1.Module)({
            imports: [UserService_1.UserService]
        })
    ], ErrorModule);
    return ErrorModule;
}());
exports.ErrorModule = ErrorModule;
