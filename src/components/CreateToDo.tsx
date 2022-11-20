import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

import { toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

const StyledForm = styled.form`
  font-size: 22px;
`;
const FormContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100px;
`;

const StyledInput = styled.input`
  width: 300px;
  height: 40px;
  color: black;
  ::placeholder {
    color: #5a4b4b;
    font-size: 16px;
  }
`;

const StyledButton = styled.button`
  height: 40px;
  width: 100px;
  margin-left: 10px;
  font-size: 16px;
  background-color: ${(props) => props.theme.buttonColor};
  border: 1px solid ${(props) => props.theme.buttonBorderColor};
  color: ${(props) => props.theme.textColor};

  :hover {
    background-color: ${(props) => props.theme.buttonHoverColor};
    border: 1px solid ${(props) => props.theme.buttonBorderHoverColor};
  }
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
      <FormContainer>
        <StyledForm onSubmit={handleSubmit(handleValid)}>
          <StyledInput
            {...register("toDo", {
              required: "Please write a To Do",
            })}
            placeholder="Write a to do"
          />
          <StyledButton>추가하기</StyledButton>
        </StyledForm>
      </FormContainer>{" "}
    </>
  );
}

export default CreateToDo;
