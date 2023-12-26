import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { blueGrey, grey } from "@mui/material/colors";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../Firebase/config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";
export default function Signup() {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const singup = async (e) => {
    e.preventDefault();
    setloading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      const storageRef = ref(storage, `images/${Date.now() + username}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        (error) => {
          // Handle unsuccessful uploads
          toast.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            // update profile
            await updateProfile(user, {
              displayName: username,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", user.uid), {
              uid: user.uid,
              displayName: username,
              email,
              photoURL: downloadURL,
            });
          });
        }
      );
      console.log(user);
    
      setloading(false);
      toast.success("Your Account has been successfully");
      navigate("/");
    } catch (error) {
      toast.error("somthing Went Wrong");
    }
  };

  return (
    <>
      <Container>
        <Grid2 container spacing={1} sx={{ justifyContent: "center" }}>
          <Grid2 lg={6} md={6} xs={12}>
            {loading ? (
              <Box sx={{ textAlign: "center",display:"flex" ,height:"80vh" , justifyContent:"center" , alignItems:"center" }}>
                <Typography variant="h4" >
                Loading.......
              </Typography>
              </Box>
            ) : (
              <>
                <Typography
                  variant="h4"
                  sx={{ textAlign: "center", mt: "40px" }}
                >
                  sign up
                </Typography>{" "}
                <Box
                  onSubmit={singup}
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
                      setusername(e.target.value);
                    }}
                    autoFocus={false}
                    id="outlined-size-small"
                    defaultValue={username}
                    placeholder="user name"
                    size="small"
                    sx={{
                      outline: "none",
                      mt: "20px",
                      backgroundColor: grey[50],
                      borderRadius: "6px",
                      "& fieldset": { border: "none" },
                    }}
                    disableUnderline={false}
                  />
                  <TextField
                    Default="input"
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                    type="email"
                    autoFocus={false}
                    id="outlined-size-small"
                    defaultValue={email}
                    placeholder="Enter Your Email"
                    size="small"
                    sx={{
                      outline: "none",
                      mt: "20px",
                      backgroundColor: grey[50],
                      borderRadius: "6px",
                      textTransform: "lowercase",
                      "& fieldset": { border: "none" },
                    }}
                  />
                  <TextField
                    Default="input"
                    onChange={(e) => {
                      setpassword(e.target.value);
                    }}
                    type="password"
                    autoFocus={false}
                    id="outlined-size-small"
                    defaultValue={password}
                    placeholder="Enter Your passward"
                    size="small"
                    sx={{
                      outline: "none",
                      mt: "20px",
                      backgroundColor: grey[50],
                      borderRadius: "6px",
                      "& fieldset": { border: "none" },
                    }}
                  />
                  <Stack
                    direction={"row"}
                    spacing={3}
                    m={1}
                    sx={{ alignItems: "center" }}
                  >
                    <input
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                      }}
                      defaultValue={password}
                      type="file"
                      style={{
                        outline: "none",
                        mt: "20px",
                        backgroundColor: "transparent",
                        borderRadius: "4px",
                        m: 1,
                        color: grey[400],
                        "& fieldset": { border: "none" },
                      }}
                    />
                  </Stack>
                  <Button
                    type="submit"
                    sx={{
                      backgroundColor: grey[50],
                      color: blueGrey[900],
                      paddingX: "10px",
                      mt: 4,
                      textTransform: "capitalize",
                      "&:hover": {
                        backgroundColor: grey[100],
                        color: blueGrey[900],
                        transform: "scale(0.9)",
                        transition: "0.4s",
                      },
                    }}
                  >
                    creat an account
                  </Button>

                  <Typography variant="body1" sx={{ mt: 4, color: grey[400] }}>
                    already have an account ?{" "}
                    <Link
                      style={{ marginLeft: "5px", color: grey[100] }}
                      to="/login"
                    >
                      login
                    </Link>
                  </Typography>
                </Box>
              </>
            )}
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
}
