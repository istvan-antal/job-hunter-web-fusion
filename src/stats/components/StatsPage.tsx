import Box from '@mui/material/Box';
import * as Highcharts from 'highcharts';
import { HighchartsReact } from 'highcharts-react-official';
import 'highcharts/themes/dark-unica';
import { useQuery } from '../../core/data';

const StatsPage = () => {
    const { error, loading, data } = useQuery('fetchStats', { params: [], pollInterval: 10_000 });

    if (error) {
        throw error;
    }

    if (loading) {
        return null;
    }

    const { rates, counts } = data;

    return (
        <Box height="90vh">
            <HighchartsReact
                highcharts={Highcharts}
                options={{
                    title: {
                        text: 'GBP daily rates',
                    },
                    xAxis: {
                        type: 'datetime',
                    },
                    chart: {
                        height: 500,
                    },
                    series: rates.map((series) => ({
                        type: 'line',
                        id: series.id,
                        name: series.id,
                        data: series.data.map((item) => [new Date(item.date).getTime(), item.value]),
                    })),
                }}
            />
            <HighchartsReact
                highcharts={Highcharts}
                options={{
                    title: {
                        text: 'Counts',
                    },
                    xAxis: {
                        type: 'datetime',
                    },
                    chart: {
                        height: 500,
                    },
                    series: counts.map((series) => ({
                        type: 'line',
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
