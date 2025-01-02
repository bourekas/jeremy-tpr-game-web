import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "./theme";
import "./globals.css";
import StoreProvider from "./store/store-provider/store-provider";
import StoreGameStatusProvider from "./store/store-game-status-provider/store-game-status-provider";
import StoreGameSetupProvider from "./store/store-game-setup-provider/store-game-setup-provider";

export const metadata = {
  title: "TPR Game",
  description: "TPR Game by Jeremy Steinberg",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CssBaseline />
        <MuiProviders>
          <StoreProviders>{children}</StoreProviders>
        </MuiProviders>
      </body>
    </html>
  );
}

function MuiProviders({ children }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppRouterCacheProvider>
  );
}

function StoreProviders({ children }) {
  return (
    <StoreProvider>
      <StoreGameSetupProvider>
        <StoreGameStatusProvider>{children}</StoreGameStatusProvider>
      </StoreGameSetupProvider>
    </StoreProvider>
  );
}
