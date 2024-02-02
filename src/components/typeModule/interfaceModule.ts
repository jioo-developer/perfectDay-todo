interface RootState {
  Profile: number;
  mountState: boolean;
}

interface functionProps {
  navigate: any;
  dispatch: any;
  location: string;
}

type HomeProps = {
  currentUser: string | null;
  creation: string | null;
  dispatch: any;
};

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
