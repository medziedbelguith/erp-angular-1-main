import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutBonRetourClientComponent } from './ajout-bon-retour-client.component';

describe('AjoutBonRetourClientComponent', () => {
  let component: AjoutBonRetourClientComponent;
  let fixture: ComponentFixture<AjoutBonRetourClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutBonRetourClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutBonRetourClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
