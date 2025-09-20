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

  /**
   * 直接绑定静态常量值到容器，该值不会被重新计算或改变。适用于配置项、全局常量等不变值
   * @param provide
   * @param value
   */
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

  /**
   * 类似于Factory但更轻量，通过函数延迟生成值，每次请求依赖时都会重新执行函数。适用于需要每次获取新值的场景，如配置动态参数
   * @param provide
   * @param builder
   * @param scope
   */
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

  /**
   * 将服务绑定到另一个已存在的服务标识符，实现别名功能。本质上是对已有绑定的引用，不会创建新实例
   * @param provide
   * @param useExisting
   */
  public static create<T>(provide: ServiceIdentifier<T>, useExisting: ServiceIdentifier<T>) {
    return new ExistingProvider<T>(provide, useExisting);
  }
}

export class FactoryProvider<T = unknown> {
  public constructor(
    public provide: ServiceIdentifier<T>,
    public useFactory: (context?: ResolutionContext) => T
  ) { }

  /**
   * 允许通过工厂函数动态创建实例，每次请求依赖时都会调用工厂函数生成新实例。适合需要复杂初始化逻辑或运行时决定实例化方式的场景
   * @param provide
   * @param useFactory
   */
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

  /**
   * 用于直接绑定一个已解析的值到容器中，该值会在绑定时就立即解析并固定。适用于需要预先计算并缓存结果的场景
   * @param options
   */
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