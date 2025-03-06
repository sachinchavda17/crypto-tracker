import "./App.css";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

function App() {
  const [data, setData] = useState([]);
  const [rate, setRate] = useState({});
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getDataApi = async () => {
      const response = await (
        await fetch("http://192.168.1.100:8989/crypto")
      ).json();
      setData(response.data);
      setRate(response.exchangeRates);
      setSymbol(response.currencySymbols);
      // console.log(response);
    };
    getDataApi();
  }, []);

  const searchResult = data.filter(
    (item) => item.name.includes(search) || item.symbol.includes(search)
  );

  const convertPrice = (price) => {
    const newRate = rate[currency] || 1;
    return price * newRate;
  };

  return (
    <div className="" style={{width:"100%"}}>
      <div
        className="header"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          className="left"
          style={{width:"70%", display: "flex" }}
        >
          <div className="icon">
            <FaSearch />
          </div>
          <input
            className="search"
            type="search"
            placeholder="Search by name or symbol"
            style={{width:"100%" , padding:"5px"}}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="right" style={{width:"30%",marginLeft:"5px"}}>
          <select
          style={{padding:"5px"}}
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
      </div>
      <div className="main" style={{width:"100%"}}>
        <table>
          <thead>
            <tr>
              <th >Name</th>
              <th >Price {currency} </th>
              <th >Change24h</th>
              <th >Market Cap</th>
              <th >Volume24h</th>
            </tr>
          </thead>
          <tbody>
            {search
              ? searchResult.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={item.icon}
                        alt="icon"
                        sizes="10px"
                        style={{ width: "20px", height: "20px" }}
                      />
                      {item.name}
                    </td>
                    <td>{convertPrice(item.price)}</td>
                    <td>{item.change24h}</td>
                    <td>{item.marketCap}</td>
                    <td>{item.volume24h}</td>
                  </tr>
                ))
              : data.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={item.icon}
                        alt="icon"
                        style={{ width: "20px", height: "20px" }}
                      />
                      {item.name}
                    </td>
                    <td>{convertPrice(item.price)}</td>
                    <td>{item.change24h}</td>
                    <td>{item.marketCap}</td>
                    <td>{item.volume24h}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
