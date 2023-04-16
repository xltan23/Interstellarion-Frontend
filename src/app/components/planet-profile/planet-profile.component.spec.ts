import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetProfileComponent } from './planet-profile.component';

describe('PlanetProfileComponent', () => {
  let component: PlanetProfileComponent;
  let fixture: ComponentFixture<PlanetProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanetProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanetProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
