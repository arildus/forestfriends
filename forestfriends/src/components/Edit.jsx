import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Select, Box, Button, FormControl, Input, Textarea,Heading, Stack, useToast, RadioGroup, Radio} from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import { collection, addDoc, getDoc, setDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useAuth } from "../contexts/AuthContext";
import { useParams } from 'react-router-dom';
import LoadingPlaceHolder from './LoadingPlaceholder';


export default function Edit(props) {

	const { hikeId } = useParams()
	//const location = useLocation()
	//const { hikeId } = location.state
	const [loading, setLoading] = useState(true);
	const [isUpdating, setUpdating] = useState(false)
	const [isDeleting, setDeleting] = useState(false)
	const difficultyRef = useRef();
	const hikeNameRef = useRef();
	const dateRef = useRef()
	const typeRef = useRef()
	const lengthRef = useRef()
	const descriptionRef = useRef()
	const maxRef = useRef();
    const priceRef = useRef();
	const { currentUser } = useAuth()
	const toast = useToast()

	let navigate = useNavigate()

	const hikesRef = collection(db, "hikes");
	const hikeRef = doc(db, "hikes", hikeId)
	let hike;
	const [hikeName, setHikeName] = useState('');
	const [difficulty, setDifficulty] = useState('')
	const [date, setDate] = useState('')
	const [type, setType] = useState('')
	const [length, setLength] = useState('')
	const [description, setDescription] = useState('')
	const [max, setMax] = useState('');
	const [price, setPrice] = useState('');
	const [showMax, setShowMax] = useState(false);
    const [showPrice, setShowPrice] = useState(false);
    const [isComercial, setIsComercial] = useState(false);
	
	function getHike() {
		getDoc(hikeRef).then((doc) => {
			hike = doc.data()
			if (hike.createdBy != currentUser.uid) { //denied access
				navigate("/")
			}
			setHikeName(hike.hikeName)
			setDifficulty(hike.difficulty)
			setDate(hike.date)
			setType(hike.type)
			setLength(hike.length)
			setDescription(hike.description)
			if(hike.isComercial) {
				setIsComercial(true)
				if(hike.maxParticipants != 0) {
					setMax(hike.maxParticipants)
					setShowMax(true)
				}
				if (hike.price != 0 ) {
					setPrice(hike.price)
					setShowPrice(true)
				}
			}
			
			setLoading(false)
		})

	}

	async function handleUpdate(e) {
		e.preventDefault()
		setUpdating(true)
		console.log("updating")
		const document = {
			difficulty: difficultyRef.current.value,
			hikeName: hikeNameRef.current.value,
			createdBy: currentUser.uid,
			date: dateRef.current.value,
			type: typeRef.current.value,
			length: lengthRef.current.value,
			description: descriptionRef.current.value
		}

		if(showMax) {
			document["maxParticipants"] = maxRef.current.value;
		} else {
			document["maxParticipants"] = 0
		}
		if (showPrice) {
			document["price"] = priceRef.current.value;
		} else {
			document["price"] = 0;
		}
		try {
			await updateDoc(hikeRef, document)
			.then(() => {
				toast({
					title: "Hike updated successfully",
					status: "success"
				})
			})
		} catch (error) {
			console.log(error)
			toast({
				title: "Failed to update hike",
				status: "error"
			})
		}
		setUpdating(false)
	};

	async function handleDelete(e) {
		e.preventDefault()
		setDeleting(true)
		try {
			await deleteDoc(hikeRef)
				.then(() => {
					const userHikeRef = doc(db, "users", currentUser.uid, "hikes", hikeId)
					deleteDoc(userHikeRef).then(() => {
						toast({
							title: "Hike deleted successfully",
							status: "success"
						  })
						setDeleting(false)
						navigate("/hikes")
					})
				})
		} catch (error) {
			toast({
				title: "Failed to delete hike",
				status: "error"
			  })
		}
		setDeleting(false)
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
	
	function checkUser(user) {
		if (user !== undefined) {
			getHike();
		}
	}
	useEffect(() => {
		checkUser(currentUser)
    }, [currentUser]);

	if (loading) {
        return <LoadingPlaceHolder />
    }

	return (
		<Stack alignItems="center"
			justifyContent="space-between" textAlign="center" bg={'#ADD8E6'}>
				<Box maxW='sm' overflow='hidden'>
					<FormControl id="addHike" >
					<Heading as='h4' size="sm">Turnavn</Heading>
						<Input type="text" 
							name="hikeName"
							bg={'white'}
							defaultValue={hikeName}
							ref={hikeNameRef}/>
						<Heading as='h4' size="sm">Type tur</Heading>
                        <Select variant='filled' bg={'white'} defaultValue={type}
                            ref={typeRef}>
                            <option>Fottur</option>
                            <option>Fjelltur</option>
                            <option>Sykkeltur</option>
                            <option>Skitur</option>
                            <option>Kajaktur</option>
                            <option>Aktivitet</option>
                        </Select>
						<Heading as='h4' size="sm">Vanskelighetsgrad</Heading>
                            <Select variant='filled' bg={'white'} defaultValue={difficulty}
                            ref={difficultyRef}>
                                <option style={{color: 'green' }}>Grønn</option>
                                <option style={{color: 'blue' }}>Blå</option>
                                <option style={{color: 'red' }}>Rød</option>
                                <option style={{color: 'black' }}>Svart</option>
                            </Select>
						<Heading as='h4' size="sm">Dato</Heading>
						<Input type="date"
							bg={'white'} 
                            name="dateForTrip"
							defaultValue={date}
                            ref={dateRef}/>
						<Heading as='h4' size="sm">Lengde (km)</Heading>
                            <Input bg={'white'} type="number"
                                name="lengthOfTrip"
                                bg={'white'}
                                ref={lengthRef}
								defaultValue={length}
                            />
                        <Heading as='h4' size="sm">Beskrivelse</Heading>
                        <Textarea type="text"
							bg={'white'}
                            name="descriptionForTrip"
                            bg={'white'}
                            ref={descriptionRef}
							defaultValue={description}
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
									defaultValue={max}
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
									defaultValue={price}
								/>
							</div>}
						</div>}
						<Button 
							onClick={handleUpdate} 
							colorScheme='blue'
							isLoading={isUpdating}
							m={'2'}
						>
							Endre tur
						</Button>
						<Button onClick={handleDelete} 
								colorScheme='red'
								isLoading={isDeleting}
								m={'2'}>
								Slett tur
						</Button>
					</FormControl>
					
				</Box>
		</Stack>
	)
}
