import React, { useEffect, useState, useRef } from "react";
import { doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useParams, useNavigate } from 'react-router-dom';
import user from "../assets/user.svg";

import {
    Heading,
    Box,
    Container,
    Image,
    Button,
    Flex
} from "@chakra-ui/react";

function DetailedProfile() {
    const { userId } = useParams();
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    let navigate = useNavigate()
    let detailedUser;

    function getDetailedUser() {
        const userRef = doc(db, "users", userId)
        getDoc(userRef).then(docSnap => {
            detailedUser = docSnap.data();
            console.log(detailedUser.name)
            setUserName(detailedUser.name)
            setEmail(detailedUser.email)
        })
    }

    useEffect(() => {
        getDetailedUser()
    }, [userId]);

    return (
        <Box pb="18%"
            pt="18%"
            height="100%"
            backgroundColor="#ADD8E6"
        >
            <Container alignItems={'center'}>
                <Flex
                    alignItems="center"
                    backgroundColor="whiteAlpha.900"
                    boxShadow="md"
                >
                    <Box>
                        <Image w="70%" src={user} alt="forest"></Image>
                    </Box>
                    <Box py="20" flexDirection="column">
                        <Box>
                            <Heading fontWeight="bold">
                                {userName}
                            </Heading>
                            <Box mt="6" fontWeight="medium">
                                <Box>E-post: {email}  </Box>
                            </Box>
                        </Box>
                    </Box>
                </Flex>
                <Button mt='20'
                    ml='20'
                    mr='20'
                    onClick={() => navigate("/hikers")}
                    colorScheme='orange'
                    width='60%'>
                    Tilbake til turvenner
                </Button>
            </Container>

        </Box>
    )
}


export default DetailedProfile;
