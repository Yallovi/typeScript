/**
 * Template Literal Types: позволяет создавать более сложные типы на основе строк.
 * Аналогично использованию шаблонных строк в JavaScript, но для типов
 */

type ReadOrWrite = "read" | "write";

type Access = `can${Capitalize<ReadOrWrite>}`;

type ErrorOrSuccess = "error" | "success";

type ReadOrWriteBulk<T> = T extends `can${infer R}` ? R : never;

type T = ReadOrWriteBulk<Access>;

type ResponseT = {
  result: `http${Capitalize<ErrorOrSuccess>}`;
};

const a: T = {
  result: "httpSuccess",
};

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// Тестовые данные
const user = { name: "Alice", age: 25, isActive: true };
const product = { title: "Laptop", price: 999.99, inStock: false };

getProperty(user, "name");

type IsString<T> = [T] extends [string] ? true : false;

// Примеры для тестирования:
// type Test1 = IsString<string>;
// type Test2 = IsString<number>;
// type Test3 = IsString<"hello">;
// type Test4 = IsString<boolean>;
// type Test5 = IsString<"read" | "write">;
// type Test6 = IsString<"read" | number>;

type ExtractArrayType<T> = T extends Array<infer P> ? P : never;

// Примеры для тестирования:
type Test1 = ExtractArrayType<string[]>; // должно быть string
type Test2 = ExtractArrayType<number[]>; // должно быть number
type Test3 = ExtractArrayType<boolean>; // должно быть never
type Test4 = ExtractArrayType<Array<{ id: number }>>; // должно быть {id: number}

type Keys<T, U> = { [K in keyof T]: T[K] extends U ? K : never }[keyof T];

type PickByType<T, U> = Pick<T, Keys<T, U>>;

// Примеры для тестирования
type Example1 = PickByType<
  { name: string; age: number; active: boolean },
  string
>;
type Example2 = PickByType<
  { id: number; title: string; count: number },
  number
>;

type PropertyType<T, K extends keyof T> = T[K];

// Тестовые примеры для проверки
// type Test1 = PropertyType<{ name: string; age: number }, "name">;
// type Test2 = PropertyType<
//   { id: number; active: boolean; role: string },
//   "active"
// >;
// type Test3 = PropertyType<{ title: string; count: number }, "count">;
// type Test4 = PropertyType<{ title: string; count: number }, "name">;

type GetReturnType<T> = T extends (...args: any) => infer R ? R : never;

// Примеры для тестирования
// type Test1 = GetReturnType<() => string>;
// type Test2 = GetReturnType<(x: number) => boolean>;
// type Test3 = GetReturnType<string>;
// type Test4 = GetReturnType<(a: number, b: string) => { id: number }>;
//

type Capitalize<T extends string> = T[0] extends '' ? T[0] : T extends `${infer F}`

// // Тестовые примеры
// type Test1 = Capitalize<'hello'>;
// type Test2 = Capitalize<'world'>;
// type Test3 = Capitalize<'typescript'>;
// type Test4 = Capitalize<''>;
