import { useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext"
import { useNavigate, Link } from "react-router-dom";
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

export default function Login(props) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  let navigate = useNavigate()
  const [showPasswordWrong,setShowPasswordWrong] = useState(false)
  const [showWeHaveProblems,setShowWeHaveProblems] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      //testing login
      setIsSubmitting(true)
      console.log("login")
      await login(emailRef.current.value, passwordRef.current.value)
        .then((userCredential, response) => {
          // Logged in
          const user = userCredential.user;
          props.setLoggedIn(true)
        })
    } catch (error) {
      console.log(error.code)
      if (error.code == "auth/wrong-password") {
        console.log("runs")
        setShowPasswordWrong(true)
      } else {
        setShowWeHaveProblems(true)
      }
    }
    setIsSubmitting(false)
  }
  //change to login page
  function hideLoginPage() {
    props.setShowLogin(false);
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
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                    //children={<CFaUserAlt color="gray.300" />}
                    />
                    <Input type="email"
                      placeholder="email"
                      ref={emailRef}
                      required
                      id="field-1" />
                  </InputGroup>
                </FormControl>

                <FormControl>
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
                      id="field-2"
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
                  id="button"
                >
                  Logg inn
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
        <Box>
          Er du ikke registrert?{<Text cursor="pointer" onClick={hideLoginPage}> Registrer bruker her</Text>}
        </Box>
      </Flex>
      <WarningBox header = "Feil passord" text="Prøv på nytt" isVisible = {showPasswordWrong} setVisible = {setShowPasswordWrong}/>
      <WarningBox header = "Obs! Noe gikk galt!" text="Prøv igjen senere" isVisible = {showWeHaveProblems} setVisible = {setShowWeHaveProblems}/>
      
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

