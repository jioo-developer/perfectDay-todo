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
  completeList: [],
  // 완료한 일정제목 list state
  rankToggle: false,
  // 랭크 여닫이 state
  profile: 1,
  // 프로필 디폴트 index state
  parcent: 0,
  // 할일 퍼센트 state,
  bellToggle: false,
};

const editorSwitch = "editorSwitch";
// 에디터 여는 state
const TodoList = "TodoList";
// 할일 list state
const success = "success";
// 완료한 일정 state
const issue = "issue";
// 알림창 여닫이 state
const completeList = "completeList";
// 완료한 일정제목 list state
const rank = "rank";
// 랭크 여닫이 state
const profile = "profile";
// 프로필 디폴트 index state
const parcent = "parcent";
// 할일 퍼센트 state
const Mount = "Mount";
// 첫 mount
const updateTodo = "updateTodo";
// todoList 업데이트

export const editorToggle = () => ({
  type: editorSwitch,
});

export const FirstMount = () => ({
  type: Mount,
});

export const issueAction = () => ({
  type: issue,
});

export const complete = () => ({
  type: completeList,
});

export const createPost = () => ({
  type: TodoList,
});

export const update = () => ({
  type: updateTodo,
});

export const successDate = (date) => ({
  type: success,
  date,
});

export default function reducer(state = initialState, action) {
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
    case completeList:
      return {
        ...state,
        bellToggle: !state.bellToggle,
        completeList: [...state.completeList, action.data],
      };
    case TodoList:
      return {
        ...state,
        TodoList: [...state.TodoList, action.data],
      };
    case updateTodo:
      return {
        ...state,
        TodoList: [action.data],
      };

    case success:
      return {
        ...state,
        successDate: [...state.successDate, action.date],
      };
    default:
      return state;
  }
}
