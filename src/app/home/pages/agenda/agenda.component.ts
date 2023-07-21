import { Component, OnInit } from '@angular/core';
import { Contact, ContactsData } from 'src/app/interfaces/Contact';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit{
  public allContacts: Contact[] = [];
  public haveSelectedContact: boolean = false;
  public contact!: Contact;

  constructor( private httpServ: HttpService ) {}

  ngOnInit(): void {
    this.initRequests();
  }

  initRequests() {
    this.httpServ.getAllContacts().subscribe((res: ContactsData) => {
      if( res.contactos && res.contactos[0] instanceof Object ) {
        this.allContacts = res.contactos;
      } else {
        // TODO manejar error avisando que no hay contactos registrados
      }
    });
  }

  listeningContact( contact: Contact ) {
    if( contact ) {
      this.haveSelectedContact = true;
      this.contact = contact;
    }
  }

  updateContactList( value: Contact ) {
    this.allContacts = this.allContacts.filter( contact => contact.id !== value.id );
    this.haveSelectedContact = false;
  }

  setCreateContact( value: Contact ) {
    this.allContacts.push(value);
    this.contact = value;
    this.haveSelectedContact = true;
  }

}
