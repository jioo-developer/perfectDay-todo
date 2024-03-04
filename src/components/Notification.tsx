import "../asset/notification.scss";
import { typeObject } from "../module/reducer";
import { useMyContext } from "../module/MyContext";

type finishStateprops = {
  emitFunc: (params: boolean) => void;
};

function Notification({ emitFunc }: finishStateprops) {
  const getFinish = localStorage.getItem("clearDB");
  const { successDate, finishDispatch, issueDispatch } = useMyContext();
  const sliceData = successDate.slice(0, 10);

  function notiToggle(): void {
    emitFunc(false);
  }

  return (
    <>
      <div className="noti_wrap">
        <div className="cover" />
        <aside>
          <div className="aside_header">
            <p className="noti_title">알림함</p>
            <div>
              <button
                className="noti_title"
                onClick={() => finishDispatch({ type: typeObject.reset })}
                disabled={getFinish === null}
              >
                모두 지우기
              </button>
              <img
                src="/img/clear.svg"
                alt=""
                onClick={() => {
                  issueDispatch((prev) => !prev);
                  notiToggle();
                }}
              />
            </div>
          </div>
          <ul className="noti_body">
            {
              // 알림들 만드는 map 함수
              sliceData.length > 0
                ? sliceData.map((item, index) => {
                    return (
                      <li key={index}>
                        <img src="/img/check_btn.svg" alt="" />
                        <div className="li_txt_wrap">
                          <p className="li_time">
                            {`${item.year}년 ${item.month}월 ${item.date}일 ${
                              item.hour < 10 ? "0" + item.hour : item.hour
                            }:${item.min < 10 ? "0" + item.min : item.min}`}
                          </p>
                          <p className="li_title">{item.title}</p>
                        </div>
                      </li>
                    );
                  })
                : null
            }
          </ul>
        </aside>
      </div>
    </>
  );
}

export default Notification;
