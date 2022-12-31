import { dark } from "@themes/dark";

declare module "styled-components/native" {
  type ThemeType = typeof dark;

  export interface DefaultTheme extends ThemeType {}
}
