import { ClassMirror } from '@geckoai/class-mirror';
import { injectable } from 'inversify';
import { GeckoModuleDecorate } from './interfaces';
export { inject, injectable, injectFromBase, multiInject, named, optional, postConstruct, preDestroy, tagged, unmanaged, Container } from 'inversify';
export function ApplyClassDecorators() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return function (target) {
        args.forEach(function (arg) { return arg(target); });
    };
}
export function GeckoModule() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var arg = args[0];
    if (typeof arg === 'function') {
        return ApplyClassDecorators(ClassMirror.createDecorator(new GeckoModuleDecorate(null)), injectable())(arg);
    }
    var _a = args, metadata = _a[0], scope = _a[1];
    return ApplyClassDecorators(ClassMirror.createDecorator(new GeckoModuleDecorate(metadata)), injectable(scope));
}
