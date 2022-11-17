import { atom } from "recoil";

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

export const isDarkAtom = atom({
  key: "isDark",
  default: true,
});

export const toDoState = atom<IToDo[]>({
  key: "toDoState",
  default: [],
});

export const categoryState = atom({
  key: "categories",
  default: ["TO_DO", "DOING", "DONE"],
});
