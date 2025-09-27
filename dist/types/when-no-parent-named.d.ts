import { MetadataName, MetadataTag } from "inversify/lib/esm";
/**
 * 当父容器中没有指定名称的服务时执行绑定
 */
export declare class WhenNoParentNamed {
    readonly name: MetadataName;
    constructor(name: MetadataName);
    get type(): typeof WhenNoParentNamed;
    static for(tag: MetadataTag): WhenNoParentNamed;
}
