import { Link } from "react-router-dom"

interface Props{
    to: string;
    bg: string;
    text: string;
    textColor: string;
  onClick?: () => void;
}

const NavigationLink = (props: Props) => {
  
  return (
      <Link
          className="navlink"
          to={props.to}
          style={{ backgroundColor: props.bg, color: props.textColor }}
          onClick={props.onClick}
    >
          {props.text}
    </Link>
  )
}

export default NavigationLink