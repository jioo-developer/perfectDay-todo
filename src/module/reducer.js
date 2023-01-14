const initialState = {
  editorToggle: false,
  Todo: [],
  successDate: [],
  loadding: false,
  issue: false,
  report: false,
  successCon: [],
  rankToggle: false,
  profile: 1,
  num: 0,
};
//issue = "bell 이미지변경"

const ToggleEditor = "ToggleEditor";
const Todo = "Todo";
const success = "success";
const loadList = "loadList";
const issue = "issue";
const successCon = "successCon";
const rank = "rank";
const profile = "profile";
const num = "num";
const report = "report";

export const EditorAction = () => ({
  type: ToggleEditor,
});

export const TodoPost = (data) => ({
  type: Todo,
  data,
});

export const reportAction = () => ({
  type: report,
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


export const contentAction = (data) => ({
  type: successCon,
  data,
});

export const rankAction = () => ({
  type: rank,
});

export const ProfileAction = (data) => ({
  type: profile,
  data,
});

export const NumAction = (data) => ({
  type: num,
  data,
});

export default function reducer(state = initialState, action) {
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
            arr.findIndex((item) => {
              return (
                item.write === value.write &&
                item.writeH === value.writeH &&
                item.writeM === value.writeM &&
                item.clear === value.clear
              );
            }) === idx
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

    case successCon:
      return {
        ...state,
        successCon: [...state.successCon, action.data],
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

    case num:
      return {
        ...state,
        num: action.data,
      };

      case report:
      return {
        ...state,
        report: !state.report,
      };

    default:
      return state;
  }
}
