import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutCorrectionStockComponent } from './ajout-correction-stock.component';

describe('AjoutCorrectionStockComponent', () => {
  let component: AjoutCorrectionStockComponent;
  let fixture: ComponentFixture<AjoutCorrectionStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutCorrectionStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutCorrectionStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
