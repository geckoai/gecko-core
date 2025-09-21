import {Module} from "../src";
import {UserService} from "./UserService";


@Module({
  // This is an incorrect demonstration.
  // UserService is a Service, not a Module. A module should use the @Module decorator rather than the @Injectable decorator.
  imports: [UserService]
})
export class ErrorModule {
}