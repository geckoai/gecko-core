import {Module} from "../src";
import {UserService} from "./UserService";
import {ExportModule} from "./ExportModule";

@Module({
  imports: [ExportModule],
  providers: [UserService],
  exports: [UserService, ExportModule],
})
export class UserModule {

}