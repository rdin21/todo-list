import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import s from "./Item.module.scss";

export default function Status({ status }: { status: null | boolean }): JSX.Element {
  return (
    <>
      <div
        className={s.ready}
        style={{ visibility: status === null ? "hidden" : status ? "inherit" : "hidden" }}
      >
        <FontAwesomeIcon icon={faCheck} />
      </div>
      <div
        className={s.not_ready}
        style={{ visibility: status === null ? "hidden" : status ? "hidden" : "inherit" }}
      >
        &times;
      </div>
    </>
  );
}
