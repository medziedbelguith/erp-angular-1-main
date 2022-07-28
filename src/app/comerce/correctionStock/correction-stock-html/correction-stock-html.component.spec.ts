import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectionStockHtmlComponent } from './correction-stock-html.component';

describe('CorrectionStockHtmlComponent', () => {
  let component: CorrectionStockHtmlComponent;
  let fixture: ComponentFixture<CorrectionStockHtmlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorrectionStockHtmlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrectionStockHtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
