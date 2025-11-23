const user = {
  name: "Vasiliy",
  age: 8,
  skills: ["typescript", "javascript"],
};

function pickObjectKeys<
  T extends Record<string, unknown>,
  K extends Array<keyof T>,
>(obj: T, keys: K): Pick<T, K[number]> {
  const result: Partial<Pick<T, K[number]>> = {};

  keys.forEach((k) => {
    result[k] = obj[k];
  });

  return result as Pick<T, K[number]>;
}

const res = pickObjectKeys(user, ["age", "skills"]);
console.log("res", res);
/*
{
  age: 8,
  skills: ['typescript', 'javascript']
}
*/
