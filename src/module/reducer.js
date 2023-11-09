const initialState = {
  editorSwitch: false,
  // 에디터 여는 state
  TodoList: [],
  // 할일 list state
  successDate: [],
  // 완료한 시점 state
  mountState: false,
  // 첫 마운트 state
  issue: false,
  // 알림창 여닫이 state
  successCon: [],
  // 완료한 일정제목 list state
  rankToggle: false,
  // 랭크 여닫이 state
  profile: 1,
  // 프로필 디폴트 index state
  parcent: 0,
  // 할일 퍼센트 state
};

const editorSwitch = "editorSwitch";
// 에디터 여는 state
const TodoList = "TodoList";
// 할일 list state
const success = "success";
// 완료한 일정 state
const issue = "issue";
// 알림창 여닫이 state
const successCon = "successCon";
// 완료한 일정제목 list state
const rank = "rank";
// 랭크 여닫이 state
const profile = "profile";
// 프로필 디폴트 index state
const parcent = "parcent";
// 할일 퍼센트 state
const Mount = "Mount";

export const editorToggle = () => ({
  type: editorSwitch,
});
