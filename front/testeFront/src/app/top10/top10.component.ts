import { Component, OnInit } from '@angular/core';
import { InfluencerService } from '../services/influencer.service';
import { GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-top10',
  templateUrl: './top10.component.html',
  styleUrls: ['./top10.component.scss']
})
export class Top10Component implements OnInit {
  private gridApi: GridApi | undefined;
  gridOptions: GridOptions | undefined;
  public rowData$: any[] = [];
  constructor(private influencerSrv: InfluencerService, private toastSrv: ToastService) { }


  ngOnInit(): void {
    this.gridOptions = {
      rowSelection: 'single',
      rowData: null,
      columnDefs: [
        { field: "nome", headerName: "Nome", flex: 5, },
        { field: "votos", headerName: "Votos", flex: 2, checkboxSelection: true },
      ],
      defaultColDef: {
        sortable: true,
        filter: true,
        cellStyle: { textAlign: 'left' }
      },
      animateRows: true,
    }
  }

  onGridReady(params: GridReadyEvent) {
    // params.api.sizeColumnsToFit();
    this.gridApi = params.api;
    this.getData();
  }

  getData() {
    this.influencerSrv.top10.subscribe((res) => {
      console.log('RETORNO ', res);
      this.rowData$ = res;
      this.gridApi?.setRowData(this.rowData$);
    });
  }

}
