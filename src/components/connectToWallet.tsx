import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import React from 'react';
import { injectedConnector } from '../App';
import { Box, Button } from '@material-ui/core';

export const ConnectToWallet = () => {
    const { account, activate, active } = useWeb3React<Web3Provider>();

    const onClickConnect = () => {
        activate(injectedConnector);
    };

    return (
        <Box display="flex" justifyContent="flex-end" m={2}>
            <Button disabled={active} variant="contained" color="primary" onClick={onClickConnect}>
                {!active ? 'Connect to Metamask' : account}
            </Button>
        </Box>
    );
};
