import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailsComponent } from './order-details.component';
import { OrderService } from '../order.service';
import { of } from '../../../node_modules/rxjs/observable/of';
import { inject } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { Directive, Input } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs';

@Directive({
  selector: '[routerLink]'
})
export class TestRouterLinkDirective {
  @Input('routerLink') link: any;
}

describe('OrderDetailsComponent', () => {
  let component: OrderDetailsComponent;
  let fixture: ComponentFixture<OrderDetailsComponent>;

  let mockOrderService;
  let mockRouter;

  beforeEach(async(() => {
    mockOrderService = jasmine.createSpyObj(['getOrder', 'deleteOrder']);
    mockRouter = jasmine.createSpyObj(['navigate']);
    const getStubMethod = jasmine.createSpy('get');
    TestBed.configureTestingModule({
      imports: [],
      providers: [{ provide: OrderService, useValue: mockOrderService }, {
        provide: Router,
        useValue: mockRouter
      },
      { provide: ActivatedRoute, useValue: { 'snapshot': {'paramMap': { get: getStubMethod } } } }],
      declarations: [OrderDetailsComponent, TestRouterLinkDirective]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call delete order from order service on calling delete order', () => {
    fixture.componentInstance.order = { id: 1, name: 'Order Name', item: 'Item 1', quantity: 2, email: '', phone: '', instructions: '' };
    mockOrderService.deleteOrder.and.returnValue(of(true));
    fixture.componentInstance.deleteOrder();
    expect(mockOrderService.deleteOrder).toHaveBeenCalledWith(1);
  });

  it('should call navigate to order-list page on calling delete order', () => {
    fixture.componentInstance.order = { id: 1, name: 'Order Name', item: 'Item 1', quantity: 2, email: '', phone: '', instructions: '' };
    mockOrderService.deleteOrder.and.returnValue(of(true));
    fixture.componentInstance.deleteOrder();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/order-list/true']);
  });
});
