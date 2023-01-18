create DATABASE TiendaDino;

create table Tienda(
    id serial primary key not null,
    name varchar(100) not null,
    status varchar(50) not null,
    dateRegister datetime not null

);

create table Juguetes(
    id serial primary key not null,
    name varchar(100) not null,
    image varchar(50) not null,
    description varchar (300),
    precio int not null,
    descuento int null,
    stock int not null,
    telefono int null,
    whtssap int null,
    status varchar(10) not null,
    dateRegister datetime not null,
    idTienda int not null,
    CONSTRAINT fk_Tienda 
       FOREIGN KEY( idTienda) 
       REFERENCES Tienda(id)  

);
create table JuguetesDetalle(
    id serial primary key not null, 
    idJuguetes int not null,
    alto int,
    ancho int,
    profundidad varchar(20),
    color varchar(20),
    material varchar(20),
    peso int,
    sonidos int,
    edad_minima_recomendada int not null,
    CONSTRAINT fk_Juguetes
       FOREIGN KEY( idJuguetes) 
       REFERENCES Juguetes(id)
    
);
