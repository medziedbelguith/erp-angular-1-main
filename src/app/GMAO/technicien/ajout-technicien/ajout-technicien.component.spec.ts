import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutTechnicienComponent } from './ajout-technicien.component';

describe('AjoutTechnicienComponent', () => {
  let component: AjoutTechnicienComponent;
  let fixture: ComponentFixture<AjoutTechnicienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutTechnicienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutTechnicienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
