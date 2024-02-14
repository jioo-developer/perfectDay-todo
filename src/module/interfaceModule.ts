type todoItem = {
  write: string;
  writeH: number | string;
  writeM: number | string;
  clear: boolean;
};

type RootState = {
  mountState: boolean;
  issue: boolean;
  todoList: todoItem[];
};

type dateType = {
  year: number;
  month: number;
  date: number;
  day: number;
};

interface DateFac extends dateType {
  title: string;
  hour: number;
  min: number;
}

type FinishDataType = {
  year: number;
  month: number;
  date: number;
  day: number;
  title: string;
  hour: number;
  min: number;
};

type PostPromiseType = {
  title: string;
  calcDay: number;
};
