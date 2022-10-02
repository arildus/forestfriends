
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { db } from "../utils/firebase";
import { collection, addDoc, query, where, setDoc, doc, onSnapshot } from "firebase/firestore";
import { Box, Button, FormControl, Input, Heading, Container, Stack, Flex, Grid, GridItem, useToast, IconButton, Icon } from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons'
import { useAuth } from "../contexts/AuthContext";
import HikeCard from "../components/HikeCard";

//https://github.com/samfromaway/firebase-tutorial/blob/master/src/GetFirebase.js

function Hikes() {
    const [loading, setLoading] = useState(false);
    const [isSubmitting, setSubmitting] = useState(false)
    const [difficultySearch, setNameSearch] = useState("");
    const [hikes, setHikes] = useState([]);
    const difficultyRef = useRef();
    const hikeNameRef = useRef();
    const dateRef = useRef();
    const nameSearchRef = useRef();
    const { currentUser } = useAuth()
    const toast = useToast()

    let hikeRef = collection(db, "hikes");

    useEffect(() => {
        const unsubscribe = onSnapshot(hikeRef, (snapshot) => {
            const hikes = []
            snapshot.forEach((doc) => {
                hikes.push({ ...doc.data(), id: doc.id });
            });
            setHikes(hikes)
        });
        //remember to unsubscribe from your realtime listener on unmount or you will create a memory leak
        return () => unsubscribe()
    }, []);


    return (
    <Box bg={'#ADD8E6'}>   
        <Container justifyContent="space-between" >
            <Box d="flex" alignItems="center" py="50" flexDirection="row">
                <Input
                    type="text"
                    name="difficultySearch"
                    placeholder="Søk etter turnavn"
                    bg={'white'}
                    ref={nameSearchRef}
                />
                <Button onClick={() => setNameSearch(nameSearchRef.current.value)} ml={'1'}>
                    Søk!
                </Button>
                <Button onClick={() => setNameSearch("")} ml={'1'}>
                    Nullstill
                </Button>

            </Box>
        </Container>
        <Flex
            bg={'#ADD8E6'}
            id="container"
            justifyItems={'flex-start'}
            justifyContent={'center'}
            flexWrap={'wrap'}
            flexDirection={'row'}
            minHeight={'81.8vh'}
           >
            <Link to='/createHike' bg={'#ADD8E6'}>
            <IconButton
            m="5%" 
            p="6%" 
            textAlign="center" 
            borderRadius="10%"
            width={'300px'}
            height={'190px'}
            mr={'40px'}
            colorScheme='orange'
            aria-label='Legg til tur'
            fontSize='20px' 
            icon={<AddIcon w={50} h={50} />}>
            </IconButton> 
        </Link>

                    {hikes
                        .filter((hike) => {
                            if (difficultySearch === '') {
                                return hike;
                            } else if (JSON.stringify(hike.hikeName).toLowerCase().includes(difficultySearch.toLowerCase())) {
                                return hike;
                            }
                        })
                        .map((hike) => {
                            return (<HikeCard key={hike.id} hike={hike} canEdit={currentUser.uid === hike.createdBy} />)
                        })}
        </Flex>
    </Box>
    );
}

export default Hikes;