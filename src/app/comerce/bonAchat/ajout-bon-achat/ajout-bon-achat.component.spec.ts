import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutBonAchatComponent } from './ajout-bon-achat.component';

describe('AjoutBonAchatComponent', () => {
  let component: AjoutBonAchatComponent;
  let fixture: ComponentFixture<AjoutBonAchatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutBonAchatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutBonAchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
