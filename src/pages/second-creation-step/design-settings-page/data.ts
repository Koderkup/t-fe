import AutoTheme from "public/icons/auto-theme.svg";
import DarkTheme from "public/icons/dark-theme.svg";
import LightTheme from "public/icons/light-theme.svg";

export const COLORS = [
  "#ff3939",
  "#7d92ff",
  "#FF8EF4",
  "#67FF92",
  "#FCFF78",
  "#FF8A1F",
  "#54ffff",
];

export const THEME_MODE = [
  {
    icon: LightTheme,
    title: "design-settings-page.form.theme-inputs.input-one.title",
    value: "Light",
    description: "design-settings-page.form.theme-inputs.input-one.description",
  },

  {
    icon: DarkTheme,
    title: "design-settings-page.form.theme-inputs.input-two.title",
    value: "Dark",
    description: "design-settings-page.form.theme-inputs.input-two.description",
  },

  {
    icon: AutoTheme,
    title: "design-settings-page.form.theme-inputs.input-three.title",
    value: "Automatic",
    description:
      "design-settings-page.form.theme-inputs.input-three.description",
  },
] as const;

export const designData = {
  id: 322,
  name: "Test design",
  description:
    "The Italy website design captures the essence of this enchanting country in a visual symphony of colors, textures, and imagery.",
  highlightColor: "#FF8EF4",
  media: {
    url: undefined,
  },
  font_style: "Robobto",
  theme: "light",
  price: 200,
  text_size: 15,
  mediaId: "10402940-3b88-4b43-94df-151ef7b7e54f",
};
