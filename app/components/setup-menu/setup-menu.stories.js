import SetupMenu from "./setup-menu";

export default {
  component: SetupMenu,
};

export const Default = {
  args: {
    onStart: (setup) => console.log(setup),
  },
};
