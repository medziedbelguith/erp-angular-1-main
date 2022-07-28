import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSessionCaisseComponent } from './list-session-caisse.component';

describe('ListSessionCaisseComponent', () => {
  let component: ListSessionCaisseComponent;
  let fixture: ComponentFixture<ListSessionCaisseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSessionCaisseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSessionCaisseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
