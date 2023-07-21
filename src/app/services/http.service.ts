import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Contact, ContactForm, ContactsData, createContact, deleteContact } from '../interfaces/Contact';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor( private http: HttpClient ) { }

  getAllContacts(): Observable<ContactsData> {
    return this.http.get<ContactsData>(environment.apiUrl)
  }

  createContact( body: ContactForm ): Observable<createContact> {
    return this.http.post<createContact>(environment.apiUrl, body)
  }

  updateContact( body: ContactForm, id: string ): Observable<Contact> {
    return this.http.put<Contact>(`${environment.apiUrl}/${id}`, body)
  }

  deleteContact( id: string ): Observable<deleteContact> {
    return this.http.delete<deleteContact>(`${environment.apiUrl}/${id}`)
  }
}
