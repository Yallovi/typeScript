/**
 * Имплементация интерфейсов позволяет абстрагироватся от конкретной реализации, согласовывая основные методы и свойства класса
 * 
 * Пример Logger:
 * 1. Логирование может быть разным (в базу, консоль, файл), но важно наличие универсалных методов
 * 2. Создание интерфейса ILogger - предопределяет наличие этих методов в любой реализации логера
 */

interface ILogger {
	log(...args): void
	error(...args): void
}

class Logger implements ILogger {
	log(...args: unknown[]): void {
		console.log(...args);
	}
	error(...args: unknown[]): void {
		// Кинуть во внещнюю систему
		console.log(...args);
	}
}

interface IPayble {
	pay(paymentId: string): void
	price?: string
}

interface IDeletable {
	delete(): void
}

class User implements IPayble, IDeletable {
	delete(): void {
		throw new Error('Method not implemented.')
	}

	pay(paymentId: string) {
		// 
	}

}

const user = new User()
