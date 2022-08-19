import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState } from "../atoms";

interface IterFaceForm {
  toDo: string;
}

const Form = styled.form``;

function CreateToDo() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IterFaceForm>();
  const handleValid = ({ toDo }: IterFaceForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };

  return (
    <Form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", {
          required: "할 일을 작성하세요.",
        })}
        placeholder="할 일을 작성하세요."
      />
      <button>추가하기</button>
    </Form>
  );
}
export default CreateToDo;
