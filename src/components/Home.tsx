import { useState } from "react";
import List from "./List";
import Editor from "./editor";
import { dayMemo } from "../module/exportFunction";

type HomeProps = {
  currentUser: string | null;
  creation: string | null;
};

function Home({ currentUser, creation }: HomeProps) {
  const [clearList, setClearList] = useState<number>(0);

  function getParcent(value: number): void {
    setClearList(value);
  }

  return (
    <>
      <section className="section01 pd-x20">
        <div className="s1_wrap">
          <div className="s1_txt_wrap">
            <p className="today">
              오늘 <span>{currentUser}</span> 님은
            </p>
            <p className="parcent">{clearList}%</p>

            <p className="caption">만큼 완벽한 하루를 보내셨습니다!</p>
          </div>
          <img src="/img/wow.svg" alt="" />
        </div>
        <div className="race">
          <p className="member">{currentUser}</p>
          <div className="member_caption">
            님은 {creation ? dayMemo(creation) : 0}일째 완벽한 하루를 사용중!!
          </div>
        </div>
      </section>
      <List getParcent={getParcent} />
      <Editor />
    </>
  );
}

export default Home;
