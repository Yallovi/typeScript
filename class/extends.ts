/**
 * Имплементация vs Наследование: Имплементация определяет прообраз класса для его реализации, 
 * тогда как наследование позволяет создать зависимость между классами, передавая свойства и меоды от одного класса к другому
 * 
 * Аккуратность наследования: Наследование может привести к сильной связанности кода, что усложняет его поддержку и модификацию
 */


type PaymentStatus = 'new' | 'paid'

class Payment {
	id: number
	status: PaymentStatus = 'new'

	constructor(id: number) {
		this.id = id
	}

	pay() {
		this.status = 'paid'
	}
}

class PersistedPayment extends Payment {
	databaseId: number
	paidAt: Date

	constructor() {
		const id = Math.random()
		super(id)
	}

	save() {
		// сохраняет в бд
	}

	override pay(date?: Date) {
		super.pay()

		if (date) {
			this.paidAt = date
		}
	}
}

