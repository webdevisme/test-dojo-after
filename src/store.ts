import createStoreMiddleware from "@dojo/framework/core/middleware/store";
import { State } from "./interfaces";
import { replace } from "@dojo/framework/stores/state/operations";

export default createStoreMiddleware<State>((store) => {
  const test: boolean = false;
  const { path, apply } = store;
  apply([replace(path("test"), { success: test as boolean })]);
});
