import { Component, OnInit } from '@angular/core';
import { Order } from '../order';
import { OrderDetailsComponent } from '../order-details/order-details.component';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-update-order.component.html',
  styleUrls: ['./create-update-order.component.css']
})
export class CreateUpdateOrderComponent implements OnInit {

  public order: Order;

  public isNewOrder: boolean;

  constructor(private route: ActivatedRoute, private router: Router, private _orderService: OrderService) { }

  ngOnInit() {
    const orderId = this.route.snapshot.paramMap.get('id');
    this.order = {} as Order;
    this.isNewOrder = true;
    if (orderId != null) {
      this._orderService.getOrder(orderId).subscribe(response => this.order = response);
      this.isNewOrder = false;
    }
  }

  createUpdateOrder(): void {
    if (this.isNewOrder) {
      this._orderService.createOrder(this.order).subscribe(
        () => this.router.navigate(['/order-list/true'])
      );
    } else {
      this._orderService.updateOrder(this.order).subscribe(
        () => this.router.navigate(['/order-list/true'])
      );
    }
  }

}
