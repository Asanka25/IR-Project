import axios from "axios";
import { SERVER_URL } from "../Constants";

export const basicQuerySearch = async (term) => {
  const result = await axios
    .post(SERVER_URL + "basicsearch", {
      q: term,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });

  return result;
};

export const advancedQuerySearch = async (data) => {
  const result = await axios
    .post(SERVER_URL + "advancedsearch", data)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });

  return result;
};
