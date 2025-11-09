/**
 * Абстрактные классы в ts - это классы, которые не могут быть инстанцированы напрямую.
 * Они служат в качестве шаблонов для других классов и могут содержать как абстрактные методы (без реализации),
 * так и методы с реализацией.
 * Абстрактные классы полезны, когда вы хотите определить общий интерфейс и поведение для группы связанных классов,
 * но при этом не хотите позволить создание экземпляров самого абстрактного класса.
 */

abstract class Contrloller {
	abstract handle(req: any): void

	logRequest(req: any): void {
		console.log('Request received: ', req);
		this.handle(req);
		console.log('Request processed');
	}
}

class UserController extends Contrloller {
	handle(req: any): void {
		console.log('Handling user request: ', req);
	}

}

const user = new UserController()
user.logRequest({url: '/user', method: 'GET'});

abstract class Logger {
	abstract log(message: string): void

	printDate(date: Date) {
		this.log(date.toString())
	}
}


class UserLogger extends Logger {
	
	log(message: string): void {
		console.log('Сообщение:', message);
	}

	logWithDate(message: string) {
		this.printDate(new Date())
		this.log(message)
	}

}

const userLogger = new UserLogger()
userLogger.logWithDate("Абстракция")