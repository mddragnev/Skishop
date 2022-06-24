import { v4 as uuidv4 } from 'uuid';

export interface IBasketItem {
    id: number;
    productName: string;
    price: number;
    quantity: number;
    pictureUrl: string;
    brand: string;
    type: string;
}

export interface IBasket {
    id: string;
    items: IBasketItem[];
}


export class Basket implements IBasket {
    public id = uuidv4();
    public items: IBasketItem[] = [];

}

export interface IBasketTotals {
    shipping: number;
    subtotal: number;
    total: number;
}