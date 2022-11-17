import { useRecoilState, useRecoilValue } from "recoil";
import { isDarkAtom, toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoState);
  const [isDarkMode, setIsDarkMode] = useRecoilState(isDarkAtom);
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
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
