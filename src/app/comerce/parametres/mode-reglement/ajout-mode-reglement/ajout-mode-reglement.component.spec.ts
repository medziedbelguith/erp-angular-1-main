import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutModeReglementComponent } from './ajout-mode-reglement.component';

describe('AjoutModeReglementComponent', () => {
  let component: AjoutModeReglementComponent;
  let fixture: ComponentFixture<AjoutModeReglementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutModeReglementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutModeReglementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
