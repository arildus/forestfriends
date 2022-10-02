import {
  Box,
  Container,
  Text,
} from '@chakra-ui/react';


function Footer() {
  return (
    <Box color="#ffffff" background="blue.900" py="2">
      <Container maxWidth="container.xl">

        {/* bottom links */}
        <Box d="flex" mt="30">
          {' '}
          <Text mr="5" fontSize="sm">
            © 2022 ForestFriends. All rights reserved
          </Text>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
