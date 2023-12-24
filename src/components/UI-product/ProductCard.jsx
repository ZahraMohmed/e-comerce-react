import { Box, Typography, CardMedia, Stack } from "@mui/material";
import React from "react";
import Icon from "@mui/material/Icon";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Link } from "react-router-dom";
import { grey } from "@mui/material/colors";
import { useTheme } from "@emotion/react";
import { useDispatch } from "react-redux";
import { cartAction } from "../Redux/Slice/CardSlice";
export default function ProductCard({ item }) {
  const theme = useTheme();
  const disbatch = useDispatch();
  const addToCart = () => {
    disbatch(
      cartAction.addItem({
        id: item.id,
        productName: item.productName,
        price: item.price,
        imgUrl:item.imgUrl,
      })
    );
  };
  return (
    <>
      <Grid2
        md={4}
        lg={3}
        xs={8}
        mt={"35px"}
        preventing="true"
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        <Box sx={{ justifyContent: "center", alignItems: "center" }} >
          <Link to={`/shop/${item.id}`} >
            <CardMedia
              title=""
              image={item.imgUrl}
              component="img"
              sx={{
                cursor: "pointer",
                transition: "0.4 all ease",
                "&:hover": {
                  transform: "scale(0.9)",
                  transition: "0.4 all ease",
                },
                width: { xs: "80%", md: "250px" },
              }}
            />
          </Link>

          <Typography variant="h6">
            <Link
              to={`/shop/${item.id}`}
              style={{ color: theme.palette.newColor.navv }}
            >
              {item.productName}
            </Link>
          </Typography>
          <p style={{ color: grey[700], m: 0 }}>{item.category}</p>
          <Stack
            direction={"row"}
            sx={{ justifyContent: "space-between", mt: "20px", p: "5px" }}
          >
            <p>${item.price}</p>
            <Icon
              sx={{
                fontSize: 22,
                cursor: "pointer",
                "&:hover": { fontSize: 23.5 },
              }}
              onClick={addToCart}
            >
              add_circle
            </Icon>
          </Stack>
        </Box>
      </Grid2>
    </>
  );
}
