import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChargeSocieteComponent } from './list-charge-societe.component';

describe('ListChargeSocieteComponent', () => {
  let component: ListChargeSocieteComponent;
  let fixture: ComponentFixture<ListChargeSocieteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListChargeSocieteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListChargeSocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
