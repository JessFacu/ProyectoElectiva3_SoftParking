import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaChartComponent } from './mapa-chart.component';

describe('MapaChartComponent', () => {
  let component: MapaChartComponent;
  let fixture: ComponentFixture<MapaChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
