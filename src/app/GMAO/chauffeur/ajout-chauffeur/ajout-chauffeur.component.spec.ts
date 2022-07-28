import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutChauffeurComponent } from './ajout-chauffeur.component';

describe('AjoutChauffeurComponent', () => {
  let component: AjoutChauffeurComponent;
  let fixture: ComponentFixture<AjoutChauffeurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutChauffeurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutChauffeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
