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

import {ClassMirror} from '@geckoai/class-mirror';
import {BindingScope, BindInWhenOnFluentSyntax, Container, Factory, Newable} from 'inversify';
import {GeckoModuleDecorate, GeckoModuleIml, Provider} from './interfaces';
import {
  ClassProvider,
  ConstantValueProvider,
  ConstructorProvider,
  DynamicValueProvider,
  ExistingProvider,
  FactoryProvider,
  ResolvedValueProvider,
  WhenType
} from './factorys';
import {Constants} from './constants';
import {When} from "./when";
import {WhenAnyAncestor} from "./when-any-ancestor";
import {
  BindOnFluentSyntax,
  BindWhenOnFluentSyntax
} from "@inversifyjs/container/lib/cjs/binding/models/BindingFluentSyntax";
import {WhenAnyAncestorIs} from "./when-any-ancestor-is";
import {WhenAnyAncestorNamed} from "./when-any-ancestor-named";
import {WhenAnyAncestorTagged} from "./when-any-ancestor-tagged";
import {WhenParentIs} from "./when-parent-is";
import {WhenParentNamed} from "./when-parent-named";
import {WhenParentTagged} from "./when-parent-tagged";
import {WhenParent} from "./when-parent";
import {WhenNoParent} from "./when-no-parent";
import {WhenNoParentIs} from "./when-no-parent-is";
import {WhenNoParentNamed} from "./when-no-parent-named";
import {WhenNoParentTagged} from "./when-no-parent-tagged";
import {WhenNoAncestor} from "./when-no-ancestor";
import {WhenNoAncestorIs} from "./when-no-ancestor-is";
import {WhenNoAncestorNamed} from "./when-no-ancestor-named";
import {WhenNoAncestorTagged} from "./when-no-ancestor-tagged";
import {WhenNamed} from "./when-named";
import {WhenTagged} from "./when-tagged";

export interface LoadedModule<T = unknown> {
  module: Newable<T>;
  instance: T,
  container: Container;
  exports: Provider[];
  imports: Newable[];
  loadedModules: LoadedModule[];
}

/**
 * Bootstrap util
 */
export class Bootstrap {
  /**
   * Start a new application
   * @param app
   */
  public static run<T extends object>(app: Newable<T>): T {
    return Bootstrap.module(app).container.get<T>(app);
  }

  /**
   * Run a new application with providers
   * @param app
   * @param providers
   */
  public static runWithProvide<T extends object>(app: Newable<T>, providers: Provider[]): T {
    const container = new Container();
    for (const provider of providers) {
      Bootstrap.useProvider(container, provider);
    }
    return Bootstrap.module(app, container).container.get<T>(app);
  }

  /**
   * Run a new module with providers
   * @param app
   * @param providers
   */
  public static runModuleWithProvide<T extends object>(app: Newable<T>, providers: Provider[]): LoadedModule<T> {
    const container = new Container();
    for (const provider of providers) {
      Bootstrap.useProvider(container, provider);
    }
    return Bootstrap.module(app, container)
  }


  /**
   * Run a new application with parent
   * @param app
   * @param parent
   */
  public static runWithParent<T extends object>(app: Newable<T>, parent: Container): T {
    return Bootstrap.module(app, parent).container.get<T>(app);
  }

  /**
   * Run a new module with parent
   * @param app
   * @param parent
   */
  public static runModuleWithParent<T extends object>(app: Newable<T>, parent: Container): LoadedModule<T> {
    return Bootstrap.module(app, parent)
  }

  public static useProvider(container: Container, provider: Provider) {
    if (typeof provider === 'function') {
      container.bind(provider).to(provider);
      return;
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
      deps,
      when
    } = provider as (ConstantValueProvider & DynamicValueProvider & ClassProvider & FactoryProvider & ExistingProvider & ResolvedValueProvider & ConstructorProvider);

    if (useConstantValue) {
      Bootstrap.useWhen(container.bind(provide).toConstantValue(useConstantValue), when);
      return;
    }

    if (useDynamicValue) {
      Bootstrap.useWhen(Bootstrap.useScope(container.bind(provide).toDynamicValue(useDynamicValue)), when);
      return;
    }

    if (useClass && typeof useClass === 'function') {
      Bootstrap.useWhen(Bootstrap.useScope(container.bind(provide).to(useClass), scope), when);
      return;
    }

    if (useFactory) {
      Bootstrap.useWhen(container.bind<Factory<unknown, any>>(provide).toFactory(useFactory as any), when);
      return;
    }

    if (useExisting) {
      container.bind(provide).toService(useExisting);
      return;
    }

    if (useResolvedValueFactory) {
      Bootstrap.useWhen(Bootstrap.useScope(container.bind(provide).toResolvedValue(useResolvedValueFactory, deps as any)), when);
      return;
    }

    Bootstrap.useWhen(Bootstrap.useScope(container.bind(provide).to(provide)), when);
  }

  private static useScope<T>(bind: BindInWhenOnFluentSyntax<T>, scope?: BindingScope): BindWhenOnFluentSyntax<T> {
    switch (scope) {
      case 'Transient':
        return bind.inTransientScope();
      case 'Request':
        return bind.inRequestScope();
      default:
        return bind.inSingletonScope();
    }
  }

