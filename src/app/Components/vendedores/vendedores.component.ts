import { Component, OnInit } from '@angular/core';
import { Vendedor } from 'src/app/models/Vendedor.model';
import { SharedService } from 'src/app/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vendedores',
  templateUrl: './vendedores.component.html',
  styleUrls: ['./vendedores.component.css']
})

export class VendedoresComponent implements OnInit {

  vendedoresList: Vendedor[] = [];
  vendedorId: number = parseInt(sessionStorage.getItem("vendedorId")?.toString()!);

  vCedula: string = "";

  vendedor: Vendedor = new Vendedor();
  estados = [
    { id: "Activo", label: "Activo" },
    { id: "Inactivo", label: "Inactivo" }
  ];

  constructor(private srv: SharedService) { }

  ngOnInit(): void {
    this.getVendedores();
  }

  getVendedores(){
    this.srv.getVendedores().subscribe((res)=>{
      this.vendedoresList = res;
    });
  }

  deleteVendedores(id: number){
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
        this.srv.deleteVendedor(entity).subscribe((res)=>{
            Swal.fire({
              title: 'Vendedor Eliminado',
              icon: 'success'
            });
        },(error)=>{
            Swal.fire({
              title: 'Error!',
              text: error.error,
              icon: 'error'
            });
        },()=>{
          this.getVendedores();
        });
      }
    })
  }

  openEditVendedores(entity: Vendedor){
    this.vendedor.Id = entity.Id;
    this.vendedor.Nombre =  entity.Nombre;
    this.vendedor.Cedula =  entity.Cedula;
    this.vendedor.Clave =  entity.Clave;
    this.vendedor.Comision =  entity.Comision;
    this.vendedor.Estado =  entity.Estado;
  }

  editVendedores(){
    if(this.vendedor.Comision < 0){
      Swal.fire("Comision debe ser positiva","","error");
    }else{
      Swal.fire({
        title: 'Seguro que desea modificar?',
        showCancelButton: true,
        confirmButtonText: 'editar'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.srv.editVendedor(this.vendedor).subscribe((res)=>{
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
            this.getVendedores();
          });
        }
      });
    }
  }

  openAddVendedores(){
    this.vendedor = new Vendedor();
  }

  addVendedores(){
    if(this.vendedor.Comision < 0){
      Swal.fire("Comision debe ser positiva","","error");
    }else{
      Swal.fire({
        title: 'Seguro que desea agregar?',
        showCancelButton: true,
        confirmButtonText: 'agregar'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.srv.createVendedor(this.vendedor).subscribe((res)=>{
              Swal.fire({
                title: 'Vendedor Agregado',
                icon: 'success'
              });
          },(error)=>{
              Swal.fire({
                title: 'Error!',
                text: error.error,
                icon: 'error'
              });
          },()=>{
            this.getVendedores();
          });
        }
      });
    }
  }

  buscar(){
    this.srv.getVendedoresByCedula(this.vCedula).subscribe((res)=>{
      this.vendedoresList = res;
    })
  }

  clear(){
    this.vCedula = "";
    this.getVendedores();
  }

}
