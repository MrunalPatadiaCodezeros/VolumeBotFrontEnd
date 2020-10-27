import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoVolumePriceGenratorComponent } from './auto-volume-price-genrator.component';

describe('AutoVolumePriceGenratorComponent', () => {
  let component: AutoVolumePriceGenratorComponent;
  let fixture: ComponentFixture<AutoVolumePriceGenratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoVolumePriceGenratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoVolumePriceGenratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
