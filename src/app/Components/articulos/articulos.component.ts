import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/app/models/Articulo.model';
import { SharedService } from 'src/app/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {

  articulosList: Articulo[] = [];

  vId: string = "";

  articulo: Articulo = new Articulo();
  estados = [
    { id: "Activo", label: "Activo" },
    { id: "Inactivo", label: "Inactivo" }
  ];

  constructor(private srv: SharedService) { }

  ngOnInit(): void {
    this.getArticulos();
  }

  getArticulos() {
    this.srv.getArticulos().subscribe((res) => {
      this.articulosList = res;
    });
  }

  deleteArticulos(id: number) {
    Swal.fire({
      title: 'Seguro que desea eliminar este elemento?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar'
    }).then((result) => {

      if (result.isConfirmed) {
        const entity = {
          Id: id
        }
        this.srv.deleteArticulos(entity).subscribe((res) => {
          Swal.fire({
            title: 'Articulo Eliminado',
            icon: 'success'
          });
        }, (error) => {
          Swal.fire({
            title: 'Error!',
            text: error.error,
            icon: 'error'
          });
        }, () => {
          this.getArticulos();
        });
      }
    })
  }

  openEditArticulos(entity: Articulo) {
    this.articulo.Id = entity.Id;
    this.articulo.Descripcion = entity.Descripcion;
    this.articulo.Precio = entity.Precio;
    this.articulo.Estado = entity.Estado;
  }

  editArticulos() {
    if(this.articulo.Precio < 0){
      Swal.fire("Precio debe ser positivo","","error");
    }else{
      Swal.fire({
        title: 'Seguro que desea modificar este elemento?',
        showCancelButton: true,
        confirmButtonText: 'editar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.srv.editArticulos(this.articulo).subscribe((res) => {
            Swal.fire({
              title: 'Articulo Modificado',
              icon: 'success'
            });
          }, (error) => {
            Swal.fire({
              title: 'Error!',
              text: error.error,
              icon: 'error'
            });
          }, () => {
            this.getArticulos();
          });
        }
      });
    }
  }

  openAddArticulos() {
    this.articulo = new Articulo();
  }

  addArticulos() {
    if(this.articulo.Precio < 0){
      Swal.fire("Precio debe ser positivo","","error");
    }else{
      Swal.fire({
        title: 'Seguro que desea agregar este elemento?',
        showCancelButton: true,
        confirmButtonText: 'agregar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.srv.createArticulos(this.articulo).subscribe((res) => {
            Swal.fire({
              title: 'Articulo Agregado',
              icon: 'success'
            });
          }, (error) => {
            Swal.fire({
              title: 'Error!',
              text: error.error,
              icon: 'error'
            });
          }, () => {
            this.getArticulos();
          });
        }
      });
    }
  }

  buscar(){
    this.srv.getArticulosById(parseInt(this.vId)).subscribe((res)=>{
      this.articulosList = res;
    })
  }

  clear(){
    this.vId = "";
    this.getArticulos();
  }

}
