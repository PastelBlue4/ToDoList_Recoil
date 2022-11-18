import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, IToDo, toDoState } from "../atoms";

const ToDoContainer = styled.li`
  display: flex;
  border: blue solid 1px;
  flex-direction: column;
`;

const ToDoText = styled.span`
  font-size: 16px;
  font-weight: 400;
  text-align: center;
`;

const CategoryContainer = styled.div`
  display: flex;
  margin-top: 5px;
  gap: 3px;
`;

const CategoryButton = styled.button`
  background-color: white;
  padding: 5px 10px;
  border-radius: 12px;
  border: 1px black solid;
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);

  const categoryValue = useRecoilValue(categoryState);

  const CanMoveCategories = categoryValue.filter(
    (oldCategory) => oldCategory !== category
  );

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;

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
    <>
      <ToDoContainer>
        <ToDoText>{text}</ToDoText>
        <CategoryContainer>
          {CanMoveCategories.map((category) => (
            <CategoryButton key={category} name={category} onClick={onClick}>
              {category}
            </CategoryButton>
          ))}
        </CategoryContainer>
      </ToDoContainer>
    </>
  );
}

export default ToDo;
