import React, { useState } from 'react';
import { TxList } from './txList';
import { Grid } from '@material-ui/core';
import { Comments } from './comments';

export const Wall = () => {
    const [selectedTx, setSelectedTx] = useState(undefined);

    return (
        <Grid container>
            <Grid item xs={6}>
                <TxList selectTx={setSelectedTx} />
            </Grid>
            <Grid item xs={6}>
                <Comments transaction={selectedTx} />
            </Grid>
        </Grid>
    );
};
