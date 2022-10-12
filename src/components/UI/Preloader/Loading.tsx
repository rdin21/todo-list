import s from "./Style.module.scss";

export default function Preloader2(): JSX.Element {
  return (
    <div className={s.loader_block}>
      <div className={s.loader}>
        <div className={s.loader__dot}></div>
        <div className={s.loader__dot}></div>
        <div className={s.loader__dot}></div>
        <div className={s.loader__dot}></div>
        <div className={s.loader__dot}></div>
        <div className={s.loader__dot}></div>
        <p className={s.loader__text}></p>
      </div>
    </div>
  );
}
