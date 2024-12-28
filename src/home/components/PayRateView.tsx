import Box from '@mui/material/Box';
import type { Job } from '../../core/job';
import type { Currency } from '../../core/pay-rate';

const currencySymbols = new Map<Currency, string>([
    ['GBP', '£'],
    ['USD', '$'],
    ['EUR', '€'],
]);

export const PayRateView = ({ job }: { job: Job }) => {
    let content = '';
    switch (job.pay_rate.type) {
        case 'hourly':
            content = `${currencySymbols.get(job.pay_rate.currency)}${job.pay_rate.max} / hour`;
            break;
        case 'daily':
            content = `${currencySymbols.get(job.pay_rate.currency)}${job.pay_rate.max} / day`;
            break;
        case 'yearly':
            content = `${currencySymbols.get(job.pay_rate.currency)}${job.pay_rate.max} / year`;
            break;
        default:
            content = job.salary_text || 'unknown';
    }

    return (
        <Box width={180} className="overflow-hidden whitespace-nowrap text-ellipsis" title={job.salary_text}>
            {content}
        </Box>
    );
};
