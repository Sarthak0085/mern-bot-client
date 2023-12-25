import notfound from '../assets/404-not-found.jpg';

const NotFound = () => {
  return (
    <div style={{
      alignContent:"center",
      overflow: "hidden",
      marginLeft: "auto",
      marginRight: "auto",
    }}>
      <img src={notfound} alt='not-found' width="100%" height="60%" />
    </div>
  )
}

export default NotFound