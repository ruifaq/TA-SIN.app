import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddkkmComponent } from './addkkm.component';

describe('AddkkmComponent', () => {
  let component: AddkkmComponent;
  let fixture: ComponentFixture<AddkkmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddkkmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddkkmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
