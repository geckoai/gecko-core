import {Module} from "../src";
import {injectable} from "inversify";

@injectable()
export class ExportService {}

@Module({
  providers: [ExportService],
  exports: [ExportService],
})
export class ExportModule {
}