import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LigneInventaireComponent } from './ligne-inventaire.component';

describe('LigneInventaireComponent', () => {
  let component: LigneInventaireComponent;
  let fixture: ComponentFixture<LigneInventaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LigneInventaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LigneInventaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
