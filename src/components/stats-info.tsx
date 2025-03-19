import { StatsEntry } from "../types/user";
import { formatDuration } from "../utils/datetime";

type StatsInfoProps = {
    stats: StatsEntry[];
}

function StatsInfo({ stats }: StatsInfoProps) {
    return (
        <div className="flex flex-col items-center justify-start h-screen p-8 gap-6">

            <div className="flex flex-col gap-2 text-sm mb-4">
                <div>Toplam oyun: <span className="font-bold">{stats.length}</span></div>
                <div>Kazanılan oyun: <span className="font-bold">{stats.filter((stat) => stat.completed).length || 0}</span></div>
                <div>Ortalama oyun süresi(Tümü): <span className="font-bold">{formatDuration(Math.floor(stats.reduce((acc, stat) => acc + stat?.duration, 0) / stats.length) || 0)}</span></div>
                <div>Ortalama oyun süresi(Kazanılanlar): <span className="font-bold">{formatDuration(Math.floor(stats.filter((stat) => stat.completed).reduce((acc, stat) => acc + stat.duration, 0) / stats.filter((stat) => stat.completed).length) || 0)}</span></div>
                <div>Ortalama hamle sayısı(Tümü): <span className="font-bold">{(stats.reduce((acc, stat) => acc + stat.moves, 0) / stats.length || 0).toFixed(2)}</span></div>
                <div>Ortalama hamle sayısı(Kazanılanlar): <span className="font-bold">{(stats.filter((stat) => stat.completed).reduce((acc, stat) => acc + stat.moves, 0) / stats.filter((stat) => stat.completed).length || 0).toFixed(2)}</span></div>
                <div>En iyi süre: <span className="font-bold">{formatDuration(Math.floor(stats.filter((stat) => stat.completed).reduce((best, current) => current?.duration < best?.duration ? current : best, stats.filter((stat) => stat.completed)[0])?.duration) || 0)}</span></div>
            </div>
        </div>
    );
}

export default StatsInfo;