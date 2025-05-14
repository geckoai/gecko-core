/**
 * MIT License
 *
 * Copyright (c) 2021 @geckoai/gecko-core RanYunLong<549510622@qq.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { ClassMirror } from '@geckoai/class-mirror';
import { BindingScope, injectable } from 'inversify';
import { GeckoModuleDecorate, GeckoModuleIml } from '../interfaces';

export { inject, injectable, Container } from 'inversify';

export type { Newable } from 'inversify';

export function ApplyClassDecorators(...args: ClassDecorator[]): ClassDecorator {
  return (target) => {
    args.forEach((arg) => arg(target));
  };
}

export function GeckoModule<TFunction extends Function>(target: TFunction): TFunction | void;
export function GeckoModule(metadata: Partial<GeckoModuleIml>, scope?: BindingScope): ClassDecorator;
export function GeckoModule(...args: unknown[]): ClassDecorator | (Function | void) {
  const arg = args[0];
  if (typeof arg === 'function') {
    return ApplyClassDecorators(
      ClassMirror.createDecorator(new GeckoModuleDecorate<null>(null)),
      injectable()
    )(arg as any)
  }
  const [metadata, scope] = args as [  Partial<GeckoModuleIml>,  BindingScope]
  return ApplyClassDecorators(
    ClassMirror.createDecorator(new GeckoModuleDecorate(
      metadata
    )),
    injectable(scope)
  );
}