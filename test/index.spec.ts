import {assert, expect} from 'chai'

import {Bootstrap,} from "../src";
import {Application} from "../sample/Application";
import {UserService} from "../sample/UserService";
import {AuthService} from "../sample/AuthService";
import {ErrorModule} from "../sample/ErrorModule";


describe('Application', () => {
  const {container} = Bootstrap.runModuleWithProvide(Application, []);


  it('container.get(Application) instanceOf Application', () => {
    assert.instanceOf(container.get(Application), Application)
  })


  it('container.get(UserService) instanceOf UserModule', () => {
    assert.instanceOf(container.get(UserService), UserService)
  })

  it('container.get(AuthService) instanceOf AuthModule', () => {
    expect(() => container.get(AuthService)).to.throw(Error);
  })

  it('Incorrect module import example', () => {
    expect(() => Bootstrap.run(ErrorModule)).to.throw(Error);
  });
})