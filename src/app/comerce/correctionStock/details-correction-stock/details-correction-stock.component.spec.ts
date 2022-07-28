import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCorrectionStockComponent } from './details-correction-stock.component';

describe('DetailsCorrectionStockComponent', () => {
  let component: DetailsCorrectionStockComponent;
  let fixture: ComponentFixture<DetailsCorrectionStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsCorrectionStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsCorrectionStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
