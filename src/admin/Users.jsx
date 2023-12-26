import React from "react";
import { Box, Container, CardMedia, Button, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import UseGetData from "../custom-hooks/UseGetData";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../Firebase/config";
export default function Users() {
  const { data: userData, loading } = UseGetData("users");
  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, "users", id));
  };

  return (
    <>
      <Box sx={{ height: "100vh" }}>
        <Container>
          <Grid2 container sx={{ mt: "40px" }}>
            <Grid2 xs={12} md={12}>
              <TableContainer component="">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell align="center">User Name</TableCell>
                      <TableCell align="center">E-mail</TableCell>
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
                          alignusers: "center",
                        }}
                      >
                        <Typography variant="h4" sx={{ textAlign: "center" }}>
                          Loading.......
                        </Typography>
                      </Box>
                    ) : (
                      <>
                        {userData.map((user) => (
                          <TableRow
                            key={user.uid}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              <CardMedia
                                title="kk"
                                image={user.photoURL}
                                component="img"
                                sx={{
                                  width: "80px",
                                  height: "80px",
                                  objectFit: "cover",
                                }}
                              />
                            </TableCell>
                            <TableCell align="center">{user.displayName}</TableCell>
                            <TableCell align="center">
                              {user.email}
                            </TableCell>
                            <TableCell align="center">
                              <Button
                                color="error"
                                onClick={() => {
                                  deleteProduct(user.id);
                                }}
                              >
                                Delete
                              </Button>
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
