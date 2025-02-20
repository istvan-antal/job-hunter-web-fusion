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

    const options: Highcharts.Options = {
        title: {
            text: 'My chart',
        },
        xAxis: {
            type: 'datetime',
        },
        chart: {
            height: 500,
        },
        series: data.map((series) => ({
            type: 'line',
            id: series.id,
            name: series.id,
            data: series.data.map((item) => [new Date(item.date).getTime(), item.value]),
        })),
    };

    return (
        <Box height="90vh">
            <HighchartsReact highcharts={Highcharts} options={options} />
        </Box>
    );
};

export default StatsPage;
