import { Box, Typography } from "@mui/material";
import React from "react";

export default function NotFound() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          height: "90vh",
        }}
      >
        <Typography variant="h6">This Padge Note Found </Typography>
      </Box>
    </>
  );
}
