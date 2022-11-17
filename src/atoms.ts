import { atom } from "recoil";

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

export const isDarkAtom = atom({
  key: "isDark",
  default: false,
});

export const toDoState = atom<IToDo[]>({
  key: "toDoState",
  default: [],
});

export const categoryState = atom({
  key: "categorys",
  default: ["TO_DO", "DOING", "DONE", "nothing", "그냥 하기싫은데"],
});
