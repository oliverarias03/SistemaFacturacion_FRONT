import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: string = "";
  password: string = "";

  loggedIn: boolean = false;

  constructor(private srv: SharedService,private router: Router) { }

  ngOnInit(): void {
  }

  loginUser(){

    if(this.userName === "" || this.password === ""){
      Swal.fire({
        title: 'Error!',
        text: 'Completar Campos',
        icon: 'error'
      });

    }else{
      const entity = {
        Cedula: this.userName,
        Clave: this.password
      }

      this.srv.login(entity).subscribe((res)=>{

        sessionStorage.setItem("vendedorId", res.Id);
        sessionStorage.setItem("vendedorNombre", res.Nombre);
        sessionStorage.setItem("vendedorCedula", res.Cedula);

        this.loggedIn = true;

        Swal.fire({
          title: 'Bienvenido!',
          text: res.Name,
          icon: 'success'
        });

        this.router.navigate(['/inicio']);

      },(error)=>{
        Swal.fire({
          title: 'Error!',
          text: error.error,
          icon: 'error'
        });
      });
    }
  }

}
