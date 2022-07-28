import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutTypeTierComponent } from './ajout-type-tier.component';

describe('AjoutTypeTierComponent', () => {
  let component: AjoutTypeTierComponent;
  let fixture: ComponentFixture<AjoutTypeTierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutTypeTierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutTypeTierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
