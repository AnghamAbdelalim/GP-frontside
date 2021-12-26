import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopAllCategoriesComponent } from './shop-all-categories.component';

describe('ShopAllCategoriesComponent', () => {
  let component: ShopAllCategoriesComponent;
  let fixture: ComponentFixture<ShopAllCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopAllCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopAllCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
