import { Link } from "react-router-dom"

const Footer = () => {
  return (
      <footer>
          <div style={{
              width: "100%",
              padding: 20,
              marginTop: 30,
              minHeight: "20vh",
              maxHeight: "30vh"
          }}>
              <p style={{ fontSize: "20px", textAlign: "center" }}>
                  Built with ❤ by <Link to={"/"} style={{color:"white", textDecoration:"none", fontWeight:"bold"}}>SARTHAK</Link>
              </p>
          </div>
    </footer>
  )
}

export default Footer