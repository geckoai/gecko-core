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

import type { MetadataName, MetadataTag } from '@inversifyjs/core';
import type { LazyServiceIdentifier, Newable, ServiceIdentifier } from 'inversify';
import { ClassDecorate } from '@geckoai/class-mirror';

import {
  ClassProvider,
  ConstantValueProvider,
  ConstructorProvider,
  DynamicValueProvider,
  ExistingProvider, FactoryProvider,
  ResolvedValueProvider
} from './factorys';

export type Provider =
  ConstantValueProvider<any>
  | FactoryProvider<any>
  | DynamicValueProvider<any>
  | ResolvedValueProvider<any, any>
  | ClassProvider<any>
  | ConstructorProvider<any>
  | ExistingProvider<any>
  | Newable<any, any[]>;

export interface GeckoModuleIml {
  imports: Newable[],
  providers: Provider[],
  exports: Provider[],
}

export interface InjectFromBaseOptions {
  extendConstructorArguments?: boolean | undefined;
  extendProperties?: boolean | undefined;
}

export class GeckoModuleDecorate<T extends GeckoModuleIml | null = GeckoModuleIml> extends ClassDecorate<Partial<T>> {
}

export type ResolvedValueMetadataInjectOptions<T> = [T] extends [
    (infer U)[] | undefined
] ? [T] extends [U[]] ? MultipleResolvedValueMetadataInjectOptions<U> : MultipleOptionalResolvedValueMetadataInjectOptions<U> : T extends undefined ? OptionalResolvedValueMetadataInjectOptions<T> : BaseResolvedValueMetadataInjectOptions<T>;

interface BaseResolvedValueMetadataInjectOptions<T> {
  name?: MetadataName;
  serviceIdentifier: ServiceIdentifier<T> | LazyServiceIdentifier<T>;
  tags?: ResolvedValueMetadataInjectTagOptions[];
}

interface BaseMultipleResolvedValueMetadataInjectOptions {
  isMultiple?: true;
}

interface BaseOptionalResolvedValueMetadataInjectOptions {
  optional: true;
}

export interface MultipleResolvedValueMetadataInjectOptions<T> extends BaseResolvedValueMetadataInjectOptions<T>, BaseMultipleResolvedValueMetadataInjectOptions {
}

interface MultipleOptionalResolvedValueMetadataInjectOptions<T> extends BaseResolvedValueMetadataInjectOptions<T>, BaseMultipleResolvedValueMetadataInjectOptions, BaseOptionalResolvedValueMetadataInjectOptions {
}

export interface OptionalResolvedValueMetadataInjectOptions<T> extends BaseResolvedValueMetadataInjectOptions<T>, BaseOptionalResolvedValueMetadataInjectOptions {
}

export interface ResolvedValueMetadataInjectTagOptions {
  key: MetadataTag;
  value: unknown;
}

export type ResolvedValueInjectOptions<T> =
  LazyServiceIdentifier<T>
  | ResolvedValueMetadataInjectOptions<T>
  | ServiceIdentifier<T>;

export type MapToResolvedValueInjectOptions<TArgs extends unknown[]> = {
  [K in keyof TArgs]-?: ResolvedValueInjectOptions<TArgs[K]>;
};