import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOrdersComponent } from './all-orders.component';
import { OrderService } from '../order.service';
import { BrowserModule, By } from '@angular/platform-browser';
import { of } from '../../../node_modules/rxjs/observable/of';
import { Router, ActivatedRoute } from '@angular/router';
import { Input, Directive } from '@angular/core';

@Directive({
  selector: '[routerLink]'
})
export class TestRouterLinkDirective {
  @Input('routerLink') link: any;
}

describe('AllOrdersComponent', () => {
  let component: AllOrdersComponent;
  let fixture: ComponentFixture<AllOrdersComponent>;

  let mockOrderService;
  let mockRouter;
  let getStubMethod;

  beforeEach(async(() => {
    mockOrderService = jasmine.createSpyObj(['deleteOrder', 'getOrders']);
    mockRouter = jasmine.createSpyObj(['navigate']);
    getStubMethod = jasmine.createSpy('get');
    mockOrderService.getOrders.and.returnValue(of([]));
    TestBed.configureTestingModule({
      imports: [BrowserModule],
      providers: [{ provide: OrderService, useValue: mockOrderService }, {
        provide: Router,
        useValue: mockRouter
      },
      { provide: ActivatedRoute, useValue: { 'snapshot': {'paramMap': { get: getStubMethod } } } }],
      declarations: [ AllOrdersComponent, TestRouterLinkDirective ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list all the orders', () => {
    const order1 =  { id: 1, name: 'Order Name 1', item: 'Item 1', quantity: 2, email: 'email1@a.com', phone: '9988', instructions: 'i1' };
    const order2 =  { id: 2, name: 'Order Name 2', item: 'Item 2', quantity: 3, email: 'email2@c.com', phone: '8899', instructions: 'i2' };
    fixture.componentInstance.orders = [order1, order2];

    fixture.detectChanges();
    fixture.whenStable().then(() => {
    expect(fixture.debugElement.query(By.css('tr:nth-child(2) td:nth-child(1)')).nativeElement.textContent).toBe('1');
    expect(fixture.debugElement.query(By.css('tr:nth-child(2) td:nth-child(2)')).nativeElement.textContent).toBe('Order Name 1');
    expect(fixture.debugElement.query(By.css('tr:nth-child(2) td:nth-child(3)')).nativeElement.textContent).toBe('Item 1');
    expect(fixture.debugElement.query(By.css('tr:nth-child(3) td:nth-child(1)')).nativeElement.textContent).toBe('2');
    expect(fixture.debugElement.query(By.css('tr:nth-child(3) td:nth-child(2)')).nativeElement.textContent).toBe('Order Name 2');
    expect(fixture.debugElement.query(By.css('tr:nth-child(3) td:nth-child(3)')).nativeElement.textContent).toBe('Item 2');
    });
  });

  it('should have update, delete and details option when modfiable is passed as true', () => {
    getStubMethod.and.returnValue(true);
    fixture.componentInstance.ngOnInit();
    const order1 =  { id: 1, name: 'Order Name 1', item: 'Item 1', quantity: 2, email: 'email1@a.com', phone: '9988', instructions: 'i1' };
    fixture.componentInstance.orders = [order1];

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.query(By.css('tr:nth-child(2) td:nth-child(4)')).nativeElement.textContent)
      .toContain('Modify Order');
      expect(fixture.debugElement.query(By.css('tr:nth-child(2) td:nth-child(4)')).nativeElement.textContent)
      .toContain('Delete Order');
      expect(fixture.debugElement.query(By.css('tr:nth-child(2) td:nth-child(4)')).nativeElement.textContent)
      .toContain('Order Details');
    });
  });

  it('should have only details option when modfiable is passed as false', () => {
    fixture.componentInstance.ngOnInit();
    const order1 =  { id: 1, name: 'Order Name 1', item: 'Item 1', quantity: 2, email: 'email1@a.com', phone: '9988', instructions: 'i1' };
    fixture.componentInstance.orders = [order1];

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.query(By.css('tr:nth-child(2) td:nth-child(4)')).nativeElement.textContent)
      .not.toContain('Modify Order');
      expect(fixture.debugElement.query(By.css('tr:nth-child(2) td:nth-child(4)')).nativeElement.textContent)
      .not.toContain('Delete Order');
      expect(fixture.debugElement.query(By.css('tr:nth-child(2) td:nth-child(4)')).nativeElement.textContent)
      .toContain('Order Details');
    });
  });

});
