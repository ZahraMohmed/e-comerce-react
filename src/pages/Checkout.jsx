import React from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI-product/CommonSection";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Button, Container, Divider, Stack, Typography } from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";
import { useSelector } from "react-redux";

export default function Checkout() {
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  return (
    <>
      <Helmet title={"Checkout"}>
        <CommonSection title={"checkout"} />
        <Container>
          <Grid2 container spacing={2} sx={{justifyContent:"space-between",my:"30px"}}>
            <Grid2 xs={12} md={6}>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "100%" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                Default="input"
                  sx={{ "& fieldset": { border: "1px solid grey[400]" } }}
                  autoFocus={false}
                  id="outlined-size-small"
                  defaultValue=""
                  placeholder="Enter Your Name"
                  size="small"
                />

                <TextField
                Default="input"
                  sx={{ "& fieldset": { border: "1px solid grey[400]" } }}
                  autoFocus={false}
                  id="outlined-size-small"
                  defaultValue=""
                  placeholder="Enter Your Email"
                  size="small"
                />

                <TextField
                Default="input"
                  sx={{ "& fieldset": { border: "1px solid grey[400]" } }}
                  autoFocus={false}
                  id="outlined-size-small"
                  defaultValue=""
                  placeholder="Phone Number"
                  size="small"
                />

                <TextField
                Default="input"
                  sx={{ "& fieldset": { border: "1px solid grey[400]" } }}
                  autoFocus={false}
                  id="outlined-size-small"
                  defaultValue=""
                  placeholder="street Address"
                  size="small"
                />

                <TextField
                Default="input"
                  sx={{ "& fieldset": { border: "1px solid grey[400]" } }}
                  autoFocus={false}
                  id="outlined-size-small"
                  defaultValue=""
                  placeholder="City"
                  size="small"
                />

                <TextField
                Default="input"
                  sx={{ "& fieldset": { border: "1px solid grey[400]" } }}
                  autoFocus={false}
                  id="outlined-size-small"
                  defaultValue=""
                  placeholder="Postal Code"
                  size="small"
                />
                <TextField
                Default="input"
                  sx={{ "& fieldset": { border: "1px solid grey[400]" } }}
                  autoFocus={false}
                  id="outlined-size-small"
                  defaultValue=""
                  placeholder="Country"
                  size="small"
                />
              </Box>
            </Grid2>
            <Grid2 xs={12} md={4}>
              <Box
                sx={{
                  background: blueGrey[800],
                  color: grey[100],
                  p: "10px",
                  borderRadius: "4px",
                  mt: 1,
                }}
              >
                <Stack
                  direction={"row"}
                  sx={{ mt: "7px", justifyContent: "space-between" }}
                >
                  <Typography variant="body1">TotalQty:</Typography>
                  <Typography variant="body1">{totalQuantity} Items</Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  sx={{ mt: "7px", justifyContent: "space-between" }}
                >
                  <Typography variant="body1">Subtotal:</Typography>
                  <Typography variant="body1">${totalAmount}</Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  sx={{ mt: "7px", justifyContent: "space-between" }}
                >
                  <Typography variant="body1">shipping:</Typography>
                  <Typography variant="body1">$0</Typography>
                </Stack>
                <Divider
                  component="hr"
                  sx={{ my: "15px", background: grey[200] }}
                />

                <Stack
                  direction={"row"}
                  sx={{ mt: "7px", justifyContent: "space-between" }}
                >
                  <Typography variant="body1">total cost:</Typography>
                  <Typography variant="body1">${totalAmount}</Typography>
                </Stack>
                <Button
                  sx={{
                    backgroundColor: grey[50],
                    color: blueGrey[900],
                    width: "100%",
                    mt: 2,
                    "&:hover": {
                      backgroundColor: grey[100],
                      color: blueGrey[900],
                      transform: "scale(0.9)",
                      transition: "0.4s",
                    },
                  }}
                >
                  place an order
                </Button>
              </Box>
            </Grid2>
          </Grid2>
        </Container>
      </Helmet>
    </>
  );
}
