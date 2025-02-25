import React from 'react';
import { Button, Window } from '@app/shared/components';
import { ROUTES } from '@app/shared/constants';
import { IconCopyBlue, IconBack } from '@app/shared/icons';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAccount } from 'wagmi';
import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { useAddress } from '@app/shared/hooks';

const Receive = () => {
  const navigate = useNavigate();
  const { chain: activeChain } = useAccount();
  const { fullAddress } = useAddress();
  
  const handleCopyClick: React.MouseEventHandler = () => {
    navigator.clipboard.writeText(fullAddress as `0x${string}`);
    toast('Address copied to clipboard');
    navigate(ROUTES.MAIN.BASE);
  };

  const handleBackClick: React.MouseEventHandler = () => {
    navigate(ROUTES.MAIN.BASE);
  };

  const handleDownloadClick: React.MouseEventHandler = () => {
    window?.open('https://beam.mw/downloads', '_blank');
  }

  return (
    <Window>
      <HStack width="600px" margin="20px auto">
        <HStack cursor={"pointer"} onClick={handleBackClick}>
          <IconBack style={{ width: "15px", height: "15px" }}/>
          <Text ml={"5px"} fontSize={"14px"} fontWeight={"bold"} opacity={".3"}>
            back
          </Text>
        </HStack>
      </HStack>

      <VStack
        width={"600px"}
        borderRadius={"10px"}
        padding={"50px 30px"}
        backgroundImage={"linear-gradient(to bottom, rgba(11, 204, 247, 0.5), rgba(11, 204, 247, 0)), linear-gradient(to bottom, #0d4d76, #0d4d76)"}
      >
        <Text fontSize={"24px"} fontWeight={"bold"} alignSelf={"center"}>
          BEAM ={'>'} WBEAM ({activeChain?.name})
        </Text>
        <Text margin={"50px auto 0"} opacity={".7"} fontStyle={"italic"}>Your {activeChain?.name} Bridge address:</Text>
        <Text margin={"20px auto 0"}>{fullAddress}</Text>
        <Flex justifyContent={"center"} mt={"50px"}>
          <Button onClick={handleCopyClick}
            pallete='blue'
            icon={IconCopyBlue}
            color="send"
          >
            copy and close
          </Button>
        </Flex>
      </VStack>
      <Box mt={"20px"}
        width={"600px"}
        borderRadius={"10px"}
        fontSize={"14px"}
        fontStyle={"italic"}
        padding={"40px"}
        backdropFilter={"blur(10px)"}
        bgColor={"rgba(13, 77, 118, .95)"}
      >
        <Text opacity={".7"} mb={"20px"}>
          In order to transfer from Beam to {activeChain?.name} network, do the following:
        </Text>
        <ul color={"rgba(255, 255, 255, .7)"}>
          <HStack>
            <Text>
              1.	Download the latest verison of
            </Text>
            <Text onClick={handleDownloadClick}
              cursor={"pointer"}
              fontWeight={"bold"}
              color={"#05e2c2"}
            >
              Beam Wallet
            </Text>
          </HStack>
          <Text>2.	Launch Bridges DApp from DApp store</Text>
          <HStack>
            <Text>3.	Select</Text>
            <Text fontWeight={"bold"}>Beam to Ethereum</Text>
          </HStack>
          <Text>4.	Paste this address to Ethereum Bridge Address field</Text>
        </ul>
      </Box>
    </Window>
  );
};

export default Receive;
