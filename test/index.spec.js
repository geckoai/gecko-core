"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var src_1 = require("../src");
var Application_1 = require("../sample/Application");
var UserService_1 = require("../sample/UserService");
var AuthService_1 = require("../sample/AuthService");
var ErrorModule_1 = require("../sample/ErrorModule");
describe('Application', function () {
    var container = src_1.Bootstrap.runModuleWithProvide(Application_1.Application, []).container;
    it('container.get(Application) instanceOf Application', function () {
        chai_1.assert.instanceOf(container.get(Application_1.Application), Application_1.Application);
    });
    it('container.get(UserService) instanceOf UserModule', function () {
        chai_1.assert.instanceOf(container.get(UserService_1.UserService), UserService_1.UserService);
    });
    it('container.get(AuthService) instanceOf AuthModule', function () {
        (0, chai_1.expect)(function () { return container.get(AuthService_1.AuthService); }).to.throw(Error);
    });
    it('Incorrect module import example', function () {
        (0, chai_1.expect)(function () { return src_1.Bootstrap.run(ErrorModule_1.ErrorModule); }).to.throw(Error);
    });
});
