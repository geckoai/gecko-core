# gecko-core
A powerful and lightweight inversion of control container for JavaScript & Node.js apps powered by TypeScript.
The @Geckoai/gecko core is a dependency injection framework that extends [InversifyJS](https://github.com/inversify/InversifyJS.git).

## Installing

Use repo https://registry.geckoai.cn/

```shell
npm i reflect-metadata @geckoai/gecko-core
#or
yarn add reflect-metadata @geckoai/gecko-core
```

## Example Usage

The following examples contain basic usage methods. For more high-level usage methods, please refer to the `test` directory. 


```typescript
import { injectable, GeckoModule, Bootstrap } from '@geckoai/core';

@injectable()
export class GlobalService {
  public key = Date.now()
}

export class TestBService {
}

@GeckoModule({
  imports: [],
  providers: [TestBService],
  exports: [TestBService]
})
export class TestBModule {
}


@GeckoModule({
  imports: [TestBModule],
  exports: [TestBModule]
})
export class TestAModule {
  constructor(private bService: TestBService) {
  }
}

@GeckoModule({ imports: [TestAModule], providers: [GlobalService] })
export class Application {
  constructor(private globalService: GlobalService, private testBService: TestBService) {
    console.log(globalService)
    console.log(testBService)
  }
}

// Start u application
const startup = Bootstrap
  .run(Application);
```

## About
[InversifyJS](https://github.com/inversify/InversifyJS.git) is a lightweight inversion of control (IoC) container for TypeScript and JavaScript apps. An IoC container uses a class constructor to identify and inject its dependencies. InversifyJS has a friendly API and encourages the usage of the best OOP and IoC practices.


## Issues
Create [issues](https://github.com/geckoai/gecko-core/issues) in this repository for anything related to the Class Decorator. When creating issues please search for existing issues to avoid duplicates.


## License
Licensed under the [MIT](https://github.com/geckoai/gecko-core/blob/master/LICENSE) License.