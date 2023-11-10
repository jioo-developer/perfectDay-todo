import React from "react";
import "../reset.css";
import "../asset/rank.scss";
import { rankAction } from "../module/reducer";

function RankTable({ dispatch }) {
  return (
    <div className="rank_wrap">
      <ul className="table">
        <li>
          <figure>
            <img src="/img/brown.svg" alt="" />
          </figure>

          <figcaption>
            <h6>초보완벽러</h6>
            <p>미션완료 5회 미만</p>
          </figcaption>
        </li>
        <li>
          <figure>
            <img src="/img/silver.svg" alt="" />
          </figure>

          <figcaption>
            <h6>끈기완벽러</h6>
            <p>미션완료 10회 미만</p>
          </figcaption>
        </li>
        <li>
          <figure>
            <img src="/img/gold.svg" alt="" />
          </figure>

          <figcaption>
            <h6>프로완벽러</h6>
            <p>미션완료 15회 이상</p>
          </figcaption>
        </li>
      </ul>
      <div className="rankClose">
        {/* dispatch(rankAction()) */}
        <img src="/img/clear.svg" alt="" />
      </div>
    </div>
  );
}

export default RankTable;
