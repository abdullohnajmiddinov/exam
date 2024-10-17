
import React, { useEffect, useState } from "react";

const database = [
  { name: "Web Three", profit: 1, price: 100 },
  { name: "Komi Terminator", profit: 100, price: 50000 },
  { name: "Sherjahon", profit: 40, price: 12000 },
  { name: "Aziz", profit: 50, price: 10000 },
  { name: "Aziz", profit: 75, price: 15000 },
];

const App = () => {
  const [rank, setrank] = useState(() => {
    return JSON.parse(localStorage.getItem('rank') || 0)
  });
  const [perHour, setperHour] = useState(() => {
    return JSON.parse(localStorage.getItem('perHour') || 0)
  });
  const [balance, setbalance] = useState(() => {
    return JSON.parse(localStorage.getItem('balance') || 0)
  });

  useEffect(() => {
    localStorage.setItem("rank", JSON.stringify(rank))
  }, [rank])

  useEffect(() => {
    localStorage.setItem("balance", JSON.stringify(balance))
  }, [balance])

  useEffect(() => {
    localStorage.setItem("perHour", JSON.stringify(perHour))
  }, [perHour])


  useEffect(() => {
checkRank()
  }, [balance, rank])

  const checkRank = () => {
    if (balance >= 1000000000) {
      setrank(10);
    } else if (balance >= 100000000) {
      setrank(9);
    } else if (balance >= 10000000) {
      setrank(8);
    } else if (balance >= 5000000) {
      setrank(7);
    } else if (balance >= 1000000) {
      setrank(6);
    } else if (balance >= 200000) {
      setrank(5);
    } else if (balance >= 100000) {
      setrank(4);
    } else if (balance >= 25000) {
      setrank(3);
    } else if (balance >= 5000) {
      setrank(2);
    } else {
      setrank(0);
    }
  };

  const shopHandler = (profit, price) => {
    if (balance >= price) {
      setperHour((prev) => prev + profit);
      setbalance((prev) => prev - price);
    }
  };

  useEffect(() => {
    setInterval(() => {
      setbalance(prev => prev + perHour)
    }, 10000);

    return () => {

    }
  }, [perHour])


  const handlerRank = () => {
    if (rank === 0) {
      return "Bronze";
    } else if (rank === 1) {
      return "Silver";
    } else if (rank === 2) {
      return "Gold";
    } else if (rank === 3) {
      return "Platinum";
    } else if (rank === 4) {
      return "Diamond";
    } else if (rank === 5) {
      return "Epic";
    } else if (rank === 6) {
      return "Legendary";
    } else if (rank === 7) {
      return "Master";
    } else if (rank === 8) {
      return "Grand Master";
    } else if (rank === 9) {
      return "Lord";
    } else if (rank === 10) {
      return "Creator";
    } else {
      return "unkown";
    }
  };

  const handlerClick = () => {
    setbalance((prev) => prev + 1);
  };

  return (
    <div>
      <div className="w-2/3 mx-auto container">
        <div className="bg-gradient-to-l from-amber-400 flex items-center justify-between to-yellow-500 shadow-md shadow-amber-200 p-5 mt-2 rounded-2xl text-white font-bold text-xl">
          <div>
            <p className="">{handlerRank()}</p>
            <p className="text-sm">{rank} / 10</p>
          </div>
          <div>
            <p className="font-medium text-sm">profit per hour</p>
            <p className="text-right">$ +{perHour}</p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-10">
          <div className="drawer bg-base-200 flex-1 rounded-2xl flex items-center justify-center gap-2 flex-col py-6 mt-5">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              <label htmlFor="my-drawer" className="">
                <img src="" className="bg-base-100 size-14" alt="None" />
                <p>Daily Reward</p>
                <p>3:00</p>
              </label>
            </div>
            <div className="drawer-side">
              <label htmlFor="my-drawer" className="drawer-overlay"></label>
              <ul className="menu bg-base-200 gap-1 text-base-content min-h-full w-80 p-1">
                {database.map((item, id) => (
                  <li
                    key={id}
                    onClick={() => shopHandler(item.profit, item.price)}
                    className="flex flex-row hover:glass bg-warning text-white font-bold rounded-lg items-center justify-between text-xs"
                  >
                    <span className="flex-1">{item.name}</span>
                    <span className="flex-1">Прибыл: ${item.profit}</span>
                    <span className="flex-1">Стоимость: ${item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-base-200 flex-1 rounded-2xl flex items-center justify-center gap-2 flex-col py-6 mt-5">
            <img src="" className="bg-base-100 size-14" alt="None" />
            <p>Daily Reward</p>
            <p>3:00</p>
          </div>

          <div className="bg-base-200 flex-1 rounded-2xl flex items-center justify-center gap-2 flex-col py-6 mt-5">
            <img src="" className="bg-base-100 size-14" alt="None" />
            <p>Daily Reward</p>
            <p>3:00</p>
          </div>
        </div>


        <div>
          <p className="text-amber-400 text-center text-lg font-bold mt-4">
            ${balance}
          </p>
        </div>

        <div className="flex items-center justify-center mt-5">
          <button
            className="flex items-center justify-center"
            onClick={handlerClick}
          >
            <img
              className="size-48"
              src="https://hamsterkombat.me/hamster-kombat-coin.png"
              alt=""
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
