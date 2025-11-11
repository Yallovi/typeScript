class Product implements Product {
	id: number
	title: string
	price: number
	
	constructor(id: number, title: string, price: number) {
		this.id = id
		this.title = title
		this.price = price
	}
}

class Delivery {
	date: Date

	constructor(date: Date) {
		this.date = date
	}
}


class HomeDelivery extends Delivery {
	adress: string

	constructor(date: Date, adress: string){
		super(date)
		this.adress = adress
	}
}

class ShopDelivery extends Delivery {
	shopId: number

	constructor(date: Date, shopId: number){
		super(date)
		this.shopId = shopId
	}
}

type DeliveryOptions = HomeDelivery | ShopDelivery

class Cart {
	private products: Product[] = []
	private delivery: DeliveryOptions


	addProduct(product: Product): void {
		this.products.push(product)
	}

	deleteProduct(productId: number): void {
		this.products = this.products.filter(p => p.id !== productId)
	}

	getSum(): number {
		return this.products
			.map(p => p.price)
			.reduce((curr, next) => curr + next,0)
	}

	setDelivery(delivery: DeliveryOptions) {
		this.delivery = delivery
	}

	checkout() {
		if (!this.products.length || !this.delivery) {
			throw new Error('Нет продуктов или не указан адрес досатавки')
		} else {
				// инициируем покупку

				return console.log('Заказ собирается!');
		}
	}
}