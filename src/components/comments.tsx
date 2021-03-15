import { Box, Typography } from '@material-ui/core';
import { Chat } from '@material-ui/icons';

export const Comments = (props: any) => {
    return (
        <Box>
            <Typography variant="h5" align="center">
                Brags <Chat />
            </Typography>
        </Box>
    );
};
