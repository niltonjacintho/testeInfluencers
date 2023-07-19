import { Component } from '@angular/core';
import { InfluencerService } from './services/influencer.service'  // './influenser.service.ts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Influencer Dash';

  constructor(private influencerSrv: InfluencerService) { }

  handleClick(event: Event) {
    console.log(event)
  }

  resetData() {
    console.log('reseting');
    this.influencerSrv.resetData(true);
  }

  addData() {
    this.influencerSrv.resetData(false);
  }
  randomVote() {
    console.log('reseting');
    this.influencerSrv.randomVote();
  }
}
