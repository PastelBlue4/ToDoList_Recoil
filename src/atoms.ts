import { atom } from "recoil";

export interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const doIngState = atom<IToDo[]>({
  key: "doIng",
  default: [],
});

export const doneState = atom<IToDo[]>({
  key: "done",
  default: [],
});
