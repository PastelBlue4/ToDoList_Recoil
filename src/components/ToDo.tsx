import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, IToDo, toDoState } from "../atoms";

const ToDoContainer = styled.li`
  display: flex;
  border-bottom: white solid 1px;
  align-items: center;
  width: 80%;
  justify-content: space-between;
  padding: 7px;

  :first-child {
    margin-top: 30px;
  }

  :last-child {
    margin-bottom: 30px;
  }
`;

const ToDoText = styled.span`
  font-size: 18px;
  font-weight: 400;
  text-align: center;
  margin-left: 7px;
`;

const CategoryContainer = styled.div`
  display: flex;
  gap: 7px;
`;

const CategoryButton = styled.button`
  background-color: ${(props) => props.theme.categoryButtonColor};
  padding: 6px 13px;
  border-radius: 3px;
  border: none;
  color: ${(props) => props.theme.textColor};

  :last-child {
    margin-right: 7px;
  }

  :hover {
    background-color: ${(props) => props.theme.categoryButtonHoverColor};
  }
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
