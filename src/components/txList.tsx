import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ALL_BLOCKS_ASC, API_KEY, BASE_URL, GET_ACCOUNT_TX } from '../api/api';
import {
    ETHER_TOKEN,
    PARASWAP_V2_CONTRACT_ABI,
    PARASWAP_V2_CONTRACT_ADD,
    PARASWAP_V3_CONTRACT_ABI,
    PARASWAP_V3_CONTRACT_ADD,
    T2CR_LIST
} from '../App';
import { ParaswapTransaction } from '../model/paraswapTransaction';
import { BigNumber, ethers } from 'ethers';
import { Token } from '../model/token';
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { SwapHoriz } from '@material-ui/icons';
import { useSelectedAccount } from '../providers/selectedAccount';

export const TxList = () => {
    const [txList, setTxList] = useState([]);
    const [filteredTxList, setFilteredTxList] = useState([]);
    const [tokenList, setTokenList] = useState([]);
    const { selectedAccount } = useSelectedAccount();

    const paraswapV2Interface = new ethers.utils.Interface(PARASWAP_V2_CONTRACT_ABI);
    const paraswapV3Interface = new ethers.utils.Interface(PARASWAP_V3_CONTRACT_ABI);

    const getTokenSymbol = (address: string): string => {
        if (address === ETHER_TOKEN) return 'ETH';

        let token = (tokenList.find(
            (token: Token) => token.address.toLowerCase() === address.toLowerCase()
        ) as unknown) as Token;
        if (token) return token.symbol;

        return 'Unknown token';
    };

    const getTokenValue = (address: string, value: BigNumber): string => {
        if (address === ETHER_TOKEN) return ethers.utils.formatUnits(value.toString(), 18);
        let token = (tokenList.find(
            (token: Token) => token.address.toLowerCase() === address.toLowerCase()
        ) as unknown) as Token;
        if (token) return ethers.utils.formatUnits(value?.toString(), token.decimals);

        return 'Unknown token';
    };

    const generateListItem = (tx: ParaswapTransaction) => {
        const date = new Date(parseInt(tx.timeStamp) * 1000);
        const fromAmount = parseFloat(tx.fromAmount);
        const toAmount = parseFloat(tx.toAmount);
        const paidRatio = fromAmount / toAmount;

        return (
            <ListItem key={tx.hash} button>
                <ListItemIcon>
                    <SwapHoriz fontSize="large" />
                </ListItemIcon>
                <ListItemText
                    primary={`From ${fromAmount.toFixed(2)} ${tx.fromToken} to ${toAmount.toFixed(2)} ${tx.toToken}`}
                    primaryTypographyProps={{ variant: 'h6' }}
                    secondaryTypographyProps={{ variant: 'subtitle2', color: 'secondary' }}
                    secondary={`${date.toLocaleString()}, ${paidRatio.toFixed(4)} ${tx.fromToken} for 1 ${tx.toToken}`}
                />
            </ListItem>
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tokens = await axios(T2CR_LIST);
                setTokenList(tokens.data.tokens);

                const transactions = await axios(
                    BASE_URL + GET_ACCOUNT_TX + '&address=' + selectedAccount + ALL_BLOCKS_ASC + API_KEY
                );
                setTxList(transactions.data.result);
            } catch (e) {
                console.error('Error while fetching tx list.', e);
            }
        };
        if (selectedAccount) {
            fetchData();
        }
    }, [selectedAccount]);

    useEffect(() => {
        const getTransactionDetails = async (tx: ParaswapTransaction) => {
            let call = undefined;
            if (tx.to === PARASWAP_V2_CONTRACT_ADD)
                call = await paraswapV2Interface.parseTransaction({
                    data: tx.input,
                    value: tx.value
                });
            if (tx.to === PARASWAP_V3_CONTRACT_ADD)
                call = await paraswapV3Interface.parseTransaction({
                    data: tx.input,
                    value: tx.value
                });
            tx.fromToken = getTokenSymbol(call?.args.fromToken);
            tx.fromAmount = getTokenValue(call?.args.fromToken, call?.args.fromAmount);
            tx.toToken = getTokenSymbol(call?.args.toToken);
            tx.toAmount = getTokenValue(call?.args.toToken, call?.args.toAmount);
        };

        const filterList = async () => {
            const filteredList = txList.filter(
                (tx: ParaswapTransaction) => tx.to === PARASWAP_V2_CONTRACT_ADD || tx.to === PARASWAP_V3_CONTRACT_ADD
            );
            for (const tx of filteredList) {
                await getTransactionDetails(tx);
            }
            setFilteredTxList(filteredList);
        };

        if (txList?.length && tokenList?.length) {
            filterList();
        }
    }, [txList, tokenList]);

    return (
        <Box>
            <Typography variant={'h5'} align={'center'}>
                Swaps <SwapHoriz />
            </Typography>
            <List dense={true}>{filteredTxList.map((tx: ParaswapTransaction) => generateListItem(tx))}</List>
        </Box>
    );
};
