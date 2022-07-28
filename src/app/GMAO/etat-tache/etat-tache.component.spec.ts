import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatTacheComponent } from './etat-tache.component';

describe('EtatTacheComponent', () => {
  let component: EtatTacheComponent;
  let fixture: ComponentFixture<EtatTacheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtatTacheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtatTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
