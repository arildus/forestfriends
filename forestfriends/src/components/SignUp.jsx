import { useState, useRef } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext"
import { db } from "../utils/firebase";
import { doc, setDoc } from "firebase/firestore";
import logo from "../assets/logoWhite.png";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  RadioGroup,
  Radio,
  Box,
  FormControl,
  Text,
  Image,
  Container
} from "@chakra-ui/react";
import { WarningBox } from "./AlertBox";
//import { FaUserAlt, FaLock } from "react-icons/fa";

//https://codesandbox.io/s/ncc3q?file=/src/App.js:0-2775

//const CFaUserAlt = chakra(FaUserAlt);
//const CFaLock = chakra(FaLock);

export default function Signup(props) {
    const nameRef = useRef();
    const orgNumberRef = useRef();
    const emailRef = useRef();  
    const passwordRef = useRef(); 
    const passwordRepRef = useRef();
    const { signup, currentUser } = useAuth()
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showPasswordWrong,setShowPasswordWrong] = useState(false)
    const [showPasswordWeak,setShowPasswordWeak] = useState(false)
    const [isComercial, setIsComercial] = useState(false)
    const [heading, setHeading] = useState("Registrer privatperson")
     let navigate = useNavigate()


    async function handleSubmit(e) {
      e.preventDefault()
      console.log(passwordRepRef.current.value)
      if (passwordRef.current.value != passwordRepRef.current.value) {
        setShowPasswordWrong(true)
      } else {
          try {
              setIsSubmitting(true)
              await signup(emailRef.current.value, passwordRef.current.value)
              .then((userCredential, response) => {
                  // Signed in 
                  setDoc(doc(db, "users", userCredential.user.uid), {
                    name: nameRef.current.value,
                    email: emailRef.current.value
                  })
                  if(isComercial) {
                    setDoc(doc(db, "users", userCredential.user.uid), {
                      name: nameRef.current.value,
                      email: emailRef.current.value,
                      orgNumber: orgNumberRef.current.value,
                      comercialUser: true
                    })
                  } else {
                    setDoc(doc(db, "users", userCredential.user.uid), {
                      name: nameRef.current.value,
                      email: emailRef.current.value
                    })
                  }
                  showLoginPage();
                })
          } catch (e){
              if(e.code == "auth/weak-password") {
                setShowPasswordWeak(true)
              }
              //setError("Failed to create account!")
          }
      }
      console.log(currentUser)
      setIsSubmitting(false)
      
  }

  function showLoginPage() {
    props.setShowLogin(true);
  }

  function changeView(value) {
    if (value == 0) {
      setIsComercial(false)
      setHeading("Registrer privatperson")
    } else {
      setIsComercial(true)
      setHeading("Registrer kommersiell aktør")
    }
  }
  

  return (
    <>
      <header>
        <Flex bg={'blue.900'}>
          <Box>
            <Image boxSize="100px" src={logo} alt="logo" />
          </Box>
          <Box p='7'>
            <Heading size='xl' color={'white'}> ForestFriends </Heading>
          </Box>
        </Flex>
      </header>
      <Flex
        flexDirection="column"
        width="100wh"
        height="79.1vh"
        backgroundColor="#ADD8E6"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          <Heading color="green">Velkommen til ForestFriends</Heading>
          <Box minW={{ base: "90%", md: "468px" }}>
            <form>
              <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
              >
                <Heading as="h3" size="md">{heading}</Heading>
                <RadioGroup onChange={e => {
                  changeView(e)
                }} defaultValue="0">
                  <Stack direction='row'>
                    <Radio value={0}>Privat person</Radio>
                    <Radio value={1}>Kommersiell aktør</Radio>
                  </Stack>
                </RadioGroup>
                <FormControl isRequired>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      //children={<CFaUserAlt color="gray.300" />}
                    />
                    <Input type="name" 
                          placeholder="name" 
                          ref={nameRef} 
                          required />
                  </InputGroup>
                </FormControl>
                {isComercial && <FormControl isRequired>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      //children={<CFaUserAlt color="gray.300" />}
                    />
                    <Input type="name" 
                          placeholder="Organisasjonsnummer" 
                          ref={orgNumberRef} 
                          required />
                  </InputGroup>
                </FormControl>}
                <FormControl isRequired>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      //children={<CFaUserAlt color="gray.300" />}
                    />
                    <Input type="email" 
                          placeholder="email" 
                          ref={emailRef} 
                          required />
                  </InputGroup>
                </FormControl>

                <FormControl isRequired>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      //children={<CFaLock color="gray.300" />}
                    />
                    <Input
                      type="password"
                      placeholder="passord"
                      ref={passwordRef} 
                      required
                    />
                  </InputGroup>
                </FormControl>

                <FormControl isRequired>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      //children={<CFaLock color="gray.300" />}
                    />
                    <Input
                      type="password"
                      placeholder="gjenta passord"
                      ref={passwordRepRef} 
                      required
                    />
                  </InputGroup>
                </FormControl>

                <Button
                  borderRadius={0}
                  type="submit"
                  variant="solid"
                  colorScheme="orange"
                  width="100%"
                  onClick={handleSubmit}
                  isLoading={isSubmitting}
                >
                  Registrer bruker
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
        <Box>
            Har du allerede en bruker?{<Text cursor="pointer" onClick={showLoginPage}> Logg inn her</Text>}
        </Box>
      </Flex>
      <WarningBox header = "Feil bekreftelsepassord" text="Prøv på nytt" isVisible = {showPasswordWrong} setVisible = {setShowPasswordWrong}/>
      <WarningBox header = "For svakt passord" text="Passordet må ha minst 6 tegn!" isVisible = {showPasswordWeak} setVisible = {setShowPasswordWeak}/>

      <Box color="#ffffff" background="blue.900" py="2">
      <Container maxWidth="container.xl">
        <Box d="flex" mt="30">
          {' '}
          <Text mr="5" fontSize="sm">
            © 2022 ForestFriends. All rights reserved
          </Text>
        </Box>
      </Container>
    </Box>      
    
    </>
  );
};