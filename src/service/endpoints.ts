export enum CategoriesPaths {
  categoriesCRUD = "/categories",
  getCategoriesAndTasks = "/categories/all_task",
}

export enum TasksPaths {
  tasksCUD = "/task",
  taskSetStatusPatch = "/task",
  getTaskByDate = "/date",
  checkCreateDate = "/date/check_date",
}

export enum UserPaths {
  loginUser = "/auth/login",
  registrationUser = "/auth/registration",
  checkUser = "/auth/auth",
}
