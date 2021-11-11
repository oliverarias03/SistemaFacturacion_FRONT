import { Articulo } from "./Articulo.model";
import { Cliente } from "./Cliente.model";
import { Vendedor } from "./Vendedor.model";

export class Facturacion {
    Id: number = 0;
    IdVendedor: number = 0;
    IdCliente: number = 0;
    IdArticulo: number = 0;
    Fecha: string = "";
    Comentario: string = "";
    Cantidad: number = 0;
    PrecioUnitario: number = 0;
    IdArticuloNavigation: Articulo = new Articulo();
    IdClienteNavigation: Cliente = new Cliente();
    IdVendedorNavigation: Vendedor = new Vendedor();
  }
