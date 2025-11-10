type Hash = number;

interface Entry<K, V> {
	key: K;
	value: V;
	hash: Hash;
	next: Entry<K, V> | undefined;
}

class MyMap<K, V>  {
	private buckets: Array<Entry<K, V> | undefined>;
	private capacity: number;
	private _size: number = 0;
	private loadFactor: number;

	// для объектов - уникальный идентификатор
	private objectIds = new WeakMap<object, number>();
	private nextObjectId = 1;

	constructor(initialCapacity: number = 16, loadFactor: number = 0.75) {
		this.capacity = Math.max(4, initialCapacity);
		this.loadFactor = loadFactor;
		this.buckets = new Array(this.capacity);
	}

	get size(): number {
		return this._size
	}

	private hashString(s: string): Hash {
    let h = 5381;
    for (let i = 0; i < s.length; i++) {
      h = (h * 33) ^ s.charCodeAt(i);
    }
    return h >>> 0;
  }

	private hashNumber(n: number): Hash {
    if (Number.isNaN(n)) return 0x7fffffff;
    // Простая стратегия: хэшировать строку числа
    return this.hashString(String(n));
  }

	private getObjectId(obj: object): Hash {
		const m = this.objectIds;
		let id = m.get(obj);
		if (id === undefined) {
			id = this.nextObjectId++;
			m.set(obj, id);
		}

		return id 
	}

	private getHashForKey(key: any): Hash {
		const t = typeof key;
		if(t === 'string') return this.hashString(key)
		if(t === 'number') return this.hashNumber(key)
		if(t === 'boolean') return key ? 1231 : 1237;
		if(t === 'symbol') return this.hashString(String(key))
	  if (key === null) return 0xdeadbeef;
    if (t === 'undefined') return 0xcafebabe;
	  
		return this.hashNumber(this.getObjectId(key));
	}


  private equalsKey(a: any, b: any): boolean {
    if (a === b) return true;
    // special-case NaN
    return Number.isNaN(a) && Number.isNaN(b);
  }

  private indexFor(hash: number, capacity: number = this.capacity): number {
    return (hash & 0x7fffffff) % capacity;
  }

	private rehash(newCapacity: number): void {
    // 1) Создать newBuckets длины newCapacity
		const newBuckets: Array<Entry<K, V>> = new Array(newCapacity).fill(null)
    // 2) Пройтись по старым бакетам и по каждой записи: 
    //    вычисли новый индекс и вставь в newBuckets (например, добавление в голову)
		for (let i = 0; i < this.buckets.length; i++) {
			let entry = this.buckets[i];
			
				while(entry) {
					const newIndex = this.indexFor(entry.hash, newCapacity); ;
					
					const next = entry.next;

					entry.next = newBuckets[newIndex]
					newBuckets[newIndex] = entry

					entry = next
				}


		}
    // 3) обнови this.buckets и this.capacity
		this.buckets = newBuckets
		this.capacity = newCapacity
  }

	set(key: K, value: V) {
		// 1) вычислить hash, индекс
		const hash = this.getHashForKey(key);
		const index = this.indexFor(hash);
    // 2) пройти по цепочке и заменить если ключ найден
		let entry = this.buckets[index];
		
		while(entry) {
			if(this.equalsKey(entry.key, key)) {
				entry.value = value
				return
			}
			entry = entry.next
		}
    // 3) иначе создать Entry и вставить в голову (или хвост)
		const newEntry: Entry<K, V> = {key, value, hash, next: this.buckets[index]};
		this.buckets[index] = newEntry
		// 4) увеличить size и проверить loadFactor -> вызвать rehash
		this._size++;
		
		if(this._size > this.capacity * this.loadFactor) {
			this.rehash(this.capacity * 2)
		}
	};
	
	get(key: K): V | undefined {
		// найти запись по ключу и вернуть value или undefined
		const hash = this.getHashForKey(key)
		const index = this.indexFor(hash)

		const entry = this.buckets[index];
		let entryValue;

		while(entry) {
			if(this.equalsKey(entry.key, key)) {
				entryValue = entry.value
				break
			}

			entry = entry.next
		}

		return entryValue;
	};

	delete(key: K){
		// удалить из цепочки, вернуть true если удалил, false если не найден
		const hash = this.getHashForKey(key)
		const index = this.indexFor(hash)

		let entry = this.buckets[index];
		let prev: Entry<K, V> | undefined = undefined;
		
		while(entry) {
			if(this.equalsKey(entry.key, key)) {
				if(prev) {
					prev.next = entry.next
				} else {
					this.buckets[index] = entry.next
				}
				this._size--;
				return true
			}
			prev = entry
			entry = entry.next
		}

    return false;
	};


	clear(){
		this.buckets = new Array(this.capacity)
		this._size = 0
	};

}

let weatherMap = new MyMap();
weatherMap.set('London', 20);
weatherMap.set('Berlin', 25);
// Пример получения данных
console.log(weatherMap.get('London')); // Выведет 20