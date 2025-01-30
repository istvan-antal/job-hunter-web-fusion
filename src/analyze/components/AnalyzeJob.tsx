import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Markdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import useComputeJobCompatibility from '../hooks/useComputeJobCompatibility';
import useJob from '../hooks/useJob';

const AnalyzeJob = () => {
    const { id } = useParams();
    const computeJobCompatibility = useComputeJobCompatibility();

    if (!id || !+id) {
        throw new Error('id not specified');
    }

    const {
        error,
        loading,
        data: job,
    } = useJob({
        params: [+id],
    });

    const [result, setResult] = useState('');

    if (error) {
        throw error;
    }

    if (loading) {
        return null;
    }

    return (
        <Box>
            <Box>{job.title}</Box>
            <Box>{job.compatibilityText}</Box>
            <Box>
                <Markdown>{job.descriptionSummary}</Markdown>
            </Box>
            <Button
                onClick={() => {
                    (async () => {
                        const response = await computeJobCompatibility(job.descriptionSummary);
                        setResult(response.compatibility_text);
                    })().catch((error) => {
                        throw error;
                    });
                }}
            >
                Test
            </Button>
            <TextField label="Result" multiline rows={4} sx={{ width: 500 }} value={result} />
        </Box>
    );
};

export default AnalyzeJob;
