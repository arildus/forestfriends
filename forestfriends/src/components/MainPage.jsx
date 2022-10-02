import { Box, Image, Button, Container, Heading, Grid, Spacer, Flex, color, bg} from '@chakra-ui/react';
import { Link } from 'react-router-dom'
import logo from "../assets/logo.svg";
import walk from "../assets/walk.png";
import destination from "../assets/destination.png";
import meetPeople from "../assets/meetPeople.png";

function Navbar() {
    return (
        <>
            <Box bg={'#ADD8E6'} alignContent={'center'}>
                <Box>
                    <Container maxWidth="container.xl"  >
                        <Box d="flex" alignItems="center" py="20" flexDirection="row">
                            <Box>
                                <Heading>
                                    ForestFriends
                                </Heading>
                                <Box mt="6" fontWeight="medium">
                                    Med ForestFriends kan du utforske turer over hele Norge.
                                    Møt turglade nordmenn og dra på uforglemmelige reiser!
                                </Box>
                            </Box>
                            <Box w="70%" ml={'125px'}>
                                <Image w="50%" src={walk} alt="image of walking man with a stick"></Image>

                            </Box>
                        </Box>
                    </Container>
                </Box>
                <Container maxW="container.xl" mt={10}>
                    <Grid templateColumns="repeat(2, 1fr)">
                        <Box>
                            <Link to={'/hikers'}>
                                <Image
                                    w="50%"
                                    borderRadius="lg"
                                    src={meetPeople}
                                    alt="meetPeople image" 
                                    />
                            </Link>
                            <Button colorScheme="Black" variant="link" mt="5" ml="100px" size={'lg'}>
                                <Link to="/hikers"> Møt en turvenn </Link>
                            </Button>
                        </Box>
                        <Box>
                            <Link to={'/hikes'}>
                                <Image
                                    w="50%"
                                    borderRadius="lg"
                                    src={destination}
                                    alt="destination image" />
                            </Link>
                            <Button colorScheme="Black" variant="link" mt="5" ml="150px" size={'lg'}>
                                <Link to="/hikes"> Finn turer! </Link>
                            </Button>
                        </Box>
                    </Grid>
                </Container>
            </Box>
        </>
    );
}

export default Navbar;