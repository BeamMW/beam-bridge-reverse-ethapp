import React, { useEffect, useState } from 'react';
import { styled } from '@linaria/react';
import { Button } from '.';
import { Box } from '@chakra-ui/react';
import { ethers, utils } from 'ethers';
import { floatFormat } from '@app/core/appUtils';
import { CURRENCIES, CURRENCY_IDS } from '../constants';
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { erc20Abi, maxUint256 } from 'viem';
import { toast } from 'react-toastify';

interface TokenCardProps {
  isToken: boolean;
  isApproved: boolean;
  title: string;
  icon: React.FC;
  balance?: bigint;
}

const CardStyled = styled.div<{
  type: string,
  isWithBalance: boolean
}>`
  width: 100%;
  height: ${({ isWithBalance }) => `${isWithBalance ? "75px" : "66px"}`};
  margin-top: 10px
  padding: 20px;
  border-radius: 10px;
  background-image: linear-gradient(102deg, 
    ${({ type }) => `var(--color-${type?.toLowerCase()}-from)`} 2%, rgb(0, 69, 143, .3) 98%);
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const BalanceStyled = styled.span`
  margin-left: 10px;
  display: relative;
`;

const BalanceValue = styled.div`
  font-size: 16px;
  margin-left: 10px;
`;

const StyledApproveButton = styled.span`
  margin-left: auto;
`;

const TokenCard: React.FC<TokenCardProps> = ({
  isToken,
  isApproved,
  title,
  icon,
  balance,
  ...rest
}) => {
  const Icon = icon;
  const cardTitle = title?.toUpperCase();
  const { address, chain: activeChain } = useAccount();
  const weiBigNumberBalance = ethers.BigNumber.from(balance ? balance?.toString() : 0);
  const { writeContract, data } = useWriteContract();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const token = CURRENCIES[activeChain?.id as number]?.[CURRENCY_IDS.BEAM];

  const revoke = () => {
    setIsLoading(true);
    toast('Revoke is in progress');
    writeContract({
      address: token.ethTokenContract as `0x${string}`,
      abi: erc20Abi,
      functionName: 'approve',
      args: [address as `0x${string}`, BigInt(0)],
    });
  };

  const approve = () => {
    setIsLoading(true);
    toast('Approve is in progress');
    writeContract({
      address: token.ethTokenContract as `0x${string}`,
      abi: erc20Abi,
      functionName: 'approve',
      args: [address as `0x${string}`, maxUint256],
    });
  };

  // const { isLoading: isTxLoading, isSuccess: isTxSuccess } = useWaitForTransactionReceipt({
  //   hash: data
  // });

  useEffect(() => {
    if (isLoading) {
      toast('Allowance update is complete');
      setIsLoading(false);
    }
  }, [isApproved]);
  
  return (
    <CardStyled type={title} isWithBalance={balance !== undefined} {...rest}>
      <Icon />
      <BalanceStyled>
        <BalanceValue>{floatFormat(utils.formatEther(weiBigNumberBalance))} {cardTitle}</BalanceValue>
      </BalanceStyled>
      <Box ml={"30px"}>
        {isToken && (
          <StyledApproveButton>
            {isApproved ? (
              balance === undefined && <Button 
                variant='revoke'
                disabled={isLoading}
                onClick={() => revoke()}
              >
                revoke
              </Button>
            ) : (
              <Button 
                variant='validate'
                disabled={isLoading} 
                onClick={() => approve()}
              >
                approve token
              </Button>
            )}
          </StyledApproveButton>
          )
        }
      </Box>
    </CardStyled>
  )
};

export default TokenCard;
