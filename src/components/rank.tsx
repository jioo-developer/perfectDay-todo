import "../asset/rank.scss";

function RankTable({ rankSwitch }: any) {
  const RankArr = [
    { level: "brown", title: "초보완벽러", condition: "할일 클리어 20회 미만" },
    {
      level: "silver",
      title: "끈기완벽러",
      condition: "할일 클리어 50회 미만",
    },
    { level: "gold", title: "프로완벽러", condition: "할일 클리어 100회 미만" },
  ];
  function toggleFunc(): void {
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
              <figcaption>
                <h6>{item.title}</h6>
                <p>{item.condition}</p>
              </figcaption>
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
