"use client";

import { useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";

export default function SetupMenu({
  initialDisplayTime = 5,
  headingLevel = 1,
  onStart,
}) {
  const [displayTime, setDisplayTime] = useState(initialDisplayTime);
  const handleDisplayTimeChange = (newTime) => setDisplayTime(newTime);
  const handleStart = () => onStart({ displayTime });

  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Box sx={{ textAlign: "center" }}>
        <SetupHeading headingLevel={headingLevel} />
      </Box>
      <Box sx={{ mb: 2 }}>
        <DisplayTimeOption
          displayTime={displayTime}
          onDisplayTimeChange={handleDisplayTimeChange}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <StartButton onStart={handleStart} />
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

const displayTimeSliderMarks = [];

for (let i = 1; i <= 10; i++) {
  displayTimeSliderMarks.push({ value: i, label: i });
}

function DisplayTimeOption({ displayTime, onDisplayTimeChange }) {
  const handleDisplayTimeChange = (_, newTime) => onDisplayTimeChange(newTime);

  return (
    <>
      <Typography id="word-display-time" variant="subtitle1" gutterBottom>
        Display time for each word: {displayTime} second(s)
      </Typography>
      <Slider
        aria-label="Display time"
        aria-describedby="word-display-time"
        min={0}
        max={10}
        step={null}
        marks={displayTimeSliderMarks}
        value={displayTime}
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
