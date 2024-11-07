import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import useAddFlaggedPhrase from '../hooks/useAddFlaggedPhrase';

const Preferences = () => {
    const addFlaggedPhrase = useAddFlaggedPhrase();
    const [text, setText] = useState('');
    return (
        <Box>
            Preferences
            <TextField
                value={text}
                onChange={(event) => {
                    setText(event.target.value);
                }}
            />
            <Button
                onClick={() => {
                    addFlaggedPhrase(text)
                        .catch((error) => {
                            throw error;
                        })
                        .finally(() => {
                            setText('');
                            location.reload();
                        });
                }}
            >
                Add
            </Button>
        </Box>
    );
};

export default Preferences;
