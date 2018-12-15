import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../order';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  order: Order;

  constructor(private _orderService: OrderService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    const orderId = this._route.snapshot.paramMap.get('id');
    this.order = {} as Order;
    if (orderId != null) {
      this._orderService.getOrder(orderId).subscribe(response => this.order = response);
    }
  }

  deleteOrder() {
    this._orderService.deleteOrder(this.order.id).subscribe(() => this._router.navigate(['/order-list/true']));
  }
}
