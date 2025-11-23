/* По сути infer временно объявляет тип переменной в условии, позволяет использовать его в реализации типа */
type GetFirstArg<T> = T extends (first: infer First, ...args: any[]) => any
  ? First
  : never;

function runTransaction(transaction: { fromTo: [string, string] }) {
  console.log("transaction", transaction);
}

const transaction: GetFirstArg<typeof runTransaction> = {
  fromTo: ["1", "2"],
};

runTransaction(transaction);
