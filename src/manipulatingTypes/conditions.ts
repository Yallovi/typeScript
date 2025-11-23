interface HttpResponse<T extends "success" | "failed"> {
  code: number;
  data: T extends "success" ? string : Error;
}

const suc: HttpResponse<"success"> = {
  code: 200,
  data: "str",
};

const err: HttpResponse<"failed"> = {
  code: 404,
  data: new Error(),
};

class User {
  id: number;
  name: string;
}

class UserPersistend extends User {
  dbId: string;
}

// Можем сделать перегрузку
function getUser(id: number): User;
function getUser(dbId: string): UserPersistend;
function getUser(idOrDbId: string | number): User | UserPersistend {
  if (typeof idOrDbId === "string") {
    return new UserPersistend();
  } else {
    return new User();
  }
}

// Или сделать условие

type UserOrUserPersistend<T extends string | number> = T extends number
  ? User
  : UserPersistend;

function getUser2<T extends string | number>(id: T): UserOrUserPersistend<T> {
  if (typeof id === "string") {
    return new UserPersistend();
  } else {
    // Здесь возникает ошибка Type 'User' is not assignable to type 'UserOrUserPersistend<T>'
    // Это возникает из-за условных типов TS не может сравнить два типа и приводит к User !== UserOrUserPersistend<T>
    // Приходится пользоваться хаком as. Мб в будущих версиях это изменят
    return new User() as UserOrUserPersistend<T>;
  }
}
