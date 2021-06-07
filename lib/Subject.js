export class Subject {
    constructor() {
        this.id = 0;
        this.orderList = [];
    }
    next(v) {
        this.orderList.forEach((i) => {
            i.cb(v);
        });
    }
    subscribe(cb) {
        const id = ++this.id;
        const order = {
            id,
            cb,
            unsubscribe: () => this.unsubscribe(id)
        };
        this.orderList.push(order);
        return order;
    }
    unsubscribe(itemId) {
        const itemIndex = this.orderList.findIndex((i) => i.id === itemId);
        if (itemIndex >= 0)
            this.orderList.splice(itemIndex, 1);
    }
}
