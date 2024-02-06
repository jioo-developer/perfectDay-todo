type dateType = {
  year: number;
  month: number;
  date: number;
  day: number;
};

type HomeRootState = {
  mountState: boolean;
  issue: boolean;
  TodoList: todoItem[];
};

type todoItem = {
  write: string;
  writeH: number | string;
  writeM: number | string;
  clear: boolean;
};

type props = {
  location: string;
};
