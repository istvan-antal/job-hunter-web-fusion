import type { ObjectId } from 'mongodb';
import { type PayRate } from './pay-rate';

export interface Job {
    _id: ObjectId;
    source: string;
    title: string;
    jobKeywords: string[];
    is_remote: boolean;
    is_inside_ir35: boolean;
    should_apply: boolean;
    suggest_apply: boolean;
    description: string;
    description_text: string;
    description_summary: string;
    compatibility_text: string;
    salary_text: string;
    pay_rate: PayRate;
    posted: string;
    url: string;
    location: string;
    updated: Date;
    created: Date;
}
