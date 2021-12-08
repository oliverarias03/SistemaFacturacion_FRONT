import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/Cliente.model';
import { SharedService } from 'src/app/shared.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  clientList: Cliente[] = [];

  client: Cliente = new Cliente();
  estados = [
    { id: 'Activo', label: 'Activo' },
    { id: 'Inactivo', label: 'Inactivo' },
  ];

  vRnc: string = "";

  constructor(private _service: SharedService) {}

  ngOnInit(): void {
    this.getClients();
  }

  getClients() {
    this._service.getClients().subscribe((res) => {
      this.clientList = res;
    });
  }

  deleteClient(id: number) {
    this.confirmAlert('eliminar')
      .then((result) => {
        if (!result) return;
        this._service.deleteClient(id).subscribe(
          (res) => {
            Swal.fire({
              title: 'Cliente Eliminado',
              icon: 'success',
            });
          },
          (error) => {
            this.displayAlert(error.error);
          },
          () => {
            this.getClients();
          }
        );
      });
  }

  openEditClient(entity: Cliente) {
    this.client.Id = entity.Id;
    this.client.Nombre = entity.Nombre;
    this.client.CuentaContable = entity.CuentaContable;
    this.client.Rnc = entity.Rnc;
    this.client.Estado = entity.Estado;
  }

  editClient() {
    this.confirmAlert('editar')
      .then((result) => {
        if (!result) return;
        this._service.editClient(this.client).subscribe(
          (res) => {
            Swal.fire({
              title: 'Cliente Modificado',
              icon: 'success',
            });
          },
          (error) => {
            this.displayAlert(error.error);
          },
          () => {
            this.getClients();
          }
        );
      });
  }

  openAddClient() {
    this.client = new Cliente();
  }

  addClient() {
    this.confirmAlert('agregar')
      .then((result) => {
        if (!result) return;
        this._service.createClient(this.client).subscribe(
          (res) => {
            Swal.fire({
              title: 'Cliente Agregado',
              icon: 'success',
            });
          },
          (error) => {
            this.displayAlert(error.error);
          },
          () => {
            this.getClients();
          }
        );
      });
  }

  confirmAlert(verb: string) {
    return Swal.fire({
      title: `Seguro que desea ${verb}?`,
      showCancelButton: true,
      confirmButtonText: TitleCasePipe.prototype.transform(verb),
      cancelButtonText: 'Cancelar',
    }).then(({ isConfirmed }) => isConfirmed);
  }

  displayAlert(message: string) {
    Swal.fire({
      title: 'Error!',
      text: message,
      icon: 'error',
    });
  }

  buscar(){
    this._service.getClientByRnc(this.vRnc).subscribe((res)=>{
      this.clientList = res;
    })
  }

  clear(){
    this.vRnc = "";
    this.getClients();
  }
}
