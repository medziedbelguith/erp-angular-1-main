import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMarqueComponent } from './list-marque.component';

describe('ListMarqueComponent', () => {
  let component: ListMarqueComponent;
  let fixture: ComponentFixture<ListMarqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMarqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMarqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
