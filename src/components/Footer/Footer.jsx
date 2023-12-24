import { Box, Container, Typography, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import { blueGrey, grey } from "@mui/material/colors";
import { Link } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
export default function Footer() {
  return (
    <Box sx={{ bgcolor: blueGrey[900], p: "30px" }}>
      <Container>
        <Grid container spacing={4}>
          <Grid xs={12} md={4}>
            <Typography sx={{ color: grey[50], my: "15px" }} variant="h6">
              ShairMart
            </Typography>

            <p style={{ color: grey[400], fontSize: "14px " }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
              velit sunt placeat. Voluptate sunt placeat. Voluptate repellat
              aspernatur?
            </p>
          </Grid>
          <Grid xs={12} md={2}>
            <Typography sx={{ color: grey[50], my: "15px" }} variant="h6">
              top category
            </Typography>

            <p
              style={{ color: grey[400], fontSize: "14px ", marginTop: "5px" }}
            >
              Chair
            </p>

            <p
              style={{ color: grey[400], fontSize: "14px ", marginTop: "5px" }}
            >
              sofa
            </p>

            <p
              style={{ color: grey[400], fontSize: "14px ", marginTop: "5px" }}
            >
              plant
            </p>
          </Grid>
          <Grid xs={12} md={2}>
            <Typography sx={{ color: grey[50], my: "15px" }} variant="h6">
              useful Links
            </Typography>

            <Stack>
              <Link
                to="/shope"
                style={{
                  color: grey[400],
                  fontSize: "14px ",
                  marginTop: "5px",
                }}
              >
                shop
              </Link>

              <Link
                to="/cart"
                style={{
                  color: grey[400],
                  fontSize: "14px ",
                  marginTop: "5px",
                }}
              >
                cart
              </Link>

              <Link
                to="/login"
                style={{
                  color: grey[400],
                  fontSize: "14px ",
                  marginTop: "5px",
                }}
              >
                login
              </Link>
            </Stack>
          </Grid>
          <Grid xs={12} md={4}>
            <Typography sx={{ color: grey[50], my: "15px" }} variant="h6">
              contact
            </Typography>
            <Stack direction={"row"} spacing={1}>
              <LocationOnIcon sx={{ color: grey[50] }} />
              <p
                style={{
                  color: grey[400],
                  fontSize: "14px ",
                  marginTop: "5px",
                }}
              >
                4A el maksy ,alsahel ,shopraMaser
              </p>
            </Stack>
            <Stack direction={"row"} spacing={1} sx={{ marginTop: "22px" }}>
              <PhoneIcon sx={{ color: grey[50] }} />
              <p
                style={{
                  color: grey[400],
                  fontSize: "14px ",
                  marginTop: "5px",
                }}
              >
                +0150568507
              </p>
            </Stack>
          </Grid>
        </Grid>
        <Box sx={{ textAlign: "center" }}>
          <Typography
            sx={{ textAlign: "center", mt: "60px", mb: "15px" }}
            variant="body1"
            color={grey[400]}
          >
            copyRight@ 2024 developed by Zahra Mohmad All Rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
