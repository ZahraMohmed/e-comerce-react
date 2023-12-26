import { Box, Container, CardMedia, Button,Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import UseGetData from "../custom-hooks/UseGetData";
import { deleteDoc,doc } from "firebase/firestore";
import { db } from "../Firebase/config";

export default function AllProducts() {
  const { data: productData, loading } = UseGetData("products");
  const deleteProduct = async(id)=>{
    await deleteDoc(doc(db,'products',id))
  }

  return (
    <>
      <Box >
        <Container>
          <Grid2 container sx={{ mt: "40px" }}>
            <Grid2 xs={12} md={12}>
              <TableContainer component="">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell align="center">Title</TableCell>
                      <TableCell align="center">Categoty</TableCell>
                      <TableCell align="center">Price</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
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
                        <Typography variant="h4" sx={{ textAlign: "center" }}>
                          Loading.......
                        </Typography>
                      </Box>
                    ) : (
                      <>
                        {productData.map((item) => (
                          <TableRow
                            key={item.id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
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
                            <TableCell align="center">
                              {item.category}
                            </TableCell>
                            <TableCell align="center">${item.price}</TableCell>
                            <TableCell align="center">
                              <Button color="error" onClick={()=>{deleteProduct(item.id)}}>Delete</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid2>
          </Grid2>
        </Container>
      </Box>
    </>
  );
}
