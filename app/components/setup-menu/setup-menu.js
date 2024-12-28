"use client";

import { useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useSetup, useSetupChange } from "@/app/contexts/setup";
import { GameDisplayContext } from "@/app/contexts/game-display";

export default function SetupMenu({ headingLevel = 1 }) {
  const setup = useSetup();
  const onSetupChange = useSetupChange();
  const { onStart } = useContext(GameDisplayContext);

  const setupChange = (key) => (val) => onSetupChange({ ...setup, [key]: val });
  const handleDisplayTimeChange = setupChange("displayTime");
  const handleAutoPlayAudioChange = setupChange("isAutoPlayAudio");

  return (
    <Box sx={{ padding: 3 }}>
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
    </Box>
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
