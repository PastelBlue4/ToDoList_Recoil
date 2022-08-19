import React from "react";
import styled from "styled-components";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { categoriesState, IToDo, toDoState } from "../atoms";

const Letter = styled.span`
  font-size: 23px;
`;

const Btn = styled.button`
  margin-left: 4px;
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(categoriesState);
  const changeCategory = (selectedCategory: string) => {
    setToDos((oldToDo) => {
      const targetIndex = oldToDo.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: selectedCategory as any };
      return [
        ...oldToDo.slice(0, targetIndex),
        newToDo,
        ...oldToDo.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <li>
      <Letter>{text}</Letter>
      {Object.values(categories).map((availableCategory) => (
        <Btn
          disabled={availableCategory === category}
          key={availableCategory}
          onClick={() => changeCategory(availableCategory)}
        >
          {availableCategory}
        </Btn>
      ))}
    </li>
  );
}

export default ToDo;
