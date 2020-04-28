import { create, v } from "@dojo/framework/core/vdom";
import theme from "@dojo/framework/core/middleware/theme";
import dojo from "@dojo/themes/dojo";

import store from "./store";
import { failProcess } from "./processes/processes";
import * as css from "./App.m.css";
const factory = create({ theme, store });

export default factory(function App({ middleware: { theme, store } }) {
  store.executor(failProcess)({});
  const { get, path } = store;
  if (!theme.get()) {
    theme.set(dojo);
  }
  const fail: boolean = get(path("test", "success"));
  return v("div", { classes: [css.root] }, [
    v("div", [fail ? "Success" : "failed"]),
  ]);
});
