import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutTypeContactComponent } from './ajout-type-contact.component';

describe('AjoutTypeContactComponent', () => {
  let component: AjoutTypeContactComponent;
  let fixture: ComponentFixture<AjoutTypeContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutTypeContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutTypeContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
