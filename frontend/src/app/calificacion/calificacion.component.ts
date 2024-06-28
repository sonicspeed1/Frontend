import { Component, OnInit } from '@angular/core';
import { CalificacionesService } from '../calificaciones.service';
import { meseros } from '../meseros';
import { MaterializeService } from '../materialize.service';

@Component({
  selector: 'app-calificacion',
  templateUrl: './calificacion.component.html',
  styleUrls: ['./calificacion.component.css']
})
export class CalificacionComponent implements OnInit {
  meseros: meseros[] = [];
  selectedMesero: string = '';
  calificaciones = { atencion: 0, puntualidad: 0, presentacion: 0, actitud: 0, deseo: 0 };

  constructor(
    private calificacionesService: CalificacionesService,
    private materializeService: MaterializeService
  ) {}

  ngOnInit() {
    this.fetchMeseros();
  }

  fetchMeseros() {
    this.calificacionesService.getMeseros().subscribe(
      (data: meseros[]) => {
        this.meseros = data;
        this.materializeService.initializeMaterialize(); 
      },
      (error) => {
        console.error('Error al obtener la lista de meseros:', error);
      }
    );
  }

  actualizarCalificacion() {
    const totalCalificacion = Object.values(this.calificaciones).reduce((a, b) => a + b, 0);
    this.calificacionesService.putCalificacion(this.selectedMesero, totalCalificacion).subscribe(
      () => {
        console.log('Calificación actualizada');
        alert(`Se ha calificado a ${this.selectedMesero} con una nota de ${totalCalificacion}`);
        this.resetForm();
        this.fetchMeseros(); // Refrescar la lista de meseros
      },
      (error) => {
        console.error('Error al actualizar la calificación:', error);
      }
    );
  }

  resetForm() {
    this.selectedMesero = '';
    this.calificaciones = { atencion: 0, puntualidad: 0, presentacion: 0, actitud: 0, deseo: 0 };
    this.materializeService.initializeMaterialize(); 
  }
}