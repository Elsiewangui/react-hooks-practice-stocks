import React, { useState, useEffect } from "react";
import Stock from "./Stock";
import PortfolioContainer from "./PortfolioContainer"; // Updated import

function StockContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [sortBy, setSortBy] = useState("ticker");
  const [filterBy, setFilterBy] = useState("all");

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const response = await fetch("/api/stocks");
      const data = await response.json();
      setStocks(data);
    } catch (error) {
      console.error("Error fetching stocks:", error);
    }
  };

  const handleBuy = (stock) => {
    setPortfolio([...portfolio, stock]);
  };

  const handleSell = (stock) => {
    setPortfolio(portfolio.filter((item) => item.ticker !== stock.ticker));
  };

  const handleSort = (criteria) => {
    setSortBy(criteria);
  };

  const handleFilter = (type) => {
    setFilterBy(type);
  };

  const sortedStocks = [...stocks].sort((a, b) => {
    if (sortBy === "ticker") {
      return a.ticker.localeCompare(b.ticker);
    } else if (sortBy === "price") {
      return a.price - b.price;
    }
    return 0;
  });

  const filteredStocks = sortedStocks.filter((stock) => {
    return filterBy === "all" || stock.type === filterBy;
  });

  return (
    <div>
      <h2>Stocks</h2>
      {/* Sort and Filter Controls */}
      <div>
        <button onClick={() => handleSort("ticker")}>Sort by Ticker</button>
        <button onClick={() => handleSort("price")}>Sort by Price</button>
        <select onChange={(e) => handleFilter(e.target.value)} value={filterBy}>
          <option value="all">All</option>
          <option value="tech">Tech</option>
          <option value="finance">Finance</option>
          {/* Add more options as needed */}
        </select>
      </div>
      
      {/* Render Stocks */}
      <ul>
        {filteredStocks.map((stock) => (
          <li key={stock.ticker}>
            <Stock
              stock={stock}
              onBuy={() => handleBuy(stock)}
            />
          </li>
        ))}
      </ul>

      {/* Portfolio Component */}
      <PortfolioContainer portfolio={portfolio} onSell={handleSell} />
    </div>
  );
}

export default StockContainer;
