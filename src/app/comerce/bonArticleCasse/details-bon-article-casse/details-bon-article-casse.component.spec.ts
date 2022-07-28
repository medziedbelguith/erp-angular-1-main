import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsBonArticleCasseComponent } from './details-bon-article-casse.component';

describe('DetailsBonArticleCasseComponent', () => {
  let component: DetailsBonArticleCasseComponent;
  let fixture: ComponentFixture<DetailsBonArticleCasseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsBonArticleCasseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsBonArticleCasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
