import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Order } from './order';

@Injectable()
export class OrderService {

  private _apiPath = 'api/orders';

  constructor(private _http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this._http.get<Order[]>(this._apiPath);
  }

  getOrder(id: string): Observable<Order> {
    const url = `${this._apiPath}/${id}`;
    return this._http.get<Order>(url);
  }

  createOrder(order: Order): Observable<Order> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    order.id = null;
    return this._http.post<Order>(this._apiPath, order, { headers: headers });
  }

  deleteOrder(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this._apiPath}/${id}`;
    return this._http.delete<Order>(url, { headers: headers });
  }

  updateOrder(order: Order): Observable<Order> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this._apiPath}/${order.id}`;
    return this._http.put<Order>(url, order, { headers: headers });
  }
}
