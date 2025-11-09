/**
 * public - публичные свойства доступны везде
 * private - приватное свойство доступно внутри класса, но запрещен во вне
 * protected - похож на private, но доступен в дочерних классах наследуемых от родителя
 * Private в TypeScript vs. JavaScript: В TypeScript private ограничивает доступ на этапе компиляции, в то время как в JavaScript используется специальная нотация (через #) для обеспечения приватности на уровне языка.
 * 
 * static - cделать свойства или методы класса статичными.
 * Польза Static:
 * 1. Обращение к свойствам или методам без создания экземпляра класса.
 * 2. Удобство в использовании синглтон подхода и избежание лишнего создания экземпляров.
 * 
 */
class Vechicle {
	public name: string;
	private model: string;
	protected run: string;
	static damages: string;

	setModel() {
		this.model = 'tesla'
	}


}

class EuroTruck extends Vechicle {

	setModel() {
		this.run = "12345"
	}

}

Vechicle.damages = '1234'