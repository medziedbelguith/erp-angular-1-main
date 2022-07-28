import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierBonArticleCasseComponent } from './modifier-bon-article-casse.component';

describe('ModifierBonArticleCasseComponent', () => {
  let component: ModifierBonArticleCasseComponent;
  let fixture: ComponentFixture<ModifierBonArticleCasseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierBonArticleCasseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierBonArticleCasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
