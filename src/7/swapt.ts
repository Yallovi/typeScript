const obj: Record<string, number> = {
	a:1,
	b:2
}

function swapKeysAndValues<K extends string | number | symbol, V extends string | number | symbol>(
	obj: Record<K,V>): Record<V, K> {
	const result = {} as Record<V, K>
	
	for (const [key,value] of Object.entries(obj)) {
		result[value as V] = key as K
	}

	return result
}

swapKeysAndValues(obj)