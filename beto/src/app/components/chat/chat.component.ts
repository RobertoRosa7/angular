import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { MessageText } from 'src/app/models/messages';
import { fromEvent, Subscription } from 'rxjs';
import { SocketService } from 'src/app/services/socket.service';
import { MatListItem, MatList } from '@angular/material';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @ViewChild('input', {static: true}) input: ElementRef;
  @ViewChild('messagesContainer', {read: ElementRef, static: true}) messagesContainer: ElementRef;
  @ViewChildren('messagesList') messagesList:QueryList<MatListItem>;

  public currentTime = new Date().getTime();
  public blockbutton:boolean = false;
  public message: MessageText = {from: '', message: ''};
  public messages: MessageText[] = [];
  public user;
  private messagesSubscription: Subscription;
  private messagesSubscriptionList: Subscription;
  constructor(
    private fs: FirestoreService,
    private ss: SocketService
  ) { }

  ngOnInit() {
    this.fs.fetchUser()
      .subscribe((u) => {
        if(u){
          this.user = u;
          this.message.from = u.firstname
        }
      });

    fromEvent(this.input.nativeElement, 'keyup')
      .subscribe((k: KeyboardEvent) => {
        (this.message.message != '') ? this.blockbutton = true : this.blockbutton = false;
      });

    this.messagesSubscription = this.ss.fetchMessages()
      .subscribe((m: MessageText) => this.messages.push(m));
  }
  ngAfterViewInit(){
    this.messagesSubscriptionList = this.messagesList.changes.subscribe((e) => {
      // alterar a referencia máxima do scroll
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
      // console.log(this.messagesContainer.nativeElement.scrollHeight);
    });
  }
  ngOnDestroy(){
    this.messagesSubscription.unsubscribe();
    this.messagesSubscriptionList.unsubscribe();
  }
  public send(){
    this.ss.send(this.message);
    this.message.message = '';
  }
}
