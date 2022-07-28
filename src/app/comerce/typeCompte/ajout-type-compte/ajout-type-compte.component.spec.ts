import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutTypeCompteComponent } from './ajout-type-compte.component';

describe('AjoutTypeCompteComponent', () => {
  let component: AjoutTypeCompteComponent;
  let fixture: ComponentFixture<AjoutTypeCompteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutTypeCompteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutTypeCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
