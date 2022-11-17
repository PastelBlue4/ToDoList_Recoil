import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState } from "../atoms";

interface ICategoryForm {
  category: string;
}

const StyledTitle = styled.h1`
  font-size: 24px;
  color: ${(props) => props.theme.textColor};
  margin-top: 50px;
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
      <StyledTitle>카테고리 추가하기.</StyledTitle>
      <form onSubmit={handleSubmit(handleCategorySubmit)}>
        <input
          {...register("category", { required: "카테고리를 입력 해주세요." })}
          placeholder="카테고리를 입력 해주세요."
        />
        <button>카테고리 추가</button>
      </form>
    </>
  );
}

export default CreateCategory;
