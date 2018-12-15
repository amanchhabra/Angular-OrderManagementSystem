import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { CardComponent } from './card.component';
import { By } from '@angular/platform-browser';
import { AllOrdersComponent } from '../../all-orders/all-orders.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ CardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.imagePath = '/assets/images/add.png';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show title as part of h4 tag', () => {
    fixture.componentInstance.title = 'Test_Title';
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h4').textContent).toBe('Test_Title');
  });

  it('should show description as part of p tag', () => {
    fixture.componentInstance.description = 'test description';
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toBe('test description');
  });

  it('should have link as part of anchor tag', () => {
    fixture.componentInstance.link = '/order-all';
    fixture.detectChanges();
    const attributes = fixture.debugElement.query(By.css('a')).nativeElement.attributes as NamedNodeMap;
    expect(attributes.getNamedItem('ng-reflect-router-link').nodeValue).toBe('/order-all');
  });

  it('should have image path as part of image tag', () => {
    fixture.componentInstance.imagePath = '/assets/images/add.png';
    fixture.detectChanges();
    const attributes = fixture.debugElement.query(By.css('img')).nativeElement.attributes as NamedNodeMap;
    expect(attributes.getNamedItem('src').nodeValue).toBe('/assets/images/add.png');
  });
});
