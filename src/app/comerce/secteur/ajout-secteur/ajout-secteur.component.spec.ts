import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutSecteurComponent } from './ajout-secteur.component';

describe('AjoutSecteurComponent', () => {
  let component: AjoutSecteurComponent;
  let fixture: ComponentFixture<AjoutSecteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutSecteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutSecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
