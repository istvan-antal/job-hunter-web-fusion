import Box from '@mui/material/Box';
import type { Job } from '../../../../job-hunter/entities/Job';
import type { Currency } from '../../core/pay-rate';

const currencySymbols = new Map<Currency, string>([
    ['GBP', '£'],
    ['USD', '$'],
    ['EUR', '€'],
]);

export const PayRateView = ({ job }: { job: Job }) => {
    let content = '';
    switch (job.payRate.type) {
        case 'hourly':
            content = `${currencySymbols.get(job.payRate.currency)}${job.payRate.max} / hour`;
            break;
        case 'daily':
            content = `${currencySymbols.get(job.payRate.currency)}${job.payRate.max} / day`;
            break;
        case 'yearly':
            content = `${currencySymbols.get(job.payRate.currency)}${job.payRate.max} / year`;
            break;
        default:
            content = job.salaryText || 'unknown';
    }

    return (
        <Box width={180} className="overflow-hidden whitespace-nowrap text-ellipsis" title={job.salaryText}>
            {content}
        </Box>
    );
};
