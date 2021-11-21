import {
  LinearProgress,
  CircularProgress,
  Typography,
  Alert,
  Grid,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ActorDetail from "./ActorDetail";
import { basicQuerySearch, advancedQuerySearch } from "./Functions";
import BasicSearch from "./BasicSearch";
import AdvancedSearch from "./AdvancedSearch";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Link } from "react-router-dom";
import SingleResult from "./SingleResult";
import AggregateResults from "./AggregateResults";

function ActorsList({ isBasic }) {
  const [actors, setActors] = useState([]);
  const [dataFetched, setDataFetched] = useState(true);
  const [fetchingTime, setFetchingTime] = useState(0);
  const [resultCount, setResultCount] = useState(0);
  const [result, setresult] = useState([]);
  const [aggrList, setaggrList] = useState([]);
  const [noResultAlert, setnoResultAlert] = useState(false);

  const execQuery = async (term) => {
    // setaggrList([]);
    setDataFetched(false);
    const result = await basicQuerySearch(term);
    setresult(result);
    setnoResultAlert(true);
    setaggrList([result.aggregations]);
    setActors(result.hits.hits);
    setFetchingTime(result.took);
    setResultCount(result.hits.total.value);
    setDataFetched(true);
  };

  const execAdvancedSearch = async (data) => {
    setDataFetched(false);
    const result = await advancedQuerySearch(data);
    setnoResultAlert(true);
    console.log("Response : ", result.took);
    // result.hits.hits.map((hit) => console.log(hit));
    setActors(result.hits.hits);
    setFetchingTime(result.took);
    setResultCount(result.hits.total.value);
    setDataFetched(true);
  };

  return (
    <div >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: "100%",
            height: 50,
          },
        }}
        // style={{ backgroundColor: "#565656" }}
      >
        <Paper
          elevation={3}  
          style={{ backgroundColor: "#021a33", color: "white" }}
        >
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <IconButton
              aria-label="upload picture"
              component="span"
              style={{
                color: "white",
                backgroundColor: "#48756e",
                marginLeft: -30,
                marginRight: 15,
              }}
              component={Link}
              to="/"
            >
              <KeyboardBackspaceIcon />
            </IconButton>
            <Grid item  >
              <Typography
                variant="h5"
                gutterBottom
                component="div"
                style={{ marginTop: 8 }} 
              >
                {isBasic && "Basic Search"}
                {!isBasic && "Advanced Search"}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      {isBasic && <BasicSearch execQuery={execQuery} />}
      <br />

      {!isBasic && <AdvancedSearch execAdvancedSearch={execAdvancedSearch} />}
      {!dataFetched && <LinearProgress />}
      {/* Show Results  for Multi Output */}
      {actors.length == 0 &&  noResultAlert && (
        <div style={{ marginTop: 50 }}>
          <Alert severity="error">did not match any documents!</Alert>
        </div>
      )}
      {actors.length > 0 && (
        <div style={{ marginTop: 10 }}>
          <Alert severity="success">
            {!result.single && resultCount} Results in {fetchingTime / 1000}
            seconds
          </Alert>
        </div>
      )}
      {!result.single && (
        <div>
          <br />
          {actors.length > 0 && isBasic && (
            <AggregateResults
              birthFilter={aggrList[0].birth_filter}
              relegionFilter={aggrList[0].relegion_filter}
              nationFilter={aggrList[0].nation_filter}
            />
          )}
          {actors.map((actor) => {
            return (
              <div>
                <ActorDetail
                  name={actor._source["නම"]}
                  birthday={actor._source["උපන් දිනය"]}
                  nationality={actor._source["ජාතිය"]}
                  relegion={actor._source["ආගම"]}
                  birthplace={actor._source["උපන් ස්ථානය"]}
                  personalLife={actor._source["පෞද්ගලික ජීවිතය"]}
                  careerLife={actor._source["වෘත්තිය ජීවිතය"]}
                  school={actor._source["අධ්‍යාපනය"]}
                />
              </div>
            );
          })}
        </div>
      )}
      {result.single && <SingleResult result={result.single_result} />}
    </div>
  );
}

export default ActorsList;
