import s from "./ProgressColumn.module.scss";
import { categoriesApi } from "../../../service/categoriesService";
import { TCategoriesAndTask } from "../../../types/TypeCategories";
import Columns from "./Columns";
import CategoriesSettings from "../CategoriesSettings";
import { TUserFromAccessToken } from "../../../types/TypeUser";
import { useAppSelector } from "../../../hooks/redux";

export default function ProgressColumn(): JSX.Element {
  const { id: userId } = useAppSelector((s) => s.user.data) as TUserFromAccessToken;
  const date = new Date().toLocaleDateString();
  const { data, error, isLoading } = categoriesApi.useGetAllCategoriesAndTaskQuery(
    `?date=${date}&userId=${userId}`
  );
  const categories = data as TCategoriesAndTask[];

  // eslint-disable-next-line no-console
  if (error) console.log("ProgressColumnError", error);

  return (
    <section className={s.progress__column} style={{ position: "relative" }}>
      <CategoriesSettings />
      <Columns data={categories} isLoading={isLoading} />
      {error ? <b className="error-message">Не удалось загрузить компонент </b> : <></>}
    </section>
  );
}
