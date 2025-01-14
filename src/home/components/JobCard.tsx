import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { blue, grey } from '@mui/material/colors';
import Link from '@mui/material/Link';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { useRef, useState } from 'react';
import Markdown from 'react-markdown';
import type { Job } from '../../core/job';
import useJobState, { JobState } from '../hooks/useJobState';
import JobDecisionPanel from './JobDecisionPanel';
import { SourceIcon } from './SourceIcon';

const computeBorderColor = (jobState: JobState) => {
    switch (true) {
        case jobState === JobState.Active:
            return blue['900'];
        default:
            return grey['900'];
    }
};

const JobCard = ({ job, onRemove }: { job: Job; onRemove: (job: Job) => void }) => {
    const [jobState, setJobState] = useJobState();
    const didClickOnActionButton = useRef(false);
    const [showOriginal, setShowOriginal] = useState(false);

    return (
        <Box
            onClick={() => {
                if (!didClickOnActionButton.current) {
                    setJobState(JobState.Active);
                }

                didClickOnActionButton.current = false;
            }}
            display="flex"
            flexDirection="column"
            sx={{
                backgroundColor: computeBorderColor(jobState),
                opacity: jobState === JobState.Dismissing || jobState === JobState.Dismissed ? 10 : undefined,
            }}
            padding={3}
            borderRadius={2}
        >
            <Box display="flex" gap={5}>
                <JobDecisionPanel job={job} onRemove={onRemove} setJobState={setJobState} />
                <Box display={'flex'} flexDirection="column" gap={1} justifyItems="start">
                    <Box display="flex" alignItems="center" gap={1}>
                        <SourceIcon source={job.source} />
                        <Link
                            fontSize={24}
                            sx={{ textDecoration: 'none' }}
                            rel="noreferrer noopener"
                            href={job.url}
                            target="_blank"
                        >
                            {job.title}
                        </Link>
                    </Box>
                    <Box display="flex" gap={2} flexWrap="wrap">
                        {job.job_keywords.map((keyword) => (
                            <Typography key={keyword} color="grey" component="span" whiteSpace="nowrap">
                                {keyword}
                            </Typography>
                        ))}
                    </Box>
                    <Box display="flex" gap={1} alignItems="center">
                        {job.is_inside_ir35 && <Chip label="Inside IR35" color="error" size="small" />}
                        {!job.is_remote && (
                            <Chip
                                label={`Location: ${job.location}`}
                                color={!job.should_apply ? 'error' : 'warning'}
                                size="small"
                            />
                        )}
                        <Switch
                            checked={showOriginal}
                            onChange={() => {
                                setShowOriginal(!showOriginal);
                            }}
                        />
                    </Box>

                    {!showOriginal && <Markdown>{job.description_summary}</Markdown>}
                    {showOriginal && <Markdown>{job.description_text}</Markdown>}
                </Box>
            </Box>
        </Box>
    );
};

export default JobCard;
