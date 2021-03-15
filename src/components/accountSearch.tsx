import { Box, Button, Grid, TextField } from '@material-ui/core';
import React from 'react';

export const AccountSearch = () => {
    return (
        <Box m={3} display="flex" justifyContent="center">
            <Grid container>
                <Grid item xs={12}>
                    <TextField id="accountInput" label="Account address" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={6}>
                    <Box m={1} display="flex" justifyContent="flex-end">
                        <Button variant="outlined" color="secondary">
                            Search for swaps
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box m={1} display="flex" justifyContent="flex-start">
                        <Button variant="outlined" color="secondary">
                            Use my address
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};
