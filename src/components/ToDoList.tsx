import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, isDarkAtom, toDoState } from "../atoms";
import CreateCategory from "./CreateCategory";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

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
      <h1>To Dos</h1>
      <button onClick={toggleTheme}>
        {isDarkMode ? (
          <span>밝은 테마로 전환</span>
        ) : (
          <span>어두운 테마로 전환</span>
        )}
      </button>
      <hr />
      <CreateToDo />
      <ul>
        <select onInput={onInput}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {toDos
          .filter((item) => item.category === currentCategory)
          .map((toDo) => (
            <ToDo key={toDo.id} {...toDo} />
          ))}
      </ul>

      <CreateCategory />
    </div>
  );
}

export default ToDoList;
