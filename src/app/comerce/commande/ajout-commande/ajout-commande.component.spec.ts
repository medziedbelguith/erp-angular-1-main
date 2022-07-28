import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutCommandeComponent } from './ajout-commande.component';

describe('AjoutCommandeComponent', () => {
  let component: AjoutCommandeComponent;
  let fixture: ComponentFixture<AjoutCommandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutCommandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
