import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UbdateCategoryComponent } from './ubdate-category.component';

describe('UbdateCategoryComponent', () => {
  let component: UbdateCategoryComponent;
  let fixture: ComponentFixture<UbdateCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UbdateCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UbdateCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
