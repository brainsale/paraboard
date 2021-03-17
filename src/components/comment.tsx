import { Box, Card, CardContent, Grow, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';

export const Comment = (props: any) => {
    const [displayed, setDisplayed] = useState(false);

    useEffect(() => {
        if (props.commentData) {
            setDisplayed(true);
        } else {
            setDisplayed(false);
        }
    }, [props.commentData]);

    return (
        <Grow in={displayed} {...(displayed ? { timeout: 500, exit: true } : {})}>
            <Box m={1}>
                <Card raised>
                    <CardContent>
                        <Typography variant="subtitle2" align="center" color={'textSecondary'} gutterBottom>
                            0x5E558Ee87f9289E384D7e4DAE8A60AB5a6414365
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            This is a test comment. This is a test comment. This is a test comment. This is a test
                            comment. This is a test comment. This is a test comment. This is a test comment.
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Grow>
    );
};
