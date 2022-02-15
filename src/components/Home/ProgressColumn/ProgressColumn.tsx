import "./ProgressColumn.scss";
import { FC } from "react";
import { categoriesApi } from "../../../service/categoriesService";
import Preloader2 from "../../Preloader/Preloader2";
import { ErrorType } from "../../../types/TypeError";
import { TCategoriesAndTask } from "../../../types/TypeCategories";
const ProgressColumn: FC = () => {
  const date = new Date().toLocaleDateString();
  const { data, error, isLoading } = categoriesApi.useGetAllCategoriesAndTaskQuery(date);

  const err = error as ErrorType;
  // let errMessage = "";
  if (err) {
    if ("data" in err) {
      if ("message" in err.data) {
        // errMessage = err.data.message;
        // eslint-disable-next-line no-console
        console.log(error, "ProgressColumnComponentError");
      }
    }
  }
  return (
    <section className="progress_column">
      <h5>Категорий</h5>
      <div className="diagram">
        {isLoading ? (
          <Preloader2 />
        ) : (
          <>
            {data?.length === 0 ? (
              <h2>На сегодня нет категорий</h2>
            ) : (
              data?.map((category: TCategoriesAndTask): JSX.Element => {
                const height = category.tasks.length * 10;
                return (
                  <div className="diagram-block" key={category.id}>
                    <span>{category?.tasks.length}</span>
                    <div
                      style={{
                        background: `${category.color}`,
                        height: `calc(100% / 100 * ${height})`,
                      }}
                      className="diagram-block-column"
                    ></div>
                  </div>
                );
              })
            )}
          </>
        )}
      </div>
      {error ? <b className="errorMessage">Не удалось загрузить компонент </b> : <></>}
    </section>
  );
};

export default ProgressColumn;
