import history from "../history";

import streams from "../apis/streams";
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  EDIT_STREAM,
  DELETE_STREAM,
} from "./types";

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const createStream = (formValues) => async (dispatch, getState) => {
  const { userId } = getState().auth;

  const response = await streams.post("/streams", { ...formValues, userId });
  // console.log(response.data);

  dispatch({
    type: CREATE_STREAM,
    payload: response.data,
  });

  // Re-route user back to home page
  history.push("/");
};

export const fetchStreams = () => async (dispatch) => {
  const response = await streams.get("/streams");
  // console.log(response.data);

  dispatch({
    type: FETCH_STREAMS,
    payload: response.data,
  });
};

export const fetchStream = (id) => async (dispatch) => {
  const response = await streams.get(`/streams/${id}`);
  // console.log(response.data);

  dispatch({
    type: FETCH_STREAM,
    payload: response.data,
  });
};

export const editStream = (id, formValues) => async (dispatch) => {
  // We are using PATCH instead of PUT, as PUT request will remove the userId field from the stream
  const response = await streams.patch(`/streams/${id}`, formValues);
  // console.log(response.data);

  dispatch({
    type: EDIT_STREAM,
    payload: response.data,
  });

  // Re-route user back to home page
  history.push("/");
};

export const deleteStream = (id) => async (dispatch) => {
  // We won't receive any response in case of a REST DELETE operation
  await streams.delete(`/streams/${id}`);

  dispatch({
    type: DELETE_STREAM,
    payload: id,
  });

  // Re-route user back to home page
  history.push("/");
};
