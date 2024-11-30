import SetupMenu from "./setup-menu";

export default meta = {
  component: SetupMenu,
};

export const Default = {
  args: {
    onStart: (setup) => console.log(setup),
  },
};
