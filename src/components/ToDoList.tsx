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
  border: 1px solid ${(props) => props.theme.accentColor};
  background-color: ${(props) => props.theme.bgColor};
`;

const ThemeButtonSpan = styled.span`
  font-size: 17px;
  color: ${(props) => props.theme.textColor};
`;

const StyledSelect = styled.select`
  padding: 10px 20px;
`;

const SelectContainer = styled.div`
  border: 1px ${(props) => props.theme.textColor} solid;
  display: flex;
  justify-content: center;
`;

const ListContainer = styled.div`
  border: 1px red solid;
  display: flex;
  align-items: center;
  flex-direction: column;
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
      <hr />
      <CreateToDo />
      <ul>
        <SelectContainer>
          <StyledSelect onInput={onInput}>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </StyledSelect>
        </SelectContainer>
        <ListContainer>
          {toDos
            .filter((item) => item.category === currentCategory)
            .map((toDo) => (
              <ToDo key={toDo.id} {...toDo} />
            ))}
        </ListContainer>
      </ul>

      <CreateCategory />
    </div>
  );
}

export default ToDoList;
