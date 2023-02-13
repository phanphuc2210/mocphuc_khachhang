import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateInputComponent } from './validate-input.component';

describe('ValidateInputComponent', () => {
  let component: ValidateInputComponent;
  let fixture: ComponentFixture<ValidateInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidateInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidateInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
