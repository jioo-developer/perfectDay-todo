import { ReactNode } from "react";

export type todoItem = {
  write: string;
  writeH: number | string;
  writeM: number | string;
  clear: boolean;
};

export type RootState = {
  mountState: boolean;
  issue: boolean;
  todoList: todoItem[];
};

export type dateType = {
  year: number;
  month: number;
  date: number;
  day: number;
};

export interface DateFac extends dateType {
  title: string;
  hour: number;
  min: number;
}

export type FinishDataType = {
  year: number;
  month: number;
  date: number;
  day: number;
  title: string;
  hour: number;
  min: number;
};

export type PostPromiseType = {
  title: string;
  calcDay: number;
};

export type successType = {
  successDate: FinishDataType[];
};
