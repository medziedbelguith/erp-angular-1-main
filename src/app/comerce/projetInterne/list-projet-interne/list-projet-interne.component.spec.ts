import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProjetInterneComponent } from './list-projet-interne.component';

describe('ListProjetInterneComponent', () => {
  let component: ListProjetInterneComponent;
  let fixture: ComponentFixture<ListProjetInterneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProjetInterneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProjetInterneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
