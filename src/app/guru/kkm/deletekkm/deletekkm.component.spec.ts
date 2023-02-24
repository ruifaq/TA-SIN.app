import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletekkmComponent } from './deletekkm.component';

describe('DeletekkmComponent', () => {
  let component: DeletekkmComponent;
  let fixture: ComponentFixture<DeletekkmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletekkmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletekkmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
