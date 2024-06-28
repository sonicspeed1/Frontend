import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comida } from './Comidas';
import { meseros } from './meseros';
const configurl="./assets/platos.json";
const configurl1="./assets/meseros.json";
@Injectable({
  providedIn: 'root'
})
export class ComidasService {
  
  constructor(private httpclient: HttpClient) {
    console.log('El servicio Http esta funcionando…');
    }
    mostrar_comidas(){
      return this.httpclient.get<Comida[]>(configurl);
    }
    getMeseros(): Observable<meseros[]> {
      return this.httpclient.get<meseros[]>(configurl1);
    }

}
