import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutUtilisateurComponent } from './ajout-utilisateur.component';

describe('AjoutUtilisateurComponent', () => {
  let component: AjoutUtilisateurComponent;
  let fixture: ComponentFixture<AjoutUtilisateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutUtilisateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
