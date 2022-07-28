import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeConvertionComponent } from './commande-convertion.component';

describe('CommandeConvertionComponent', () => {
  let component: CommandeConvertionComponent;
  let fixture: ComponentFixture<CommandeConvertionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandeConvertionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandeConvertionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
