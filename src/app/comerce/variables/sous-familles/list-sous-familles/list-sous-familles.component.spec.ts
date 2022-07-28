import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSousFamillesComponent } from './list-sous-familles.component';

describe('ListSousFamillesComponent', () => {
  let component: ListSousFamillesComponent;
  let fixture: ComponentFixture<ListSousFamillesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSousFamillesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSousFamillesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
