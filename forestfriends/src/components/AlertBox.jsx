import {Button,AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from '@chakra-ui/react'

import { useState , useEffect } from "react"


function AlertConfirmBox(props) {
    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => props.setVisible(false)
    
    useEffect(() => {
        setIsOpen(props.isVisible);
    }, [props.isVisible]);


    function cancel() {
      onClose();
    }

    function confirm() {
      onClose();
      props.onConfirm()
    }
    return (
      <>
        <AlertDialog
          isOpen={isOpen}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                {props.header}
              </AlertDialogHeader>
  
              <AlertDialogBody>
                {props.text}
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button  onClick={cancel}>
                  Avbryt
                </Button>
                <Button colorScheme='red' onClick={confirm} ml={3}>
                  Bekreft
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }

  function AlertWarningBox(props) {
    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => props.setVisible(false)
    
    useEffect(() => {
        setIsOpen(props.isVisible);
    }, [props.isVisible]);

    return (
      <>
        <AlertDialog
          isOpen={isOpen}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                {props.header}
              </AlertDialogHeader>
  
              <AlertDialogBody>
                {props.text}
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button  onClick={onClose}>
                  Ok
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }

export const ConfirmBox = AlertConfirmBox;
export const WarningBox = AlertWarningBox;