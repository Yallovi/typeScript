const data = [
{ group: 1, name: 'a' },
{ group: 1, name: 'b' },
{ group: 2, name: 'c' },
];

function group<T, K extends keyof T>(data: T[], key: K): Record<string | number | symbol, T[]>{
	const result: Record<string | number | symbol, T[]> = {}

	data.forEach((item) => {
		const keyValue = item[key] as unknown  as string | number | symbol 
		if(result[keyValue]) {
			result[keyValue].push(item)
		} else {
			result[keyValue] = [item]
		}

	})

	return result
}

const res = group(data, 'group')
console.log('res: ', res);

interface IGroup<T> {
	[key: string]: T[]
}

type Key = string | number | symbol

function group2<T extends Record<Key, any>>(data: T[], key: keyof T): IGroup<T> {
	return data.reduce<IGroup<T>>((map, item) => {
		const keyValue = item[key]
		let curElement = map[keyValue]

		if (Array.isArray(curElement)) {
			curElement.push(item)
		} else {
			curElement = [item]
		}
		map[keyValue] = curElement

		return map
	}, {})
}

group2(data, 'group')