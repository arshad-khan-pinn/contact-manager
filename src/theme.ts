import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    bg: {
      item: string;
      panel: string;
      textField: string;
      searchIconButton: string;
      itemIconButton: string;
      themeToggleButton: string;
      themeToggleButtonHover: string;
    };
    border: {
      itemIconButton: string;
      panel: string;
    };
    font: {
      info: string;
      temp: string;
      itemInfo: string;
    };
  }
  interface PaletteOptions {
    bg?: {
      item: string;
      panel: string;
      textField: string;
      searchIconButton: string;
      itemIconButton: string;
      themeToggleButton: string;
      themeToggleButtonHover: string;
    };
    border?: {
      itemIconButton: string;
      panel: string;
    };
    font?: {
      info: string;
      temp: string;
      itemInfo: string;
    };
  }
}

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    bg: {
      item: "#F0F0F0",
      panel: "#FFFFFF",
      textField: "#FFFFFF",
      searchIconButton: "#d8d8d8",
      itemIconButton: "#FFFFFF",
      themeToggleButton: "#000000",
      themeToggleButtonHover: "#4c4c4c",
    },
    border: {
      itemIconButton: "#FFFFFF",
      panel: "#D3D3D3",
    },
    font: {
      info: "#666666",
      temp: "#808080",
      itemInfo: "#000000",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    bg: {
      item: "#262626",
      panel: "#333333",
      textField: "#333333",
      searchIconButton: "#555555",
      itemIconButton: "transparent",
      themeToggleButton: "#ffffff",
      themeToggleButtonHover: "#bfbfbf",
    },
    border: {
      itemIconButton: "#D3D3D3",
      panel: "#333333",
    },
    font: {
      info: "#FFFFFF",
      temp: "#FFFFFF",
      itemInfo: "#F0F0F0",
    },
  },
});
