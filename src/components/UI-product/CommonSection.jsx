import { Box, Container, Typography } from "@mui/material";
import React from "react";
import "./common.css";
export default function CommonSection({title}) {
  return (
    <Box className="commom-sce" sx={{display:"flex", justifyContent:"center",alignItems:"center" ,padding:"100px 0px"}}>
      <Container >
      <Box sx={{textAlign:"center" }}>
          <Typography variant="h3" sx={{color:"white"}}>{title}</Typography>
        </Box>
      </Container>
    </Box>
  );
}
