import React from "react";
import { useNavigate } from "react-router-dom";
import { Heading, Text, Flex } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import { Box } from "@chakra-ui/react";

function HikeCard(props) {

    let navigate = useNavigate()
    const { currentUser } = useAuth()


    function changeColor() {
        if (props.hike.isComercial) {
            return 'green';
        }
        else {
            return 'blue.50';
        }
    }

    return (
        <Flex>
            <Box onClick={() => navigate("../hikeinfo/" + props.hike.id)} cursor={'pointer'}
                orange="white"
                x m="20px"
                p="6%"
                bg={changeColor}
                textAlign="center"
                borderRadius="10%"
                width={'300px'}
                height={'190px'}
            >
                <Box>
                    <Heading as='h3' size='md'>{props.hike.hikeName}</Heading>
                    <Text as='h4' size='sm'>Vanskelighetsgrad: {props.hike.difficulty}</Text>
                    <Text as='h5' size='sm'>Dato: {props.hike.date}</Text>
                    <Text as='h6' size='sm'>Type: {props.hike.type}</Text>
                </Box>
            </Box>
        </Flex>

    );
}

export default HikeCard;