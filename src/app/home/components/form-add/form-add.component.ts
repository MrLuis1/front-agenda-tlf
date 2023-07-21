import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Contact, ContactForm, createContact } from 'src/app/interfaces/Contact';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-form-add',
  templateUrl: './form-add.component.html',
  styleUrls: ['./form-add.component.css']
})
export class FormAddComponent implements OnInit {
  @Output() newContact: EventEmitter<Contact> = new EventEmitter();
  public contactForm!: FormGroup;
  public Types: string[] = [
    'MOVIL',
    'HOGAR'
  ]

  constructor( 
      private fb: FormBuilder, 
      private httpServ: HttpService, 
      private _snackBar: MatSnackBar ) {}

  ngOnInit(): void {
    this.initForm();
  }
  
  initForm() {
    this.contactForm = this.fb.group({
      nombre: [ '', [ Validators.required, Validators.minLength(4) ]],
      apellido: [ '', [ Validators.required, Validators.minLength(4) ]],
      correo: [ '', [ Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$') ]],
      typeNumber: [ '', [ Validators.required ]],
      telefono: [ '', [ Validators.required, Validators.minLength(8), Validators.pattern('^([0-9])*$') ]]
    });
  }

  createContact( form: FormGroup ) {
    const { value } = form;

    this.httpServ.createContact( value ).subscribe(( res: createContact ) => {
      if( res.ok ) {
        this.openSnackBar('Contacto creado con exito', 'Cerrar')
        this.newContact.emit(res.results[0]);
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }
}
