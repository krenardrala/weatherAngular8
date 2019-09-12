import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentCityComponent } from './current-city.component';

describe('CurrentCityComponent', () => {
  let component: CurrentCityComponent;
  let fixture: ComponentFixture<CurrentCityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentCityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
