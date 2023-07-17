import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import {
  InfluencerInterface,
  newInfluencerInterface,
} from './../../models/influencer.model';
import { InfluencerService } from 'src/app/services/influencer.service';
import { ToastService } from 'src/app/services/toast.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-influencer-edit',
  templateUrl: './influencer-edit.component.html',
  styleUrls: ['./influencer-edit.component.scss'],
})
export class InfluencerEditComponent implements OnInit, AfterViewInit {
  //selectedInfluencerData: InfluencerInterface = newInfluencerInterface();

  @Input() selectedInfluencerData: InfluencerInterface = newInfluencerInterface();
  @Output() closeModal = new EventEmitter<void>();
  constructor(private influencerSrv: InfluencerService, private toastSrv: ToastService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    //this.selectedInfluencerData = this.influencerSrv.selectedInfluencer;
    console.log(this.selectedInfluencerData);
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

  }

  isFormValid(form: NgForm) {
    let retorno = false;
    if (form.valid) {
      retorno = true;
    }
    return retorno;
  }

  onSubmit() {
    try {
      if ((this.selectedInfluencerData.id != 0) && (this.selectedInfluencerData.id != undefined)) {
        this.influencerSrv.salvar(JSON.stringify(this.selectedInfluencerData))
      } else {
        this.influencerSrv.add(JSON.stringify(this.selectedInfluencerData))
      }

      this.toastSrv.notify('success', 'Edição concluida com sucesso ✔️', '', 3000)
    } catch (error) {
      this.toastSrv.notify('error', 'Edição não concluida ✔️', '', 3000)
    }
    this.closeModal.emit();
  }

  // remover() {
  //   try {
  //     this.influencerSrv.remover(this.selectedInfluencerData.id)
  //     console.log('TESTE DE RETORNO ', this.selectedInfluencerData);
  //     this.toastSrv.notify('success', 'Exclusão concluida com sucesso ✔️', '', 3000)
  //   } catch (error) {
  //     this.toastSrv.notify('error', 'Exclusão não concluida ✔️', '', 3000)
  //   }

  //   this.closeModal.emit();
  // }


  cancelar() {
    this.toastSrv.notify('error', 'Edição cancelada 🪶', '', 3000)
    this.closeModal.emit();
  }
}
