import React from 'react';
import { InjectedConnector } from "@web3-react/injected-connector";
import { Web3ReactProvider } from "@web3-react/core";
import { ConnectToWallet } from "./components/connectToWallet";
import { getLibrary } from "./utils/getLibrary";
import { Container, Typography } from "@material-ui/core";

declare global {
    interface Window {
        web3: any;
        ethereum: any;
    }
}

export const injectedConnector = new InjectedConnector({
    supportedChainIds: [
        1,
        42 // Kovan
    ],
});

export const getContractForPropertyCall = (address: string, signer: any): any => {
    // todo
};

export const App = () => {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <ConnectToWallet/>
            <Container>
                <Typography variant="h2" gutterBottom align="center">
                    Paraboard
                </Typography>
            </Container>

        </Web3ReactProvider>
    )
}


export default App;
