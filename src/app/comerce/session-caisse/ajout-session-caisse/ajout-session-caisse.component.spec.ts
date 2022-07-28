import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutSessionCaisseComponent } from './ajout-session-caisse.component';

describe('AjoutSessionCaisseComponent', () => {
  let component: AjoutSessionCaisseComponent;
  let fixture: ComponentFixture<AjoutSessionCaisseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutSessionCaisseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutSessionCaisseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
