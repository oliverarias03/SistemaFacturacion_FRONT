import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = "https://localhost:44310/api/";

  constructor(private http: HttpClient) { }

  getVendedores():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'Vendedores/GetVendedores');
  }

  getVendedoresByCedula(cedula: string):Observable<any>{

    const params: HttpParams = new HttpParams().set("cedula", cedula);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: params,
      reportProgress: true
    };

    return this.http.get(this.APIUrl+'Vendedores/GetVendedoresByCedula', httpOptions).pipe(
      map((res: any[] | any) => {
        return res;
      })
    );

  }

  createVendedor(value: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      reportProgress: true
    };

    return this.http.post(this.APIUrl+'Vendedores/Create', JSON.stringify(value), httpOptions).pipe(
      map((res: any[] | any) => {
        return res;
      })
    );
  }

  editVendedor(value: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      reportProgress: true
    };

    return this.http.post(this.APIUrl+'Vendedores/Editar', JSON.stringify(value), httpOptions).pipe(
      map((res: any[] | any) => {
        return res;
      })
    );
  }

  deleteVendedor(value: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      reportProgress: true
    };

    return this.http.post(this.APIUrl+'Vendedores/Eliminar', JSON.stringify(value), httpOptions).pipe(
      map((res: any[] | any) => {
        return res;
      })
    );
  }

  login(value: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      reportProgress: true
    };

    return this.http.post(this.APIUrl+'Vendedores/Login', JSON.stringify(value), httpOptions).pipe(
      map((res: any[] | any) => {
        return res;
      })
    );
  }


}

