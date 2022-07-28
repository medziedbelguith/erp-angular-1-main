import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutMarqueComponent } from './ajout-marque.component';

describe('AjoutMarqueComponent', () => {
  let component: AjoutMarqueComponent;
  let fixture: ComponentFixture<AjoutMarqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutMarqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutMarqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
