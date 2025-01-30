import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { blue, grey } from '@mui/material/colors';
import MuiLink from '@mui/material/Link';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { useMemo, useRef, useState } from 'react';
import Markdown from 'react-markdown';
import type { Job } from '../../../../job-hunter/entities/Job';
import Link from '../../core/components/Link';
import useJobState, { JobState } from '../hooks/useJobState';
import CodeIcon from './CodeIcon';
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

    const descriptionSummary = useMemo(() => {
        let result = job.descriptionSummary;

        const metaTagStart = result.indexOf('<think>');
        const metaTagEnd = result.indexOf('</think>');

        if (metaTagStart !== -1 && metaTagEnd !== -1) {
            result = result.substring(0, metaTagStart) + result.substring(metaTagEnd + '</think>'.length);
        }

        return result;
    }, [job.descriptionSummary]);

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
                        <MuiLink
                            fontSize={24}
                            sx={{ textDecoration: 'none' }}
                            rel="noreferrer noopener"
                            href={job.url}
                            target="_blank"
                        >
                            {job.title}
                        </MuiLink>
                    </Box>
                    <Box display="flex" gap={2} flexWrap="wrap">
                        {job.jobKeywords.map((keyword) => (
                            <Typography key={keyword} color="grey" component="span" whiteSpace="nowrap">
                                {keyword}
                            </Typography>
                        ))}
                    </Box>
                    <Box display="flex" gap={1} alignItems="center">
                        {job.isInsideIr35 && <Chip label="Inside IR35" color="error" size="small" />}
                        {!job.isRemote && (
                            <Chip
                                label={`Location: ${job.location}`}
                                color={!job.shouldApply ? 'error' : 'warning'}
                                size="small"
                            />
                        )}
                        <Switch
                            checked={showOriginal}
                            onChange={() => {
                                setShowOriginal(!showOriginal);
                            }}
                        />
                        <Link to={`/analyze/${job.id}`} sx={{ textDecoration: 'none' }}>
                            <CodeIcon />
                        </Link>
                    </Box>

                    {!showOriginal && <Markdown>{descriptionSummary}</Markdown>}
                    {showOriginal && <Markdown>{job.descriptionText}</Markdown>}
                </Box>
            </Box>
        </Box>
    );
};

export default JobCard;
