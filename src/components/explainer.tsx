import { Box, Button, Container, Typography } from "@material-ui/core";
import React from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

export const Explainer = () => {
    const { active } = useWeb3React<Web3Provider>()

    return (
        <Box m={5}>
            <Typography variant="h6" gutterBottom align="center">
                Paraboard is a simple tool to brag about your (Paraswap) swaps! It acts as a very simple social network where you are able to comment on previous swaps.
            </Typography>
            {!active && <Box m={10}>
                <Typography variant="body1" paragraph align="left">
                    Input an address of a Paraswap user to taunt or praise their swaps.
                </Typography>
                <Typography variant="body1" paragraph align="left">
                    .. or just connect with Metamask to load your leaderboard and start bragging right away.
                </Typography>
            </Box>}
        </Box>
    )
}
