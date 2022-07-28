import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutBonPrelevementComponent } from './ajout-bon-prelevement.component';

describe('AjoutBonPrelevementComponent', () => {
  let component: AjoutBonPrelevementComponent;
  let fixture: ComponentFixture<AjoutBonPrelevementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutBonPrelevementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutBonPrelevementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
