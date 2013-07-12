Schools = new Meteor.Collection("schools")
Provincias = new Meteor.Collection("provincias");
Municipios = new Meteor.Collection("municipios");
Distritos = new Meteor.Collection("distritos");
Secciones = new Meteor.Collection("secciones");

Collections['schools'] = Schools;
Collections['provincias'] = Provincias;
Collections['municipios'] = Municipios;
Collections['distritos'] = Distritos;
Collections['secciones'] = Secciones;

// for (colName in Collections) {
//   console.log(colName);
// }