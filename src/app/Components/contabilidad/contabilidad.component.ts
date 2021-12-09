import { Component, OnInit } from '@angular/core';
import { Contabilidad } from 'src/app/models/Contabilidad.model';
import { SharedService } from 'src/app/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contabilidad',
  templateUrl: './contabilidad.component.html',
  styleUrls: ['./contabilidad.component.css']
})
export class ContabilidadComponent implements OnInit {

  desde: string = "";
  hasta: string = "";

  montoTotal: number = 0;

  consultaList: Contabilidad[] = [];

  constructor(private srv: SharedService) { }

  ngOnInit(): void {
  }

  buscar(){
    const date = new Date(this.desde);
    date.setDate(date.getDate() + 1);

    const date2 = new Date(this.hasta);
    date2.setDate(date2.getDate() + 1);

    this.srv.searchFacturas(date,this.hasta === "" ? new Date(0) : date2).subscribe((res)=>{
      this.consultaList = res;
    },(error)=>{
      Swal.fire({
        title: 'Error!',
        text: error.error,
        icon: 'error'
      });
  },()=>{
    //
  });
  }

  contabilizar(){
    let date = new Date();
    this.montoTotal = 0;

    this.consultaList.forEach(element => {
      this.montoTotal += element.Monto;
    });

    const data = {
      description: "Asiento de Facturacion Correspondiente al Periodo " + date.getFullYear() +"-"+ date.getMonth(),
      auxiliar: 3,
      currencyCode: 1,
      detail: {
        cuentaCR: "6",
        cuentaDB: "13",
        amountCR: this.montoTotal,
        amountDB: this.montoTotal
      }
    }

    console.log(data);
    this.srv.contabilizar(data).subscribe((res)=>{
      console.log("result: ", res);
      if(res){
        const date4 = new Date(this.desde);
        date4.setDate(date4.getDate());

        const date5 = new Date(this.hasta);
        date5.setDate(date5.getDate());

        const entity ={
          Desde: date4,
          Hasta: this.hasta === "" ? new Date(0) : date5,
          IdAsiento: res.id
        }
        this.srv.UpdateInvoices(entity).subscribe((res2)=>{
          if(res2){
            Swal.fire({
              title: 'Facturas Contabilizas',
              text: 'Consultar el mantenimiento de facturacion para validar los asientos.',
              icon: 'success'
            });
          }
        },(error)=>{
          Swal.fire({
            title: 'Error!',
            text: error.error,
            icon: 'error'
          });
        },()=>{
          this.buscar();
        });
      }
    },(error)=>{
      Swal.fire({
        title: 'Error!',
        text: error.error,
        icon: 'error'
      });
    },()=>{
      //
    });

  }

}
