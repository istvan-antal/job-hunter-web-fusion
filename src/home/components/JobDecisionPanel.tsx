import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { red } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import { useContext, useRef } from 'react';
import type { Job } from '../../../../job-hunter/entities/Job';
import PreferenceContext from '../../core/components/PreferenceContext';
import useApplyToJob from '../hooks/useApplyToJob';
import useDismissJob from '../hooks/useDismissJob';
import { JobState } from '../hooks/useJobState';
import { ElapsedTime } from './ElapsedTime';
import { PayRateView } from './PayRateView';

type JobDecisionPanelProps = {
    job: Job;
    onRemove: (job: Job) => void;
    setJobState: (state: JobState) => void;
};

const JobDecisionPanel = ({ job, onRemove, setJobState }: JobDecisionPanelProps) => {
    const { flaggedPhrases, flaggedTitlePhrases } = useContext(PreferenceContext);
    const dismissJob = useDismissJob();
    const applyToJob = useApplyToJob();
    const didClickOnActionButton = useRef(false);

    const flaggedContent = [
        ...flaggedTitlePhrases.filter((word) => job.title.toLowerCase().includes(word.toLowerCase())),
        ...flaggedPhrases.filter((word) => job.description.toLowerCase().includes(word.toLowerCase())),
    ];

    return (
        <Box flexShrink={0}>
            <Box display="flex" flexDirection="column" justifyItems="start" gap={2}>
                <PayRateView job={job} />
                <Box display="flex" gap={1}>
                    <Button
                        sx={{
                            opacity: job.shouldApply ? undefined : 0.4,
                        }}
                        variant="contained"
                        color="success"
                        onClick={() => {
                            didClickOnActionButton.current = true;

                            setJobState(JobState.Dismissing);

                            applyToJob(job)
                                .then(() => {
                                    setJobState(JobState.Dismissed);
                                    onRemove(job);
                                })
                                .catch((error) => {
                                    throw error;
                                });
                        }}
                    >
                        <img src="/apply.svg" alt="apply" />
                    </Button>
                    <Button
                        sx={{
                            opacity: job.shouldApply ? 0.4 : undefined,
                        }}
                        variant="contained"
                        color="error"
                        onClick={() => {
                            didClickOnActionButton.current = true;

                            setJobState(JobState.Dismissing);

                            dismissJob(job)
                                .then(() => {
                                    setJobState(JobState.Dismissed);
                                    onRemove(job);
                                })
                                .catch((error) => {
                                    throw error;
                                });
                        }}
                    >
                        <img src="/dismiss.svg" alt="dismiss" />
                    </Button>
                </Box>
                <ElapsedTime time={new Date(job.created)} />
                {!!flaggedContent.length &&
                    flaggedContent.map((item) => (
                        <Box key={item} color={red['400']}>
                            {item}
                        </Box>
                    ))}
                <Chip
                    label={job.suggestApply ? 'YES' : 'NO'}
                    color={!job.suggestApply ? 'error' : 'success'}
                    size="small"
                />
                <Box color="error" width={180}>
                    {job.compatibilityText}
                </Box>
                {job.company && (
                    <Box>
                        <Typography fontSize={18} component="h3">
                            {job.company}
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default JobDecisionPanel;
