import { Box, Button, Typography } from "@mui/material"
import CustomizedInput from "../components/shared/CustomizedInput"
import { IoIosLogIn } from "react-icons/io";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const name = formData.get("Name") as string;
        const email = formData.get("Email") as string;
        const password = formData.get("Password") as string;

        console.log(name, email, password);

        try {
            toast.loading("Signing Up", { id: "register" });
            await auth?.signup(name, email, password);
            toast.success("Signed Up Successfully", { id: "register" });
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message, {id: "register"});
        }
        
        
    }

    useEffect(() => {
        if (auth?.user) {
            navigate("/chat");
        }
    },[auth])

  return (
      <Box width={"100%"} height={"100%"} display={"flex"} flex={1}>
          <Box padding={8} mt={8} display={{ md: "flex", sm: "none", xs: "none" }}>
              <img src="robot1.png" alt="robot" style={{width:"400px"}} />
          </Box>
          <Box
              display={"flex"}
              flex={{ xs: 1, md: 0.5 }}
              alignItems={"center"}
              justifyContent={"center"}
              padding={2}
              mt={1} ml={"auto"}>
              <form
                  onSubmit={handleSubmit}
                  style={{
                  margin: "auto",
                  padding: "30px",
                  border: "none",
                  borderRadius: "10px",
                  boxShadow:"10px 10px 20px #000"
              }}>
                  <Box
                      sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent:"center"
                      }}
                  >
                      <Typography
                          variant="h4"
                          textAlign={"center"}
                          padding={2}
                          fontWeight={600}
                      >
                          Register
                      </Typography>
                      <CustomizedInput type="text" label="name" name="Name" />
                      <CustomizedInput type="email" label="email" name="Email" />
                      <CustomizedInput type="password" label="password" name="Password" />
                      <Button
                          type="submit"
                          sx={{
                              px: 2,
                              py: 1,
                              mt: 2,
                              width: "100%",
                              borderRadius: 2,
                              bgcolor: "#00fffc",
                              ":hover": {
                                  bgcolor: "white",
                                  color: "black",
                              },
                          }}
                          endIcon={<IoIosLogIn />}
                      >
                          Sign Up
                      </Button>
                  </Box>
                  <hr style={{ color: "gray", marginTop: "20px" }} />
                  <div style={{ color: "white", marginTop: "20px", textAlign:"center" }}>
                      Already have an account ?
                      <Link style={{
                          textDecoration: "none",
                          fontWeight: "bold",
                          color: "white",
                          marginLeft:"4px"
                      }}
                          className="link"
                          to={"/login"}
                      >
                          Login
                      </Link>
                  </div>
              </form>
          </Box>
    </Box>
  )
}

export default Register;