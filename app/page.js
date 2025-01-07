import Box from "@mui/material/Box";
import Game from "./components/game/game";

export default function Home() {
  return (
    <Box sx={{ padding: { xs: 1, sm: 1.5 } }}>
      <Game />
    </Box>
  );
}
