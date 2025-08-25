import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import * as Highcharts from 'highcharts';
import { HighchartsReact } from 'highcharts-react-official';
import 'highcharts/themes/dark-unica';
import { useState } from 'react';
import { useQuery } from '../../core/data';

type Granularity = 'daily' | 'weekly' | 'monthly' | 'yearly';

const StatsPage = () => {
    const [granularity, setGranularity] = useState<Granularity>('daily');
    const { error, loading, data } = useQuery('fetchStats', { params: [granularity], pollInterval: 10_000 });

    if (error) {
        throw error;
    }

    if (loading) {
        return null;
    }

    const { rates, counts } = data;
    const chartType = granularity === 'daily' ? 'line' : 'column';

    return (
        <Box height="90vh">
            <Box mb={2}>
                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel>Granularity</InputLabel>
                    <Select
                        value={granularity}
                        label="Granularity"
                        onChange={(e) => setGranularity(e.target.value as Granularity)}
                    >
                        <MenuItem value="daily">Daily</MenuItem>
                        <MenuItem value="weekly">Weekly</MenuItem>
                        <MenuItem value="monthly">Monthly</MenuItem>
                        <MenuItem value="yearly">Yearly</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <HighchartsReact
                highcharts={Highcharts}
                options={{
                    chart: {
                        height: 500,
                        backgroundColor: '#1a1a1a',
                    },
                    title: {
                        text: `GBP ${granularity} rates`,
                        style: {
                            color: '#ffffff',
                        },
                    },
                    xAxis: {
                        type: 'datetime',
                        labels: {
                            style: {
                                color: '#cccccc',
                            },
                        },
                        gridLineColor: '#333333',
                        lineColor: '#333333',
                        tickColor: '#333333',
                    },
                    yAxis: {
                        labels: {
                            style: {
                                color: '#cccccc',
                            },
                        },
                        gridLineColor: '#333333',
                        title: {
                            style: {
                                color: '#cccccc',
                            },
                        },
                    },
                    legend: {
                        itemStyle: {
                            color: '#ffffff',
                        },
                        itemHoverStyle: {
                            color: '#ff1744',
                        },
                    },
                    colors: ['#ff1744', '#00e676', '#2196f3', '#ff9800', '#9c27b0', '#4caf50', '#ffeb3b', '#795548'],
                    plotOptions: {
                        series: {
                            marker: {
                                fillColor: '#ffffff',
                                lineColor: null,
                                lineWidth: 2,
                            },
                        },
                    },
                    series: rates.map((series) => ({
                        type: chartType,
                        id: series.id,
                        name: series.id,
                        data: series.data.map((item) => [new Date(item.date).getTime(), item.value]),
                    })),
                }}
            />
            <HighchartsReact
                highcharts={Highcharts}
                options={{
                    chart: {
                        height: 500,
                        backgroundColor: '#1a1a1a',
                    },
                    title: {
                        text: 'Counts',
                        style: {
                            color: '#ffffff',
                        },
                    },
                    xAxis: {
                        type: 'datetime',
                        labels: {
                            style: {
                                color: '#cccccc',
                            },
                        },
                        gridLineColor: '#333333',
                        lineColor: '#333333',
                        tickColor: '#333333',
                    },
                    yAxis: {
                        labels: {
                            style: {
                                color: '#cccccc',
                            },
                        },
                        gridLineColor: '#333333',
                        title: {
                            style: {
                                color: '#cccccc',
                            },
                        },
                    },
                    legend: {
                        itemStyle: {
                            color: '#ffffff',
                        },
                        itemHoverStyle: {
                            color: '#ff1744',
                        },
                    },
                    colors: ['#ff1744', '#00e676', '#2196f3', '#ff9800', '#9c27b0', '#4caf50', '#ffeb3b', '#795548'],
                    plotOptions: {
                        series: {
                            marker: {
                                fillColor: '#ffffff',
                                lineColor: null,
                                lineWidth: 2,
                            },
                        },
                    },
                    series: counts.map((series) => ({
                        type: chartType,
                        id: series.id,
                        name: series.id,
                        data: series.data.map((item) => [new Date(item.date).getTime(), item.value]),
                    })),
                }}
            />
        </Box>
    );
};

export default StatsPage;
