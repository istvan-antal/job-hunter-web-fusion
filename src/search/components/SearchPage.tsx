import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { memo, useState } from 'react';
import Link from '../../core/components/Link';
import { useQuery } from '../../core/data';

const SearchPage = memo(() => {
    const [rateType, setRateType] = useState<'unknown' | 'known' | undefined>(undefined);
    const { error, data, loading } = useQuery('fetchJobs', {
        params: [
            {
                limit: 1000,
                unknownPayRate: rateType === 'unknown' ? true : undefined,
                knownPayRate: rateType === 'known' ? true : undefined,
            },
        ],
        pollInterval: 10_000,
    });

    if (error) {
        return <>{error.toString()}</>;
    }

    if (loading) {
        return <>Loading...</>;
    }

    if (!data.length) {
        return <>No jobs found.</>;
    }

    return (
        <>
            <Box>
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Rate</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={rateType}
                        label="Rate"
                        onChange={(event) => {
                            setRateType(event.target.value as 'unknown' | 'known' | undefined);
                        }}
                    >
                        <MenuItem value={undefined}>All</MenuItem>
                        <MenuItem value={'known'}>Known</MenuItem>
                        <MenuItem value={'unknown'}>Unknown</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Table>
                <TableBody>
                    {data.map((job) => (
                        <TableRow key={job.id}>
                            <TableCell>
                                <Link to={`/analyze/${job.id}`} sx={{ textDecoration: 'none' }}>
                                    {job.id}
                                </Link>
                            </TableCell>
                            <TableCell>{job.payRate.type}</TableCell>
                            <TableCell>{job.shouldApply ? 'Should apply' : ''}</TableCell>
                            <TableCell>{job.suggestApply ? 'Suggest' : ''}</TableCell>
                            <TableCell>{job.compatibilityText}</TableCell>
                            <TableCell>{job.salaryText}</TableCell>
                            <TableCell>{job.isInsideIr35 && 'Inside IR35'}</TableCell>
                            <TableCell>{job.suggestApply && 'SUGGEST'}</TableCell>
                            <TableCell>{job.title}</TableCell>
                            <TableCell>{job.source}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
});

export default SearchPage;
