import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutPersonnelComponent } from './ajout-personnel.component';

describe('AjoutPersonnelComponent', () => {
  let component: AjoutPersonnelComponent;
  let fixture: ComponentFixture<AjoutPersonnelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutPersonnelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutPersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
