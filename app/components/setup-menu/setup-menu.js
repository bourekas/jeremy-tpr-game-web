"use client";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function SetupMenu({
  setup = {},
  headingLevel = 1,
  onSetupChange,
  onStart,
}) {
  const setupChange = (key) => (val) => onSetupChange({ ...setup, [key]: val });
  const handleDisplayTimeChange = setupChange("displayTime");
  const handleAutoPlayAudioChange = setupChange("isAutoPlayAudio");

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
      <Box sx={{ mb: 2 }}>
        <AutoPlayAudioOption
          isEnabled={setup.isAutoPlayAudio}
          onChange={handleAutoPlayAudioChange}
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

function AutoPlayAudioOption({ isEnabled, onChange }) {
  const handleChange = (event) => onChange(event.target.checked);

  return (
    <>
      <FormControlLabel
        control={<Switch checked={isEnabled} onChange={handleChange} />}
        label="Auto-Play Audio"
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
