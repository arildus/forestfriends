import React, { useEffect, useState, useRef } from "react";
import { db } from "../utils/firebase";
import { useNavigate } from 'react-router-dom'
import { collection, addDoc, query, where, setDoc,  getDoc, doc, onSnapshot } from "firebase/firestore";
import { Box, Button, FormControl, Input, Heading,
     Select,Text, Stack, Grid, GridItem, useToast,
    Textarea, RadioGroup, Radio} from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import LoadingPlaceHolder from "./LoadingPlaceholder";


function CreateHike() {
    const difficultyRef = useRef();
    const hikeNameRef = useRef();
    const dateRef = useRef();
    const descriptionRef = useRef();
    const lengthRef = useRef();
    const typeRef = useRef();
    const maxRef = useRef();
    const priceRef = useRef();
    const [isLoading,setIsLoading] = useState(true)
    const [isSubmitting, setSubmitting] = useState(false)
    const [showMax, setShowMax] = useState(false);
    const [showPrice, setShowPrice] = useState(false);
    const [isComercial, setIsComercial] = useState(false);
    const { currentUser } = useAuth()
    const toast = useToast()
    let hikeRef = collection(db, "hikes");
    let navigate = useNavigate()
    //lagrer data
    async function handleSubmit(e) {
        e.preventDefault()
        setSubmitting(true)
        
        
        try {

            const document = {
                difficulty: difficultyRef.current.value,
                hikeName: hikeNameRef.current.value,
                createdBy: currentUser.uid,
                date: dateRef.current.value,
                type: typeRef.current.value,
                length: lengthRef.current.value,
                description: descriptionRef.current.value
            }

            if(isComercial) {
                document["isComercial"] = true;
            } 

            if(showMax) {
                document["maxParticipants"] = maxRef.current.value;
            } else {
                document["maxParticipants"] = 0
            }

            if (showPrice) {
                document["price"] = priceRef.current.value;
            }  else {
                document["price"] = 0;
            }
            addDoc(hikeRef, document)
                .then(docref => {
                    setDoc(doc(db, "users", currentUser.uid, "hikes", docref.id), {
                        hikeName: hikeNameRef.current.value
                    })
                    toast({
                        title: "Hike created successfully",
                        status: "success"
                    })
                    navigate("/hikeinfo/" + docref.id)
                })
        } catch (error) {
            toast({
                title: "Failed to create hike.",
                status: "error"
            })
        }
        setSubmitting(false)
    };


   function checkIfComercial(userId) {
        const userRef = doc(db, "users", userId)
        try {
            getDoc(userRef)
                .then((doc) => {
                    if (doc.data().comercialUser) {
                        setIsComercial(true,setIsLoading(false))
                    } else {
                        
                        setIsComercial(false,setIsLoading(false))
                    }
                })
        } catch (error) {
            
        }
    }
    function viewMaxInput(value) {
        if (value === "1") {
            setShowMax(true)
        } else {
            setShowMax(false)
        }
    }

    function viewPriceInput(value) {
        if (value === "1") {
            setShowPrice(true)
        } else {
            setShowPrice(false)
        }
    }

    function checkUser() {
        if (currentUser !== undefined) {
            checkIfComercial(currentUser.uid)
        }
    }
    useEffect(() => {
        checkUser()
    },[currentUser]);

    


    if(isLoading) {
        return (<LoadingPlaceHolder />)
    }
    return(
        <>
            <Stack alignItems="center"
            justifyContent="space-between" textAlign="center"
            bg={'#ADD8E6'}
            id="container">
                <Heading as='h2'>Legg til tur</Heading>
                <Box
                        mt={'20px'}
                        p="1rem"
                        width={'25%'}
                        backgroundColor="whiteAlpha.900"
                        boxShadow="md">
                        <FormControl id="addHike" spacing={4}>
                            <Heading as='h4' size="sm">Turnavn</Heading>
                            <Input type="text"
                                name="hikeName"
                                placeholder={'Turnavn'}
                                bg={'white'}
                                ref={hikeNameRef} isRequired/>
                            <Heading as='h4' size="sm">Type tur</Heading>
                            <Select variant='filled' 
                            ref={typeRef}>
                                <option>Fottur</option>
                                <option>Fjelltur</option>
                                <option>Sykkeltur</option>
                                <option>Skitur</option>
                                <option>Kajaktur</option>
                                <option>Aktivitet</option>
                            </Select>
                            <Heading as='h4' size="sm">Vanskelighetsgrad</Heading>
                            <Select variant='filled' 
                            ref={difficultyRef}>
                                <option style={{color: 'green' }}>Grønn</option>
                                <option style={{color: 'blue' }}>Blå</option>
                                <option style={{color: 'red' }}>Rød</option>
                                <option style={{color: 'black' }}>Svart</option>
                            </Select>
                            <Heading as='h4' size="sm">Dato</Heading>
                            <Input type="date"
                                name="dateForTrip"
                                bg={'white'}
                                ref={dateRef}
                            />
                            <Heading as='h4' size="sm">Lengde (km)</Heading>
                            <Input type="number"
                                name="lengthOfTrip"
                                bg={'white'}
                                ref={lengthRef}
                            />
                            <Heading as='h4' size="sm">Beskrivelse</Heading>
                            <Textarea type="text"
                                name="descriptionForTrip"
                                bg={'white'}
                                ref={descriptionRef}
                            />
                            {isComercial && <div>

                                <Heading as='h4' size="sm">Ønsker du maks antall deltagere?</Heading>
                                <RadioGroup onChange={e => {
                                viewMaxInput(e)
                                }} defaultValue={0} value={+ showMax}>
                                    <Stack direction='row'>
                                        <Radio value={1}>Ja</Radio>
                                        <Radio value={0}>Nei</Radio>
                                    </Stack>
                                </RadioGroup>
                                {showMax && <div>
                                    <Heading as='h4' size="sm">Maks antall deltagere</Heading>
                                    <Input type="number"
                                        name="maxParticipants"
                                        bg={'white'}
                                        ref={maxRef}
                                    ></Input>
                                </div>}
                                <Heading as='h4' size="sm">Er dette en betalingstur?</Heading>
                                <RadioGroup onChange={e => {
                                viewPriceInput(e)
                                }} defaultValue={0} value={+ showPrice}>
                                    <Stack direction='row'>
                                        <Radio value={1}>Ja</Radio>
                                        <Radio value={0}>Nei</Radio>
                                    </Stack>
                                </RadioGroup>
                                {showPrice && <div>
                                    <Heading as='h4' size="sm">Pris</Heading>
                                    <Input type="number"
                                        name="priceRef"
                                        bg={'white'}
                                        ref={priceRef}
                                    />
                                </div>}
                            </div>}
                            <Button
                                onClick={handleSubmit}
                                isLoading={isSubmitting}
                                colorScheme='orange'
                                mt='2'
                                type="submit"
                                width="100%">
                                Legg til tur
                            </Button>
                        </FormControl>
                    </Box>
                </Stack>
        </>
    )
}

export default CreateHike;