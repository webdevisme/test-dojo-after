import { createProcess } from "@dojo/framework/stores/process";
import { createCommandFactory } from "@dojo/framework/stores/process";
import { State } from "../interfaces";
import { add } from "@dojo/framework/stores/state/operations";

export const commandFactory = createCommandFactory<State>();

const notifyOnFailure = () => {
  return {
    after: () => (error: Error, result: any) => {
      console.log(`notifyOnFailure`, error);

      result.store.apply(result.undoOperations);
    },
  };
};

export const noFailCommand = commandFactory(async ({ get, path }) => {
  console.log(`Executing no fail command`);
  const success: boolean = true;
  return [add(path("test"), { success: success })];
});
export const failCommand = commandFactory(async ({ get, path }) => {
  console.log(`Executing fail command`);
  throw new Error("My command failed");
  return [];
});

export const failProcess = createProcess(
  "test-fail",
  [noFailCommand, failCommand],
  [notifyOnFailure]
);
