import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBonArticleCasseComponent } from './list-bon-article-casse.component';

describe('ListBonArticleCasseComponent', () => {
  let component: ListBonArticleCasseComponent;
  let fixture: ComponentFixture<ListBonArticleCasseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBonArticleCasseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBonArticleCasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
