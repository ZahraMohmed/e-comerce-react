import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { useState } from "react";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { blue, blueGrey, grey } from "@mui/material/colors";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../Firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from "react-router-dom";
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    border: "1px solid",
    borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
    fontSize: 16,
    width: "100%",
    mt: "7px",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));
export default function AllProducts() {
  const [enterTitle, setEnterTitle] = useState("");
  const [enterShortDesc, setEnterShortDesc] = useState("");
  const [enterDescribtion, setEnterDescribtion] = useState("");
  const [enterCategory, setEnterCategory] = useState("");
  const [enterPrice, setEnterPrice] = useState("");
  const [enterImge, setEnterImge] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const AddProduct = async (e) => {
    e.preventDefault();
    // const product = {
    //   title: enterTitle,
    //   shortDesc: enterShortDesc,
    //   describtion: enterDescribtion,
    //   category: enterCategory,
    //   price: enterPrice,
    //   imgUrl: enterImge,
    // };
    // add product to firebase
    setLoading(true);
    try {
      const docRef = await collection(db, "products");
      const storgeRef = ref(  storage,  `productImages/${Date.now() + enterImge.name}`  )  
      
      
    
      const uploadTask = uploadBytesResumable(storgeRef, enterImge);
      uploadTask.on(
        () => {
          // Handle unsuccessful uploads
          toast.error("product upload failed");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await addDoc(docRef, {
              productName: enterTitle,
              shortDesc: enterShortDesc,
              describtion: enterDescribtion,
              category: enterCategory,
              price: enterPrice,
              imgUrl: downloadURL,
            });
            setLoading(false);
            toast.success("product added successfully");
            navigate('/dashboard/all-products')
            
          });
        }
      );
    } catch (eror) {
      setLoading(false)
    }
  };
  return (
    <>
      <Box>
        <Container>
          <Box my={3}>
            <Typography variant="h6" sx={{ ml: "5px", my: "20px" }}>
              Add Products
            </Typography>
          
              {loading ? (
                <Box
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    height: "80vh",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h4" sx={{textAlign:"center"}}>Loading.......</Typography>
                </Box>
              ) : (
                <>
                  <Grid2 container spacing={3}>
                  <Grid2 xs={12} md={12}>
                    <Box
                      onSubmit={AddProduct}
                      component="form"
                      sx={{
                        "& .MuiTextField-root": {
                          m: 1,
                          width: "100%",
                          mt: "7px",
                        },
                      }}
                      Validate
                      autoComplete="off"
                      required
                    >
                      <FormControl
                        variant="standard"
                        sx={{ width: "100%", mt: "7px" }}
                      >
                        <InputLabel
                          shrink
                          htmlFor="bootstrap-input"
                          sx={{ width: "100%", mt: "7px", color: blue[500] }}
                        >
                          Product Title
                        </InputLabel>
                        <BootstrapInput
                          required
                          type="text"
                          Value={enterTitle}
                          placeholder="Double Sofa"
                          onChange={(e) => {
                            setEnterTitle(e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormControl
                        variant="standard"
                        sx={{ width: "100%", mt: "7px" }}
                      >
                        <InputLabel
                          shrink
                          htmlFor="bootstrap-input"
                          sx={{ width: "100%", mt: "7px", color: blue[500] }}
                        >
                          Short Description
                        </InputLabel>
                        <BootstrapInput
                          required
                          type="text"
                          Value={enterShortDesc}
                          placeholder="lorem...."
                          onChange={(e) => {
                            setEnterShortDesc(e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormControl
                        variant="standard"
                        sx={{ width: "100%", mt: "7px" }}
                      >
                        <InputLabel
                          shrink
                          htmlFor="bootstrap-input"
                          sx={{ width: "100%", mt: "7px", color: blue[500] }}
                        >
                          Description
                        </InputLabel>
                        <BootstrapInput
                          required
                          type="text"
                          Value={enterDescribtion}
                          id="bootstrap-input"
                          placeholder="Description....."
                          onChange={(e) => {
                            setEnterDescribtion(e.target.value);
                          }}
                        />
                      </FormControl>

                      <Stack
                        direction={"row"}
                        spacing={5}
                        sx={{
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <FormControl
                          variant="standard"
                          sx={{ width: "50%", mt: "7px" }}
                        >
                          <InputLabel
                            shrink
                            htmlFor="bootstrap-input"
                            sx={{ width: "50%", mt: "7px", color: blue[500] }}
                          >
                            Price
                          </InputLabel>
                          <BootstrapInput
                            required
                            type="text"
                            Value={enterPrice}
                            id="bootstrap-input"
                            placeholder="100$"
                            onChange={(e) => {
                              setEnterPrice(e.target.value);
                            }}
                          />
                        </FormControl>
                        <FormControl
                          sx={{
                            width: "40%",
                            marginTop: "20px",
                            paddingY: "15px",
                            color: grey[900],
                          }}
                          size="small"
                        >
                          <InputLabel
                            id="demo-select-small-label"
                            sx={{ marginTop: "35px", color: blue[500] }}
                          >
                            Category
                          </InputLabel>
                          <Select
                            required
                            sx={{ marginTop: "20px", color: grey[900] }}
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={enterCategory}
                            label="Category"
                            onChange={(e) => {
                              setEnterCategory(e.target.value);
                            }}
                          >
                            <MenuItem value="sofa">Sofa</MenuItem>
                            <MenuItem value="plant">Plant</MenuItem>
                            <MenuItem value="chair">Chair</MenuItem>
                            <MenuItem value="amircan chair">
                              Amircan Chair
                            </MenuItem>
                          </Select>
                        </FormControl>{" "}
                      </Stack>
                      <FormControl
                        variant="standard"
                        sx={{ width: "100%", mt: "7px" }}
                      >
                        <InputLabel
                          shrink
                          htmlFor="bootstrap-input"
                          sx={{ width: "100%", mt: "7px", color: blue[500] }}
                        >
                          Product Image
                        </InputLabel>
                        <BootstrapInput
                          required
                          type="file"
                          Value={enterImge}
                          id="bootstrap-input"
                          placeholder="Description....."
                          onChange={(e) => {
                            setEnterImge(e.target.files[0]);
                          }}
                        />
                      </FormControl>

                      <Button
                        type="supment"
                        sx={{
                          backgroundColor: blueGrey[900],
                          color: grey[50],
                          paddingX: "25px",
                          mt: 5,
                          "&:hover": {
                            backgroundColor: blueGrey[800],
                            color: grey[50],
                            transform: "scale(0.9)",
                            transition: "0.4s",
                          },
                        }}
                      >
                        Add Product
                      </Button>
                    </Box>
                  </Grid2>
                  </Grid2>
                </>
              )}
          
          </Box>
        </Container>
      </Box>
    </>
  );
}
