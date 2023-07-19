import { Injectable } from '@angular/core';
import {
  InfluencerInterface,
  newInfluencerInterface,
} from '../models/influencer.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mockLocalData } from './mockLocalData';
import { GridApi, GridOptions } from 'ag-grid-community';

@Injectable({
  providedIn: 'root',
})
export class InfluencerService {
  selectedInfluencer: InfluencerInterface = newInfluencerInterface();
  apiUrl = 'http://localhost:8000/influencer';
  getFromApi = true

  gridApi: GridApi | undefined;
  gridOptions: GridOptions | undefined;

  constructor(private http: HttpClient) { }

  get InfluencerList(): Observable<InfluencerInterface[]> {
    return this.http.get<InfluencerInterface[]>(this.apiUrl);
  }

  get top10(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/topdez/list');
  }

  get ufs() {
    return [
      {
        "nome": "none",
        "sigla": "XX"
      },
      {
        "nome": "Acre",
        "sigla": "AC"
      },
      {
        "nome": "Alagoas",
        "sigla": "AL"
      },
      {
        "nome": "Amapá",
        "sigla": "AP"
      },
      {
        "nome": "Amazonas",
        "sigla": "AM"
      },
      {
        "nome": "Bahia",
        "sigla": "BA"
      },
      {
        "nome": "Ceará",
        "sigla": "CE"
      },
      {
        "nome": "Distrito Federal",
        "sigla": "DF"
      },
      {
        "nome": "Espírito Santo",
        "sigla": "ES"
      },
      {
        "nome": "Goiás",
        "sigla": "GO"
      },
      {
        "nome": "Maranhão",
        "sigla": "MA"
      },
      {
        "nome": "Mato Grosso",
        "sigla": "MT"
      },
      {
        "nome": "Mato Grosso do Sul",
        "sigla": "MS"
      },
      {
        "nome": "Minas Gerais",
        "sigla": "MG"
      },
      {
        "nome": "Pará",
        "sigla": "PA"
      },
      {
        "nome": "Paraíba",
        "sigla": "PB"
      },
      {
        "nome": "Paraná",
        "sigla": "PR"
      },
      {
        "nome": "Pernambuco",
        "sigla": "PE"
      },
      {
        "nome": "Piauí",
        "sigla": "PI"
      },
      {
        "nome": "Rio de Janeiro",
        "sigla": "RJ"
      },
      {
        "nome": "Rio Grande do Norte",
        "sigla": "RN"
      },
      {
        "nome": "Rio Grande do Sul",
        "sigla": "RS"
      },
      {
        "nome": "Santa Catarina",
        "sigla": "SC"
      },
      {
        "nome": "São Paulo",
        "sigla": "SP"
      },
      {
        "nome": "Sergipe",
        "sigla": "SE"
      },
      {
        "nome": "Tocantins",
        "sigla": "TO"
      }
    ];
  }

  top10Graph(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/topdezGraph/list');
  }

  resetData(truncate: boolean = true) {
    this.http.post(this.apiUrl + "/reset/dados/" + truncate, {}).subscribe(() => { })
  }

  randomVote() {
    this.http.post(this.apiUrl + "/vote/random/100", {}).subscribe(() => { })
  }


  get graphUfs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + "/graph/uf");
  }


  async salvar(body: any) {
    try {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      let options = {
        headers: headers
      }
      await this.http.put(this.apiUrl, body, options).subscribe(response => { }); //, options);
    } catch (error) {
      console.log(error)
    }
  }

  async add(body: any) {
    try {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      let options = {
        headers: headers
      }
      await this.http.post(this.apiUrl, body, options).subscribe(response => { }); //, options);
    } catch (error) {
      console.log(error)
    }
  }

  async remover(id: number) {
    try {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      let options = {
        headers: headers
      }
      await this.http.delete(this.apiUrl + '/' + id.toString(), options).subscribe(response => {
      });
    } catch (error) {
      console.log(error)
    }
  }

  removeSelectedRows() {
    this.gridApi!.applyTransaction({ remove: [this.selectedInfluencer] });
    this.gridOptions!.api!.refreshCells();
  }


}
