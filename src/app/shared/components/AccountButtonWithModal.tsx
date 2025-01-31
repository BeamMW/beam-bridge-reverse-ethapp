import React, { useEffect, useState } from 'react';
import { formatActiveAddressString } from '@core/appUtils';
import { 
  Button,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
  Select,
} from '@chakra-ui/react';
import { useAccount, useDisconnect, useSwitchChain } from 'wagmi';
import { IconBeam, IconCopyWhite, IconEth, IconLogout } from '../icons';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { selectBalance } from '@app/containers/Main/store/selectors';
import { useTokenBalanceAndAllowance } from '../hooks';
import TokenCard from './TokenCard';

const AccountButtonWithModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { chains, switchChain } = useSwitchChain();
  const { address, chain: activeChain, connector } = useAccount();
  const { disconnect } = useDisconnect();

  const [ activeAddress, setActiveAddress ] = useState<string>("");
  const [selectedNetwork, setSelectedNetwork] = useState(activeChain?.id);

  const { tokenBalance, ethBalance, allowance, isLoading, error } = useTokenBalanceAndAllowance({
    address: address as `0x${string}`,
    activeChainId: activeChain?.id as number,
  });

  useEffect(() => {
    setActiveAddress(formatActiveAddressString(address));
  }, [address]);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(address || "");
    toast('Address copied to clipboard');
  };
  
  return (
    <>
      <Button onClick={onOpen} borderRadius={"22px"} border={"solid 1px #fff"} bgColor={"rgba(255, 255, 255, 0.1)"} color={"#fff"}>
        { activeAddress }
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor={"rgba(13, 77, 118)"}>
          <ModalHeader fontSize={"16px"} textAlign={"center"}>
            {connector?.name} wallet
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody paddingBottom={"20px"}>
            <VStack alignItems={"start"}>
              <Text fontSize={"14px"} fontWeight={"bold"} letterSpacing={"2.6px"}>
                BRIDGE ADDRESS
              </Text>
              <HStack >
                <Text mr={"15px"} fontSize={"14px"}>
                  {address}
                </Text>
                <IconCopyWhite onClick={handleCopyClick} cursor={"pointer"}/>
              </HStack>

              <Text fontSize={"14px"} fontWeight={"bold"} letterSpacing={"2.6px"}>
                NETWORK
              </Text>

              <Select value={selectedNetwork} onChange={(e) => {
                setSelectedNetwork(parseInt(e.target.value));
                switchChain?.({ chainId: parseInt(e.target.value) });
              }}>
                {chains.map((chain) => (
                  <option value={chain.id} key={chain.id}>
                    {chain.name}
                  </option>
                ))}
              </Select>

              <Text fontSize={"14px"} fontWeight={"bold"} letterSpacing={"2.6px"}>
                SUPPORTED TOKENS
              </Text>

              <Flex direction={"column"}>
                <TokenCard 
                  isApproved={true}
                  isToken={false}
                  title={"eth"}
                  icon={IconEth}
                />

                <TokenCard 
                  isApproved={!!allowance}
                  isToken={true}
                  title={"beam"}
                  icon={IconBeam}
                />
              </Flex>
            </VStack>
          </ModalBody>
          <ModalFooter justifyContent={"center"}>
            <Button onClick={() => disconnect()}
              bgColor={"#ff746b"}
              borderRadius={"22px"}
              padding={"0 25px"}
            >
              <IconLogout />
              <Text ml={"10px"}>
                disconnect wallet
              </Text>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
)};

export default AccountButtonWithModal;
