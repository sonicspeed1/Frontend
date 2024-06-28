import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { pedido } from './pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  ingresarPedido(nuevoPedido: pedido): Observable<pedido> {
    return this.http.post<pedido>(`${this.baseUrl}/pedidos`, nuevoPedido);
  }
}