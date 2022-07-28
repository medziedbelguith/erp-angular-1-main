import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierCorrectionStockComponent } from './modifier-correction-stock.component';

describe('ModifierCorrectionStockComponent', () => {
  let component: ModifierCorrectionStockComponent;
  let fixture: ComponentFixture<ModifierCorrectionStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierCorrectionStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierCorrectionStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
