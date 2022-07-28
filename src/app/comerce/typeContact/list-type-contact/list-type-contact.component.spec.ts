import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTypeContactComponent } from './list-type-contact.component';

describe('ListTypeContactComponent', () => {
  let component: ListTypeContactComponent;
  let fixture: ComponentFixture<ListTypeContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTypeContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTypeContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
