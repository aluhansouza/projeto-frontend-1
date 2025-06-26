import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerGradienteComponent } from './spinner-gradiente.component';

describe('SpinnerGradienteComponent', () => {
  let component: SpinnerGradienteComponent;
  let fixture: ComponentFixture<SpinnerGradienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerGradienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinnerGradienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
