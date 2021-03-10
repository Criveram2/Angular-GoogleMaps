import { Component, OnInit } from '@angular/core';
import { Marcador } from '../../classes/marcador.class';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MapaEditarComponent } from './mapa-editar.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
})
export class MapaComponent implements OnInit {
  marcadores: Marcador[] = [];
  lat = 4.645926;
  lng = -74.077604;
  constructor(public snackBar: MatSnackBar, public dialog: MatDialog) {
    if(localStorage.getItem('marcadores')){
      this.marcadores = JSON.parse(localStorage.getItem('marcadores'));
    }
  }

  ngOnInit(): void {}

  agregarMarcador(evento) {
    const cords: { lat: number; lng: number } = evento.coords;
    const nuevoMarcador = new Marcador(cords.lat, cords.lng);
    this.marcadores.push(nuevoMarcador);
    this.guardarStorage() ;
    this.snackBar.open('Marcador Creado', 'Cerrar',{duration: 3000});
    
  }

  borrarMarcador(i: number){
    this.marcadores.splice(i,1);
    this.guardarStorage() ;
     this.snackBar.open('Marcador Borrado', 'Cerrar',{duration: 3000});
  }

  editarMarcador(marcador: Marcador){
    const dialogRef = this.dialog.open(MapaEditarComponent, {
      width: '250px',
      data: {titulo: marcador.titulo, desc: marcador.desc}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`); 
      if(!result){
        return;
      }

      marcador.titulo = result.titulo;
      marcador.desc = result.desc;
      
      this.guardarStorage();
      this.snackBar.open('Marcador Actualizado', 'Cerrar',{duration: 3000});
    });
    
  }

  guardarStorage() {
    localStorage.setItem('marcadores',JSON.stringify(this.marcadores));
  }

}
