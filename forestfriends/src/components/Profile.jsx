import React, { useEffect, useState, useRef } from "react";
import { collection, query, where, getDocs, getDoc, doc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../utils/firebase";
import user from "../assets/user.svg";

import HikeCard from "./HikeCard";


import {
    Heading,
    Box,
    Grid,
    Container,
    Image,
    Button
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import LoadingPlaceHolder from "./LoadingPlaceholder";

/* https://www.youtube.com/watch?v=7Wqq1clbFSw*/



function Profile() {
    const [loading, setLoading] = useState(true);
    const [userHikes, setHikes] = useState([]);
    const [userName, setUserName] = useState('')
    const [comericalUser, setIsComercialUser] = useState('')
    const [orgNumber, setOrgNumber] = useState('')
    const [signedUpHikes, setSignedUpHikes] = useState([])
    const { currentUser } = useAuth();
    const [isAdmin, setIsAdmin] = useState(false)
    const adminRef = collection(db, "admins")
    let navigate = useNavigate()

    


    //const userHikeRef = collection(db, "users", userId, "hikes");
    //const signedUpHikesRef = collection(db, "users", userId, "signedUpHikes")
    //const userRef = doc(db, "users", userId)

    function getUserInfo(userId) {
        const userRef = doc(db, "users", userId)
        try {
            getDoc(userRef)
                .then((doc) => {
                    setUserName(doc.data().name)
                    if (doc.data().comercialUser) {
                        setIsComercialUser(true)
                        setOrgNumber(doc.data().orgNumber)
                    }
                })
        } catch (error) {
            
        }
    }

    async function checkIfAdmin() {
        const admins = []
        await getDocs(adminRef)
                .then((snapshot) => {
                    snapshot.docs.forEach((doc) => {
                        admins.push(doc.id)
                    })
                    if (admins.includes(currentUser.uid)) {
                        setIsAdmin(true)
                    }
                })
    }


    function getUserHikes(userId) {
        setLoading(true)
        const userHikeRef = collection(db, "users", userId, "hikes");
        getDocs(userHikeRef)
        .then((snapshot) => {
            const items = [];
            snapshot.docs.forEach((doc) => {
                items.push({ id: doc.id });
            })
            console.log(items)
            const hikes = []
            items.forEach((hikeRef) => {
                getDoc(doc(db, "hikes", hikeRef.id))
                    .then((doc) => {
                        hikes.push({ ...doc.data(), id: doc.id})
                        if (hikes.length === items.length) {
                            setHikes(hikes)
                        }
                    })
            })
            setLoading(false)
        });
    }

    function getSignedUpHikes(userId) {

        setLoading(true)
        const signedUpHikesRef = collection(db, "users", userId, "signedUpHikes")
        getDocs(signedUpHikesRef)
        .then((snapshot) => {
            const items = [];
            snapshot.docs.forEach((doc) => {
                items.push({ id: doc.id });
            })
            console.log(items)
            const hikes = []
            items.forEach((hikeRef) => {
                getDoc(doc(db, "hikes", hikeRef.id))
                    .then((doc) => {
                        hikes.push({ ...doc.data(), id: doc.id})
                        if (hikes.length === items.length) {
                            setSignedUpHikes(hikes)
                            
                        }
                        
                    })
            })
            setLoading(false)
        });
    }

    function checkUser(user) {
        if (currentUser !== undefined) {
            getUserInfo(currentUser.uid)
            getUserHikes(currentUser.uid);
            getSignedUpHikes(currentUser.uid);
            checkIfAdmin()
           setLoading(false)
        }
    }

    useEffect(() => {
        checkUser(currentUser)
    },[currentUser, isAdmin]);



    if (loading) {
        return <LoadingPlaceHolder />
    }


    return (
        <>

            <Box pb="3%"
                flexDirection="column"
                width="100%"
                height="100%"
                backgroundColor="#ADD8E6"
                justifyContent="center"
                alignItems="center"
            >
                <Box d="flex"
                    justifyContent="space-between"
                    align="center"

                >

                    <Container    >
                        <Box d="flex"
                            alignItems="center"
                            py="20" flexDirection="row"
                            spacing={4}
                            p="1rem"
                            backgroundColor="whiteAlpha.900"
                            boxShadow="md"
                            mt={10} >
                            <Box>
                                <Image w="70%" src={user} alt="forest"></Image>
                            </Box>
                            <Box d="flex" py="20" flexDirection="column">
                                <Box>
                                    <Heading >
                                        <Box fontWeight="bold">Din profil</Box>
                                        <Heading fontWeight="bold" size="sm">{comericalUser ? "Komersiell bruker" : "Privat bruker"}</Heading>
                                    </Heading>
                                    <Box mt="6" fontWeight="medium">
                                        <Box>Navn: {userName}</Box>
                                    </Box>
                                    <Box mt="6" fontWeight="medium">
                                        <Box>E-post: {currentUser.email}</Box>
                                    </Box>
                                    {comericalUser && <Box mt="6" fontWeight="medium">
                                        <Box>Organisasjonsnummer: {orgNumber}</Box>
                                    </Box>}
                                    {isAdmin && <Button mt="6" bg={'lightblue'}
                                        onClick={() => {navigate("/admin")}}>
                                        Administrer turer
                                    </Button>}
                                </Box>
                            </Box>
                        </Box>
                    </Container>
                </Box>
                <Box>
                    <Container mt={0}>
                        <Box align="center">
                            <Heading fontWeight="bold">
                                Dine opprettede turer
                            </Heading>
                            {userHikes.map((hike) => {
                                return (<HikeCard hike={hike} 
                                                  canEdit={true}/>)
                            })}
                        </Box>
                    </Container>
                </Box>
                <Box>
                    <Container mt={0}>
                        <Box align="center">
                            <Heading fontWeight="bold">
                                Dine påmeldte turer
                            </Heading>
                            {signedUpHikes.map((hike) => {
                                console.log(hike)
                                return (<HikeCard hike={hike} 
                                                  canEdit={false}/>)
                            })}
                        </Box>
                    </Container>
                </Box>
            </Box>
        </>
    )
}

export default Profile; 