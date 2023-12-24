import { Box, Container } from "@mui/material";
import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI-product/CommonSection";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Products from "../assets/Data/products";
import ProductList from "../components/UI-product/ProductList";
import UseGetData from "../custom-hooks/UseGetData";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "8px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  border: "1.5px Solid #8585857e ",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.5, 1.5, 1.5, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
export default function Shope() {
  const {data:Products} = UseGetData('products')
  const [productData, setProductData] = useState(Products);
  const [category, setcategory] =useState("");

  const handleChange = (e) => {
    setcategory(e.target.value);
    FilterOnChang(e)
  };
  const [sort, setSort] = useState("");

  const handleChangeSort = (e) => {
    setSort(e.target.value);
  };
  const FilterOnChang = (e) => {
    const filterValue = e.target.value;
    if (filterValue === 'sofa') {
      const productFilter = Products.filter((item) => item.category === 'sofa');
      setProductData(productFilter)
    }
    if (filterValue === 'plant') {
      const productFilter = Products.filter((item) => item.category === 'plant');
      setProductData(productFilter)
    }
    if (filterValue === 'chair') {
      const productFilter = Products.filter((item) => item.category === 'chair');
      setProductData(productFilter)
    }
    if (filterValue === 'chair2') {
      const productFilter = Products.filter((item) => item.category === 'chair2');
      setProductData(productFilter)
    }
  };
  const handelSearch = (e)=>{
     const searchContent = e.target.value
     const filterSearch = Products.filter((item)=> item.productName.toLowerCase().includes(searchContent.toLowerCase()))
     setProductData(filterSearch)
  }
  
  return (
    <Helmet title={"Shop"}>
      <Box>
        <CommonSection title={"Shop"} />
        <Box>
          <Container>
            <Grid2 container spacing={1}>
              <Grid2 md={3} lg={3} xs={6}>
                <Box>
                  <FormControl sx={{ m: 2, minWidth: "100%" }}>
                    <InputLabel id="demo-simple-select-autowidth-label">
                      filter by category
                    </InputLabel>
                    <Select
                      label="  filter by category"
                      value={category}
                      onChange={handleChange}
          
                      sx={{ m: 0.5, minWidth: "100%" }}
                      
                    >
                      <MenuItem value="sofa">sofa</MenuItem>
                      <MenuItem value="plant">plant</MenuItem>
                      <MenuItem value="chair">chair</MenuItem>
                      <MenuItem value="chair2">AmircanChair</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid2>
              <Grid2 md={3} lg={3} xs={6} >
                <Box>
                  <FormControl sx={{ m: 2, minWidth: "70%" }}>
                    <InputLabel id="demo-simple-select-autowidth-label">
                      sort by
                    </InputLabel>
                    <Select
                      label=" Sort By"
                      value={sort}
                      onChange={handleChangeSort}
                      sx={{ m: 0.5, minWidth: "70%" }}
                    >
                      <MenuItem value="ascending">ascending</MenuItem>
                      <MenuItem value="descending">descending</MenuItem>
                    </Select>
                  </FormControl> 
                </Box>
              </Grid2>
              <Grid2 md={6} lg={6} xs={10} >
                <Box>
                  <Search sx={{ m: "21px" , width:"100%" }} onChange={handelSearch}>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search…"
                      inputProps={{ "aria-label": "search" }}
                    />
                  </Search>
                </Box>
              </Grid2>
            </Grid2>
            <Box>
            
                <ProductList data={Products}/>
            
            </Box>
          </Container>
        </Box>
      </Box>
    </Helmet>
  );
}
