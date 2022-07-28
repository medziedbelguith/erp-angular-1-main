import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutChargeSocieteComponent } from './ajout-charge-societe.component';

describe('AjoutChargeSocieteComponent', () => {
  let component: AjoutChargeSocieteComponent;
  let fixture: ComponentFixture<AjoutChargeSocieteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutChargeSocieteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutChargeSocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
