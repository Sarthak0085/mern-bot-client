import { TextField } from "@mui/material"
import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

interface InputProps{
    name: string;
    type: string;
    label: string;
}

const CustomizedInput = (props: InputProps) => {
    const [isPassword, setIsPassword] = useState(false);
  return (
      <div style={{position:'relative'}}>
          <TextField
          margin="normal"
          InputLabelProps={{ style: { color: "white" } }}
          name={props.name}
          type={props.type === 'password'? isPassword ? 'text' : 'password': props.type}
          onChange={(e)=>e.currentTarget}
          label={props.label}
          inputProps={{ style: { width: "400px", borderRadius: 10, fontSize: 20, color: "white" } } }
          />
          {
              props.type === 'password' ?
              isPassword ? 
                  <div style={{position:'absolute',right:8, bottom: 21 }} onClick={()=>setIsPassword((prev)=>!prev)}>
                      <IoMdEye size={25} />
                  </div>
                  :
                  <div style={{position:'absolute', right:8, bottom: 21}} onClick={()=>setIsPassword((prev)=>!prev)}>
                          <IoMdEyeOff size={25} />
                      </div>
                  :
                  <></>
          
          }
      </div>
  )
}

export default CustomizedInput