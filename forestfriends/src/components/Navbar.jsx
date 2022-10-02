import { Box, Image, Button, Container, Heading, Grid, Flex, Spacer } from '@chakra-ui/react';
import { Link , useNavigate} from 'react-router-dom'
import logo from "../assets/logoWhite.png";
import { useAuth } from "../contexts/AuthContext"
import { useState } from "react"
import { ConfirmBox , WarningBox} from './AlertBox';

function Navbar(props) {
    const { logout } = useAuth();
    const [logoutBoxVisible, setlogoutBoxVisible] = useState(false);
    function changeLogOutStatus() {
        logout()
        props.setLoggedIn(false);
    }
    let navigate = useNavigate(); 
    function sendToMainPage() {
        navigate("./")
    }
    return (
        <>
            <header>
                <Flex bg={'blue.900'}>
                    <Box>
                        <Link to={'/'}>
                        <Image onClick = {sendToMainPage} boxSize="100px" src={logo} alt="logo" />
                        </Link>
                    </Box>
                    <Box p='7'>
                        <Link to = '/'>
                        <Heading size='xl' color={'white'}> ForestFriends </Heading>
                        </Link>
                    </Box>
                    <Spacer/>
                    <Box p='7'> 
                        <Button colorScheme="orange" mr='6' variant="solid" onClick={() => navigate("/profile")}>
                            Profil
                        </Button>
                        <Button colorScheme="orange" mr='6' variant="solid"  onClick = {(e) => setlogoutBoxVisible(true)}> Logg ut </Button>
                        <ConfirmBox header="Er du sikker?" text="Du blir nå logget ut" isVisible ={logoutBoxVisible} setVisible={setlogoutBoxVisible} onConfirm={changeLogOutStatus}/>
                    </Box>
                </Flex>
             </header>
        </>
    )
}

export default Navbar;