
type Data = Array<Record<"id", number> & Record<string, unknown>>
// Или
interface Id {
	id: number
}


const sort = <T extends Data>(array: T, order: 'asc' | 'desc' = 'asc'): T => {
	return array.sort((a,b) => order === 'asc' ? a.id - b.id : b.id - a.id)
}

const sort2 = <T extends Id>(array: T[], order: 'asc' | 'desc' = 'asc'): T[] => {
	return array.sort((a,b) => order === 'asc' ? a.id - b.id : b.id - a.id)
}

const array = [
	{id: 1, name: "Вася"},
	{id: 2, name: "Петя"},
	{id: 3, name: "Надя"},
	{id: 4, name: "Толик"},
]

const sorderArray = sort(array, 'desc')
const sorderArray2 = sort2  (array, 'desc')
console.log('sorderArray: ', sorderArray);
console.log('sorderArray2: ', sorderArray2);