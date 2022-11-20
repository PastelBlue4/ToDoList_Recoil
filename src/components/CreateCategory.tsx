import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState } from "../atoms";

interface ICategoryForm {
  category: string;
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
  width: 400px;
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
  cursor: pointer;

  :hover {
    background-color: ${(props) => props.theme.buttonHoverColor};
    border: 1px solid ${(props) => props.theme.buttonBorderHoverColor};
  }
`;

function CreateCategory() {
  const setCategory = useSetRecoilState(categoryState);
  const { register, handleSubmit, setValue } = useForm<ICategoryForm>();

  const handleCategorySubmit = ({ category }: ICategoryForm) => {
    setCategory((oldCategries) => [...oldCategries, category]);

    setValue("category", "");
  };
  return (
    <>
      <FormContainer>
        <StyledForm onSubmit={handleSubmit(handleCategorySubmit)}>
          <StyledInput
            {...register("category", { required: "카테고리를 입력 해주세요." })}
            placeholder="카테고리를 입력 해주세요."
          />
          <StyledButton>추가하기</StyledButton>
        </StyledForm>
      </FormContainer>
    </>
  );
}

export default CreateCategory;
