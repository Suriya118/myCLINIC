import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediseenComponent } from './mediseen.component';

describe('MediseenComponent', () => {
  let component: MediseenComponent;
  let fixture: ComponentFixture<MediseenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediseenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediseenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
