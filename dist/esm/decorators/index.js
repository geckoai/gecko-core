import { ClassMirror } from '@geckoai/class-mirror';
import { injectable } from 'inversify';
import { GeckoModuleDecorate } from '../interfaces';
export { inject, injectable, Container } from 'inversify';
export function ApplyClassDecorators(...args) {
    return (target) => {
        args.forEach((arg) => arg(target));
    };
}
export function GeckoModule(...args) {
    const arg = args[0];
    if (typeof arg === 'function') {
        return ApplyClassDecorators(ClassMirror.createDecorator(new GeckoModuleDecorate(null)), injectable())(arg);
    }
    const [metadata, scope] = args;
    return ApplyClassDecorators(ClassMirror.createDecorator(new GeckoModuleDecorate(metadata)), injectable(scope));
}
