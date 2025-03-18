import { StatsEntry } from "../types/user";
import ReactECharts from 'echarts-for-react';
import { formatDuration } from "../utils/datetime";

type StatsDurationChartProps = {
    stats: StatsEntry[];
}

// Line chart for duration of stats
function StatsDurationChart({ stats }: StatsDurationChartProps) {
    const option = {
        title: {
            text: 'Kazanılan Oyunlarda Harcanan Süre',
            left: 'center',
            textStyle: {
                fontSize: 12
            }
        },
        grid: {
            containLabel: true,
            left: '3%',
            right: '8%',
            bottom: '3%'
        },
        tooltip: {
            trigger: 'axis' as const,
            formatter: (params: any) => {
                return `Süre: ${formatDuration(params[0].value)} - Tarih: ${new Date(stats.filter(stat => stat.completed)[params[0].dataIndex].startTime).toLocaleString()}`;
            }
        },
        xAxis: {
            type: 'category' as const,
            name: 'Tarih',
            nameLocation: 'end' as const,
            nameGap: 30,
            data: stats.filter(stat => stat.completed).map(stat => new Date(stat.startTime).toLocaleDateString()),
            axisLabel: {
                rotate: 45,
                fontSize: 10
            }
        },
        yAxis: {
            type: 'value' as const,
            name: 'Süre',
            nameLocation: 'end' as const,
            nameGap: 30,
            axisLabel: {
                formatter: (value: number) => {
                    return `${formatDuration(value)}`;
                },
                fontSize: 10
            }
        },
        series: [{
            data: stats.filter(stat => stat.completed).map(stat => stat.duration),
            type: 'line' as const,
            smooth: true,
            areaStyle: {
            },
        }],
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        }
    }
    return <div className="w-full max-w-4xl h-[300px] md:h-[400px] px-4">
        <ReactECharts 
            option={option} 
            opts={{ renderer: 'svg' }}
        />
    </div>
}

export default StatsDurationChart;