import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnItemComponent } from './column-item.component';

describe('ColumnItemComponent', () => {
  let component: ColumnItemComponent;
  let fixture: ComponentFixture<ColumnItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
