import React, { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { Grid } from "@mui/material";

function AggregateResults({ birthFilter, relegionFilter, nationFilter }) {
  // const [birthFilter, setbirthFilter] = useState(aggrList[0].birth_filter);
  // const [relegionFilter, setrelegionFilter] = useState(
  //   aggrList[0].relegion_filter
  // );
  // const [nationFilter, setnationFilter] = useState(aggrList[0].nation_filter);

  return (
    <div>
      <Grid style={{ color: "#bf4e9f" }}
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Stack direction="row" spacing={1}>
          <Stack direction="column" spacing={1}>
            <Chip label="ආගම අනුව" color="primary" style={{backgroundColor:"#c2449c"}}/>
            {relegionFilter.buckets.map((item) => (
              <Chip
                label={item.key + " - " + item.doc_count}
                style={{ color: "black" }}
                variant="outlined"
              />
            ))}
          </Stack>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Stack direction="column" spacing={1}>
            <Chip label="ජාතිය අනුව" color="primary" style={{backgroundColor:"#c2449c"}}/>
            {nationFilter.buckets.map((item) => (
              <Chip
                label={item.key + " - " + item.doc_count}
                style={{ color: "black" }}
                variant="outlined"
              />
            ))}
          </Stack>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Stack direction="column" spacing={1}>
            <Chip label="උපන් ස්ථථානය අනුව" color="primary" style={{backgroundColor:"#c2449c"}} />
            {birthFilter.buckets.map((item) => (
              <Chip
                label={item.key + " - " + item.doc_count}
                style={{ color: "black" }}
                variant="outlined"
              />
            ))}
          </Stack>
        </Stack>
      </Grid>
    </div>
  );
}

export default AggregateResults;
