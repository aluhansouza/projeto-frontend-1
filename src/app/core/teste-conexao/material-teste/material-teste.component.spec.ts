import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialTesteComponent } from './material-teste.component';

describe('MaterialTesteComponent', () => {
  let component: MaterialTesteComponent;
  let fixture: ComponentFixture<MaterialTesteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialTesteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialTesteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
