import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Autocomplete, TextField } from "@mui/material";

function BasicSearch({ execQuery }) {
  const [searchVal, setSearchVal] = useState("");

  const searchTerm = (e) => {
    e.preventDefault();
    execQuery(searchVal);
  };

  return (
    <div >
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
        style={{ backgroundColor: "#bccfe3" }}
      >
        {/* <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={("1", "2")}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Movie" />}
        /> */}
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="search text .."
          // inputProps={{ "aria-label": "search google maps" }}
          fullWidth
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
        <IconButton
          type="submit"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={searchTerm}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  );
}

export default BasicSearch;
