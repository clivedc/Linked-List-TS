class ListNode {
	value: number | string | {} | [];
	next: null | ListNode;
	prev: null | ListNode;
	constructor(value: number | string | {} | []) {
		this.value = value;
		this.next = null;
		this.prev = null;
	}
}

class LinkedList {
	head: null | ListNode;
	tail: null | ListNode;
	size: number = 0;
	constructor(value?: number | string | any[]) {
		switch (typeof value) {
			case "number": {
				this.head = new ListNode(value);
				this.tail = this.head;
				this.size = 1;
				break;
			}
			case "string":
			case "object": {
				for (let i = 0; i < value.length; i++) {
					if (i === 0) {
						this.head = new ListNode(value[i]);
						this.tail = this.head;
						this.size++;
					} else {
						this.append(value[i]);
					}
				}
				break;
			}
			default: {
				this.head = null;
				this.tail = this.head;
				break;
			}
		}
	}

	#addItemIfListIsEmpty(node: ListNode) {
		this.head = node;
		this.tail = this.head;
		// return (this.size = 1);
	}

	append(value: string | number | {} | []) {
		const last = new ListNode(value);
		if (this.size === 0) this.#addItemIfListIsEmpty(last);
		else {
			(this.tail as ListNode).next = last;
			last.prev = this.tail;
			this.tail = last;
		}
		return this.size++;
	}

	prepend(value: string | number | {} | []) {
		const first = new ListNode(value);
		if (this.size === 0) this.#addItemIfListIsEmpty(first);
		else {
			(this.head as ListNode).prev = first;
			first.next = this.head;
			this.head = first;
		}
		return this.size++;
	}

	[Symbol.iterator]() {
		let i = 0;
		let pointer = this.head;
		return {
			next: () => {
				i++;
				if (i > 1 && pointer) pointer = pointer.next;

				return pointer === null
					? {
							done: true,
					  }
					: {
							value: pointer,
							done: false,
					  };
			},
		};
	}

	pop() {
		if (!this.head || !this.tail) {
			console.error("Cannot remove element as list is empty.");
			return;
		}

		const last = this.tail;
		const secondLast = this.tail.prev;
		if (!secondLast) {
			this.tail = this.head = null;
		} else {
			this.tail.prev = null;
			this.tail = secondLast;
			this.tail.next = null;
		}
		this.size--;
		return last;
	}

	poll() {
		if (!this.head || !this.tail) {
			console.error("Cannot remove element as list is empty.");
			return;
		}

		const first = this.head;
		const second = this.head.next;
		if (!second) {
			this.head = this.tail = null;
		} else {
			this.head.next = null;
			this.head = second;
			this.head.prev = null;
		}
		this.size--;
		return first;
	}

	clear() {
		this.head = null;
		this.tail = this.head;
		this.size = 0;
	}

	toString() {
		let str = "";
		for (let val of this as LinkedList) {
			if (!val) break; // if this.head = null

			str += `${val === this.head ? "(HEAD)" : ""} ${val.value} ${
				val.next ? "<-->" : "(TAIL)"
			}`;
		}
		return str;
	}
}

const list = new LinkedList(1);
list.append(2);
list.prepend(0);
list.pop();
list.poll();
// for (let val of list) console.log(val);
console.log(list.toString());
// console.log(list.size);
