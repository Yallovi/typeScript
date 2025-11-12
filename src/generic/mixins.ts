type GConstructor<T = {}> = new (...args: any[]) => T

class Accordion {
	isOpend: boolean
}

class List {
	constructor(public items: string[]){}
}
type ListType =  GConstructor<List>
type AccordionType = GConstructor<Accordion>

function ExtendedList<TBase extends ListType & AccordionType>(Base: TBase) {
	return class ExtendedList extends Base {
		first() {
			return this.items[0]
		}
	}
}

class AccordionList { 
	isOpend:boolean
	
	constructor(public items: string[]){}
}

const list = ExtendedList(AccordionList)
const res = new list(['1','2','3'])
console.log('the first figure', res.first());