import React, { useEffect, useState, useRef } from 'react'
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Box, Flex, Heading, Input, Button, Grid, GridItem, Container } from "@chakra-ui/react"
import AdminHikeCard from './AdminHikeCard';

function Admin() {

    const hikeRef = collection(db, "hikes");
    const [hikes, setHikes] = useState([]);
    const [users, setUsers] = useState([]);
    const adminRef = collection(db, "admins")
    const usersRef = collection(db, "users")
    const [loading, setLoading] = useState(true)
    const { currentUser } = useAuth()
    const [difficultySearch, setNameSearch] = useState("");
    const nameSearchRef = useRef();
    let navigate = useNavigate()


    function getHikes() {
        setLoading(true)
        const unsubscribe = onSnapshot(hikeRef, (snapshot) => {
            const hikes = []
            snapshot.forEach((doc) => {
                hikes.push({ ...doc.data(), id: doc.id });
            });
            setHikes(hikes)
            setLoading(false)
        });
        //remember to unsubscribe from your realtime listener on unmount or you will create a memory leak
        return () => unsubscribe()
    }

    function getUsers() {
        setLoading(true)
        const unsubscribe = onSnapshot(usersRef, (snapshot) => {
            const users = []
            snapshot.forEach((doc) => {
                users.push({ ...doc.data(), id: doc.id });
            });
            setUsers(users)
            setLoading(false)
        });
        //remember to unsubscribe from your realtime listener on unmount or you will create a memory leak
        return () => unsubscribe()
    }

    async function checkIfAdmin() {
        setLoading(true)
        console.log()
        const admins = []
        await getDocs(adminRef)
                .then((snapshot) => {
                    snapshot.docs.forEach((doc) => {
                        admins.push(doc.id)
                    })
                    if (!(admins.includes(currentUser.uid))) {
                        navigate("/")
                    } else {
                        setLoading(false)
                    }
                })
    }

    function checkUser() {
        if (currentUser !== undefined) {
            checkIfAdmin()
            getHikes()
            getUsers()
        }
    }

    useEffect(() => {
        checkUser()
    },[currentUser]);

    if (loading) {
        return <Box>Loading...</Box>
    }

    return (
        <Box bg={'#ADD8E6'}>
            <Container justifyContent="space-between">
                <Box d="flex" alignItems="center" py="50"  flexDirection="row">
                <Input
                    w={'300px'}
                    type="text"
                    name="difficultySearch"
                    placeholder="Søk etter turnavn"
                    bg={'white'}
                    ref={nameSearchRef}
                />
                <Button ml={'1'} onClick={() => setNameSearch(nameSearchRef.current.value)}>
                            Søk!
                        </Button>
                        <Button ml={'1'} onClick={() => setNameSearch("")}>
                            Nullstill
                        </Button>
                </Box>
            </Container>
            <Heading textAlign={'center'}>Administrer Turer</Heading>
            <Flex bg={'#ADD8E6'}
            justifyItems={'flex-start'}
            justifyContent={'center'}
            flexWrap={'wrap'}
            flexDirection={'row'}
            minHeight={'72.6vh'}>
                        {hikes
                                .filter((hike) => {
                                    if (difficultySearch === '') {
                                        return hike;
                                    } else if (JSON.stringify(hike.hikeName).toLowerCase().includes(difficultySearch.toLowerCase())) {
                                        return hike;
                                    }
                                })
                                .map((hike) => {
                                    return (<AdminHikeCard key={hike.id} hike={hike} />)
                                })}
                
            </Flex>
        </Box>
    )
}

export default Admin