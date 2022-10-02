import { Flex, Heading, Button, useToast, Container } from '@chakra-ui/react'
import { getAuth } from 'firebase/auth'
import { doc, deleteDoc, getDocs, collection, query } from 'firebase/firestore';
import { React, useEffect, useState } from 'react'
import { ConfirmBox } from './AlertBox';
import { db } from "../utils/firebase";

function AdminHikeCard(props) {

  const toast = useToast()
  const [deleteBoxVisible, setDeleteBoxVisible] = useState(false)
  const [participants, setParticipants] = useState([])

  useEffect(() => {
    getParticipants()
  }, [])

  async function deleteHike() {
    try {
      await deleteDoc(doc(db, "hikes", props.hike.id))
        .then(() => {
          deleteHikeFromUser()
          participants.forEach((userId) => {
            deleteHikeFromSignup(userId)
          })
          toast({
            title: "Tur slettet",
            status: "success"
          })
        })
    } catch (error) {
      toast({
        title: "Sletting av tur feilet",
        status: "error"
      })
    }
  }

  async function deleteHikeFromUser() {
    await deleteDoc(doc(db, "users", props.hike.createdBy, "hikes", props.hike.id))
  }

  async function deleteHikeFromSignup(userId) {
    await deleteDoc(doc(db, "users", userId, "signedUpHikes", props.hike.id))
  }

  function getParticipants() {
    getDocs(collection(db, "hikes", props.hike.id, "participants"))
      .then((snapshot) => {
          const items = [];
          snapshot.docs.forEach((doc) => {
              items.push(doc.id );
          })
          setParticipants(items)
      });
  }

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
      <Container bg={changeColor}  align={'center'} h={'8rem'} w={'20rem'} borderRadius="10%" m="20px" textAlign="center" >
        <Heading fontSize={'x-large'} alignItems={'center'} mt={'8'} mb={'2'}>
          {props.hike.hikeName}
        </Heading>
        <Button bg={'orange'} onClick = {(e) => setDeleteBoxVisible(true)}>
          Slett tur
        </Button>
        <ConfirmBox header="Er du sikker?" text="Du vil nå slette en tur" isVisible ={deleteBoxVisible} setVisible={setDeleteBoxVisible} onConfirm={deleteHike}/>
      </Container>
    </Flex>
  )
}

export default AdminHikeCard