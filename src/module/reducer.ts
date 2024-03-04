import { DateFac, PostPromiseType, todoItem } from "./interfaceModule";

interface State {
  editorSwitch: boolean;
  todoList: todoItem[];
  successDate: DateFac[];
  mountState: boolean;
  issue: boolean;
  profile: number;
  bellToggle: boolean;
  calendarArr: PostPromiseType[];
}

export interface Action {
  type: string;
  data?: any;
}

export const initialState: State = {
  editorSwitch: false,
  // 에디터 여는 state
  todoList: [],
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
  // 알림 토글
  calendarArr: [],
};

export const typeObject = {
  editorSwitch: "editorSwitch",
  todoList: "todoList",
  success: "success",
  issue: "issue",
  profile: "profile",
  Mount: "Mount",
  updateTodo: "updateTodo",
  calendarArr: "calendarArr",
  reset: "finishReset",
};

export const createPost = (data: todoItem): Action => ({
  type: typeObject.todoList,
  data,
});

export const update = (data: todoItem[]): Action => ({
  type: typeObject.updateTodo,
  data,
});

export const successDate = (data: DateFac[] | DateFac): Action => ({
  type: typeObject.success,
  data,
});

export const profileUpdate = (data: number): Action => ({
  type: typeObject.profile,
  data,
});

export const calendarFunc = (
  data: PostPromiseType | PostPromiseType[]
): Action => ({
  type: typeObject.calendarArr,
  data,
});

export default function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case typeObject.Mount:
      return {
        ...state,
        mountState: true,
      };
    case typeObject.issue:
      return {
        ...state,
        issue: !state.issue,
      };

    case typeObject.todoList:
      return {
        ...state,
        todoList: Array.isArray(action.data)
          ? [...state.todoList, ...action.data]
          : [...state.todoList, action.data],
      };
    case typeObject.updateTodo:
      return {
        ...state,
        todoList: [...action.data],
      };

    case typeObject.success:
      let calcData;
      if (Array.isArray(action.data)) {
        calcData = action.data;
      } else {
        calcData = [action.data];
      }
      const result = [...state.successDate, ...calcData].filter(
        (value, index, arr) => {
          return (
            arr.findIndex((item) => {
              return (
                item.year === value.year &&
                item.month === value.month &&
                item.date === value.date &&
                item.title === value.title
              );
            }) === index
          );
        }
      );
      localStorage.setItem("clearDB", JSON.stringify(result));
      return {
        ...state,
        successDate: result,
      };

    case typeObject.reset:
      localStorage.removeItem("clearDB");
      return {
        ...state,
        successDate: [],
      };

    case typeObject.editorSwitch:
      return {
        ...state,
        editorSwitch: !state.editorSwitch,
      };

    case typeObject.profile:
      localStorage.setItem("profile", JSON.stringify(action.data));
      return {
        ...state,
        profile: action.data,
      };

    case typeObject.calendarArr:
      let calresult;
      if (Array.isArray(action.data)) {
        calresult = action.data;
      } else {
        calresult = [action.data];
      }
      // const result2 = [...state.calendarArr, ...calresult];
      // localStorage.setItem("calendarList", JSON.stringify(result2));
      return {
        ...state,
        calendarArr: [],
      };
    default:
      return state;
  }
}
