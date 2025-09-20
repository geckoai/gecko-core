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
import { Container, Newable } from 'inversify';
import { Provider } from './interfaces';
export interface LoadedModule<T = unknown> {
    module: Newable<T>;
    instance: T;
    container: Container;
    exports: Provider[];
    imports: Newable[];
    loadedModules: LoadedModule[];
}
/**
 * Bootstrap util
 */
export declare class Bootstrap {
    /**
     * Start a new application
     * @param app
     */
    static run<T extends object>(app: Newable<T>): T;
    /**
     * Run a new application with providers
     * @param app
     * @param providers
     */
    static runWithProvide<T extends object>(app: Newable<T>, providers: Provider[]): T;
    /**
     * Run a new module with providers
     * @param app
     * @param providers
     */
    static runModuleWith<T extends object>(app: Newable<T>, providers: Provider[]): LoadedModule<T>;
    /**
     * Run a new application with parent
     * @param app
     * @param parent
     */
    static runWithParent<T extends object>(app: Newable<T>, parent: Container): T;
    /**
     * Run a new module with parent
     * @param app
     * @param parent
     */
    static runModuleWithParent<T extends object>(app: Newable<T>, parent: Container): LoadedModule<T>;
    private static useScope;
    private static module;
}
