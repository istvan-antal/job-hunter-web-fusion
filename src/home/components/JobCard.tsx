import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { grey, indigo, red } from '@mui/material/colors';
import Link from '@mui/material/Link';
import clsx from 'clsx';
import { useContext, useEffect, useRef, useState } from 'react';
import cleanTree from '../../core/cleanTree';
import PreferenceContext from '../../core/components/PreferenceContext';
import type { Job } from '../../core/job';
import useApplyToJob from '../hooks/useApplyToJob';
import useDismissJob from '../hooks/useDismissJob';
import { ElapsedTime } from './ElapsedTime';
import { PayRateView } from './PayRateView';
import { SourceIcon } from './SourceIcon';

enum JobState {
    Default = 0,
    Dismissing = 1,
    Dismissed = 2,
    Active = 3,
}

const computeBorderColor = (jobState: JobState) => {
    switch (true) {
        case jobState === JobState.Active:
            return indigo['600'];
        default:
            return grey['900'];
    }
};

const JobCard = ({ job, onRemove }: { job: Job; onRemove: (job: Job) => void }) => {
    const { goodHighlights, flaggedPhrases, flaggedTitlePhrases, highlights } = useContext(PreferenceContext);
    const dismissJob = useDismissJob();
    const applyToJob = useApplyToJob();
    const [jobState, setJobState] = useState(JobState.Default);
    const didClickOnActionButton = useRef(false);

    const flaggedContent = [
        ...flaggedTitlePhrases.filter((word) => job.title.toLowerCase().includes(word.toLowerCase())),
        ...flaggedPhrases.filter((word) => job.description.toLowerCase().includes(word.toLowerCase())),
    ];

    const [description, setDescription] = useState('');

    useEffect(() => {
        let currentDescription = cleanTree(job.description);

        for (const flaggedPhrase of flaggedPhrases) {
            currentDescription = currentDescription.replaceAll(
                new RegExp(flaggedPhrase.replaceAll('.', '\\.'), 'gi'),
                (value) => `<span style="color: red">${value}</span>`,
            );
        }

        for (const highlight of highlights) {
            currentDescription = currentDescription.replaceAll(
                new RegExp(highlight.replaceAll('.', '\\.'), 'gi'),
                (value) => `<span style="color: purple">${value}</span>`,
            );
        }

        for (const highlight of goodHighlights) {
            currentDescription = currentDescription.replaceAll(
                new RegExp(highlight.replaceAll('.', '\\.'), 'gi'),
                (value) => `<span style="color: green">${value}</span>`,
            );
        }

        setDescription(currentDescription);
    }, [job.description]);

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
            className={clsx('border shadow-sm rounded-xl dark:border-neutral-700 dark:shadow-neutral-700/70', {
                'bg-white dark:bg-neutral-900': jobState === JobState.Default,
            })}
        >
            <Box display="flex" gap={5}>
                <Box flexShrink={0}>
                    <Box display="flex" flexDirection="column" justifyItems="start" gap={2}>
                        <PayRateView job={job} />
                        <Box display="flex" gap={1}>
                            <Button
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
                    </Box>
                </Box>
                <Box className="flex flex-col items-start gap-2">
                    <Box
                        display="flex"
                        alignItems="center"
                        gap={1}
                        className="gap-2 text-lg font-bold text-gray-800 dark:text-white"
                    >
                        <SourceIcon source={job.source} />
                        <Link fontSize={24} sx={{ textDecoration: 'none' }} href={job.url} target="_blank">
                            {job.title}
                        </Link>
                    </Box>
                    <Box
                        className="text-gray-500 dark:text-neutral-400"
                        dangerouslySetInnerHTML={{ __html: description }}
                    ></Box>
                </Box>
            </Box>
        </Box>
    );
};

export default JobCard;
