import { Injectable } from '@angular/core';
import * as socketio from 'socket.io-client';
import { MessageText } from '../models/messages';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
    private readonly api: string = 'http://localhost:8080';
    private socket = socketio(this.api);
    private subjectMessages: Subject<MessageText> = new Subject<MessageText>();

    constructor() {
        // ouvir evento nomeado de messages do servidor
        this.socket.on('messages', (m: MessageText) => this.subjectMessages.next(m));
    }

    public send(msg: MessageText){
        // emitir evento nomeado de messages para servidor
        this.socket.emit('messages', msg);
    }
    public fetchMessages():Observable<MessageText>{
        return this.subjectMessages.asObservable();
    }
}
