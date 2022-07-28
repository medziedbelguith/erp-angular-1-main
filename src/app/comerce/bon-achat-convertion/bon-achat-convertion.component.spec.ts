import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonAchatConvertionComponent } from './bon-achat-convertion.component';

describe('BonAchatConvertionComponent', () => {
  let component: BonAchatConvertionComponent;
  let fixture: ComponentFixture<BonAchatConvertionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonAchatConvertionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonAchatConvertionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
