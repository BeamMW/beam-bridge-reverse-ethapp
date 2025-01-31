import React, { useEffect, useState } from 'react';
import { styled } from '@linaria/react';
import { css } from '@linaria/core';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Window, Table, BalanceCard, TokenCard } from '@app/shared/components';
import { selectBalance, selectIsTrInProgress } from '../../store/selectors';
import { IconSend, IconReceive, IconEth, IconBeam } from '@app/shared/icons';
import { CURRENCIES, ROUTES } from '@app/shared/constants';
import { selectSystemState, selectTransactions } from '@app/shared/store/selectors';
import { IconDeposit, IconConfirm } from '@app/shared/icons';
import { formatActiveAddressString } from '@core/appUtils';
import { Button, Text } from '@chakra-ui/react';
import { useAccount } from 'wagmi';
import { useTokenBalanceAndAllowance } from '@app/shared/hooks';

const Content = styled.div`
  width: 600px;
  margin: 50px auto 0 auto;
  padding: 45px 75px;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  background-color: rgba(13, 77, 118, .4);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentHeader = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 40px;
`;

const StyledControls = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledTable = styled.div`
  margin-top: 30px;
  overflow: hidden;
  border-radius: 10px;
`;

const ReceiveButtonClass = css`
  margin-left: 20px !important;
`;

const EmptyTableContent = styled.div`
  text-align: center;
  margin-top: 72px;
  font-size: 14px;
  font-style: italic;
  color: #8da1ad;
`;

const Completed = styled.div`
  display: flex;

  > .icon-deposit {
    margin-left: 2px;
    margin-right: 12px;
  }

  > .icon-receive {
    margin-right: 10px;
  }

  > .text-receive {
    color: #0BCCF7;
  }

  > .text-deposit {
    color: #DA68F5;
  }
`;

const HashLink = styled.a`
  text-decoration: none;
  color: #00f6d2;
`;

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const bridgeTransactions = useSelector(selectTransactions());
  const systemState = useSelector(selectSystemState());
  const isTrInProgress = useSelector(selectIsTrInProgress());
  const [tableData, setTableData] = useState([]);
  const { address, chain: activeChain, connector } = useAccount();

  const { tokenBalance, ethBalance, allowance } = useTokenBalanceAndAllowance({
    address: address as `0x${string}`,
    activeChainId: activeChain?.id as number,
  });

  useEffect(() => {
    // if (bridgeTransactions.length > 0) {
    //   const data = bridgeTransactions.map((tr) => {
    //     const item = { ...tr };
    //     item['isIncome'] = systemState.account === tr.to;
    //     return item;
    //   });
    //   setTableData(data);
    // }
  }, [bridgeTransactions]);

  const getDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const yearString = date.toLocaleDateString(undefined, { year: 'numeric' });
    const monthString = date.toLocaleDateString(undefined, { month: 'numeric' });
    const dayString = date.toLocaleDateString(undefined, { day: 'numeric' });
    const time = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    return `${dayString}.${monthString.length == 1 ? '0' + monthString.slice(-2) : monthString}.${yearString} ${time}`;
  };

  const TABLE_CONFIG = [
    {
      name: 'value',
      title: 'Amount',
      fn: (value: string, tr: any) => {
        const curr = CURRENCIES.find((item) => { 
          return item.ethTokenContract.toLowerCase() === tr.contractAddress.toLowerCase()
        });
        if (curr) {
          const amount = ((parseInt(tr.value) / Math.pow(10, curr.decimals)).toFixed(curr.validator_dec)).replace(/\.?0+$/,"");
        return `${amount} ${curr.name}`;
        }
      }
    },
    {
      name: 'timeStamp',
      title: 'Date',
      fn: (value: string, tr: any) => {
        const date = getDate(tr.timeStamp);
        return date;

      }
    },
    {
      name: 'isIncome',
      title: 'Status',
      fn: (value: string, tr: any) => {
        return (<Completed>
          { 
            tr.isIncome ? 
            <IconConfirm className='icon-receive'/> : 
            <IconDeposit className='icon-deposit'/> 
          } 
          { 
            <span className={ tr.isIncome ? 'text-receive' : 'text-deposit' }>
              completed
            </span>
          }
        </Completed>);
      }
    },
    {
      name: 'hash',
      title: 'Hash',
      fn: (value: string, tr: any) => {
        return (<HashLink href={'https://etherscan.io/tx/' + tr.hash} target='_blank'>
          {formatActiveAddressString(tr.hash)
        }</HashLink>)
      }
    }
  ];

  const handleSendClick: React.MouseEventHandler = () => {
    navigate(ROUTES.MAIN.SEND);
  };
  
  const handleReceiveClick: React.MouseEventHandler = () => {
    navigate(ROUTES.MAIN.RECEIVE);
  };

  return (
    <>
      <Window>
        <StyledControls>
          <Button //icon={IconSend}
            disabled={isTrInProgress}
            backgroundColor={"#da68f5"}
            borderRadius={"22px"}
            fontWeight={"bold"}
            padding={"0 30px"}
            onClick={handleSendClick}>
              <IconSend />
              <Text ml={"10px"}>
                WBEAM (Ethereum) ={'>'} BEAM
              </Text>
          </Button>
          <Button
            className={ReceiveButtonClass}
            backgroundColor={"#0bccf7"}
            borderRadius={"22px"}
            fontWeight={"bold"}
            padding={"0 30px"}
            onClick={handleReceiveClick}>
              <IconReceive />
              <Text ml={"10px"}>
                BEAM ={'>'} WBEAM (Ethereum)
              </Text>
          </Button>
        </StyledControls>
        <Content>
          <ContentHeader>Balance</ContentHeader>
          <TokenCard
            isApproved={true}
            isToken={false}
            title={"eth"}
            icon={IconEth}
            balance={ethBalance}
          />

          <TokenCard 
            isApproved={!!allowance}
            isToken={true}
            title={"beam"}
            icon={IconBeam}
            balance={tokenBalance}
          />
        </Content>
        {/* <StyledTable>
          <Table config={TABLE_CONFIG} data={tableData} keyBy='transactionIndex'/>
          {tableData.length === 0 && <EmptyTableContent>There are no transactions yet</EmptyTableContent>}
        </StyledTable> */}
      </Window>
    </>
  );
};

export default MainPage;
