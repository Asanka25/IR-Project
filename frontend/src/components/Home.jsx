import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Grid, Link, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";

function Home() {
  const history = useHistory();

  const gotoBasic = () => {
    history.push("/basic");
  };

  const gotoAdvanced = () => {
    history.push("/advanced");
  };

  return (
    <div >
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: 0 }}
      >

      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: 160 }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 300,
              height: 128,
            },
          }}
        >
          <Paper
            elevation={3}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#1e211e",
              cursor: "pointer",
            }}
            onClick={() => gotoBasic()}
          >
            <Typography variant="h" component="h2" style={{ color: "white" }}>
              Basic Search <br />
            </Typography>
          </Paper>
          <Paper
            elevation={3}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#021a33",
              cursor: "pointer",
            }}
            onClick={() => gotoAdvanced()}
          >
            <Typography variant="h" component="h2" style={{ color: "white" }}>
              Advanced Search <br />
            </Typography>
          </Paper>
        </Box>
      </Grid>
    </div>
  );
}

export default Home;
