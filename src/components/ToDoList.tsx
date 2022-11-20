import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoryState, isDarkAtom, toDoState } from "../atoms";
import CreateCategory from "./CreateCategory";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const Title = styled.h1`
  font-size: 30px;
  font-weight: 400;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const ThemeButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  width: 90%;
`;

const ThemeButton = styled.button`
  width: 100px;
  height: 30px;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.buttonBorderColor};
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
  :hover {
    border: 1px solid ${(props) => props.theme.buttonBorderHoverColor};
    background-color: ${(props) => props.theme.themeChangeButtonHoverColor};
    color: ${(props) => props.theme.themeChangeTextHoverColor};
  }
`;

const ThemeButtonSpan = styled.span`
  font-size: 14px;
`;

const StyledSelect = styled.select`
  padding: 10px 20px;
  margin-bottom: 10px;
`;

const SelectContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: end;
`;

const ChangeCreateTypeButton = styled.button`
  width: 120px;
  height: 30px;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.buttonBorderColor};
  background-color: ${(props) => props.theme.addButtonColor};
  color: ${(props) => props.theme.textColor};
  margin-left: 10px;
  cursor: pointer;

  :hover {
    background-color: ${(props) => props.theme.addButtonHoverColor};
  }
`;
const TodoContainer = styled.div`
  width: full;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const ListContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 90%;
  height: auto;
  min-height: 600px;
  background-color: ${(props) => props.theme.toDoCointainer};
`;

const Category = styled.span`
  font-size: 34px;
  font-weight: 500;
  margin-bottom: 10px;
  color: ${(props) => props.theme.textColor};
`;

const EmptyToDo = styled.span`
  margin-top: 20px;
  font-size: 22px;
  font-weight: 400;
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoState);
  const categories = useRecoilValue(categoryState);
  const [currentCategory, setCurrentCategory] = useState("TO_DO");
  const [isDarkMode, setIsDarkMode] = useRecoilState(isDarkAtom);
  const [isCreateTodo, setIsCreateTodo] = useState(true);

  const onInput = (e: React.FormEvent<HTMLSelectElement>) => {
    setCurrentCategory(e.currentTarget.value);
    console.log(e.currentTarget.value);
  };
  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return (
    <div>
      <Title>ToDoList with Recoil</Title>
      <ThemeButtonContainer>
        <ThemeButton onClick={toggleTheme}>
          {isDarkMode ? (
            <ThemeButtonSpan>Light Theme</ThemeButtonSpan>
          ) : (
            <ThemeButtonSpan>Dark Theme</ThemeButtonSpan>
          )}
        </ThemeButton>
        <ChangeCreateTypeButton
          onClick={() => setIsCreateTodo((prev) => !prev)}
        >
          {isCreateTodo ? "카테고리 추가하기" : "할일 추가하기"}
        </ChangeCreateTypeButton>
      </ThemeButtonContainer>
      {isCreateTodo ? <CreateToDo /> : <CreateCategory />}

      <SelectContainer>
        <StyledSelect onInput={onInput}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </StyledSelect>
      </SelectContainer>

      <TodoContainer>
        <Category>{currentCategory}</Category>
        <ListContainer>
          {toDos.length < 1 ? (
            <EmptyToDo>리스트가 비어 있습니다.</EmptyToDo>
          ) : null}
          {toDos
            .filter((item) => item.category === currentCategory)
            .map((toDo) => (
              <ToDo key={toDo.id} {...toDo} />
            ))}
        </ListContainer>
      </TodoContainer>
    </div>
  );
}

export default ToDoList;
