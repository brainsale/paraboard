import { Box, Button, Grid, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useSelectedAccount } from '../providers/selectedAccount';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { ethers } from 'ethers';

export const AccountSearch = () => {
    const { account } = useWeb3React<Web3Provider>();
    const { selectAccount } = useSelectedAccount();
    const [accountField, setAccountField] = useState('');

    // todo use effect for address validity accross component
    // todo check if not a contract address before the call to etherscan API

    const onClickUseMine = () => {
        if (account) {
            selectAccount(account);
            setAccountField(account);
        }
    };

    const onClickSearchSwaps = () => {
        if (ethers.utils.isAddress(accountField)) {
            selectAccount(accountField);
        }
    };

    const handleAccountFieldChange = (event: any) => {
        setAccountField(event.target.value);
    };

    return (
        <Box m={3} display="flex" justifyContent="center">
            <Grid container>
                <Grid item xs={12}>
                    <TextField
                        value={accountField}
                        id="account-input"
                        label="Account address"
                        variant="outlined"
                        onChange={handleAccountFieldChange}
                        error={!ethers.utils.isAddress(accountField)}
                        helperText={!ethers.utils.isAddress(accountField) ? 'Input a valid Ethereum address.' : ''}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <Box m={1} display="flex" justifyContent="flex-end">
                        <Button
                            disabled={!ethers.utils.isAddress(accountField)}
                            variant="outlined"
                            color="secondary"
                            onClick={onClickSearchSwaps}>
                            Search for swaps
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box m={1} display="flex" justifyContent="flex-start">
                        <Button disabled={!account} variant="outlined" color="secondary" onClick={onClickUseMine}>
                            Use my address
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};
