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
import { BindingScope, BindInWhenOnFluentSyntax, Container, Factory, Newable } from 'inversify';
import { GeckoModuleDecorate, GeckoModuleIml, Provider } from './interfaces';
import {
  ClassProvider,
  ConstantValueProvider,
  ConstructorProvider,
  DynamicValueProvider,
  ExistingProvider,
  FactoryProvider,
  ResolvedValueProvider
} from './factorys';
import { Constants } from './constants';

export interface LoadedModule<T = unknown> {
  instance: T;
  module: Newable<T>;
  container: Container;
  exports:  Provider[];
  imports: Newable[];
  loadedModules: LoadedModule[];
}

export class Bootstrap {
  public static run<T extends object>(app: Newable<T>): LoadedModule<T> {
    return Bootstrap.module(app);
  }

  private static useScope<T>(bind: BindInWhenOnFluentSyntax<T>, scope?: BindingScope): void {
    switch (scope) {
      case 'Transient':
        bind.inTransientScope();
        break;
      case 'Request':
        bind.inRequestScope();
        break;
      default:
        bind.inSingletonScope();
    }
  }

  private static module<T extends object>(module: Newable<T>, parent?: Container): LoadedModule<T> {
    const classMirror = ClassMirror.reflect(module);
    const allDecorates = classMirror.getAllDecorates(GeckoModuleDecorate);

    const container = new Container({ parent });

    container.bind(Constants.module).toConstantValue(module);

    container.bind(ClassMirror).toConstantValue(classMirror)

    if (parent) {
      container.bind(Constants.parent).toConstantValue(parent);
    }

    container.bind(Container).toConstantValue(container);

    const object: GeckoModuleIml = {
      providers: [],
      exports: [],
      imports: []
    };

    allDecorates.forEach(decorator => {
      const { providers, imports, exports } = decorator.metadata || {};
      if (providers) object.providers.push(...providers);
      if (imports) object.imports.push(...imports);
      if (exports) object.exports.push(...exports);
    });


    // 提供
    for (const provider of Array.from(new Set(object.providers))) {
      if (typeof provider === 'function') {
        container.bind(provider).to(provider);
        continue;
      }

      const {
        scope,
        provide,
        useConstantValue,
        useDynamicValue,
        useFactory,
        useClass,
        useExisting,
        useResolvedValueFactory,
        deps
      } = provider as (ConstantValueProvider & DynamicValueProvider & ClassProvider & FactoryProvider & ExistingProvider & ResolvedValueProvider & ConstructorProvider);

      if (useConstantValue) {
        container.bind(provide).toConstantValue(useConstantValue);
        continue;
      }

      if (useDynamicValue) {
        Bootstrap.useScope(container.bind(provide).toDynamicValue(useDynamicValue));
      }

      if (useClass && typeof useClass === 'function') {
        Bootstrap.useScope(container.bind(provide).to(useClass), scope);
        continue;
      }

      if (useFactory) {
        container.bind<Factory<unknown, any>>(provide).toFactory(useFactory);
        continue;
      }

      if (useExisting) {
        container.bind(provide).toService(useExisting);
        continue;
      }

      if (useResolvedValueFactory) {
        Bootstrap.useScope(container.bind(provide).toResolvedValue(useResolvedValueFactory, deps as any));
        continue;
      }
      Bootstrap.useScope(container.bind(provide).to(provide));
    }

    // 导入
    const loadedModules = Array.from(new Set(object.imports)).map(imp =>  {
      const result = Bootstrap.module(imp as Newable<object>, container);

      // 判断当前导入的是否也导出了
      if (object.exports.includes(imp)) {
          // 把导入这个模块的导出也附加到当前范围
        object.exports.push(...result.exports)
      }
      return result;
    });

    // 所有子
    container.bind(Constants.children).toConstantValue(loadedModules.map(it => it.container));

    // 导出
    for (const exp of Array.from(new Set(object.exports))) {
      if (typeof exp === 'function') {
        parent?.bind(exp).toResolvedValue(() => container.get(exp));
        continue;
      }
      const {
        provide
      } = exp as (ConstantValueProvider & DynamicValueProvider & ClassProvider & FactoryProvider & ExistingProvider & ResolvedValueProvider & ConstructorProvider);
      parent?.bind(provide).toResolvedValue(() => container.get(provide));
    }

    // 当前实例
    container.bind(module).toSelf().inSingletonScope();

    return {
      module,
      instance: container.get<T>(module),
      container,
      loadedModules,
      imports: object.imports,
      exports: object.exports,
    };
  }
}