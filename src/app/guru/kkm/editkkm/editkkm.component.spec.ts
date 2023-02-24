import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditkkmComponent } from './editkkm.component';

describe('EditkkmComponent', () => {
  let component: EditkkmComponent;
  let fixture: ComponentFixture<EditkkmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditkkmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditkkmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
