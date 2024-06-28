import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { meseros } from './meseros'; 

@Injectable({
  providedIn: 'root'
})
export class CalificacionesService {
  private apiUrl = 'http://localhost:3000/calificaciones'; 
  private apiUrl1 = './assets/meseros.json'; 
  constructor(private httpClient: HttpClient) {}

  getMeseros(): Observable<meseros[]> {
    return this.httpClient.get<meseros[]>(this.apiUrl1);
  }

  putCalificacion(nombre: string, nuevaCalificacion: number): Observable<any> {
    const url = `${this.apiUrl}/${nombre}`;
    return this.httpClient.put<any>(url, { calificacion: nuevaCalificacion });
  }
}