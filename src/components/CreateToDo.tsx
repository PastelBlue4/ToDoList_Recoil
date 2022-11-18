import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

import { toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

const TodoTitle = styled.h1`
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 10px;
`;

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      ...oldToDos,
      { text: toDo, id: Date.now(), category: "TO_DO" },
    ]);
    setValue("toDo", "");
  };
  return (
    <>
      <TodoTitle>할 일 입력</TodoTitle>
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register("toDo", {
            required: "Please write a To Do",
          })}
          placeholder="Write a to do"
        />
        <button>할 일 추가.</button>
      </form>
    </>
  );
}

export default CreateToDo;
