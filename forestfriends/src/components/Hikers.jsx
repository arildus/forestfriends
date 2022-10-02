import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { db } from "../utils/firebase";
import {
    Heading,
    Button,
    Stack,
    Box,
    Grid,
    GridItem,
    Flex,
} from "@chakra-ui/react";
import LoadingPlaceHolder from "./LoadingPlaceholder";


function Hikers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const userRef = collection(db, "users")

    let navigate = useNavigate()


    function getHikers() {
        setLoading(true);
        getDocs(userRef)
            .then((snapshot) => {
                const items = [];
                snapshot.docs.forEach((doc) => {
                    if (!doc.data().comercialUser) {
                        items.push({ ...doc.data(), id: doc.id });
                    }
                })
                setLoading(false)
                setUsers(items)
            });
    }



    useEffect(() => {
        getHikers();
    }, []);

    if (loading) {
        return <LoadingPlaceHolder />
    }

    return (
        <>
        <Box bg={'#ADD8E6'} minHeight={'79.1vh'}>
            
    
        <Box bg={'#ADD8E6'} align={'center'}>
         <Heading color="green">Turvenner</Heading>
        </Box>
            <Flex
                bg={'#ADD8E6'}
                flex={'4 0 33%'}
                justifyItems={'flex-start'}
                justifyContent={'center'}
                flexWrap={'wrap'}
                flexDirection={'row'}
                id="container"
                >
                        {users.map((user) => {
                            return (
                                <div key={user.id}>
                                    <Box m="5" orange="white" 
                                    p="3%" backgroundColor="blue.50" 
                                    textAlign="center" 
                                    borderRadius="10%"
                                    w={'150px'}
                                    h={'150px'}

                                    >
                                        <Box mt='3' fontSize={'large'} fontWeight={'bold'}>{user.name}</Box>
                                        <Button
                                            onClick={() => navigate("/detailedProfile/" + user.id)}
                                            colorScheme='orange'
                                            mt='3'
                                            mb='3'
                                            width="50%">
                                            Se mer
                                        </Button>
                                    </Box>
                                </div>
                            );
                        })}
            </Flex>
            </Box>
        </>
    );
}


export default Hikers;