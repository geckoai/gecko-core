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

import { BindingScope, DynamicValueBuilder, Newable, ResolutionContext, ServiceIdentifier } from 'inversify';
import { MapToResolvedValueInjectOptions } from './interfaces';

export class ConstantValueProvider<T = unknown> {
  public constructor(
    public provide: ServiceIdentifier<T>,
    public useConstantValue: T
  ) {
  }

  public static create<T>(provide: ServiceIdentifier<T>, value: T): ConstantValueProvider<T> {
    return new ConstantValueProvider<T>(provide, value);
  }
}

export class DynamicValueProvider<T = unknown> {
  public constructor(
    public provide: ServiceIdentifier<T>,
    public useDynamicValue: DynamicValueBuilder<T>,
    public scope?: BindingScope
  ) {
  }

  public static create<T>(provide: ServiceIdentifier<T>, builder: DynamicValueBuilder<T>, scope?: BindingScope) {
    return new DynamicValueProvider<T>(provide, builder, scope);
  }
}

export class ConstructorProvider<T = unknown> {
  public constructor(
    public provide: Newable<T>,
    public scope?: BindingScope
  ) {
  }

  public static create<T>(provide: Newable<T>, scope?: BindingScope) {
    return new ConstructorProvider<T>(provide, scope);
  }
}


export class ClassProvider<T = unknown> {
  public constructor(
    public provide: ServiceIdentifier<T>,
    public useClass: Newable<T>,
    public scope?: BindingScope
  ) {
  }

  public static create<T>(provide: ServiceIdentifier<T>, newable: Newable<T>, scope?: BindingScope) {
    return new ClassProvider<T>(provide, newable, scope);
  }
}

export class ExistingProvider<T = unknown> {
  public constructor(
    public provide: ServiceIdentifier<T>,
    public useExisting: ServiceIdentifier<T>
  ) {
  }

  public static create<T>(provide: ServiceIdentifier<T>, useExisting: ServiceIdentifier<T>) {
    return new ExistingProvider<T>(provide, useExisting);
  }
}

export class FactoryProvider<T = unknown> {
  public constructor(
    public provide: ServiceIdentifier<T>,
    public useFactory: (context?: ResolutionContext) => T
  ) { }

  public static create<T>(
    provide: ServiceIdentifier<T>,
    useFactory: (context?: ResolutionContext) => T
  ) {
    return new FactoryProvider<T>(provide, useFactory);
  }
}

export class ResolvedValueProvider<T = unknown, A = unknown> {
  public constructor(
    public provide: ServiceIdentifier<T>,
    public useResolvedValueFactory: A extends [] ? <TArgs extends A>(...args: TArgs) => T : () => T,
    public deps: A extends [] ? MapToResolvedValueInjectOptions<A> : null,
    public scope?: BindingScope
  ) {
  }

  public static create<T, A extends []>(options: ResolvedValueProvider<T, A>) {
    return new ResolvedValueProvider<T, A>(options.provide, options.useResolvedValueFactory, options.deps, options.scope);
  }
}


export const ProviderFactory = {
  ConstantValueProvider: ConstantValueProvider.create,
  DynamicValueProvider: DynamicValueProvider.create,
  ConstructorProvider: ConstructorProvider.create,
  ClassProvider: ClassProvider.create,
  ExistingProvider: ExistingProvider.create,
  FactoryProvider: FactoryProvider.create,
  ResolvedValueProvider: ResolvedValueProvider.create
};