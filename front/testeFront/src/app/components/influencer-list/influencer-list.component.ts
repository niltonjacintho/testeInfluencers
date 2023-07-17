import { Component, OnInit, ViewChild } from '@angular/core';
import {
  CellClickedEvent,
  ColDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
} from 'ag-grid-community';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { InfluencerService } from 'src/app/services/influencer.service';
import { InfluencerInterface, newInfluencerInterface } from 'src/app/models/influencer.model';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-influencer-list',
  templateUrl: './influencer-list.component.html',
  styleUrls: ['./influencer-list.component.scss'],
})
export class InfluencerListComponent implements OnInit {
  private gridApi: GridApi | undefined;

  public rowData$: InfluencerInterface[] = [];

  public visible = false;
  public visibleNew = false;

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  selectedInfluencer: InfluencerInterface = newInfluencerInterface();
  constructor(private influencerSrv: InfluencerService, private toastSrv: ToastService) { }

  gridOptions: GridOptions | undefined;

  ngOnInit(): void {
    this.gridOptions = {
      rowSelection: 'single',
      rowData: null,
      columnDefs: [
        { field: "votos", headerName: "Votos", flex: 2, checkboxSelection: true },
        { field: "nome", headerName: "Usuário", flex: 2 },
        { field: "fullname", headerName: "Nome", flex: 5, },
        { field: "nick", headerName: "Nick", flex: 2 },
        { field: "telefone", headerName: "Telefone", flex: 2 },
        { field: "email", headerName: "Email", flex: 4 },
        { field: "instagram", headerName: "Instagram", flex: 2 },
        { field: "youtube", headerName: "Youtube", flex: 2 },
        { field: "facebook", headerName: "Facebook", flex: 2 },
        { field: "outros", headerName: "Outros", flex: 2 },
      ],
      defaultColDef: {
        sortable: true,
        filter: true,
        cellStyle: { textAlign: 'left' }
      },
      animateRows: true,
    }
  }

  add() {
    const selectedData: InfluencerInterface = newInfluencerInterface();
    this.selectedInfluencer = selectedData;
    this.visibleNew = !this.visibleNew;
  }

  edit() {
    const selectedData: InfluencerInterface = this.gridApi!.getSelectedRows()[0];
    if (selectedData) {
      console.log('SELECTWED DATA', selectedData);
      this.selectedInfluencer = selectedData;
      this.visible = !this.visible;
    } else {
      this.toastSrv.notify('warn', 'Por favor, selecione um influenciador ✔️', '', 3000)
    }
  }

  remove() {
    try {
      const selectedData: InfluencerInterface | any = this.gridApi!.getSelectedRows()[0];
      if (selectedData) {
        this.influencerSrv.remover(selectedData.id)
        this.gridApi!.applyTransaction({ remove: [selectedData] });
        this.toastSrv.notify('success', 'Influencer removido com sucesso ✔️', '', 3000)
      } else {
        this.toastSrv.notify('warn', 'Por favor, selecione um influenciador ✔️', '', 3000)
      }
    } catch (error) {
      console.log(error)
      this.toastSrv.notify('error', 'Influencer NÃO pode ser removido', 'Houve um erro no processo de exclusão. Pedimos que tente novamente em alguns minutos ou que entre em contato com o suporte.', 3000)
    }
  }

  onGridReady(params: GridReadyEvent) {
    // params.api.sizeColumnsToFit();
    this.gridApi = params.api;
    this.getData();
  }

  // Example of consuming Grid Event
  onCellClicked(e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  // Example using Grid's API
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }

  getData() {
    this.influencerSrv.InfluencerList.subscribe((res) => {
      console.log('RETORNO ', res);
      this.rowData$ = res;
      this.gridApi?.setRowData(this.rowData$);
    });
  }
}
