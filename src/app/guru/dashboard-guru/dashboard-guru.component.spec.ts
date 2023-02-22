import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardGuruComponent } from './dashboard-guru.component';

describe('DashboardGuruComponent', () => {
  let component: DashboardGuruComponent;
  let fixture: ComponentFixture<DashboardGuruComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardGuruComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardGuruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
