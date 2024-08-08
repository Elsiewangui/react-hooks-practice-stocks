import React from "react";
import Stock from "./Stock";

function PortfolioContainer({ portfolio, onSell }) {
  return (
    <div>
      <h2>My Portfolio</h2>
      <ul>
        {portfolio.length > 0 ? (
          portfolio.map((stock) => (
            <li key={stock.ticker}>
              <Stock
                stock={stock}
                onSell={() => onSell(stock)}
              />
            </li>
          ))
        ) : (
          <p>Your portfolio is empty.</p>
        )}
      </ul>
    </div>
  );
}

export default PortfolioContainer;
