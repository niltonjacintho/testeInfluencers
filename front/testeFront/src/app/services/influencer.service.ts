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
  /* private _selectedInfluencer: InfluencerInterface = newInfluencerInterface(); */
  selectedInfluencer: InfluencerInterface = newInfluencerInterface();
  apiUrl = 'http://localhost:8000/influencer';
  getFromApi = true

  gridApi: GridApi | undefined;
  gridOptions: GridOptions | undefined;

  constructor(private http: HttpClient) { }

  /*  public get selectedInfluencer(): InfluencerInterface {
     return this._selectedInfluencer;
   }
   public set selectedInfluencer(value: InfluencerInterface) {
     this._selectedInfluencer = value;
   } */

  get InfluencerList(): Observable<InfluencerInterface[]> {
    if (this.getFromApi) {
      return this.http.get<InfluencerInterface[]>(this.apiUrl);
    } else {
      return of(mockLocalData);
    }
  }

  resetData() {
    this.http.post(this.apiUrl + "/reset", {})
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
    console.log('ID => ', id)
    try {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      let options = {
        headers: headers
      }
      await this.http.delete(this.apiUrl + '/' + id.toString(), options).subscribe(response => {
        //   this.removeSelectedRows();
      }); //, options);
    } catch (error) {
      console.log(error)
    }
  }

  removeSelectedRows() {
    // const selectedNodes = this.gridApi?.getRowNode(1);// .getSelectedNodes();
    // console.log('NODE SELECTED ', selectedNodes)
    // const selectedData = selectedNodes!.map(node => node.data);

    // Step 2: Remove selected rows from data source
    this.gridApi!.applyTransaction({ remove: [this.selectedInfluencer] });

    // Step 3: Refresh the Grid to reflect the changes
    this.gridOptions!.api!.refreshCells();
  }


}
