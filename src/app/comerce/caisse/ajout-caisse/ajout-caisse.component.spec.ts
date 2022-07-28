import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutCaisseComponent } from './ajout-caisse.component';

describe('AjoutCaisseComponent', () => {
  let component: AjoutCaisseComponent;
  let fixture: ComponentFixture<AjoutCaisseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutCaisseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutCaisseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
