import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import { theme } from "../app/theme";
import "../app/globals.css";

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  decorators: [
    withThemeFromJSXProvider({
      GlobalStyles: CssBaseline,
      Provider: ThemeProvider,
      themes: {
        default: theme,
      },
      defaultTheme: "default",
    }),
  ],
};

export default preview;
