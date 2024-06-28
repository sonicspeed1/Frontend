import { Component, OnInit } from '@angular/core';
import { Comida } from '../Comidas'; 
import { ComidasService } from '../comidas.service';
import { pedido } from '../pedido'; 
import { PedidosService } from '../pedidos.service';
import { meseros } from '../meseros';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  comidas: Comida[] = [];
  meseros: meseros[]=[];
  constructor(private com: ComidasService, private ped: PedidosService) {}

  ngOnInit(): void {
    this.cargarComidas();
    this.meseros_l();
  }

  cargarComidas() {
    this.com.mostrar_comidas().subscribe(data => {
      console.log(data);
      this.comidas = data;
    });
  }

  meseros_l(){
    this.com.getMeseros().subscribe(data => {
      console.log(data);
      this.meseros=data;
    });
  }

  realizarPedido(comida: Comida) {
    const meseroAleatorio = this.meseros[Math.floor(Math.random() * this.meseros.length)];
    const nuevoPedido: pedido = {
      Comida: comida.Nombre,
      Mesero: meseroAleatorio.Nombre, 
      Precio: comida.precio
    };

    this.ped.ingresarPedido(nuevoPedido).subscribe(
      (pedidoCreado) => {
        console.log('Pedido creado:', pedidoCreado);
        alert(`Su comida: ${pedidoCreado.Comida} será entregada por el mesero: ${pedidoCreado.Mesero} con la cantidad de: ${pedidoCreado.Precio}`+"\t dolares");
      },
      (error) => {
        console.error('Error al crear el pedido:', error);
        alert('Error al crear el pedido. Inténtalo de nuevo.');
      }
    );
  }
}