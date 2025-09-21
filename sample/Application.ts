import {Module} from "../src";
import {UserModule} from "./UserModule";

@Module({
  imports: [UserModule],
})
export class Application {}