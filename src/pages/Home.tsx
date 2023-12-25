import { Box } from '@mui/material'
import TypingAnimation from '../components/TypingAnimation'
import Footer from '../components/Footer';

const Home = () => {


  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box sx={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        mx: "auto",
        mt: 3,
      }}>
        <Box>
          <TypingAnimation />
        </Box>
        <Box sx={{
          width: "100%",
          display: "flex",
          gap: 5,
          my: 10,
          flexDirection: { md: "row", xs: "column", sm:"column"}
        }}>
          <img src='robot.png' alt='robot' style={{width: "200px" , margin:"auto"}}/>
          <img src='openai.png' className='image-inverted rotate' alt='robot' style={{width: "200px" , margin:"auto"}}/>
        </Box>
        <Box sx={{ display: "flex", width: "100%", mx: "auto" }}>
          <img
            src="chat.png"
            alt='chat'
            style={{
            display: "flex",
            margin: "auto",
              width: "60%",
            height:"50%",
            borderRadius: "20px",
            marginTop: 20,
            boxShadow: "-5px -5px 105px #64d3f5",
          }}
           />
        </Box>
        <Footer />
      </Box>
    </Box>
  )
}

export default Home