import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutTransporteurComponent } from './ajout-transporteur.component';

describe('AjoutTransporteurComponent', () => {
  let component: AjoutTransporteurComponent;
  let fixture: ComponentFixture<AjoutTransporteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutTransporteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutTransporteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
