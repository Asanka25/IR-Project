import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

export default function SingleResult({ result }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          //   width: "100%",
          //   height: 75,
        },
      }}
    >
      <Paper elevation={3} style={{ padding: 10 }}>
        <Typography variant="h6">{result}</Typography>
      </Paper>
    </Box>
  );
}
