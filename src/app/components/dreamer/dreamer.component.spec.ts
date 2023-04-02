import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DreamerComponent } from './dreamer.component';

describe('DreamerComponent', () => {
  let component: DreamerComponent;
  let fixture: ComponentFixture<DreamerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DreamerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DreamerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
