"use client";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";

export default function SetupMenu({
  setup = {},
  headingLevel = 1,
  onSetupChange,
  onStart,
}) {
  const handleDisplayTimeChange = (dt) =>
    onSetupChange({ ...setup, displayTime: dt });

  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Box sx={{ textAlign: "center" }}>
        <SetupHeading headingLevel={headingLevel} />
      </Box>
      <Box sx={{ mb: 2 }}>
        <DisplayTimeOption
          displayTime={setup.displayTime}
          onDisplayTimeChange={handleDisplayTimeChange}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <StartButton onStart={onStart} />
      </Box>
    </Paper>
  );
}

function SetupHeading({ headingLevel }) {
  return (
    <Typography component={`h${headingLevel}`} variant="h4">
      TPR Game Setup
    </Typography>
  );
}

function DisplayTimeOption({ displayTime, onDisplayTimeChange }) {
  const handleDisplayTimeChange = (_, newTime) => onDisplayTimeChange(newTime);

  return (
    <>
      <Typography variant="subtitle1" gutterBottom>
        Display time for each word: {displayTime} second(s)
      </Typography>
      <Slider
        aria-label="Display time"
        min={1}
        max={10}
        value={displayTime}
        valueLabelDisplay="auto"
        marks
        onChange={handleDisplayTimeChange}
      />
    </>
  );
}

function StartButton({ onStart }) {
  return (
    <Button variant="contained" onClick={onStart}>
      Start
    </Button>
  );
}