  private static useWhen<T>(bind: BindWhenOnFluentSyntax<T>, when?: WhenType): BindOnFluentSyntax<T> {
    if (!when) return bind;
    switch (when.type) {
      case When:
        return bind.when((when as When).constraint);
      case WhenNamed:
        return bind.whenNamed((when as WhenNamed).name);
      case WhenTagged:
        return bind.whenTagged((when as WhenTagged).tag, (when as WhenTagged).tagValue);
      case WhenAnyAncestor:
        return bind.whenAnyAncestor((when as WhenAnyAncestor).constraint)
      case WhenAnyAncestorIs:
        return bind.whenAnyAncestorIs((when as WhenAnyAncestorIs).serviceIdentifier)
      case WhenAnyAncestorNamed:
        return bind.whenAnyAncestorNamed((when as WhenAnyAncestorNamed).name)
      case WhenAnyAncestorTagged:
        return bind.whenAnyAncestorTagged((when as WhenAnyAncestorTagged).tag, (when as WhenAnyAncestorTagged).tagValue)
      case WhenNoAncestor:
        return bind.whenNoAncestor((when as WhenAnyAncestor).constraint)
      case WhenNoAncestorIs:
        return bind.whenNoAncestorIs((when as WhenAnyAncestorIs).serviceIdentifier)
      case WhenNoAncestorNamed:
        return bind.whenNoAncestorNamed((when as WhenAnyAncestorNamed).name)
      case WhenNoAncestorTagged:
        return bind.whenNoAncestorTagged((when as WhenAnyAncestorTagged).tag, (when as WhenAnyAncestorTagged).tagValue)
      case WhenParent:
        return bind.whenParent((when as WhenAnyAncestor).constraint)
      case WhenParentIs:
        return bind.whenParentIs((when as WhenParentIs).serviceIdentifier)
      case WhenParentNamed:
        return bind.whenParentNamed((when as WhenParentNamed).name)
      case WhenParentTagged:
        return bind.whenParentTagged((when as WhenParentTagged).tag, (when as WhenParentTagged).tagValue)
      case WhenNoParent:
        return bind.whenNoParentIs((when as WhenAnyAncestor).constraint)
      case WhenNoParentIs:
        return bind.whenNoParentIs((when as WhenParentIs).serviceIdentifier)
      case WhenNoParentNamed:
        return bind.whenNoParentNamed((when as WhenParentNamed).name)
      case WhenNoParentTagged:
        return bind.whenNoParentTagged((when as WhenParentTagged).tag, (when as WhenParentTagged).tagValue)
      default:
        return bind.whenDefault()
    }
  }

  private static module<T extends object>(module: Newable<T>, parent?: Container): LoadedModule<T> {
    const classMirror = ClassMirror.reflect(module);
    const allDecorates = classMirror.getAllDecorates(GeckoModuleDecorate);

    if (allDecorates.length == 0) {
      throw new Error(`The imported module ${module.name} must be decorated with @Module`);
    }

    const container = new Container({parent});

    container.bind(Constants.module).toConstantValue(module);

    container.bind(ClassMirror).toConstantValue(classMirror)

    if (parent) container.bind(Constants.parent).toConstantValue(parent);

    container.bind(Container).toConstantValue(container);

    const object: GeckoModuleIml = {
      providers: [],
      exports: [],
      imports: []
    };

    allDecorates.forEach(decorator => {
      const {providers, imports, exports} = decorator.metadata || {};
      if (providers) {
        providers.forEach(provider => {
          object.providers.push(...providers)
          object.providers.push(...(provider as ClassProvider)?.metadata?.providers ?? [])
          object.imports.push(...(provider as ClassProvider)?.metadata?.imports ?? [])
          object.exports.push(...(provider as ClassProvider)?.metadata?.exports ?? [])
        })
      };
      if (imports) object.imports.push(...imports);
      if (exports) object.exports.push(...exports);
    });

    // 提供
    for (const provider of Array.from(new Set(object.providers))) {
      Bootstrap.useProvider(container, provider);
    }

    // 导入
    const loadedModules = Array.from(new Set(object.imports)).map(imp => {
      const result = Bootstrap.module(imp as Newable<object>, container);
      // 判断当前导入的是否也导出了
      if (object.exports.includes(imp)) {
        // 把导入这个模块的导出也附加到当前范围
        object.exports.push(...result.exports)
      }
      result.exports.forEach((it) => {
        if (typeof it === 'function') {
          // 父未绑定
          if (!parent?.isCurrentBound(it)) {
            parent?.bind(it).toResolvedValue(() => result.container.get(it))
          }
          return;
        }

        const {
          provide
        } = it as (ConstantValueProvider & DynamicValueProvider & ClassProvider & FactoryProvider & ExistingProvider & ResolvedValueProvider & ConstructorProvider);

        // 父未绑定
        if (!parent?.isCurrentBound(provide)) {
          parent?.bind(provide).toResolvedValue(() => result.container.get(provide))
          // 取消绑定
          result.container.onDeactivation(provide, () => {
            parent?.unbind(provide)
          })
        }
      })
      return result;
    });

    // 所有子
    container.bind(Constants.children).toConstantValue(loadedModules.map(it => it.container));

    // 当前实例
    container.bind(module).toSelf().inSingletonScope();
    container.bind(Constants.instance).toService(module);

    return {
      module,
      instance: container.get(module),
      container,
      loadedModules,
      imports: object.imports,
      exports: object.exports,
    };
  }

}
