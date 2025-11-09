class User {
	name: string

	/**
	 * Конструктор - специальный метод класса, автоматически вызываемый при создании объекта (инстанса) класса
	 * 1. автоматически вызывается при использование new
	 * 2. всегда возвращает инстанс класа
	 */
	constructor(name: string) {
		this.name = name
	}
}

const user = new User("Вася")
console.log('user', user);
user.name = "Петя"
console.log('user', user);

class Admin {
	role: number
}

const admin = new Admin()