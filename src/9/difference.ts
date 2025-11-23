interface IA {
  a: number;
  b: string;
}

interface IB {
  a: number;
  c: boolean;
}

let a: IA = { a: 5, b: "" };
let b: IB = { a: 10, c: true };

interface IDifference {
  b: string;
}

type R = Record<string, any>;
type UniqKeys<T extends R, U extends R> = Exclude<keyof T, keyof U>;
type RT<T extends R, U extends R> = Pick<T, UniqKeys<T, U>>;

function difference<T extends R, U extends R>(a: T, b: U): RT<T, U> {
  let result: Partial<RT<T, U>> = {};

  (Object.keys(a) as Array<UniqKeys<T, U>>).forEach((k) => {
    if (!(k in b)) result[k] = a[k];
  });

  return result as RT<T, U>;
}

let v0: IDifference = difference(a, b);
console.log("v0", v0);
