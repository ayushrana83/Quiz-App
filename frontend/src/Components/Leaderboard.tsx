import React, { useState, useEffect } from 'react';
import { Axios } from '../Axios';

interface LeaderboardEntry {
  id: string;
  email: string;
  score: number;
  category: string;
}

const Leaderboard: React.FC = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof LeaderboardEntry;
    direction: 'ascending' | 'descending';
  }>({
    key: 'score',
    direction: 'descending',
  });

  useEffect(() => {
    // Simulate API call with setTimeout
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await Axios.get("/dashboard/get");
        // Temporary data
        // console.log("response" , response);
        // console.log(response.data.newScore);
        const tempData: LeaderboardEntry[] = [
          { id: '1', email: 'john@example.com', score: 850, category: 'Expert' },
          { id: '2', email: 'sarah@example.com', score: 920, category: 'Master' },
          { id: '3', email: 'mike@example.com', score: 760, category: 'Advanced' },
          { id: '4', email: 'emma@example.com', score: 890, category: 'Expert' },
          { id: '5', email: 'alex@example.com', score: 710, category: 'Advanced' },
          { id: '6', email: 'lisa@example.com', score: 980, category: 'Master' },
          { id: '7', email: 'david@example.com', score: 830, category: 'Expert' },
          { id: '8', email: 'olivia@example.com', score: 795, category: 'Advanced' },
        ];
        
        setEntries(response.data.newScore || tempData);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const requestSort = (key: keyof LeaderboardEntry) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedEntries = React.useMemo(() => {
    const sortableEntries = [...entries];
    sortableEntries.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    return sortableEntries;
  }, [entries, sortConfig]);

  const getColor = (index: number) => {
    switch (index) {
      case 0:
        return 'bg-purple-200 text-purple-900';
      case 1:
        return 'bg-blue-200 text-blue-900';
      case 2:
        return 'bg-green-200 text-green-900';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSortIcon = (key: keyof LeaderboardEntry) => {
    if (sortConfig.key !== key) return '↕';
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  if (isLoading) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded mb-2"></div>
          {[...Array(8)].map((_, index) => (
            <div key={index} className="h-16 bg-gray-100 rounded mb-2"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rank
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('email')}
              >
                Email {getSortIcon('email')}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('score')}
              >
                Score {getSortIcon('score')}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('category')}
              >
                Category {getSortIcon('category')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedEntries.map((entry, index) => (
              <tr key={entry.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {entry.email}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 ${getColor(index)}`}>
                  {entry.score.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full`}>
                    {entry.category}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;