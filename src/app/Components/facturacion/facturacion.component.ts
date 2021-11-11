import { Component, OnInit } from '@angular/core';
import { Facturacion } from 'src/app/models/Facturacion.model';
import { Articulo } from 'src/app/models/Articulo.model';
import { SharedService } from 'src/app/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css']
})

export class FacturacionComponent implements OnInit {

  vendedorId: number = parseInt(sessionStorage.getItem("vendedorId")?.toString()!);
  vendedorName: string = sessionStorage.getItem("vendedorNombre")?.toString()!;

  facturacionList: Facturacion[] = [];

  facturacion: Facturacion = new Facturacion();

  articuloList: Articulo[] = [];

  constructor(private srv: SharedService) { }

  ngOnInit(): void {
    this.getFacturacion();
    this.getArticulos();
    console.log(this.articuloList);
  }

  getFacturacion(){
    this.srv.getFacturaciones().subscribe((res)=>{
      this.facturacionList = res;
    });
  }

  deleteFacturacion(id: number){
    Swal.fire({
      title: 'Seguro que desea eliminar?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const entity = {
          Id: id
        }
        this.srv.deleteFacturacion(entity).subscribe((res)=>{
            Swal.fire({
              title: 'Facturacion Eliminada',
              icon: 'success'
            });
        },(error)=>{
            Swal.fire({
              title: 'Error!',
              text: error.error,
              icon: 'error'
            });
        },()=>{
          this.getFacturacion();
        });
      }
    })
  }

  openEditFacturacion(entity: Facturacion){
    this.facturacion.Id = entity.Id;
    this.facturacion.IdCliente = entity.IdCliente;
    this.facturacion.IdVendedor = this.vendedorId;
    this.facturacion.IdArticulo = entity.IdArticulo;
    this.facturacion.Comentario = entity.Comentario;
    this.facturacion.Cantidad = entity.Cantidad;
    this.facturacion.Fecha = entity.Fecha;
    this.facturacion.PrecioUnitario = entity.PrecioUnitario;
  }

  editFacturacion(){
    Swal.fire({
      title: 'Seguro que desea modificar?',
      showCancelButton: true,
      confirmButtonText: 'editar'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.srv.editFacturacion(this.facturacion).subscribe((res)=>{
            Swal.fire({
              title: 'Vendedor Modificado',
              icon: 'success'
            });
        },(error)=>{
            Swal.fire({
              title: 'Error!',
              text: error.error,
              icon: 'error'
            });
        },()=>{
          this.getFacturacion();
        });
      }
    })
  }

  openAddFacturacion(){
    this.facturacion = new Facturacion();
    this.facturacion.IdVendedor = this.vendedorId;
  }

  addFacturacion(){
    Swal.fire({
      title: 'Seguro que desea agregar?',
      showCancelButton: true,
      confirmButtonText: 'agregar'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.srv.createFacturacion(this.facturacion).subscribe((res)=>{
            Swal.fire({
              title: 'Facturacion Agregada',
              icon: 'success'
            });
        },(error)=>{
            Swal.fire({
              title: 'Error!',
              text: error.error,
              icon: 'error'
            });
        },()=>{
          this.getFacturacion();
        });
      }
    })
  }

  getArticulos(){
    this.srv.getArticulos().subscribe((res)=>{
      console.log(res);
      this.articuloList = res;
    });
  }

}
