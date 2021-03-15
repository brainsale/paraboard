import React, { useState } from 'react';
import { InjectedConnector } from '@web3-react/injected-connector';
import { Web3ReactProvider } from '@web3-react/core';
import { ConnectToWallet } from './components/connectToWallet';
import { getLibrary } from './utils/getLibrary';
import { Container, createMuiTheme, CssBaseline, MuiThemeProvider, Typography } from '@material-ui/core';
import { Explainer } from './components/explainer';
import * as paraswapAbi from './assets/contracts/paraswap.json';
import { Wall } from './components/wall';
import { AccountSearch } from './components/accountSearch';
import { SelectedAccount } from './providers/selectedAccount';

declare global {
    interface Window {
        web3: any;
        ethereum: any;
    }
}

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark'
    }
});

export const injectedConnector = new InjectedConnector({
    supportedChainIds: [
        1,
        42 // Kovan
    ]
});

export const getContractForPropertyCall = (address: string, signer: any): any => {
    // todo
};

// todo in const file
export const PARASWAP_V2_CONTRACT_ADD = '0x9509665d015bfe3c77aa5ad6ca20c8afa1d98989';
export const PARASWAP_V3_CONTRACT_ADD = '0xf90e98f3d8dce44632e5020abf2e122e0f99dfab';
export const ETHER_TOKEN = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
export const PARASWAP_V2_CONTRACT_ABI = paraswapAbi.v2abi;
export const PARASWAP_V3_CONTRACT_ABI = paraswapAbi.v3abi;
export const T2CR_LIST = 'https://tokens.coingecko.com/uniswap/all.json';

// todo test account
export const App = () => {
    const [selectedAccount, setSelectedAccount] = useState('');

    const selectAccount = (account: string) => {
        setSelectedAccount(account);
    };

    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <MuiThemeProvider theme={darkTheme}>
                <CssBaseline />
                <ConnectToWallet />
                <Container>
                    <Typography variant="h2" gutterBottom align="center">
                        Paraboard
                    </Typography>
                    <Explainer />
                    <SelectedAccount.Provider value={{ selectedAccount, selectAccount }}>
                        <AccountSearch />
                        <Wall />
                    </SelectedAccount.Provider>
                </Container>
            </MuiThemeProvider>
        </Web3ReactProvider>
    );
};

export default App;
