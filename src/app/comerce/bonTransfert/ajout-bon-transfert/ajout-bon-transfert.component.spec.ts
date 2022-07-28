import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutBonTransfertComponent } from './ajout-bon-transfert.component';

describe('AjoutBonTransfertComponent', () => {
  let component: AjoutBonTransfertComponent;
  let fixture: ComponentFixture<AjoutBonTransfertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutBonTransfertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutBonTransfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
