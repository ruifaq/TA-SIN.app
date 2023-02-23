import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletenilaiComponent } from './deletenilai.component';

describe('DeletenilaiComponent', () => {
  let component: DeletenilaiComponent;
  let fixture: ComponentFixture<DeletenilaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletenilaiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletenilaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
