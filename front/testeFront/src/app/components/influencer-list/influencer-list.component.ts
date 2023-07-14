import { Component, ViewChild } from '@angular/core';
import {
  CellClickedEvent,
  ColDef,
  GridApi,
  GridReadyEvent,
} from 'ag-grid-community';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { InfluencerService } from 'src/app/services/influencer.service';
import { InfluencerInterface, newInfluencerInterface } from 'src/app/models/influencer.model';

@Component({
  selector: 'app-influencer-list',
  templateUrl: './influencer-list.component.html',
  styleUrls: ['./influencer-list.component.scss'],
})
export class InfluencerListComponent {
  private gridApi: GridApi | undefined;
  public rowData: InfluencerInterface[] = [];

  public visible = false;
  public columnDefs: ColDef[] = [
    { field: 'votos', headerName: 'Votos', flex: 2 },
    { field: 'nome', headerName: 'Usuário', flex: 2 },
    { field: 'fullname', headerName: 'Nome', flex: 5 },
    { field: 'nick', headerName: 'Nick', flex: 2 },
    { field: 'telefone', headerName: 'Telefone', flex: 2 },
    { field: 'email', headerName: 'Email', flex: 4 },
    { field: 'instagram', headerName: 'Instagram', flex: 2 },
    { field: 'youtube', headerName: 'Youtube', flex: 2 },
    { field: 'facebook', headerName: 'Facebook', flex: 2 },
    { field: 'outros', headerName: 'Outros', flex: 2 },
  ];

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    cellStyle: { textAlign: 'left' },
  };
  selectedInfluencer:InfluencerInterface = newInfluencerInterface();
  constructor(private influencerSrv: InfluencerService) {}

  setVisible() {
    const selectedData: InfluencerInterface = this.gridApi!.getSelectedRows()[0];
    console.log(selectedData);
    this.selectedInfluencer = selectedData;
    this.visible = !this.visible;
  }

  onGridReady(params: GridReadyEvent) {
    // params.api.sizeColumnsToFit();
    this.gridApi = params.api;
    this.influencerSrv.InfluencerList.subscribe((res) => {
      console.log(res);
      this.rowData = res;
    });
  }

  // Example of consuming Grid Event
  onCellClicked(e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  // Example using Grid's API
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }
}
