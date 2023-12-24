import React from "react";
import ProductCard from "./ProductCard";
import { Container } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

export default function ProductList({data}) {
  return (
    <>
      <Container sx={{mb:"40px"}}>
        <Grid2  preventing="true" 
          container
          spacing={4}
          sx={{ justifyContent: "center", alignItems: "center" , }}
        
        >
          {data.map((item)=>{
            return(
              <ProductCard key={item.id} item={item} />
            )
          })}
        
        </Grid2>
      </Container>
    </>
  );
}
