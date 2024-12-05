import SetupMenu from "./setup-menu";

const meta = {
  component: SetupMenu,
};

export default meta;

export const Default = {
  args: {
    onStart: (setup) => console.log(setup),
  },
};
