import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoryState, isDarkAtom, toDoState } from "../atoms";
import CreateCategory from "./CreateCategory";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const Title = styled.h1`
  font-size: 42px;
  font-weight: 400;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const ThemeButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  width: 90%;
`;

const ThemeButton = styled.button`
  padding: 15px 10px;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.buttonBorderColor};
  background-color: ${(props) => props.theme.bgColor};

  :hover {
    border: 1px solid ${(props) => props.theme.buttonBorderHoverColor};
    background-color: ${(props) => props.theme.buttonBorderHoverColor};
  }
`;

const ThemeButtonSpan = styled.span`
  font-size: 17px;
  color: ${(props) => props.theme.textColor};
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
  height: 600px;
  background-color: ${(props) => props.theme.toDoCointainer};
`;

const Category = styled.span`
  font-size: 30px;
  font-weight: 500;
  margin-bottom: 10px;
  color: ${(props) => props.theme.textColor};
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoState);
  const categories = useRecoilValue(categoryState);
  const [currentCategory, setCurrentCategory] = useState("TO_DO");
  const [isDarkMode, setIsDarkMode] = useRecoilState(isDarkAtom);
  const onInput = (e: React.FormEvent<HTMLSelectElement>) => {
    setCurrentCategory(e.currentTarget.value);
    console.log(e.currentTarget.value);
  };
  const toggleTheme = () => setIsDarkMode((prev) => !prev);
  return (
    <div>
      <Title>To Dos</Title>
      <ThemeButtonContainer>
        <ThemeButton onClick={toggleTheme}>
          {isDarkMode ? (
            <ThemeButtonSpan>밝은 테마로 전환</ThemeButtonSpan>
          ) : (
            <ThemeButtonSpan>어두운 테마로 전환</ThemeButtonSpan>
          )}
        </ThemeButton>
      </ThemeButtonContainer>

      <CreateToDo />

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
          {toDos
            .filter((item) => item.category === currentCategory)
            .map((toDo) => (
              <ToDo key={toDo.id} {...toDo} />
            ))}
        </ListContainer>
      </TodoContainer>

      <CreateCategory />
    </div>
  );
}

export default ToDoList;
