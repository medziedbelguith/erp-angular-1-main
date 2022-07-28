import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatCarburantComponent } from './etat-carburant.component';

describe('EtatCarburantComponent', () => {
  let component: EtatCarburantComponent;
  let fixture: ComponentFixture<EtatCarburantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtatCarburantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtatCarburantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
