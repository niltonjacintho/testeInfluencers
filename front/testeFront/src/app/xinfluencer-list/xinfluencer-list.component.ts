// import { Component, OnInit, ViewChild } from '@angular/core';
// import { CellClickedEvent, GridApi, GridReadyEvent } from 'ag-grid-community';
// import { Observable } from 'rxjs/internal/Observable';
// import { HttpClient } from '@angular/common/http';
// import { AgGridAngular } from 'ag-grid-angular';
// import { InfluencerService } from '../services/influencer.service';

// @Component({
//   selector: 'app-influencer-list',
//   templateUrl: './influencer-list.component.html',
//   styleUrls: ['./influencer-list.component.scss']
// })
// export class InfluencerListComponent implements OnInit {
//   public rowData$!: Observable<any[]>;
//   gridApi: GridApi = new GridApi();
//   public visible = false;

//   @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

//   ngOnInit(): void {
//     this.influencerSrv.gridOptions = {
//       rowSelection: 'single',
//       rowData: null,
//       columnDefs: [
//         { field: "votos", headerName: "Votos", flex: 2 },
//         { field: "nome", headerName: "Usuário", flex: 2 },
//         { field: "fullname", headerName: "Nome", flex: 5, },
//         { field: "nick", headerName: "Nick", flex: 2 },
//         { field: "telefone", headerName: "Telefone", flex: 2 },
//         { field: "email", headerName: "Email", flex: 4 },
//         { field: "instagram", headerName: "Instagram", flex: 2 },
//         { field: "youtube", headerName: "Youtube", flex: 2 },
//         { field: "facebook", headerName: "Facebook", flex: 2 },
//         { field: "outros", headerName: "Outros", flex: 2 },
//         {
//           type: "button",
//           headerName: "Delete",
//           // value: (params: { rowIndex: any; }) => {
//           //   return this.gridApi.remover  influencerSrv.gridApi!.removeRow(params.rowIndex);
//           // },
//         },
//       ],
//       defaultColDef: {
//         sortable: true,
//         filter: true,
//         cellStyle: { textAlign: 'left' }
//       },
//       animateRows: true,
//     }
//   }

//   constructor(private http: HttpClient, private influencerSrv: InfluencerService) {

//   }

//   setVisible() {
//     const selectedData = this.influencerSrv.gridApi!.getSelectedRows();
//     console.log(selectedData);
//     this.influencerSrv.selectedInfluencer.nome = selectedData[0].nome;

//     this.visible = !this.visible;
//   }

//   onGridReady(params: GridReadyEvent) {
//     // params.api.sizeColumnsToFit();
//     this.influencerSrv.gridApi = params.api;
//     // this.gridApi = params.api;
//     this.rowData$ = this.http
//       .get<any[]>('http://localhost:8000/influencer');
//   }

//   // Example of consuming Grid Event
//   onCellClicked(e: CellClickedEvent): void {
//     console.log('cellClicked', e);
//   }

//   // Example using Grid's API
//   clearSelection(): void {
//     this.influencerSrv.gridApi!.deselectAll();
//   }

// }
