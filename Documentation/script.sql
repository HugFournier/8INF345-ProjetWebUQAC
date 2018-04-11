#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------


#------------------------------------------------------------
# Table: Utilisateur
#------------------------------------------------------------

CREATE TABLE Utilisateur(
        ID          Int NOT NULL ,
        Identifiant Varchar (30) ,
        MotDePasse  Varchar (30) ,
        Mail        Varchar (50) ,
        PRIMARY KEY (ID )
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Voyage
#------------------------------------------------------------

CREATE TABLE Voyage(
        ID         Int NOT NULL ,
        Visibilite Varchar (25) ,
        PRIMARY KEY (ID )
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Etape
#------------------------------------------------------------

CREATE TABLE Etape(
        ID                  Int NOT NULL ,
        nomVille            Varchar (25) ,
        Adresse__coord_GPS_ Varchar (25) ,
        Moyen_de_transport  Varchar (25) ,
        Date_debut____      Date NOT NULL ,
        Date_fin            Date ,
        estPremiereEtape    Bool ,
        ID_Voyage           Int ,
        PRIMARY KEY (ID )
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Point d'intérêt
#------------------------------------------------------------

CREATE TABLE Point_d_interet(
        ID          Int NOT NULL ,
        Nom         Varchar (25) ,
        Adresse     Varchar (25) ,
        Description Varchar (25) ,
        ID_Etape    Int ,
        PRIMARY KEY (ID )
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: organise
#------------------------------------------------------------

CREATE TABLE organise(
        ID        Int NOT NULL ,
        ID_Voyage Int NOT NULL ,
        PRIMARY KEY (ID ,ID_Voyage )
)ENGINE=InnoDB;

ALTER TABLE Etape ADD CONSTRAINT FK_Etape_ID_Voyage FOREIGN KEY (ID_Voyage) REFERENCES Voyage(ID);
ALTER TABLE Point_d_interet ADD CONSTRAINT FK_Point_d_interet_ID_Etape FOREIGN KEY (ID_Etape) REFERENCES Etape(ID);
ALTER TABLE organise ADD CONSTRAINT FK_organise_ID FOREIGN KEY (ID) REFERENCES Utilisateur(ID);
ALTER TABLE organise ADD CONSTRAINT FK_organise_ID_Voyage FOREIGN KEY (ID_Voyage) REFERENCES Voyage(ID);
