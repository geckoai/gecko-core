import {MetadataName, MetadataTag} from "inversify/lib/esm";

/**
 * 当父容器中没有指定名称的服务时执行绑定
 */
export class WhenNoParentNamed {
  constructor(public readonly name: MetadataName) {
  }

  public get type() {
    return WhenNoParentNamed;
  }

  public static for(tag: MetadataTag): WhenNoParentNamed {
    return new WhenNoParentNamed(tag);
  }
}