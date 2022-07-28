import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTypeTierComponent } from './list-type-tier.component';

describe('ListTypeTierComponent', () => {
  let component: ListTypeTierComponent;
  let fixture: ComponentFixture<ListTypeTierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTypeTierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTypeTierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
