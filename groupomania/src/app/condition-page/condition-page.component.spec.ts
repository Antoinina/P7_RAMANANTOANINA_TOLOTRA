import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionPageComponent } from './condition-page.component';

describe('ConditionPageComponent', () => {
  let component: ConditionPageComponent;
  let fixture: ComponentFixture<ConditionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConditionPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
