import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { blueGrey, grey } from "@mui/material/colors";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../Firebase/config";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) ~ :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

export default function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const signIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setLoading(false);
        const user = userCredential.user;
        console.log(user);
        toast.success("successfully logged in");
        navigate("/checkout");
        // ...
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };
  return (
    <Container>
      <Grid2 container spacing={1} sx={{ justifyContent: "center" }}>
        <Grid2 lg={6} md={6} xs={12}>
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
              <Typography variant="h4">Loading.......</Typography>
            </Box>
          ) : (
            <>
              <Typography variant="h4" sx={{ textAlign: "center", mt: "40px" }}>
                log in
              </Typography>
              <Box
                onSubmit={signIn}
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "100%" },
                  justifyContent: "center",
                  textAlign: "center",
                  my: "55px",
                  p: "25px",
                  backgroundColor: blueGrey[900],
                  borderRadius: "4px",
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  Default="input"
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                  autoFocus={false}
                  id="outlined-size-small"
                  Value={email}
                  placeholder="Enter Your Email"
                  size="small"
                  sx={{
                    outline: "none",
                    mt: "25px",
                    backgroundColor: grey[50],
                    borderRadius: "6px",
                    "& fieldset": { border: "none" },
                  }}
                />
                <TextField
                  Default="input"
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                  type='password'
                  autoFocus={false}
                  id="outlined-size-small"
                  Value={password}
                  placeholder="Enter Your password"
                  size="small"
                  sx={{
                    outline: "none",
                    mt: "25px",
                    backgroundColor: grey[50],
                    borderRadius: "6px",
                    "& fieldset": { border: "none" },
                  }}
                />

                <Root sx={{ color: grey[300] }}>
                  <Divider
                    sx={{
                      my: "20px",
                      color: grey[300],
                      "&.MuiDivider-root::after": { borderTop: " thin solid " },
                      "&.MuiDivider-root::before": {
                        borderTop: " thin solid  ",
                      },
                    }}
                    component="li"
                  >
                    or
                  </Divider>
                </Root>
                <Button
                  onClick={async () => {
                    const provider = new GoogleAuthProvider();
                    signInWithPopup(auth, provider)
                      .then((result) => {
                        const credential =
                          GoogleAuthProvider.credentialFromResult(result);
                        const token = credential.accessToken;

                        console.log(token);
                        const user = result.user;
                        console.log(user);

                        toast.success("successfully logged in");

                        setDoc(doc(db, "users", user.uid), {
                          uid: user.uid,
                          displayName: user.displayName,
                          email: user.email,
                          photoURL: user.photoURL,
                        });
                        navigate("/checkout");
                      })
                      .catch((error) => {
                        // Handle Errors here.
                        // const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(errorMessage);
                        // // The email of the user's account used.
                        // const email = error.customData.email;
                        // // The AuthCredential type that was used.
                        // const credential =
                        //   GoogleAuthProvider.credentialFromError(error);
                        // // ...
                      });
                  }}
                  sx={{
                    width: "70%",
                    m: 1,
                    backgroundColor: grey[50],
                    "&:hover": { backgroundColor: grey[50] },
                  }}
                >
                  <i class="fab fa-google " style={{ fontSize: "30px" }}></i>
                  <span style={{ marginLeft: "20px" }}>
                    {" "}
                    continue with google
                  </span>
                </Button>
                <br />
                <Button
                  type="submit"
                  sx={{
                    backgroundColor: grey[50],
                    color: blueGrey[900],
                    paddingX: "10px",
                    mt: 2,
                    width: "70%",
                    textTransform: "capitalize",
                    "&:hover": {
                      backgroundColor: grey[100],
                      color: blueGrey[900],
                    },
                  }}
                >
                  creat an account
                </Button>

                <Typography variant="body1" sx={{ mt: 4, color: grey[400] }}>
                  if you don't have an account ?
                  <Link
                    style={{ marginLeft: "5px", color: grey[100] }}
                    to="/signup"
                  >
                    Creat an account
                  </Link>
                </Typography>
              </Box>
            </>
          )}
        </Grid2>
      </Grid2>
    </Container>
  );
}
