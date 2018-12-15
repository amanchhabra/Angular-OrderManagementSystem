import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../order.service';
import { Order } from '../order';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {

  private shouldModifyOrder: boolean;

  public orders: Order[];

  constructor(private route: ActivatedRoute, private router: Router, private _orderService: OrderService) { }

  ngOnInit() {
    this.shouldModifyOrder = this.route.snapshot.paramMap.get('modifiable') != null ? true : false;
    this._orderService.getOrders().subscribe(response => this.orders = response);
  }

  deleteOrder(id: number) {
    this._orderService.deleteOrder(id).subscribe(() => this.ngOnInit());
  }

}
