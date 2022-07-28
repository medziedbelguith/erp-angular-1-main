import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutTachePreventifComponent } from './ajout-tache-preventif.component';

describe('AjoutTachePreventifComponent', () => {
  let component: AjoutTachePreventifComponent;
  let fixture: ComponentFixture<AjoutTachePreventifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutTachePreventifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutTachePreventifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
