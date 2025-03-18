import { useState, useMemo } from "react";
import { StatsEntry } from "../types/user";
import { useNavigate } from "react-router-dom";
import { formatDuration } from "../utils/datetime";

type StatsTableProps = {
    stats: StatsEntry[];
}

function StatsTable({ stats }: StatsTableProps) {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
  
    const filteredStats = useMemo(() => {
      // TODO: Search and sort by hash, date, duration, moves
      return stats.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
    }, [stats]);
  
    const paginatedStats = useMemo(() => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      return filteredStats.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredStats, currentPage]);
  
    const totalPages = Math.ceil(filteredStats.length / itemsPerPage);

    if (stats.length === 0) {
        return <div>Oyun bulunamadı</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div className="w-full max-w-full overflow-x-auto">
              <table className="w-full bg-white border rounded-lg whitespace-nowrap">
                <thead>
                  <tr className="bg-gray-100">
                    <th 
                      className="px-2 md:px-4 py-2 cursor-pointer hover:bg-gray-200 max-w-[100px] text-center"
                    >
                      <div className="truncate">Kod</div>
                    </th>
                    <th 
                      className="px-2 md:px-4 py-2 cursor-pointer hover:bg-gray-200 whitespace-nowrap text-center"
                    >
                      Süre
                    </th>
                    <th 
                      className="px-2 md:px-4 py-2 cursor-pointer hover:bg-gray-200 whitespace-nowrap text-center"
                    >
                      Hamle
                    </th>
                    <th 
                      className="px-2 md:px-4 py-2 cursor-pointer hover:bg-gray-200 whitespace-nowrap text-center"
                    >
                      Durum
                    </th>
                    <th 
                      className="px-2 md:px-4 py-2 cursor-pointer hover:bg-gray-200 whitespace-nowrap text-center"
                    >
                      Tarih
                    </th>
                    <th 
                      className="px-2 md:px-4 py-2 cursor-pointer hover:bg-gray-200 whitespace-nowrap text-center"
                    >
                      Tekrar Oyna
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedStats.map((stat, index) => (
                    <tr key={index} className="border-t hover:bg-gray-50">
                      <td className="px-2 md:px-4 py-2 text-xs md:text-sm max-w-[100px] text-center">
                        <div className="truncate" title={stat.hash}>{stat.hash}</div>
                      </td>
                      <td className="px-2 md:px-4 py-2 text-xs md:text-sm whitespace-nowrap text-center">{formatDuration(stat.duration)}</td>
                      <td className="px-2 md:px-4 py-2 text-xs md:text-sm whitespace-nowrap text-center">{stat.moves}</td>
                      <td className="px-2 md:px-4 py-2 text-xs md:text-sm whitespace-nowrap text-center">
                        <span className={`px-2 py-1 rounded-full text-xs ${stat.completed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {stat.completed ? 'Kazandın' : 'Tamamlanmadı'}
                        </span>
                      </td>
                      <td className="px-2 md:px-4 py-2 text-xs md:text-sm whitespace-nowrap text-center">{new Date(stat.startTime).toLocaleDateString() + " " + new Date(stat.startTime).toLocaleTimeString()}</td>
                      <td className="px-2 md:px-4 py-2 text-xs md:text-sm whitespace-nowrap text-center">
                        <button className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                          onClick={() => {
                            navigate(`/g/${stat.hash}`);
                          }}
                        >
                        Oyna
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
    
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
                >
                  ←
                </button>
                <span className="px-4 py-1">
                  Sayfa {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
                >
                  →
                </button>
              </div>
            )}
          </div>
      );
}

export default StatsTable;