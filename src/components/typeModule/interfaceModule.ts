interface RootState {
  Profile: string | number;
  mountState: boolean;
}

interface functionProps {
  navigate: any;
  dispatch: any;
  location: string;
}

interface HomeProps {
  creation: string | null;
  currentUser: string | null;
  dispatch: any;
}
