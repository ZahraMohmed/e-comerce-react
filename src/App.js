import React from "react";
import Layoutt from "./components/Layout/Layoutt";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useMemo, useState } from "react";
import { getDesignTokens } from "./Theme/Theme";
import { createTheme } from "@mui/material";
import { ToastContainer } from "react-toastify";
export default function App() {
  const [mode] = useState("light");

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover ={false}
          theme = {mode}
        />
        <Layoutt />
      </ThemeProvider>
      
    </>
  );
}
