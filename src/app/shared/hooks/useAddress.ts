import { useAccount } from 'wagmi';
import { NETWORK_INDICATOR } from '../constants';
import { useEffect, useState } from 'react';

interface useAddressResult {
  fullAddress: `0x${string}` | null,
}

export const useAddress = (): useAddressResult => {
  const { address, chain: activeChain } = useAccount();
  const [fullAddress, setFullAddress] = useState<`0x${string}` | null>(null);

  useEffect(() => {
    if (address && activeChain) {
      setFullAddress(`${address}${NETWORK_INDICATOR[`${activeChain.id}`]}`);
    }
  }, [address, activeChain]);

  return {
    fullAddress,
  };
};
