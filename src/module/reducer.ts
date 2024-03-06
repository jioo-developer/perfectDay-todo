import { DateFac, todoItem } from "./interfaceModule";

interface State {
  todoList: todoItem[];
  successDate: DateFac[];
  profile: number;
}

export interface Action {
  type: string;
  data?: any;
}

export const initialState: State = {
  todoList: [],
  // 할일 list state
  successDate: [],
  // 완료한 시점 state
  profile: 1,
  // 프로필 디폴트 index state
  // 알림 토글
};

export const typeObject = {
  todoList: "todoList",
  success: "success",
  profile: "profile",
  updateTodo: "updateTodo",
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

export default function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case typeObject.todoList:
      const newSetArr = Array.isArray(action.data)
        ? [...state.todoList, ...action.data]
        : [...state.todoList, action.data];
      return {
        ...state,
        todoList: newSetArr,
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
        (value, idx, arr) => {
          return (
            arr.findIndex((item) => {
              return (
                item.title === value.title &&
                item.hour === value.hour &&
                item.min === value.min
              );
            }) === idx
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

    case typeObject.profile:
      localStorage.setItem("profile", JSON.stringify(action.data));
      return {
        ...state,
        profile: action.data,
      };

    default:
      return state;
  }
}
