import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArticlesVenduComponent } from './list-articles-vendu.component';

describe('ListArticlesVenduComponent', () => {
  let component: ListArticlesVenduComponent;
  let fixture: ComponentFixture<ListArticlesVenduComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListArticlesVenduComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListArticlesVenduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
