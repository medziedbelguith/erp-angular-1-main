import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LigneCorrectionStocksComponent } from './ligne-correction-stocks.component';

describe('LigneCorrectionStocksComponent', () => {
  let component: LigneCorrectionStocksComponent;
  let fixture: ComponentFixture<LigneCorrectionStocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LigneCorrectionStocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LigneCorrectionStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
