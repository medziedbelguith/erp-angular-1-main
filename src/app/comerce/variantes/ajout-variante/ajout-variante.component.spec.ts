import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutVarianteComponent } from './ajout-variante.component';

describe('AjoutVarianteComponent', () => {
  let component: AjoutVarianteComponent;
  let fixture: ComponentFixture<AjoutVarianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutVarianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutVarianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
