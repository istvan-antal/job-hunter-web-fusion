import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import Markdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import useComputeJobCompatibility from '../hooks/useComputeJobCompatibility';
import useJob from '../hooks/useJob';
import useReAnalyze from '../hooks/useReAnalyze';

const AnalyzeJob = () => {
    const { id } = useParams();
    const computeJobCompatibility = useComputeJobCompatibility();
    const reAnalyze = useReAnalyze();

    if (!id || !+id) {
        throw new Error('id not specified');
    }

    const {
        error,
        loading,
        data: job,
        reload,
    } = useJob({
        params: [+id],
        pollInterval: 10_000,
    });

    const [result, setResult] = useState('');

    if (error) {
        throw error;
    }

    if (loading) {
        return null;
    }

    return (
        <Box display="flex" gap={5}>
            <Box display="flex" flexDirection="column" gap={3} flexShrink={0}>
                <Button
                    disabled={job.reAnalyze}
                    onClick={() => {
                        (async () => {
                            await reAnalyze(+id);
                            reload();
                        })().catch((error) => {
                            throw error;
                        });
                    }}
                    variant="contained"
                >
                    Re-analyze
                </Button>
                <Button
                    variant="contained"
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
            </Box>
            <Box display="flex" flexDirection="column" gap={2}>
                {job.reAnalyze && <Alert severity="warning">Analyzing job</Alert>}
                <Box display="flex" sx={{ flexDirection: 'row', gap: 2 }} alignItems="center">
                    <Typography fontSize={20}>Title</Typography>
                    <TextField value={job.title} sx={{ width: 700 }} />
                </Box>
                <Box display="flex" flexDirection="column" gap={2}>
                    <Typography fontSize={20}>Compatibility text</Typography>
                    <TextField value={job.compatibilityText} multiline />
                </Box>
                <Box display="flex" sx={{ flexDirection: 'row', gap: 2 }} alignItems="center">
                    <Typography fontSize={20}>Suggest apply</Typography>
                    <Chip
                        label={job.suggestApply ? 'YES' : 'NO'}
                        color={!job.suggestApply ? 'error' : 'success'}
                        size="small"
                    />
                </Box>
                <Box display="flex" sx={{ flexDirection: 'row', gap: 2 }} alignItems="center">
                    <Typography fontSize={20}>Applied</Typography>
                    <Chip label={job.applied ? 'YES' : 'NO'} color={!job.applied ? 'error' : 'success'} size="small" />
                </Box>
                <Box display="flex" flexDirection="column" gap={2}>
                    <Typography fontSize={20}>Description summary</Typography>
                    <Box
                        sx={{ border: '1px solid rgb(255 255 255 / 23%)', borderRadius: '4px', padding: '16.5px 14px' }}
                    >
                        <Markdown>{job.descriptionSummary}</Markdown>
                    </Box>
                </Box>
                <TextField label="Result" multiline rows={4} value={result} />
            </Box>
        </Box>
    );
};

export default AnalyzeJob;
