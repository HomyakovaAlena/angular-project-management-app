import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalizationSwitcherComponent } from './localization-switcher.component';

describe('LocalizationSwitcherComponent', () => {
  let component: LocalizationSwitcherComponent;
  let fixture: ComponentFixture<LocalizationSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalizationSwitcherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalizationSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
