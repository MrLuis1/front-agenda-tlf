import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { MatListItem } from '@angular/material/list';
import { Contact } from 'src/app/interfaces/Contact';

@Component({
  selector: 'app-list-contact',
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.css']
})
export class ListContactComponent {
  @Input() ContactData: Contact[] = [];
  @Output() emitContact: EventEmitter<Contact> = new EventEmitter();
  @Output() emitCreateContact: EventEmitter<boolean> = new EventEmitter();
  @Output() emitCloseMenu: EventEmitter<boolean> = new EventEmitter();
  public selectedContact: Contact[] = [];
  public menuOpen: boolean = false

  verifySelectedContact( element: Contact ): boolean {
    return this.selectedContact.includes( element )
  }

  handleContact( element: Contact ) {
    this.selectedContact = [ element ];
    this.emitContact.emit( element )
  }

  emitCreate() {
    this.emitCreateContact.emit(true);
  }

  emitClose() {
    this.emitCloseMenu.emit(true);
  }

}
