import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useContext, useState } from 'react';
import PreferenceContext from '../../core/components/PreferenceContext';
import useAddFlaggedPhrase from '../hooks/useAddFlaggedPhrase';

const Preferences = () => {
    const { flaggedPhrases } = useContext(PreferenceContext);
    const addFlaggedPhrase = useAddFlaggedPhrase();
    const [text, setText] = useState('');
    return (
        <Box>
            <Typography component="h2">Flagged phrases</Typography>
            <Box display="flex" gap={2} flexWrap="wrap">
                {flaggedPhrases.map((item) => (
                    <Typography key={item} component="div">
                        {item}
                    </Typography>
                ))}
            </Box>
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
