type Modifier = "create" | "update" | "read";

type UserRole = {
  readonly customers?: Modifier;
  readonly projects?: Modifier;
  readonly adminPanel?: Modifier;
};

type ModifierToAccess<Type> = {
  -readonly [Property in keyof Type as `canAccess${string & Property}`]-?: boolean;
};

type UserAccess1 = ModifierToAccess<UserRole>;

// Форма валидации

interface IForm {
  name: string;
  password: string;
}

const form: IForm = {
  name: "Вася",
  password: "1234",
};

type ValidationValue =
  | { isValid: true }
  | { isValid: false; errorMessage: string };

type Validation<T> = {
  [Property in keyof T]: ValidationValue;
};

const formValidation: Validation<IForm> = {
  name: { isValid: true },
  password: { isValid: false, errorMessage: "Должен быть длинее 5 символов" },
};
