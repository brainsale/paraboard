import React from 'react';
import { TxList } from './txList';
import { Grid } from '@material-ui/core';
import { Comments } from './comments';

export const Wall = () => {
    return (
        <Grid container>
            <Grid item xs={6}>
                <TxList account="0xEB74C6E3c046E16190DfeFB7d3CBA84Db5790CC4" />
            </Grid>
            <Grid item xs={6}>
                <Comments transaction={''} />
            </Grid>
        </Grid>
    );
};
