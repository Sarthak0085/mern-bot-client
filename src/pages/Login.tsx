import { Box, Button, Typography } from "@mui/material"
import CustomizedInput from "../components/shared/CustomizedInput"
import { IoIosLogIn } from "react-icons/io";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const auth = useAuth();
    const navigate = useNavigate();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log(e);
        
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        console.log(formData);
        

        const email = formData.get("Email") as string;
        const password = formData.get("Password") as string;

         console.log(email, password);

        try {
            toast.loading("Signing In", { id: "login" });
            await auth?.login(email, password);
            toast.success("Signed In Successfully", { id: "login" });
        } catch (error) {
            console.log(error);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            toast.error(error.response?.data?.message, { id: "login" });
        }
        
    }

    useEffect(() => {
        if (auth?.user) {
            navigate("/chat");
        }
    },[auth])

  return (
      <Box width={"100%"} height={"100%"} display={"flex"} justifyContent={"space-between"} flex={1}>
          <Box padding={8} mt={8} display={{ md: "flex", sm: "none", xs: "none" }}>
              <img src="robot1.png" alt="robot" style={{width:"400px"}} />
          </Box>
          <Box
              display={"flex"}
              flex={{ xs: 1, md: 0.5 }}
              alignItems={"center"}
              justifyContent={"start"}
              padding={2}
              mt={10} ml={"auto"}>
              <form
                  onSubmit={(e)=>handleSubmit(e)}
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
                          Login
                      </Typography>
                      <CustomizedInput type="email"  label="email" name="Email" />
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
                              }
                          }}
                          endIcon={<IoIosLogIn />}
                      >
                          Login
                      </Button>
                  </Box>
                  <hr style={{ color: "gray", marginTop: "20px" }} />
                  <div style={{ color: "white", marginTop: "20px", textAlign:"center" }}>
                      Don't have an account ?
                      <Link style={{
                          textDecoration: "none",
                          fontWeight: "bold",
                          color: "white",
                          marginLeft:"4px"
                      }}
                          className="link"
                          to={"/register"}
                      >
                          Register
                      </Link>
                  </div>
              </form>
          </Box>
    </Box>
  )
}

export default Login