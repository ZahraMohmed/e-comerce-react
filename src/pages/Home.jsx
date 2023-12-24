import React, { useEffect, useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Box, Container, Typography, Button, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { grey, teal, blueGrey } from "@mui/material/colors";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CardMedia from "@mui/material/CardMedia";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Services from "../components/services/Services";
import ProductList from "../components/UI-product/ProductList";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Clock from "../components/UI-product/Clock";
import UseGetData from "../custom-hooks/UseGetData";
export default function Home() {
  const year = new Date().getFullYear();
  const ColorButton = styled(Button)(({ theme }) => ({
    color: grey[50],
    backgroundColor: blueGrey[500],
    "&:hover": {
      backgroundColor: blueGrey[800],
    },
  }));

  const navigate = useNavigate();
  const [TrendingProduct, setTrendingProduct] = useState([]);
  const [BestProduct, setBestProduct] = useState([]);
  const [plantProduct, setPlantProduct] = useState([]);
  const [chair2product, setChair2Product] = useState([]);
  const {data: Products}= UseGetData('products')
  useEffect(() => {
    const filterTrendingProduct = Products.filter(
      (item) => item.category === "chair"
    );
    const filterBestProduct = Products.filter(
      (item) => item.category === "sofa"
    );

    const filterplantProduct = Products.filter(
      (item) => item.category === "plant"
    );
    const filterChair2Product = Products.filter(
      (item) => item.category === "chair2"
    );
    setTrendingProduct(filterTrendingProduct);
    setBestProduct(filterBestProduct);
    setPlantProduct(filterplantProduct);
    setChair2Product(filterChair2Product);
  }, [ Products ]);
  const theme = useTheme();
  return (
    <>
      <Helmet title={"Home"}>
        {/* main home */}
        <Box sx={{ bgcolor: teal[50], pt: "15px" }}>
          <Container>
            <Grid
              preventing="true"
              container
              spacing={4}
              sx={{ alignItems: "center", mt: "10px" }}
            >
              <Grid lg={6} md={6} xs={12}>
                <p style={{ color: theme.palette.getContrastText(teal[50]) }}>
                  treanding product in {year}
                </p>
                <Typography
                  variant="h3"
                  sx={{
                    my: "15px",
                    color: theme.palette.getContrastText(teal[50]),
                  }}
                >
                  make your interior more minimalistic & modern home.
                </Typography>
                <p style={{ color: grey[500] }}>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non
                  a sSoluta quisquam praesentium temporibus placeat ad veniam
                  ipsum, explicabo culerit incidunt? Voluptates quia dolorem
                  dignissimos blanditiis.
                </p>
                <ColorButton
                  onClick={() => {
                    navigate("/shop");
                  }}
                  variant="text"
                  sx={{
                    mt: "30px",
                    paddingLeft: "15px",
                    paddingY: "8px",
                    bgcolor: blueGrey[900],
                    color: grey[50],
                  }}
                >
                  shop now
                  <ArrowForwardIosIcon
                    sx={{ marginLeft: "25px", fontSize: "18px" }}
                  />
                </ColorButton>
              </Grid>
              <Grid lg={6} md={6} xs={12}>
                <Box sx={{ width: { xs: "80%", md: "100%" } }}>
                  <CardMedia
                    component="img"
                    image=" /images/hero-img.png"
                    alt="Paella dish"
                  />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Services />
        {/* productsTrending */}
        <Box sx={{ my: "120px" }}>
          <Typography sx={{ textAlign: "center", my: "22px" }} variant="h5">
            trending products
          </Typography>
          <ProductList data={TrendingProduct} />
        </Box>

        {/* Bestproducts */}
        <Box sx={{ my: "120px" }}>
          <Typography sx={{ textAlign: "center", my: "22px" }} variant="h5">
            best sales
          </Typography>
          <ProductList data={BestProduct} />
        </Box>

        {/* clock section */}
        <Box sx={{ bgcolor: blueGrey[900], p: "7px" }}>
          <Container>
            <Grid2
              preventing="true"
              container
              spacing={1}
              sx={{ alignItems: "center" }}
            >
              <Grid2 lg={6} md={6} xs={12}>
                <Box>
                  <Typography
                    variant="body1"
                    sx={{ color: theme.palette.getContrastText(blueGrey[900]) }}
                  >
                    limited offers
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: theme.palette.getContrastText(blueGrey[900]),
                      m: 0,
                    }}
                  >
                    Qulity armchair
                  </Typography>
                </Box>
                <Clock />

                <Button
                  sx={{
                    bgcolor: grey[50],
                    color: grey[900],
                    fontSize: "15px",
                    fontWeight: "700",
                    paddingX: "20px",
                    textTransform: "capitalize",
                    "&:hover": {
                      bgcolor: grey[300],
                      transform: "scale(1.1)",
                      transition: "0.4s",
                    },
                  }}
                  onClick={() => {
                    navigate("/shope");
                  }}
                >
                  buy now
                </Button>
              </Grid2>
              <Grid2 xs={12} lg={6} md={6}>
                <CardMedia
                  sx={{
                    width: { xs: "40%", md: "65%", lg: "70%" },
                    height: { xs: "40%", md: "65%", lg: "70%" },
                    objectFit: "contain",
                    ml: "auto",
                  }}
                  title=""
                  image="/images/counter-timer-img.png"
                  component="img"
                />
              </Grid2>
            </Grid2>
            {/* end clock sec */}
            {/* products plant */}
          </Container>
        </Box>
        {/* popular product */}
        <Box sx={{ my: "120px" }}>
          <Typography sx={{ textAlign: "center", my: "22px" }} variant="h5">
            popular  product
          </Typography>
          <ProductList data={plantProduct} />
          {/* chair Arrive  */}
        </Box>
        <Box sx={{ my: "120px" }}>
          <Typography sx={{ textAlign: "center", my: "22px" }} variant="h5">
            new arrivals
          </Typography>
          <ProductList data={chair2product} />
        </Box>
      </Helmet>
    </>
  );
}
