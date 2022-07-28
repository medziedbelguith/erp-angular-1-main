import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonRetourClientConvertionComponent } from './bon-retour-client-convertion.component';

describe('BonRetourClientConvertionComponent', () => {
  let component: BonRetourClientConvertionComponent;
  let fixture: ComponentFixture<BonRetourClientConvertionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonRetourClientConvertionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonRetourClientConvertionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
