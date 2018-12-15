import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Order } from './order';

export class OrderData implements InMemoryDbService {

    createDb() {
      const orders: Order[] = [{
        'name': 'Order 1',
        'id': 1,
        'item': 'Item 1',
        'quantity': 1,
        'email': 'a@bcd.com',
        'phone': '82738576235',
        'instructions': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut'
    },
    {
        'name': 'Order 2',
        'id': 2,
        'item': 'Item 1',
        'quantity': 1,
        'email': 'b@bcd.com',
        'phone': '82738576235',
        'instructions': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut'
    },
    {
        'name': 'Order 3',
        'id': 3,
        'item': 'Item 2',
        'quantity': 2,
        'email': 'a@bcd.com',
        'phone': '82738576235',
        'instructions': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut'
    },
    {
        'name': 'Order 4',
        'id': 4,
        'item': 'Item 1',
        'quantity': 2,
        'email': 'b@bcd.com',
        'phone': '82738576235',
        'instructions': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut'
    },
    {
        'name': 'Order 5',
        'id': 5,
        'item': 'Item 1',
        'quantity': 1,
        'email': 'a@bcd.com',
        'phone': '82738576235',
        'instructions': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut'
    }];
      return { orders };
    }
}
