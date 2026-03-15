import { useState,useContext } from "react"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

const Login = ()=>{

const {login} = useContext(AuthContext)
const navigate = useNavigate()

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

const handleLogin = async ()=>{

const res = await axios.post("http://localhost:5000/api/auth/login",{
email,
password
})

login(res.data)

navigate("/dashboard")

}

return(

<div>

<h2>Login</h2>

<input placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
<br/>

<input placeholder="Password" type="password" onChange={(e)=>setPassword(e.target.value)}/>
<br/>

<button onClick={handleLogin}>Login</button>

</div>

)

}

export default Login