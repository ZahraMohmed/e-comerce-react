import { Box, Container, Stack, Typography,useTheme } from "@mui/material";
import React from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { grey } from "@mui/material/colors";
export default function Services() {
  const theme = useTheme()
  const services = [
    {
      icon: <LocalShippingIcon />,
      title: "free shipping",
      description: "Lorem ipsum, dolor sit amet",
      bg: '#d4f7eb',
    },
    {
      icon: <PublishedWithChangesIcon />,
      title: "easy return",
      description: "Lorem ipsum, dolor sit amet",
      bg: "#e9c3e9",
    },
    {
      icon: <CreditScoreIcon />,
      title: "secure payment ",
      description: "Lorem ipsum, dolor sit amet",
      bg: "#c3dae9",
    },
    {
      icon: <CurrencyExchangeIcon />,
      title: "back guarant",
      description: "Lorem ipsum, dolor sit amet",
      bg: "#d4f7eb",
    },
  ];
  return (
    <Box sx={{mt:"100px"}}>
      <Container>
        <Grid container spacing={3}  sx={{ alignItems:'center', justifyContent:'center' , cursor:"pointer"}}>
        
          {services.map((item,i)=>{
            return(
              <Grid md={3} lg={3} sx={{}}  key={i} spacing={3}>
              <Stack direction="row" spacing={3} sx={{ alignItems: "center",bgcolor:item.bg , p:'10px' , borderRadius:"6px" }}
              >
              <Box
                sx={{
                  p: "8px",
                  borderRadius: "50%",
                  bgcolor: grey[200],
                  display: "flex",
                  color:theme.palette.getContrastText( grey[200])
                }}
              >
                {item.icon}
              </Box>

              <Stack>
                <Typography variant="h6" sx={{color:theme.palette.getContrastText(item.bg)}}>{item.title}</Typography>
                <p style={{color:grey[700]}}>{item.description}</p>
              </Stack>
            </Stack>
            </Grid>
            )
          })}
          </Grid>
      
      </Container>
    </Box>
  );
}
