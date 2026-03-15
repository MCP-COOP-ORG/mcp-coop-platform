import { heroui } from "@heroui/react";

const customTheme = {
  themes: {
    light: {
      colors: {
        default: {
          "50": "#fafafa",
          "100": "#f2f2f3",
          "200": "#ebebec",
          "300": "#e3e3e6",
          "400": "#dcdcdf",
          "500": "#d4d4d8",
          "600": "#afafb2",
          "700": "#8a8a8c",
          "800": "#656567",
          "900": "#404041",
          foreground: "#000",
          DEFAULT: "#d4d4d8"
        },
        primary: {
          "50": "#eef5fa",
          "100": "#d5e7f2",
          "200": "#bdd9ea",
          "300": "#a4cbe2",
          "400": "#8cbddb",
          "500": "#73afd3",
          "600": "#5f90ae",
          "700": "#4b7289",
          "800": "#375364",
          "900": "#23353f",
          foreground: "#000",
          DEFAULT: "#73afd3"
        },
        secondary: {
          "50": "#f1ebf8",
          "100": "#decfed",
          "200": "#cbb3e3",
          "300": "#b897d9",
          "400": "#a47bce",
          "500": "#915fc4",
          "600": "#784ea2",
          "700": "#5e3e7f",
          "800": "#452d5d",
          "900": "#2c1d3b",
          foreground: "#000",
          DEFAULT: "#915fc4"
        },
        success: {
          "50": "#eef6f2",
          "100": "#d6eadf",
          "200": "#bedecc",
          "300": "#a7d2b9",
          "400": "#8fc5a7",
          "500": "#77b994",
          "600": "#62997a",
          "700": "#4d7860",
          "800": "#395846",
          "900": "#24382c",
          foreground: "#000",
          DEFAULT: "#77b994"
        },
        warning: {
          "50": "#f9f4ec",
          "100": "#f0e5d2",
          "200": "#e7d5b8",
          "300": "#dfc69e",
          "400": "#d6b684",
          "500": "#cda76a",
          "600": "#a98a57",
          "700": "#856d45",
          "800": "#614f32",
          "900": "#3e3220",
          foreground: "#000",
          DEFAULT: "#cda76a"
        },
        danger: {
          "50": "#f7e8e6",
          "100": "#ebc8c3",
          "200": "#dfa8a0",
          "300": "#d3887e",
          "400": "#c8685b",
          "500": "#bc4838",
          "600": "#9b3b2e",
          "700": "#7a2f24",
          "800": "#59221b",
          "900": "#381611",
          foreground: "#fff",
          DEFAULT: "#bc4838"
        },
        background: "#ffffff",
        foreground: "#000000",
        content1: {
          DEFAULT: "#ffffff",
          foreground: "#000"
        },
        content2: {
          DEFAULT: "#f4f4f5",
          foreground: "#000"
        },
        content3: {
          DEFAULT: "#e4e4e7",
          foreground: "#000"
        },
        content4: {
          DEFAULT: "#d4d4d8",
          foreground: "#000"
        },
        focus: "#1e99c7",
        overlay: "#c6f0fa"
      }
    },
    dark: {
      colors: {
        default: {
          "50": "#0d0d0e",
          "100": "#19191c",
          "200": "#26262a",
          "300": "#323238",
          "400": "#3f3f46",
          "500": "#65656b",
          "600": "#8c8c90",
          "700": "#b2b2b5",
          "800": "#d9d9da",
          "900": "#ffffff",
          foreground: "#fff",
          DEFAULT: "#3f3f46"
        },
        primary: {
          "50": "#23353f",
          "100": "#375364",
          "200": "#4b7289",
          "300": "#5f90ae",
          "400": "#73afd3",
          "500": "#8cbddb",
          "600": "#a4cbe2",
          "700": "#bdd9ea",
          "800": "#d5e7f2",
          "900": "#eef5fa",
          foreground: "#000",
          DEFAULT: "#73afd3"
        },
        secondary: {
          "50": "#2c1d3b",
          "100": "#452d5d",
          "200": "#5e3e7f",
          "300": "#784ea2",
          "400": "#915fc4",
          "500": "#a47bce",
          "600": "#b897d9",
          "700": "#cbb3e3",
          "800": "#decfed",
          "900": "#f1ebf8",
          foreground: "#000",
          DEFAULT: "#915fc4"
        },
        success: {
          "50": "#24382c",
          "100": "#395846",
          "200": "#4d7860",
          "300": "#62997a",
          "400": "#77b994",
          "500": "#8fc5a7",
          "600": "#a7d2b9",
          "700": "#bedecc",
          "800": "#d6eadf",
          "900": "#eef6f2",
          foreground: "#000",
          DEFAULT: "#77b994"
        },
        warning: {
          "50": "#3e3220",
          "100": "#614f32",
          "200": "#856d45",
          "300": "#a98a57",
          "400": "#cda76a",
          "500": "#d6b684",
          "600": "#dfc69e",
          "700": "#e7d5b8",
          "800": "#f0e5d2",
          "900": "#f9f4ec",
          foreground: "#000",
          DEFAULT: "#cda76a"
        },
        danger: {
          "50": "#381611",
          "100": "#59221b",
          "200": "#7a2f24",
          "300": "#9b3b2e",
          "400": "#bc4838",
          "500": "#c8685b",
          "600": "#d3887e",
          "700": "#dfa8a0",
          "800": "#ebc8c3",
          "900": "#f7e8e6",
          foreground: "#fff",
          DEFAULT: "#bc4838"
        },
        background: "#000000",
        foreground: "#ffffff",
        content1: {
          DEFAULT: "#18181b",
          foreground: "#fff"
        },
        content2: {
          DEFAULT: "#27272a",
          foreground: "#fff"
        },
        content3: {
          DEFAULT: "#3f3f46",
          foreground: "#fff"
        },
        content4: {
          DEFAULT: "#52525b",
          foreground: "#fff"
        },
        focus: "#1e99c7",
        overlay: "#000000"
      }
    }
  },
  layout: {
    disabledOpacity: "0.4"
  }
};

export default heroui(customTheme);