import { SetupProvider } from "@/app/contexts/setup/setup";
import SetupMenu from "./setup-menu";

const meta = {
  component: SetupMenu,
  decorators: [
    (Story) => (
      <SetupProvider>
        <Story />
      </SetupProvider>
    ),
  ],
};
export default meta;

export const Default = {
  args: {
    onStart: () => console.log("Start called"),
  },
};
