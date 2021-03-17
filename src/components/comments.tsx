import { Box, Typography } from '@material-ui/core';
import { Chat } from '@material-ui/icons';
import { useEffect } from 'react';
import { Comment } from './comment';

export const Comments = (props: any) => {
    useEffect(() => {
        if (props.transaction) {
            // load comments
        }
    }, [props.transaction]);

    return (
        <Box>
            <Typography variant="h5" align="center">
                Brags <Chat />
            </Typography>
            <Comment commentData={props.transaction ? 'test' : undefined} />
        </Box>
    );
};
