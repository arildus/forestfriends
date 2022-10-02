import { Box, Container , Flex, Grid, GridItem, Heading} from "@chakra-ui/react";

function LoadingPlaceHolder() {
    return(
        <Grid width={'100vw'} height={'100vh'} justifyContent={'center'} bg={'#ADD8E6'}>
            <GridItem mt={'30vh'} fontSize={'2rem'} fontWeight={'extrabold'}
            > Laster inn.. </GridItem>
        </Grid>
    )
}

export default LoadingPlaceHolder;