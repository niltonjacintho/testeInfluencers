import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastService } from './../../services/toast.service';
import { Subscription } from 'rxjs';
import { Message } from 'primeng/api';
@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  providers: [MessageService],
})
export class ToastComponent implements OnInit {
  msgs: Message[] = [];
  subscription: Subscription = new Subscription();

  constructor(private toastSrv: ToastService, private msgSrv: MessageService) {}

  ngOnInit(): void {
    console.log('carregou');

    this.subscribeToNotifications();
  }

  subscribeToNotifications() {
    this.subscription = this.toastSrv.notificationChange.subscribe(
      (notification) => {
        this.msgs.length = 0;
        this.msgSrv.add(notification);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
