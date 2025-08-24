import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
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
            return '#ff1744';
        default:
            return '#333';
    }
};

const computeBackgroundColor = (jobState: JobState, job: Job) => {
    let baseColor = '#1a1a1a';

    // Apply tinting based on job recommendation
    let tintColor = '';
    if (job.suggestApply) {
        tintColor = 'rgba(76, 175, 80, 0.15)'; // Green tint
    } else if (job.shouldApply) {
        tintColor = 'rgba(255, 235, 59, 0.15)'; // More yellow tint
    } else {
        tintColor = 'rgba(244, 67, 54, 0.15)'; // Red tint
    }

    switch (true) {
        case jobState === JobState.Active:
            return `linear-gradient(${tintColor}, ${tintColor}), ${baseColor}`;
        default:
            return `linear-gradient(${tintColor}, ${tintColor}), ${baseColor}`;
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
                background: computeBackgroundColor(jobState, job),
                border: `3px solid ${computeBorderColor(jobState)}`,
                opacity: jobState === JobState.Dismissing || jobState === JobState.Dismissed ? 0.3 : 1,
                cursor: 'pointer',
                '&:hover': {
                    borderColor: '#ff1744',
                    borderWidth: '4px',
                },
            }}
            padding={3}
            borderRadius={0}
        >
            <Box display="flex" gap={5}>
                <JobDecisionPanel job={job} onRemove={onRemove} setJobState={setJobState} />
                <Box display={'flex'} flexDirection="column" gap={1} justifyItems="start">
                    <Box display="flex" alignItems="center" gap={1}>
                        <SourceIcon source={job.source} />
                        <MuiLink
                            fontSize={24}
                            sx={{
                                textDecoration: 'none',
                                color: 'white',
                                fontWeight: 900,
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                '&:hover': {
                                    color: '#ff1744',
                                    textShadow: '2px 2px 0px #000',
                                },
                            }}
                            rel="noreferrer noopener"
                            href={job.url}
                            target="_blank"
                        >
                            {job.title}
                        </MuiLink>
                    </Box>

                    {!job.isRemote && (
                        <Box display="flex" gap={2} flexWrap="wrap">
                            <Typography
                                component="span"
                                whiteSpace="nowrap"
                                sx={{
                                    color: !job.shouldApply ? '#fff' : '#000',
                                    fontSize: '0.85rem',
                                    fontWeight: 900,
                                    backgroundColor: !job.shouldApply ? '#f44336' : '#ff9800',
                                    px: 1.5,
                                    py: 0.5,
                                    borderRadius: 0,
                                    border: '2px solid #000',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                }}
                            >
                                Location: {job.location}
                            </Typography>
                        </Box>
                    )}

                    <Box display="flex" gap={2} flexWrap="wrap">
                        {job.missingTechnologies?.map((tech) => (
                            <Typography
                                key={`missing-${tech}`}
                                component="span"
                                whiteSpace="nowrap"
                                sx={{
                                    color: '#fff',
                                    fontSize: '0.85rem',
                                    fontWeight: 900,
                                    backgroundColor: '#f44336',
                                    px: 1.5,
                                    py: 0.5,
                                    borderRadius: 0,
                                    border: '2px solid #000',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                }}
                            >
                                {tech}
                            </Typography>
                        ))}
                        {job.uncertainTechnologies?.map((tech) => (
                            <Typography
                                key={`uncertain-${tech}`}
                                component="span"
                                whiteSpace="nowrap"
                                sx={{
                                    color: '#000',
                                    fontSize: '0.85rem',
                                    fontWeight: 900,
                                    backgroundColor: '#ff9800',
                                    px: 1.5,
                                    py: 0.5,
                                    borderRadius: 0,
                                    border: '2px solid #000',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                }}
                            >
                                {tech}
                            </Typography>
                        ))}
                        {job.jobKeywords.map((keyword) => (
                            <Typography
                                key={keyword}
                                component="span"
                                whiteSpace="nowrap"
                                sx={{
                                    color: '#000',
                                    fontSize: '0.85rem',
                                    fontWeight: 900,
                                    backgroundColor: '#00e676',
                                    px: 1.5,
                                    py: 0.5,
                                    borderRadius: 0,
                                    border: '2px solid #000',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                }}
                            >
                                {keyword}
                            </Typography>
                        ))}
                    </Box>
                    <Box display="flex" gap={1} alignItems="center">
                        {job.isInsideIr35 && <Chip label="Inside IR35" color="error" size="small" />}

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
