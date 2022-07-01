import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {
  editorToggle: false,
  Todo: [],
  successDate: [],
  loadding: false,
  issue: false,
  successCon: [],
  report: false,
  clearCounter: 0,
  list: 0,
  rankToggle: false,
  profile: 1,
};
//issue = "bell 이미지변경"
// report = notification 상태 on / off

const ToggleEditor = "ToggleEditor";
const Todo = "Todo";
const success = "success";
const loadList = "loadList";
const issue = "issue";
const report = "report";
const successCon = "successCon";
const clearCounter = "clearCounter";
const list = "list";
const rank = "rank";
const profile = "profile";

export const EditorAction = () => ({
  type: ToggleEditor,
});

export const TodoPost = (data) => ({
  type: Todo,
  data,
});

export const successDate = (date) => ({
  type: success,
  date,
});

export const LoadSaveList = (data) => ({
  type: loadList,
  data,
});

export const issueAction = () => ({
  type: issue,
});

export const reportAction = () => ({
  type: report,
});

export const contentAction = (data) => ({
  type: successCon,
  data,
});

export const Counter = (data) => ({
  type: clearCounter,
  data,
});

export const listAction = (data) => ({
  type: list,
  data,
});

export const rankAction = () => ({
  type: rank,
});

export const ProfileAction = (data) => ({
  type: profile,
  data,
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(logger))
);

function reducer(state = initialState, action) {
  switch (action.type) {
    case ToggleEditor:
      return {
        ...state,
        editorToggle: !state.editorToggle,
      };
    case Todo:
      return {
        ...state,
        Todo: [...state.Todo, action.data].filter((value, idx, arr) => {
          return (
            arr.findIndex(
              (item) =>
                item.write === value.write &&
                item.writeH === value.writeH &&
                item.writeM === value.writeM &&
                item.clear === value.clear
            ) === idx
          );
        }),
      };
    case success:
      return {
        ...state,
        successDate: [...state.successDate, action.date],
      };
    case loadList:
      return {
        ...state,
        loadding: (state.loadding = true),
        Todo: [...state.Todo, ...action.data],
      };
    case issue:
      return {
        ...state,
        issue: !state.issue,
      };
    case report:
      return {
        ...state,
        report: !state.report,
      };

    case successCon:
      return {
        ...state,
        successCon: [...state.successCon, action.data],
      };

    case clearCounter:
      return {
        ...state,
        clearCounter: action.data,
      };

    case list:
      return {
        ...state,
        list: action.data,
      };

    case rank:
      return {
        ...state,
        rankToggle: !state.rankToggle,
      };

    case profile:
      return {
        ...state,
        profile: action.data,
      };

    default:
      return state;
  }
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
