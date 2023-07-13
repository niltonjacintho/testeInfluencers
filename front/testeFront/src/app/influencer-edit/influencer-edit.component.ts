import { Component, OnInit } from '@angular/core';
import { InfluencerInterface } from '../influencer.model';
import { InfluencerService } from '../influenser.service.ts.service';
@Component({
  selector: 'app-influencer-edit',
  templateUrl: './influencer-edit.component.html',
  styleUrls: ['./influencer-edit.component.scss']
})
export class InfluencerEditComponent implements OnInit {
  value = '';

  constructor(private influencer: InfluencerService) {

  }

  ngOnInit(): void {
    this.value = this.influencer.selectedInfluencer.nome!;
  }

}
