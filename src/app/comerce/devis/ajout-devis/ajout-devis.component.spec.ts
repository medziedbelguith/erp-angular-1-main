import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutDevisComponent } from './ajout-devis.component';

describe('AjoutDevisComponent', () => {
  let component: AjoutDevisComponent;
  let fixture: ComponentFixture<AjoutDevisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutDevisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutDevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
