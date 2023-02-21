import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletemapelComponent } from './deletemapel.component';

describe('DeletemapelComponent', () => {
  let component: DeletemapelComponent;
  let fixture: ComponentFixture<DeletemapelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletemapelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletemapelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
