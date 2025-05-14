import { ClassMirror } from '@geckoai/class-mirror';
import { Container } from 'inversify';
import { GeckoModuleDecorate } from './interfaces';
import { Constants } from './constants';
export class Bootstrap {
    static run(app) {
        return Bootstrap.module(app);
    }
    static useScope(bind, scope) {
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
    static module(module, parent) {
        const classMirror = ClassMirror.reflect(module);
        const allDecorates = classMirror.getAllDecorates(GeckoModuleDecorate);
        const container = new Container({ parent });
        container.bind(Constants.module).toConstantValue(module);
        container.bind(ClassMirror).toConstantValue(classMirror);
        if (parent) {
            container.bind(Constants.parent).toConstantValue(parent);
        }
        container.bind(Container).toConstantValue(container);
        const object = {
            providers: [],
            exports: [],
            imports: []
        };
        allDecorates.forEach(decorator => {
            const { providers, imports, exports } = decorator.metadata || {};
            if (providers)
                object.providers.push(...providers);
            if (imports)
                object.imports.push(...imports);
            if (exports)
                object.exports.push(...exports);
        });
        for (const provider of Array.from(new Set(object.providers))) {
            if (typeof provider === 'function') {
                container.bind(provider).to(provider);
                continue;
            }
            const { scope, provide, useConstantValue, useDynamicValue, useFactory, useClass, useExisting, useResolvedValueFactory, deps } = provider;
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
                container.bind(provide).toFactory(useFactory);
                continue;
            }
            if (useExisting) {
                container.bind(provide).toService(useExisting);
                continue;
            }
            if (useResolvedValueFactory) {
                Bootstrap.useScope(container.bind(provide).toResolvedValue(useResolvedValueFactory, deps));
                continue;
            }
            Bootstrap.useScope(container.bind(provide).to(provide));
        }
        const loadedModules = Array.from(new Set(object.imports)).map(imp => {
            const result = Bootstrap.module(imp, container);
            if (object.exports.includes(imp)) {
                object.exports.push(...result.exports);
            }
            return result;
        });
        container.bind(Constants.children).toConstantValue(loadedModules.map(it => it.container));
        for (const exp of Array.from(new Set(object.exports))) {
            if (typeof exp === 'function') {
                parent?.bind(exp).toResolvedValue(() => container.get(exp));
                continue;
            }
            const { provide } = exp;
            parent?.bind(provide).toResolvedValue(() => container.get(provide));
        }
        container.bind(module).toSelf().inSingletonScope();
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
