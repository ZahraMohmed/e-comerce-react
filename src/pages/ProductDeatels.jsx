import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  CardMedia,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CommonSection from "../components/UI-product/CommonSection";
import Rating from "@mui/material/Rating";
import { grey, blueGrey, blue } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import Helmet from "../components/Helmet/Helmet";
import { useDispatch } from "react-redux";
import { cartAction } from "../components/Redux/Slice/CardSlice";
import { db } from "../Firebase/config";
import { doc, getDoc } from "firebase/firestore";
const ColorButton = styled(Button)(({ theme }) => ({
  color: grey[50],
  backgroundColor: blueGrey[900],
  "&:hover": {
    backgroundColor: blueGrey[800],
    Transform: "scale(1.1)",
  },
}));
export default function ProductDeatels() {
  // const product = Products.find((item) => item.id === id);
  const { id } = useParams();

  const [product, setProduct] = useState({});

  const {
    imgUrl,
    productName,
    price,
    shortDesc,
    describtion,
    category,
  } = product;
  const [value, setValue] = React.useState(4);
  const [des, setDes] = useState(false);
  const disbatch = useDispatch();
  const addToCart = () => {
    disbatch(
      cartAction.addItem({
        id: id,
        productName: productName,
        price: price,
        imgUrl: imgUrl,
      })
    );
  };
  const docRef = doc(db, "products", id);
  useEffect(() => {
    const getProduct = async()=>{
      const docSnap = await getDoc(docRef)
      if(docSnap.exists()){
        setProduct(docSnap.data())
      }else{
        console.log('no products !')
      }
    }

    getProduct()
  }, []);
  return (
    <>
      <Helmet title={productName}>
        <CommonSection title={productName} />

        <Box>
          <Container>
            <Grid2
              container
              spacing={4}
              sx={{
                justifyContent: "center",
                my: "10px",
                alignItems: "center",
              }}
            >
              <Grid2 lg={6} md={6} xs={12}>
                <CardMedia image={imgUrl} component={"img"} />
              </Grid2>
              <Grid2 lg={6} md={6} xs={12} sx={{ mb: "100px" }}>
                <Typography variant="h5">{productName}</Typography>

                <Stack direction={"row"} spacing={1}>
                  <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    m={0}
                  />
                  <p style={{ marginBottom: "5px" }}>
                    <span style={{ color: "orange" , marginLeft:"2px" ,marginRight:"5px" }}>4.7</span>
                        ratings
                  </p>
                </Stack>

                <Stack direction={"row"} spacing={2} sx={{ mt: "5px" }}>
                  <Typography variant="pody1">${price}</Typography>
                  <Typography variant="pody1">category : {category}</Typography>
                </Stack>

                <br />
                <br />
                <Typography variant="pody2" sx={{ color: grey[600] }}>
                  {shortDesc}
                </Typography>
                {des && (
                  <Typography variant="pody2" sx={{ color: grey[600] }}>
                    {describtion}
                  </Typography>
                )}
                <Typography
                  onClick={() => {
                    setDes(!des);
                  }}
                  variant="pody2"
                  sx={{ color: blue[700], ml: "10px", cursor: "pointer" }}
                >
                  learn more{" "}
                  {des === false ? (
                    <span style={{ marginLeft: "3px" }}> &#11167; </span>
                  ) : (
                    <span style={{ marginLeft: "3px" }}> &#11165; </span>
                  )}
                </Typography>

                <br />
                <br />
                <ColorButton onClick={addToCart} sx={{ paddingX: "15px" }}>
                  add to card <span style={{ marginLeft: "8px" }}>+</span>
                </ColorButton>
              </Grid2>
            </Grid2>
          </Container>
        </Box>
      </Helmet>
    </>
  );
}
