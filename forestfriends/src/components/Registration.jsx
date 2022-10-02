import LoginPage  from "./LoginPage";
import SignUp from "./SignUp";
import { useState } from 'react'

function Registration(props) {
    const [showLoggin,setShowLogin] = useState(true)
    return(
        <>
            {showLoggin && <LoginPage setLoggedIn={props.setLoggedIn} setShowLogin={setShowLogin}/>}
            {!showLoggin && <SignUp setShowLogin={setShowLogin}/>}
        </>
    )
}

export default Registration;

