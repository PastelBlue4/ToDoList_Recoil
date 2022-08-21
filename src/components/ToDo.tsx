import React from "react";
import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;

    // 실행시킨 버튼으로 버튼의 category(name) 을 얻는다.

    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <li>
      <span>{text}</span>
      {category !== "DOING" ? (
        <button name="DOING" onClick={onClick}>
          Doing
        </button>
      ) : null}
      {category !== "TO_DO" ? (
        <button name="TO_DO" onClick={onClick}>
          To Do
        </button>
      ) : null}
      {category !== "DONE" ? (
        <button name="DONE" onClick={onClick}>
          Done
        </button>
      ) : null}
    </li>
  );
}

export default ToDo;
