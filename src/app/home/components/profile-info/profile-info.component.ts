import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Contact, ContactForm, deleteContact } from 'src/app/interfaces/Contact';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit, OnChanges {
  @Input() selectedContact!: Contact; 
  @Output() deletedContact: EventEmitter<Contact> = new EventEmitter;
  public profileForm!: FormGroup;
  public disableEdit: boolean = true;
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
    const { id, estado, ...dataForm } = this.selectedContact;
    this.setFormValues( dataForm );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if( !changes['selectedContact'].firstChange ) {
      const { id, estado, ...dataForm } = this.selectedContact;
      this.setFormValues( dataForm );
    }
  }
  
  initForm() {
    this.profileForm = this.fb.group({
      nombre: [{ value: '', disabled: this.disableEdit }, [ Validators.required, Validators.minLength(4) ]],
      apellido: [{ value: '', disabled: this.disableEdit }, [ Validators.required, Validators.minLength(4) ]],
      correo: [{ value: '', disabled: this.disableEdit }, [ Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$') ]],
      typeNumber: [{ value: '', disabled: this.disableEdit }, [ Validators.required ]],
      telefono: [{ value: '', disabled: this.disableEdit }, [ Validators.required, Validators.minLength(8), Validators.pattern('^([0-9])*$') ]]
    });
  }

  enableFields() {
    this.disableEdit = false;
    for(let key of Object.keys( this.profileForm.controls )) {
      this.profileForm.get(key)?.enable();
    } 
  }

  updateContact( form: FormGroup ) {
    const { value } = form;
    const { id } = this.selectedContact;

    this.httpServ.updateContact( value, id ).subscribe(res => {
      const { id, estado, ...dataForm } = res;
      this.setFormValues( dataForm );

      this.openSnackBar('Actualizado con exito', 'Cerrar');
    })
  }

  deleteContact() {
    const { id } = this.selectedContact;
    this.httpServ.deleteContact( id ).subscribe((res: deleteContact) => {
      if( !res.contacto.estado ) {
        this.deletedContact.emit( res.contacto );
      }
    })
  }

  setFormValues( dataForm: ContactForm ) {
    const dataIterable: any = dataForm
    if( this.profileForm ) {
      for(let key of Object.keys( dataForm )) {
        this.profileForm.get(key)?.setValue( dataIterable[ key ] );
        this.profileForm.get(key)?.disable()
      }
      this.disableEdit = true;
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }

}
