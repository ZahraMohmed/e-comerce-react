import React from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI-product/CommonSection";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Container,
  CardMedia,
  Box,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import { cartAction } from "../components/Redux/Slice/CardSlice";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { grey, blueGrey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
const ColorButton = styled(Button)(({ theme }) => ({
  color: grey[50],
  backgroundColor: blueGrey[500],
  "&:hover": {
    backgroundColor: blueGrey[800],
  },
}));
function Cart() {
  const cartItem = useSelector((state) => state.cart.cartItem);
  const totalAMount = useSelector((state) => state.cart.totalAmount);
  const navigate = useNavigate()
  return (
    <Helmet title={"Cart"}>
      <CommonSection title={"shopping Cart"} />
      <Container>
        {cartItem.length === 0 ? (
          <h2 style={{ textAlign: "center", margin: "40px" }}>
            no item add to cart
          </h2>
        ) : (
          <Grid2 container spacing={1} >
            <Grid2 md={8} lg={8} xs={12} sx={{mr:"30px"}}>
              <TableContainer>
                <Table
                  sx={{ minWidth: 400 }}
                  aria-label="simple table"
                  component="table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>image</TableCell>
                      <TableCell align="center">title</TableCell>
                      <TableCell align="center">price</TableCell>
                      <TableCell align="center">QTY</TableCell>
                      <TableCell align="center">Delete</TableCell>
                    </TableRow>
                  </TableHead>
                  {cartItem.map((item) => (
                    <Tr item={item} />
                  ))}
                </Table>
              </TableContainer>
            </Grid2>
            <Grid2 md={3} lg={3} xs={12}>
              <Box>
                <Stack
                  spacing={2}
                  direction={"row"}
                  sx={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    mt: "40px",
                  }}
                >
                  <Typography variant="h7">subtotal</Typography>
                  <Typography variant="h6">${totalAMount}</Typography>
                </Stack>
                <Typography
                  variant="body1"
                  sx={{ fontSize: "12px", mt: "8px", color: grey[400] }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. enda
                  pariatur elit!
                </Typography>
                <br />
                <ColorButton onClick={()=>{
                  navigate("/shop")
                }} sx={{ width: "100%", mt: "10px" }}>
                  continue shopping
                </ColorButton>
                <br />

                <ColorButton onClick={()=>{
                  navigate("/checkout")
                }} sx={{ width: "100%", my: "15px" }}>
                  checkout
                </ColorButton>
              </Box>
            </Grid2>
          </Grid2>
        )}
      </Container>
    </Helmet>
  );
}
const Tr = ({ item }) => {
  const disbach = useDispatch();
  const deleteProduct = () => {
    disbach(cartAction.deleteItem(item.id));
  };

  return (
    <>
      <TableBody key={item.id} component="thead">
        <TableRow
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        ></TableRow>

        <TableCell component="th" scope="row" key={item.id}>
          <CardMedia
            title="kk"
            image={item.imgUrl}
            component="img"
            sx={{
              width: "80px",
              height: "80px",
              objectFit: "cover",
            }}
          />
        </TableCell>
        <TableCell align="center">{item.productName}</TableCell>
        <TableCell align="center">${item.price}</TableCell>
        <TableCell align="center">{item.quantity}</TableCell>
        <TableCell align="center">
          <DeleteIcon
            color="error"
            onClick={deleteProduct}
            sx={{ cursor: "pointer", "&:hover": { fontSize: "26px" } }}
          />
        </TableCell>
      </TableBody>
    </>
  );
};
export default Cart;
