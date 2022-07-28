import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutBonTravailComponent } from './ajout-bon-travail.component';

describe('AjoutBonTravailComponent', () => {
  let component: AjoutBonTravailComponent;
  let fixture: ComponentFixture<AjoutBonTravailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutBonTravailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutBonTravailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
