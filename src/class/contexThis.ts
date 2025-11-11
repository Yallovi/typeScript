class Payment {
	private date: Date = new Date()
	price: string

	getDate(this: Payment){ 
		return this.date
	}

	getDateArrow = () => {
		return this.date
	}
}

const p = new Payment()

const user = {
	id: '1',
	date: p.getDate.bind(p),
	arrowDate: p.getDateArrow
}

console.log('Payment date', p.getDate());
console.log('user date ', user.date());
console.log('user date arrow ', user.arrowDate());

class PaymentPersisten extends Payment {
	status: number = 0;

	save() {
		/**
		 * !Ошибка
		 * super - это специальное слово, которое ссылается на прототип родительского класса, т.е. на его методы, объявленные как методы класса
		 * 
		 * getDateArrow - это не функция, а свойство экземпляра (instance), инициализируемая стрелочной функцией
		 * Т.e. при создании new Payment() , у каждого экземплярабудет своя копия стрелочной функции со своим this. Она не лежить в Payment.prototype
		 * Поэтому у super просто нет доступа к этому свойству, потому что super смотрит только в прототип родителя, а не в поля экземпляра.
		 * 
		 */
		// return super.getDateArrow()

		return this.getDateArrow()
	}
}

console.log('PaymentPersisten.this', new PaymentPersisten().save());