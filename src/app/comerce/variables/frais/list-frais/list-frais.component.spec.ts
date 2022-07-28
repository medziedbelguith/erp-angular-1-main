import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFraisComponent } from './list-frais.component';

describe('ListFraisComponent', () => {
  let component: ListFraisComponent;
  let fixture: ComponentFixture<ListFraisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFraisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFraisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
