import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  vendedorNombre = sessionStorage.getItem("vendedorNombre");
  vendedorId = sessionStorage.getItem("vendedorId");
  vendedorCedula = sessionStorage.getItem("vendedorCedula");

  constructor(private service:SharedService,private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
