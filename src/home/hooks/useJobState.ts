import { useState } from 'react';

export enum JobState {
    Default = 0,
    Dismissing = 1,
    Dismissed = 2,
    Active = 3,
}

const useJobState = () => useState(JobState.Default);

export default useJobState;
