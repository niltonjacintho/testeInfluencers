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
  @Input() selectedInfluencerData: InfluencerInterface = newInfluencerInterface();
  @Output() closeModal = new EventEmitter<void>();

  ufs: any = null;

  constructor(public influencerSrv: InfluencerService, private toastSrv: ToastService) {
    this.ufs = influencerSrv.ufs;
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
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

  cancelar() {
    this.toastSrv.notify('error', 'Edição cancelada 🪶', '', 3000)
    this.closeModal.emit();
  }
}
