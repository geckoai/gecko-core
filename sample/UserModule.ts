import {Module} from "../src";
import {UserService} from "./UserService";

@Module({
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}