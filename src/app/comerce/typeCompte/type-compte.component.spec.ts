import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeCompteComponent } from './type-compte.component';

describe('TypeCompteComponent', () => {
  let component: TypeCompteComponent;
  let fixture: ComponentFixture<TypeCompteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeCompteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
