import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCorrectionStockComponent } from './list-correction-stock.component';

describe('ListCorrectionStockComponent', () => {
  let component: ListCorrectionStockComponent;
  let fixture: ComponentFixture<ListCorrectionStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCorrectionStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCorrectionStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
