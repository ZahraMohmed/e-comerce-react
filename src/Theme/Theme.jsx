import { grey } from "@mui/material/colors";
export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          newColor: {
            main: grey[600],
            hoverr: grey[800],
            navv: grey[900],
            main2: grey[300]
          },
        }
      : {
          // palette values for dark mode
          newColor: {
            main: grey[500],
            hoverr: grey[100],
            navv: grey[50],
            main2: grey[300]
          },
        }),
  },
});
