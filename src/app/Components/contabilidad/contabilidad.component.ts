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
    this.srv.searchFacturas(new Date(this.desde),new Date(this.hasta === "" ? 0 : this.hasta)).subscribe((res)=>{
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
        cuentaCR: 6,
        cuentaDB: 13,
        amountCR: this.montoTotal,
        amountDB: this.montoTotal
      }
    }

    console.log(data);
    this.srv.contabilizar(data).subscribe((res)=>{
      console.log("result: ", res);
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
