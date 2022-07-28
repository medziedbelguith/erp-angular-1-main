import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonTransfertHtmlComponent } from './bon-transfert-html.component';

describe('BonTransfertHtmlComponent', () => {
  let component: BonTransfertHtmlComponent;
  let fixture: ComponentFixture<BonTransfertHtmlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonTransfertHtmlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonTransfertHtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
