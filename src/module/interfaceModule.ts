interface RootState {
  Profile: number;
  mountState: boolean;
}

type dateType = {
  year: number;
  month: number;
  date: number;
  day: number;
};

interface HomeRootState extends RootState {
  issue: boolean;
  TodoList: todoItem[];
}

type todoItem = {
  write: string;
  writeH: number;
  writeM: number;
  clear: boolean;
};

//테스트
