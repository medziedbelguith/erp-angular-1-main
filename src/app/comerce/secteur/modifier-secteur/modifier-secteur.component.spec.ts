import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierSecteurComponent } from './modifier-secteur.component';

describe('ModifierSecteurComponent', () => {
  let component: ModifierSecteurComponent;
  let fixture: ComponentFixture<ModifierSecteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierSecteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierSecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
