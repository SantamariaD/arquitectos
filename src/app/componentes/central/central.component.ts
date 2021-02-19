import { Component, ElementRef, Input, OnInit, AfterViewInit } from '@angular/core';
import { global } from '../../services/global';
import { HttpServicio } from '../../services/servicio.service';
import { Cambios } from '../../models/general';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import XYZ from 'ol/source/XYZ';
import { OSM } from 'ol/source';
import * as Proj from 'ol/proj';
import {
  defaults as defaultControls,
  Control
} from 'ol/control';

export const DEFAULT_HEIGHT = '300px';
export const DEFAULT_WIDTH = '100%';

export const DEFAULT_LAT = 19.303293263563535;
export const DEFAULT_LON = -99.25467215850539;

@Component({
  selector: 'app-central',
  templateUrl: './central.component.html',
  styleUrls: ['./central.component.scss'],
  providers: [HttpServicio]
})
export class CentralComponent implements OnInit, AfterViewInit  {
  @Input() lat: number = DEFAULT_LAT;
  @Input() lon: number = DEFAULT_LON;
  @Input() zoom: number = 16;
  @Input() width: string | number = DEFAULT_WIDTH;
  @Input() height: string | number = DEFAULT_HEIGHT;
  
  target: string = 'map-' + Math.random().toString(36).substring(2);
  map: Map;
  
  //VARIABLES
  private mapEl: HTMLElement
  public cambios;
  public cambiosGuardados;
  public url;
  public color;

  constructor(
    private servicio: HttpServicio,
    private elementRef: ElementRef
  ) {
    this.url = global.url;
    this.cambios = new Cambios ('','','','','','','','','','','','','','');
   }

  ngOnInit(): void {
  this.traerCambiosGuardados();
  this.mapEl = this.elementRef.nativeElement.querySelector('#map');
  this.setSize();
  }

  traerCambiosGuardados(){
    this.servicio.traerCambios(). subscribe(
      response => {
        this.cambiosGuardados = response;
        this.cambios = this.cambiosGuardados[0];

      },
      error =>{
        console.log(error)
      }
    );
  }

  //MAP
  private setSize() {
    if (this.mapEl) {
      const styles = this.mapEl.style;
      styles.height = coerceCssPixelValue(this.height) || DEFAULT_HEIGHT;
      styles.width = coerceCssPixelValue(this.width) || DEFAULT_WIDTH;
    }
  }

  ngAfterViewInit(): void {
    this.mapEl = this.elementRef.nativeElement.querySelector('#' + this.target);
  
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          })
        })
      ],
      view: new View({
        center: Proj.fromLonLat([this.lon, this.lat]),
        zoom: this.zoom
      }),
      controls: defaultControls().extend([])
    });
  }

  public setMarker(vector: VectorLayer) {
    this.map.addLayer(vector);
  }

  public setControl(control: Control) {
    this.map.addControl(control);
  }

}

const cssUnitsPattern = /([A-Za-z%]+)$/;

 function coerceCssPixelValue(value: any): string {
  if (value == null) {
    return '';
  }
  return cssUnitsPattern.test(value) ? value : `${value}px`;
 }