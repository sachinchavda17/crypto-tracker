'use client';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import dummyData from './data';

export default function App() {
  const [data, setData] = useState([]);
  const [rate, setRate] = useState({});
  const [currency, setCurrency] = useState('USD');
  const [currencySymbols, setCurrencySymbols] = useState({}); // ✅ Fix: Change to object
  const [search, setSearch] = useState('');

  useEffect(() => {
    const getDataApi = async () => {
      // Simulated API call
      const response = dummyData;
      setData(response.data);
      setRate(response.exchangeRates);
      setCurrencySymbols(response.currencySymbols); // ✅ Fix: Correctly set as an object
    };
    getDataApi();
  }, []);

  const searchResult = data.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const convertPrice = (price) => {
    const newRate = rate[currency] || 1;
    return (price * newRate).toFixed(2);
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="flex justify-between items-center bg-white dark:bg-gray-800 shadow-md p-4 rounded-lg gap-5">
        <div className="flex items-center gap-2 w-2/3 w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <FaSearch className="text-gray-500 dark:text-gray-300" />
          <input
            type="search"
            placeholder="Search by name or symbol"
            className=" dark:text-gray-300 outline-none ml-2 w-full"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="p-2 px-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          onChange={(e) => setCurrency(e.target.value)}
          value={currency}
        >
          <option value="USD">USD ($)</option>
          <option value="EUR">EUR (€)</option>
          <option value="GBP">GBP (£)</option>
          <option value="JPY">JPY (¥)</option>
          <option value="INR">INR (₹)</option>
        </select>
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg">
        <table className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3">Price ({currency})</th>
              <th className="p-3">Change 24h</th>
              <th className="p-3">Market Cap</th>
              <th className="p-3">Volume 24h</th>
            </tr>
          </thead>
          <tbody>
            {(search ? searchResult : data).map((item) => (
              <tr key={item.id} className="border-t border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-3 flex items-center gap-2">
                  <img src={item.icon} alt="icon" className="w-6 h-6" />
                  <span className="text-gray-900 dark:text-white">{item.name}</span>
                </td>
                <td className="p-3 text-center text-blue-600 dark:text-blue-400">
                  {currency === "USD" ? "$" : currencySymbols[currency] || ""} {convertPrice(item.price)}
                </td>
                <td className={`p-3 text-center ${item.change24h.includes('-') ? 'text-red-500' : 'text-green-500'}`}>
                  {item.change24h}
                </td>
                <td className="p-3 text-center dark:text-white">
                  {currency === "USD" ? "$" : currencySymbols[currency] || ""} {item.marketCap}
                </td>
                <td className="p-3 text-center dark:text-white">
                  {currency === "USD" ? "$" : currencySymbols[currency] || ""} {item.volume24h}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
