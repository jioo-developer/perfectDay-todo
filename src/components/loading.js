import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../asset/loading.scss";
function Loading() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 1000);
  }, []);
  return (
    <div className="center_wrap">
      <div className="logo_wrap">
        <p className="title">완벽한 하루</p>
      </div>
      <footer>
        <p>오늘도 완벽한 하루를 보내시길 바랄게요</p>
        <p>Copyright 2021 ⓒ jioo-designer </p>
      </footer>
    </div>
  );
}

export default Loading;
