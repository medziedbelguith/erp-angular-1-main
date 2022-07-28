import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTypeFraisComponent } from './list-type-frais.component';

describe('ListTypeFraisComponent', () => {
  let component: ListTypeFraisComponent;
  let fixture: ComponentFixture<ListTypeFraisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTypeFraisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTypeFraisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
