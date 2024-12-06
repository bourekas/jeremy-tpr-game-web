import SetupMenu from "./setup-menu";

const meta = {
  component: SetupMenu,
};
export default meta;

export const Default = {
  args: {
    onSetupChange: (setup) => console.log("onSetupChange called:", setup),
    onStart: () => console.log("Start called"),
  },
};
