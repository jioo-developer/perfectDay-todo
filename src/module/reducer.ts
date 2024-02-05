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
  profile: 1,
  // 프로필 디폴트 index state
  bellToggle: false,

  calendarArr: [],
};

const editorSwitch = "editorSwitch";
// 에디터 여는 state
const TodoList = "TodoList";
// 할일 list state
const success = "success";
// 완료한 일정 state
const issue = "issue";
// 알림창 여닫이 state
const profile = "profile";
// 프로필 디폴트 index state
const Mount = "Mount";
// 첫 mount
const updateTodo = "updateTodo";
// todoList 업데이트
const calendarArr = "calendarArr";

const reset = "finishReset";

export const editorToggle = () => ({
  type: editorSwitch,
});

export const FirstMount = () => ({
  type: Mount,
});

export const issueAction = () => ({
  type: issue,
});

export const createPost = (data: object) => ({
  type: TodoList,
  data,
});

export const update = (data: []) => ({
  type: updateTodo,
  data,
});

export const successDate = (date: []) => ({
  type: success,
  date,
});

export const profileUpdate = (data: number) => ({
  type: profile,
  data,
});

export const calendarFunc = (data: [] | {}) => ({
  type: calendarArr,
  data,
});

export const finishReset = () => ({
  type: reset,
});

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case Mount:
      return {
        ...state,
        mountState: true,
      };
    case issue:
      return {
        ...state,
        issue: !state.issue,
      };

    case TodoList:
      return {
        ...state,
        TodoList: [...state.TodoList, ...action.data],
      };
    case updateTodo:
      return {
        ...state,
        TodoList: [...action.data],
      };

    case success:
      let calcData;
      if (Array.isArray(action.date)) {
        calcData = action.date;
      } else {
        calcData = [action.date];
      }
      const result = [...state.successDate, ...calcData];
      localStorage.setItem("clearDB", JSON.stringify(result));
      return {
        ...state,
        successDate: result,
      };

    case reset:
      localStorage.removeItem("clearDB");
      return {
        ...state,
        successDate: [],
      };

    case editorSwitch:
      return {
        ...state,
        editorSwitch: !state.editorSwitch,
      };

    case profile:
      localStorage.setItem("profile", JSON.stringify(action.data));
      return {
        ...state,
        profile: action.data,
      };

    case calendarArr:
      let calresult;
      if (Array.isArray(action.data)) {
        calresult = action.data;
      } else {
        calresult = [action.data];
      }
      const result2 = [...state.calendarArr, ...calresult];
      localStorage.setItem("calendarList", JSON.stringify(result2));
      return {
        ...state,
        calendarArr: result2,
      };
    default:
      return state;
  }
}