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
  key: "categories",
  default: ["TO_DO", "DOING", "DONE"],
});

export const currentCategoryAtom = atom({
  key: "currentCategory",
  default: "TO_DO",
});
