import React from 'react';
import { TxList } from './txList';
import { Grid } from '@material-ui/core';
import { Comments } from './comments';

export const Wall = () => {
    return (
        <Grid container>
            <Grid item xs={6}>
                <TxList />
            </Grid>
            <Grid item xs={6}>
                <Comments transaction={''} />
            </Grid>
        </Grid>
    );
};
