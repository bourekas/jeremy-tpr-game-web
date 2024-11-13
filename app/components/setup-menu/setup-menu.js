"use client";

import { useState } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";

const displayTimeSliderMarks = [];

for (let i = 1; i <= 10; i++) {
  displayTimeSliderMarks.push({ value: i, label: i });
}

export default function SetupMenu({ setup = {}, headingLevel = 1, onStart }) {
  const [displayTime, setDisplayTime] = useState(setup.displayTime || 5);

  const handleDisplayTimeChange = (event, newTime) => setDisplayTime(newTime);

  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Box sx={{ textAlign: "center" }}>
        <Typography component={`h${headingLevel}`} variant="h4">
          TPR Game Setup
        </Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
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
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained" onClick={() => onStart({ displayTime })}>
          Start
        </Button>
      </Box>
    </Paper>
  );
}
