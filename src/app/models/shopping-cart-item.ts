import { Product } from './product';

export class ShoppingCartItem {
    quantity: number;
    title: string;
    $key: string;
    imageUrl: string;
    price: number;

  constructor(init?: Partial<ShoppingCartItem>){
    Object.assign(this, init);
}

    get totalPrice() { return this.price * this.quantity; }
}