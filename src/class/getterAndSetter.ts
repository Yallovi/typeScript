/**
 * Геттер и Сеттер - позволяю контролировать доступ к свойствам объекта.
 * Геттер для получения, сеттер для сохранения
 * 
 * Зачему нужны: 
 * 1.Инкапсуляция: позволяют скрыть детали реализации и внутреннее состояние объекта Представляя публичный интерфейс для работы
 * 2. Контроль над доступом: можно добавить доп логику при установке или получения свойства. Например, проверку или изменение 
 */
class User {
	_login: string;
	password: string;
	createdAt: Date;

	set login(l: string) {
		this._login = 'user-' + l 
		this.createdAt = new Date()
	}

	get login() {
		return this._login
	}
}

const user = new User()
user.login = "Test"
console.log('user.login:', user.login);