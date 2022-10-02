import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, updateDoc, deleteDoc, getDoc, setDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";
import LoadingPlaceHolder from "./LoadingPlaceholder";


import {
    Heading,
    Box,
    Container,
    Image,
    Button,
    Flex,
    Grid,
    GridItem,
    toast,
    useToast
} from "@chakra-ui/react";


let hike;
function HikeInfo() {
    const { hikeId } = useParams()
    const [loading, setLoading] = useState(true)
    const [loadingUser, setLoadingUser] = useState(true)
    const [hikeName, setHikeName] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [length, setLength] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [date, setDate] = useState('');
    const [participants, setParticipants] = useState([]);
    const [isComercial, setIsComercial] = useState(false);
    const [maxPart, setMaxPart] = useState(0);
    const [price,setPrice] = useState(0);
    const [createdBy, setCreatedBy] = useState("");
    const [signedUp, setSignedUp] = useState(false)
    const [signingUp, setSigningUp] = useState(false)
    const toast = useToast()
  
    let detailedHike;
    let navigate = useNavigate();
    const { currentUser } = useAuth()
    


    function getHike() {
        const hikeRef = doc(db, "hikes", hikeId)
        getDoc(hikeRef).then(docSnap => {
            detailedHike = docSnap.data();
            setCreatedBy(detailedHike.createdBy)
            setHikeName(detailedHike.hikeName)
            setDifficulty(detailedHike.difficulty)
            setLength(detailedHike.length);
            setDescription(detailedHike.description);
            setType(detailedHike.type);
            setDate(detailedHike.date);
            setIsComercial(detailedHike.isComercial);
            if (detailedHike.isComercial) {
                setMaxPart(detailedHike.maxParticipants);
                setPrice(detailedHike.price)
            }
            setLoading(false)
            
        })
    }

    async function getParticipants() {
        const participantsRef = collection(db, "hikes", hikeId, "participants")
        await getDocs(participantsRef)
            .then((users) => {
                const participants = []
                users.docs.forEach((user) => {
                    participants.push(user.id)
                })
                setParticipants(participants)
                if (participants.includes(currentUser.uid)) {
                    setSignedUp(true)
                }
            })
    }

    function changeSignedUpStatus() { //set inn her arild
        setSigningUp(true)
        if (signedUp) {
            deleteDoc(doc(db, "hikes", hikeId, "participants", currentUser.uid))
                .then(() => {
                    deleteDoc(doc(db, "users", currentUser.uid, "signedUpHikes", hikeId))
                        .then(() => {
                            toast({
                                title: "Du er nå meldt av turen",
                                status: "success"
                              })
                              setSignedUp(false)
                              setSigningUp(false)
                        })
                })
        } else {
            setDoc(doc(db, "hikes", hikeId, "participants", currentUser.uid), {
                name: currentUser.email
            }).then(() => {
                setDoc(doc(db, "users", currentUser.uid, "signedUpHikes", hikeId), {
                    hikeName: hikeName
                }).then(() =>  {
                    toast({
                        title: "Du er nå meldt på turen",
                        status: "success"
                    })
                    setSignedUp(true)
                    setSigningUp(false)
                })
            })
        }
    }

    useEffect(() => {
        setLoading(true)
        getHike()
    }, [hikeId]);

    useEffect(()=>{
        setLoadingUser(true)
        if (currentUser !== undefined) {
           setLoadingUser(false)
           getParticipants()
        }
    },[currentUser, participants])

    if (loading || loadingUser) {
        return(<LoadingPlaceHolder />)
    }

    return (
        <Box pb="5"
            pt="18"
            backgroundColor="#ADD8E6"
            >
            <Container>
                <Flex
                    backgroundColor="whiteAlpha.900"
                    boxShadow="md"
                >

                    <Box py="20" flexDirection="column" bg={'#edeff5'} h={'600px'}>
                        <Box align={'center'}>
                            <Heading fontWeight="bold">
                                {hikeName}
                            </Heading>
                            <Box mt="4" fontWeight="medium"  borderRadius={'9'} bg={'white'} w={'80%'}>
                                <Box>Dato: {date}   </Box>
                            </Box>

                            <Grid mt="4" templateColumns='repeat(7, 1fr)' justifyItems={'center'} bg={'white'} borderRadius={'9'} w={'80%'}>
                                <GridItem ml={'60px'}>Vanskelighetsgrad:</GridItem>
                                <GridItem ml={'1'}>{difficulty}</GridItem>
                            </Grid>
                            <Box mt="4" fontWeight="medium" borderRadius={'9'} bg={'white'} w={'80%'}>
                                <Box>Lengde: {length} km  </Box>
                            </Box>
                            <Box mt="4" fontWeight="medium"  borderRadius={'9'} bg={'white'} w={'80%'}>
                                <Box>Type tur: {type}   </Box>
                            </Box>
                            <Box mt="4" fontWeight="medium"  borderRadius={'9'} bg={'white'} w={'80%'}>
                                <Box>Antall påmeldte: {participants.length} </Box>
                            </Box>
                            <Box mt="4"  borderRadius={'9'} bg={'white'} w={'80%'}>
                                <Box mt="1" fontWeight={'semibold'}>Beskrivelse:</Box>
                                <Box mt="2" fontWeight="medium">
                                    <Box>{description}</Box>
                                </Box>
                            </Box>
                            {isComercial && <div>
                                <Box mt="4" fontWeight="medium"  borderRadius={'9'} bg={'white'} w={'80%'}>
                                    <Box>{price ? "Turen koster: " + price +"kr per person" : "Turen er gratis"}</Box>
                                </Box>
                                <Box mt="4" fontWeight="medium"  borderRadius={'9'} bg={'white'} w={'80%'}>
                                    <Box>{maxPart ? "Maks antall deltagere: " + maxPart : "Turen har ingen antallsbegrensning"}</Box>
                                </Box>
                            </div>}
                            {currentUser.uid !== createdBy && <Button bg={'white'} mt="4" onClick={changeSignedUpStatus} isLoading={signingUp}> {signedUp ? "Meld meg av" : "Meld meg på"} </Button>}
                            {currentUser.uid === createdBy && <Button bg={'white'} mt="4" onClick={() => navigate("/edit/" + hikeId)}>

                                Rediger
                            </Button>}
                        </Box>
                    </Box>
                </Flex>
                <Button mt='5'
                    ml='20'
                    mr='20'
                    onClick={() => navigate("/hikes")}
                    colorScheme='orange'
                    width='60%'>
                    Tilbake til turer
                </Button>
            </Container>

        </Box>
    )
}

export default HikeInfo;