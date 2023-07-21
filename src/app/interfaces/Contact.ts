export interface ContactsData {
    total:          number;
    contactos:      Contact[]
}

export interface Contact {
    apellido:       string;
    correo:         string;
    estado:         boolean;
    id:             string;
    nombre:         string;
    telefono:       string;
    typeNumber:     string;
}

export interface ContactForm {
    apellido:       string;
    correo:         string;
    nombre:         string;
    telefono:       string;
    typeNumber:     string;
}

export interface deleteContact {
    msg:            string;
    contacto:       Contact;
}

export interface createContact {
    ok:             boolean;
    results:        Contact[];
}