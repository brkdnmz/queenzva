import User from "../utils/user";
import NameTag from "../components/name-tag";
import StatsTable from "../components/stats-table";
import StatsInfo from "../components/stats-info";
import StatsDurationChart from "../components/stats-duration-chart";
function Stats() {
  const user = new User();
  const stats = user.getStats();

  return (
    <div className="flex flex-col items-center justify-start h-screen p-8 gap-6">
      <NameTag changeable={true} />

      {stats.length > 0 ? (
        <>
          <StatsInfo stats={stats} />
          <StatsDurationChart stats={stats} />
          <StatsTable stats={stats} />
        </>
      ) : (
        <div className="text-center text-gray-500">
          Oyun bulunamadı.
        </div>
      )}
    </div>
  );
}

export default Stats;