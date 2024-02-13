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

type finishDataType = {
  successDate: [
    {
      year: number;
      month: number;
      date: number;
      day: number;
      title: string;
      hour: number;
      min: number;
    }
  ];
};

type finishStateprops = {
  finishData: [
    {
      year: number;
      month: number;
      date: number;
      day: number;
      title: string;
      hour: number;
      min: number;
    }
  ];
  emitFunc: (parmas: boolean) => void;
};
