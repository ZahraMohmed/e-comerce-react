import { Box, Container, Typography, Stack, useTheme } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { blue, green, red } from "@mui/material/colors";
import React from "react";
import UseGetData from "../custom-hooks/UseGetData";
function Dashboard() {
  const { data: productsData } = UseGetData("products");
  const { data: users } = UseGetData("users");
  const theme = useTheme();
  return (
    <>
      <Box>
        <Container>
          <Grid2
            container
            spacing={3}
            sx={{
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              my: "29px",
              height: "40vh  ",
            }}
          >
            <Grid2 md={3} lg={3} xs={6} spacing={3}>
              <Stack
                direction="column"
                spacing={1}
                sx={{
                  alignItems: "start",
                  p: "10px",
                  borderRadius: "6px",
                  backgroundColor: red[100],
                  color: theme.palette.getContrastText(red[100]),
                }}
              >
                <Typography variant="h5"> Totals Sales</Typography>
                <Typography variant="h6">$678</Typography>
              </Stack>
            </Grid2>
            <Grid2 md={3} lg={3} xs={6} sx={{}} spacing={3}>
              <Stack
                direction="column"
                spacing={1}
                sx={{
                  alignItems: "start",
                  p: "10px",
                  borderRadius: "6px",
                  backgroundColor: green[100],
                  color: theme.palette.getContrastText(green[100]),
                }}
              >
                <Typography variant="h5"> Orders</Typography>
                <Typography variant="h6">480</Typography>
              </Stack>
            </Grid2>
            <Grid2 md={3} lg={3} xs={6} sx={{}} spacing={3}>
              <Stack
                direction="column"
                spacing={1}
                sx={{
                  alignItems: "start",
                  p: "10px",
                  borderRadius: "6px",
                  backgroundColor: blue[100],
                  color: theme.palette.getContrastText(blue[100]),
                }}
              >
                <Typography variant="h5">Total Products</Typography>
                <Typography variant="h6">{productsData.length}</Typography>
              </Stack>
            </Grid2>
            <Grid2 md={3} lg={3} xs={6} sx={{}} spacing={3}>
              <Stack
                direction="column"
                spacing={1}
                sx={{
                  alignItems: "start",
                  p: "10px",
                  borderRadius: "6px",
                  backgroundColor:'#d4f7eb',
                  color: theme.palette.getContrastText('#d4f7eb'),
                }}
              >
                <Typography variant="h5"> Totals Users </Typography>
                <Typography variant="h6">{users.length}</Typography>
              </Stack>
            </Grid2>
          </Grid2>
        </Container>
      </Box>
    </>
  );
}

export default Dashboard;
