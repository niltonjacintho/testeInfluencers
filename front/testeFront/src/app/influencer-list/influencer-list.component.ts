import { Component, ViewChild } from '@angular/core';
import { CellClickedEvent, ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { InfluencerService } from '../influenser.service.ts.service';

@Component({
  selector: 'app-influencer-list',
  templateUrl: './influencer-list.component.html',
  styleUrls: ['./influencer-list.component.scss']
})
export class InfluencerListComponent {
  private gridApi: GridApi | undefined;
  public rowData$!: Observable<any[]>;

  public visible = false;
  public columnDefs: ColDef[] = [
    { field: "votos", headerName: "Votos", flex: 2 },
    { field: "nome", headerName: "Usuário", flex: 2 },
    { field: "fullname", headerName: "Nome", flex: 5, },
    { field: "nick", headerName: "Nick", flex: 2 },
    { field: "telefone", headerName: "Telefone", flex: 2 },
    { field: "email", headerName: "Email", flex: 4 },
    { field: "instagram", headerName: "Instagram", flex: 2 },
    { field: "youtube", headerName: "Youtube", flex: 2 },
    { field: "facebook", headerName: "Facebook", flex: 2 },
    { field: "outros", headerName: "Outros", flex: 2 },
  ];

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    cellStyle: { textAlign: 'left' }
  };

  constructor(private http: HttpClient, private influencerSrv: InfluencerService) { }




  setVisible() {
    const selectedData = this.gridApi!.getSelectedRows();
    console.log(selectedData);
    this.influencerSrv.selectedInfluencer.nome = selectedData[0].nome;

    this.visible = !this.visible;
  }

  onGridReady(params: GridReadyEvent) {
    // params.api.sizeColumnsToFit();
    this.gridApi = params.api;
    this.rowData$ = this.http
      .get<any[]>('https://my.api.mockaroo.com/teste_empresa2.json?key=db46d350');
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
