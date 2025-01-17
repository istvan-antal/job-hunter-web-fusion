import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { red } from '@mui/material/colors';
import { useContext, useRef } from 'react';
import PreferenceContext from '../../core/components/PreferenceContext';
import type { Job } from '../../core/job';
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
                            opacity: job.should_apply ? undefined : 0.4,
                        }}
                        variant="contained"
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
                            opacity: job.should_apply ? 0.4 : undefined,
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
                    label={job.suggest_apply ? 'YES' : 'NO'}
                    color={!job.suggest_apply ? 'error' : 'success'}
                    size="small"
                />
                <Box color="error" width={180}>
                    {job.compatibility_text}
                </Box>
            </Box>
        </Box>
    );
};

export default JobDecisionPanel;
