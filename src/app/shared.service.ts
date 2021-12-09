import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  readonly APIUrl = environment.url;

  constructor(private http: HttpClient) {}

  getVendedores(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + 'Vendedores/GetVendedores');
  }

  getVendedoresByCedula(cedula: string): Observable<any> {
    const params: HttpParams = new HttpParams().set('cedula', cedula);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: params,
      reportProgress: true,
    };

    return this.http
      .get(this.APIUrl + 'Vendedores/GetVendedoresByCedula', httpOptions)
      .pipe(
        map((res: any[] | any) => {
          return res;
        })
      );
  }

  createVendedor(value: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      reportProgress: true,
    };

    return this.http
      .post(
        this.APIUrl + 'Vendedores/Create',
        JSON.stringify(value),
        httpOptions
      )
      .pipe(
        map((res: any[] | any) => {
          return res;
        })
      );
  }

  editVendedor(value: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      reportProgress: true,
    };

    return this.http
      .post(
        this.APIUrl + 'Vendedores/Editar',
        JSON.stringify(value),
        httpOptions
      )
      .pipe(
        map((res: any[] | any) => {
          return res;
        })
      );
  }

  deleteVendedor(value: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      reportProgress: true,
    };

    return this.http
      .post(
        this.APIUrl + 'Vendedores/Eliminar',
        JSON.stringify(value),
        httpOptions
      )
      .pipe(
        map((res: any[] | any) => {
          return res;
        })
      );
  }

  login(value: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      reportProgress: true,
    };

    return this.http
      .post(
        this.APIUrl + 'Vendedores/Login',
        JSON.stringify(value),
        httpOptions
      )
      .pipe(
        map((res: any[] | any) => {
          return res;
        })
      );
  }

  //Facturacion
  getFacturaciones(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + 'Facturacion/GetFacturaciones');
  }

  getFacturacionById(id: number): Observable<any> {
    const params: HttpParams = new HttpParams().set('id', id);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: params,
      reportProgress: true,
    };

    return this.http
      .get(this.APIUrl + 'Facturacion/GetFacturacionById', httpOptions)
      .pipe(
        map((res: any[] | any) => {
          return res;
        })
      );
  }

  createFacturacion(value: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      reportProgress: true,
    };

    return this.http
      .post(
        this.APIUrl + 'Facturacion/Create',
        JSON.stringify(value),
        httpOptions
      )
      .pipe(
        map((res: any[] | any) => {
          return res;
        })
      );
  }

  editFacturacion(value: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      reportProgress: true,
    };

    return this.http
      .post(
        this.APIUrl + 'Facturacion/Editar',
        JSON.stringify(value),
        httpOptions
      )
      .pipe(
        map((res: any[] | any) => {
          return res;
        })
      );
  }

  deleteFacturacion(value: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      reportProgress: true,
    };

    return this.http
      .post(
        this.APIUrl + 'Facturacion/Eliminar',
        JSON.stringify(value),
        httpOptions
      )
      .pipe(
        map((res: any[] | any) => {
          return res;
        })
      );
  }

  //Clientes
  getClients(): Observable<any[]> {
    return this.http.get<any>(`${this.APIUrl}client`);
  }

  getClientByRnc(rnc: string): Observable<any> {
    return this.http.get(`${this.APIUrl}client/${rnc}`).pipe(
      map((res: any[] | any) => {
        return res;
      })
    );
  }

  createClient(value: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      reportProgress: true,
    };

    return this.http
      .post(`${this.APIUrl}client`, JSON.stringify(value), httpOptions)
      .pipe(
        map((res: any[] | any) => {
          return res;
        })
      );
  }

  editClient(value: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      reportProgress: true,
    };

    return this.http
      .put(`${this.APIUrl}client`, JSON.stringify(value), httpOptions)
      .pipe(
        map((res: any[] | any) => {
          return res;
        })
      );
  }

  deleteClient(value: number) {
    return this.http.delete(`${this.APIUrl}client/${value}`).pipe(
      map((res: any[] | any) => {
        return res;
      })
    );
  }

  //Articulos
  getArticulos():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'Articulos/GetArticulos');
  }

  getArticulosById(id: number): Observable<any> {

    const params: HttpParams = new HttpParams().set("id", id);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: params,
      reportProgress: true
    };

    return this.http.get(this.APIUrl + 'Articulos/GetArticulosById', httpOptions).pipe(
      map((res: any[] | any) => {
        return res;
      })
    );
  }

  createArticulos(value: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      reportProgress: true
    };

    return this.http.post(this.APIUrl + 'Articulos/Create', JSON.stringify(value), httpOptions).pipe(
      map((res: any[] | any) => {
        return res;
      })
    );
  }

  editArticulos(value: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      reportProgress: true
    };

    return this.http.post(this.APIUrl + 'Articulos/Editar', JSON.stringify(value), httpOptions).pipe(
      map((res: any[] | any) => {
        return res;
      })
    );
  }

  deleteArticulos(value: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      reportProgress: true
    };

    return this.http.post(this.APIUrl + 'Articulos/Eliminar', JSON.stringify(value), httpOptions).pipe(
      map((res: any[] | any) => {
        return res;
      })
    );
  }

  searchFacturas(desde: Date, hasta: Date): Observable<any> {
    const params: HttpParams = new HttpParams().set('desde', desde.toDateString()).set('hasta', hasta.toDateString());

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: params,
      reportProgress: true,
    };

    return this.http
      .get(this.APIUrl + 'Facturacion/searchFacturas', httpOptions)
      .pipe(
        map((res: any[] | any) => {
          return res;
        })
      );
  }

  contabilizar(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      reportProgress: true
    };

    return this.http.post('https://accountingaccountapi20211205021409.azurewebsites.net/api/AccountingSeat/Register', data, httpOptions).pipe(
      map((res: any[] | any) => {
        return res;
      })
    );
  }

  searchFacturas2(desde: Date, hasta: Date): Observable<any> {
    const params: HttpParams = new HttpParams().set('desde', desde.toDateString()).set('hasta', hasta.toDateString());

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: params,
      reportProgress: true,
    };

    return this.http
      .get(this.APIUrl + 'Facturacion/searchFacturas2', httpOptions)
      .pipe(
        map((res: any[] | any) => {
          return res;
        })
      );
  }

  UpdateInvoices(value: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      reportProgress: true,
    };

    return this.http
      .post(
        this.APIUrl + 'Facturacion/UpdateInvoices',
        value,
        httpOptions
      )
      .pipe(
        map((res: any[] | any) => {
          return res;
        })
      );
  }
}
