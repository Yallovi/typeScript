enum PaymentStatus {
	Holded,
	Processed,
	Reversed
}

class Payment {
	id: string
	status: PaymentStatus = PaymentStatus.Holded
	createdAt: Date = new Date()
	updatedAt: Date
	
	constructor(id: string) {
		this.id = id
	}

	getPaymentLifeTime(): number {
		return new Date().getTime() - this.createdAt.getTime()
	}

	unholdPayment() {
		if (this.status === PaymentStatus.Processed) {
			throw new Error("Платеж отменить нельзя!")
		}

		this.status = PaymentStatus.Reversed
		this.updatedAt = new Date()
	}
}

const payment = new Payment('1')
console.log('payment: ', payment);
payment.unholdPayment()
console.log('payment: ', payment);
const time = payment.getPaymentLifeTime()
console.log('time: ', time);



class User {
	skills: string[]

	addSkill(skill: string)
	addSkill(skills: string[])
	addSkill(skillOrSkills: string | string[]): void {
		if (Array.isArray(skillOrSkills)) {
			this.skills = [...this.skills, ...skillOrSkills]
		} else {
			this.skills.push(skillOrSkills)
		}

	}
}

const user = new User()

user.addSkill(['dev'])