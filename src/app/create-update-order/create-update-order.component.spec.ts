import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateOrderComponent } from './create-update-order.component';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../order.service';
import { By } from '../../../node_modules/@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from '../../../node_modules/rxjs/observable/of';

describe('CreateUpdateOrderComponent', () => {
  let component: CreateUpdateOrderComponent;
  let fixture: ComponentFixture<CreateUpdateOrderComponent>;

  let mockOrderService;
  let mockRouter;

  beforeEach(async(() => {
    mockOrderService = jasmine.createSpyObj(['createOrder', 'updateOrder']);
    mockRouter = jasmine.createSpyObj(['navigate']);
    const getStubMethod = jasmine.createSpy('get');
    TestBed.configureTestingModule({
      imports: [FormsModule],
      providers: [{ provide: OrderService, useValue: mockOrderService }, {
        provide: Router,
        useValue: mockRouter
      },
      { provide: ActivatedRoute, useValue: { 'snapshot': {'paramMap': { get: getStubMethod } } } }],
      declarations: [ CreateUpdateOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load create-update-order page with empty fields when no order provided', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('input[name=\'name\']')).nativeElement.value).toBe('');
  });

  it('should load create-update-order page with existing fields when order provided', () => {
    fixture.componentInstance.order = { id: 1, name: 'Order Name', item: 'Item 1', quantity: 2, email: 'email@a.com',
                                       phone: '9988', instructions: 'description' };
    fixture.detectChanges();
    fixture.whenStable().then(() => {
    expect(fixture.debugElement.query(By.css('input[name=\'name\']')).nativeElement.value).toBe('Order Name');
    expect(fixture.debugElement.query(By.css('select[name=\'item\']')).nativeElement.value).toBe('Item 1');
    expect(fixture.debugElement.query(By.css('select[name=\'quantity\']')).nativeElement.value).toBe('2');
    expect(fixture.debugElement.query(By.css('input[name=\'email\']')).nativeElement.value).toBe('email@a.com');
    expect(fixture.debugElement.query(By.css('input[name=\'phone\']')).nativeElement.value).toBe('9988');
    expect(fixture.debugElement.query(By.css('textarea[name=\'comment\']')).nativeElement.value).toBe('description');
    });
  });

  it('should call create order of order service on calling createUpdateOrder when new order', () => {
    const order =  { id: 1, name: 'Order Name', item: 'Item 1', quantity: 2, email: '', phone: '', instructions: '' };
    fixture.componentInstance.isNewOrder = true;
    fixture.componentInstance.order = order;
    mockOrderService.createOrder.and.returnValue(of(true));
    fixture.componentInstance.createUpdateOrder();
    expect(mockOrderService.createOrder).toHaveBeenCalledWith(order);
  });

  it('should call navigate to order-list page on calling create order', () => {
    const order =  { id: 1, name: 'Order Name', item: 'Item 1', quantity: 2, email: '', phone: '', instructions: '' };
    fixture.componentInstance.isNewOrder = true;
    fixture.componentInstance.order = order;
    mockOrderService.createOrder.and.returnValue(of(true));
    fixture.componentInstance.createUpdateOrder();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/order-list/true']);
  });

  it('should call update order of order service on calling createUpdateOrder when existing order', () => {
    const order =  { id: 1, name: 'Order Name', item: 'Item 1', quantity: 2, email: '', phone: '', instructions: '' };
    fixture.componentInstance.isNewOrder = false;
    fixture.componentInstance.order = order;
    mockOrderService.updateOrder.and.returnValue(of(true));
    fixture.componentInstance.createUpdateOrder();
    expect(mockOrderService.updateOrder).toHaveBeenCalledWith(order);
  });

  it('should call navigate to order-list page on calling updating order', () => {
    fixture.componentInstance.isNewOrder = false;
    const order =  { id: 1, name: 'Order Name', item: 'Item 1', quantity: 2, email: '', phone: '', instructions: '' };
    fixture.componentInstance.order = order;
    mockOrderService.updateOrder.and.returnValue(of(true));
    fixture.componentInstance.createUpdateOrder();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/order-list/true']);
  });

  it('should have order name input', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('input[name=\'name\']')).nativeElement).toBeTruthy();
  });

  it('should have order item input', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('select[name=\'item\']')).nativeElement).toBeTruthy();
  });

  it('should have order quanitity input', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('select[name=\'quantity\']')).nativeElement).toBeTruthy();
  });

  it('should have order email input', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('input[name=\'email\']')).nativeElement).toBeTruthy();
  });

  it('should have order phone input', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('input[name=\'phone\']')).nativeElement).toBeTruthy();
  });

  it('should have description input', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('textarea[name=\'comment\']')).nativeElement).toBeTruthy();
  });

  it('should have order submit button', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('button[type=\'submit\']')).nativeElement).toBeTruthy();
  });

});
