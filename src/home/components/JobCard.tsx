import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import cleanTree from '../../core/cleanTree';
import type { Job } from '../../core/job';
// import { applyToJob, dismissJob } from '../actions';
import { ElapsedTime } from './ElapsedTime';
import { PayRateView } from './PayRateView';
import { SourceIcon } from './SourceIcon';

enum JobState {
    Default = 0,
    Dismissing = 1,
    Dismissed = 2,
    Active = 3,
}

const flaggedPhrases: string[] = [];

const flaggedTitlePhrases: string[] = [];

const highlights = ['Duration', 'Location', 'Day Rate', 'Hybrid'];

const goodHighlights = ['Remote'];

const JobCard = ({ job, onRemove }: { job: Job; onRemove: (job: Job) => void }) => {
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
        <div
            onClick={() => {
                if (!didClickOnActionButton.current) {
                    setJobState(JobState.Active);
                }

                didClickOnActionButton.current = false;
            }}
            className={clsx(
                'flex flex-col  border shadow-sm rounded-xl p-4 md:p-5 dark:border-neutral-700 dark:shadow-neutral-700/70',
                {
                    'bg-white dark:bg-neutral-900': jobState === JobState.Default,
                    'bg-white dark:bg-neutral-900 opacity-50': jobState === JobState.Dismissing,
                    'bg-white dark:bg-neutral-900 opacity-10': jobState === JobState.Dismissed,
                    'bg-gray-50 dark:bg-indigo-900': jobState === JobState.Active,
                },
            )}
        >
            <div className="flex gap-5">
                <div className="shrink-0">
                    <div className="flex flex-col items-start gap-4">
                        <PayRateView job={job} />
                        <div className="inline-flex rounded-lg shadow-sm">
                            <button
                                onClick={() => {
                                    didClickOnActionButton.current = true;

                                    setJobState(JobState.Dismissing);

                                    /*
                                    applyToJob(job)
                                        .then(() => {
                                            setJobState(JobState.Dismissed);
                                            onRemove(job);
                                        })
                                        .catch((error) => {
                                            throw error;
                                        });
                                    */
                                }}
                                type="button"
                                className="py-2 px-3 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                            >
                                <img src="/apply.svg" alt="apply" />
                            </button>
                            <button
                                onClick={() => {
                                    didClickOnActionButton.current = true;

                                    setJobState(JobState.Dismissing);

                                    /*
                                    dismissJob(job)
                                        .then(() => {
                                            setJobState(JobState.Dismissed);
                                            onRemove(job);
                                        })
                                        .catch((error) => {
                                            throw error;
                                        });
                                    */
                                }}
                                type="button"
                                className="py-2 px-3 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                            >
                                <img src="/dismiss.svg" alt="dismiss" />
                            </button>
                        </div>
                        <ElapsedTime time={new Date(job.created)} />
                        {!!flaggedContent.length &&
                            flaggedContent.map((item) => (
                                <div key={item} className="text-red-600">
                                    {item}
                                </div>
                            ))}
                    </div>
                </div>
                <div className="flex flex-col items-start gap-2">
                    <div className="flex items-center gap-2 text-lg font-bold text-gray-800 dark:text-white">
                        <SourceIcon source={job.source} />
                        <a href={job.url} target="_blank">
                            {job.title}
                        </a>
                    </div>
                    <div
                        className="text-gray-500 dark:text-neutral-400"
                        dangerouslySetInnerHTML={{ __html: description }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default JobCard;
