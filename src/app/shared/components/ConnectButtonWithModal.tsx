import React from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  VStack,
  Box,
  Img,
  Text,
} from "@chakra-ui/react";
import { useConnect } from 'wagmi';
import { IconMetamask } from '../icons';

const ConnectButtonWithModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { connectors, connect } = useConnect();

  return (
    <>
      <Button onClick={onOpen}>
        Connect wallet
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent color={"black"}>
          <ModalHeader>
            Connect a wallet
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody paddingBottom={"20px"}>
            <VStack>
              {
                connectors.map((connector) => (
                  <Button key={connector.uid} onClick={() => connect({ connector })} width={"200px"}>
                    { connector.name === "MetaMask" ? <IconMetamask /> : ""}
                    { connector.icon && <Img src={connector.icon} width={"34px"} height={"34px"}></Img> }
                    <Text ml={"5px"}>{connector.name}</Text>
                  </Button>
                ))
              }
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConnectButtonWithModal;
