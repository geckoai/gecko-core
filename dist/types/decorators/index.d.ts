import { BindingScope } from 'inversify';
import { GeckoModuleIml } from '../interfaces';
export { inject, injectable, Container } from 'inversify';
export type { Newable } from 'inversify';
export declare function ApplyClassDecorators(...args: ClassDecorator[]): ClassDecorator;
export declare function GeckoModule<TFunction extends Function>(target: TFunction): TFunction | void;
export declare function GeckoModule(metadata: Partial<GeckoModuleIml>, scope?: BindingScope): ClassDecorator;
