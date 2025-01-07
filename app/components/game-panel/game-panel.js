import Paper from "@mui/material/Paper";

export default function GamePanel({ children }) {
  return (
    <Paper elevation={3} sx={{ px: { xs: 0, sm: 1 }, py: { xs: 0.5, sm: 1 } }}>
      {children}
    </Paper>
  );
}
