import { useSelector } from "react-redux";
import { RootState, successType } from "./interfaceModule";

const currentUser: string | null = localStorage.getItem("currentUser") || null;
const location: string = window.location.pathname;

const initialMount = useSelector((state: RootState) => state.mountState);
const finishData = useSelector((state: successType) => state.successDate);
const issueState = useSelector((state: RootState) => state.issue);
const todoList = useSelector((state: RootState) => state.todoList);

const myExportedObject = {
  currentUser,
  location,
  initialMount,
  finishData,
  issueState,
  todoList,
};

export default myExportedObject;
