import React from "react";
import "../asset/rank.scss";

function RankTable({ rankSwitch }) {
  const RankArr = [
    { level: "brown", title: "초보완벽러" },
    { level: "silver", title: "끈기완벽러" },
    { level: "gold", title: "프로완벽러" },
  ];
  function toggleFunc() {
    rankSwitch(false);
  }
  return (
    <div className="rank_wrap">
      <ul className="table">
        {RankArr.map((item) => {
          return (
            <li>
              <figure>
                <img src={`/img/${item.level}.svg`} alt={item.title} />
              </figure>
              <h6>{item.title}</h6>
              <p>준비중</p>
            </li>
          );
        })}
      </ul>
      <div className="rankClose" onClick={toggleFunc}>
        <img src="/img/clear.svg" alt="" />
      </div>
    </div>
  );
}

export default RankTable;
