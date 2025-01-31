import { useBalance, useReadContract } from 'wagmi';
import { erc20Abi } from 'viem';
import { CURRENCIES, CURRENCY_IDS } from '../constants';
import { useEffect, useState } from 'react';

interface UseTokenBalanceAndAllowanceProps {
  address: `0x${string}`;
  activeChainId: number;
}

interface UseTokenBalanceAndAllowanceResult {
  tokenBalance: bigint | undefined;
  allowance: bigint | undefined;
  ethBalance: bigint | undefined;
  isLoading: boolean;
  error: Error | null;
}

export const useTokenBalanceAndAllowance = ({
  address,
  activeChainId,
}: UseTokenBalanceAndAllowanceProps): UseTokenBalanceAndAllowanceResult => {
  const tokenAddress = CURRENCIES[activeChainId]?.[CURRENCY_IDS.BEAM].ethTokenContract as `0x${string}`;

  const { data: ethBalance, isError } = useBalance({
    query: {
      refetchInterval: 5000,
    },
    address,
  });

  const {
    data: tokenBalance,
    isLoading: isBalanceLoading,
    error: balanceError,
  } = useBalance({
    query: {
      refetchInterval: 5000,
    },
    address,
    token: tokenAddress,
  });

  const {
    data: allowance,
    isLoading: isAllowanceLoading,
    error: allowanceError,
  } = useReadContract({
    query: {
      refetchInterval: 5000,
    },
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [address, address],
  });

  const isLoading = isBalanceLoading || isAllowanceLoading;
  const error = balanceError || allowanceError;

  return {
    tokenBalance: tokenBalance?.value,
    ethBalance: ethBalance?.value,
    allowance: allowance as bigint | undefined,
    isLoading,
    error,
  };
};
