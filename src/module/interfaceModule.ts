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

type PostPromiseType = {
  title: string;
  calcDay: number;
};
