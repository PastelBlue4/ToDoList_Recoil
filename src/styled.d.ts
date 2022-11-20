import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    toDoCointainer: string;

    buttonColor: string;
    buttonHoverColor: string;

    buttonBorderColor: string;
    buttonBorderHoverColor: string;

    categoryButtonColor: string;
    categoryButtonHoverColor: string;

    themeChangeTextHoverColor: string;
    themeChangeButtonHoverColor: string;

    addButtonColor: string;
    addButtonHoverColor: string;
  }
}
