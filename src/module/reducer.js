const initialState = {
  editorToggle: false,
  // 에디터 여는 state
  Todo: [],
  // 할일 list state
  successDate: [],
  mountState: false,
  // 완료한 일정 state
  issue: false,
  // 알림창 여닫이 state
  report: false,
  // 벨 이미지 on/off state
  successCon: [],
  // 완료한 일정제목 list state
  rankToggle: false,
  // 랭크 여닫이 state
  profile: 1,
  // 프로필 디폴트 index state
  num: 0,
  // 할일 퍼센트 state
};
//issue = "bell 이미지변경"

const ToggleEditor = "ToggleEditor";
// 에디터 여는 state
const Todo = "Todo";
// 할일 list state
const success = "success";
// 완료한 일정 state
const loadList = "loadList";
// 완료한 리스트 저장한거 불러오기
const issue = "issue";
// 알림창 여닫이 state
const successCon = "successCon";
// 완료한 일정제목 list state
const rank = "rank";
// 랭크 여닫이 state
const profile = "profile";
// 프로필 디폴트 index state
const num = "num";
// 할일 퍼센트 state
const report = "report";
// 벨 이미지 on/off state
const Mount = "Mount";

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

export const FirstMount = () => ({
  type: Mount,
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
        Todo: [...state.Todo, ...action.data].filter((value, index, arr) => {
          return (
            arr.findIndex((item) => {
              return (
                item.write === value.write &&
                item.writeH === value.writeH &&
                item.writeM === value.writeM
              );
            }) === index
          );
        }),
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

    case Mount:
      return {
        ...state,
        mountState: true,
      };

    default:
      return state;
  }
}
