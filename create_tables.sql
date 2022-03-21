CREATE TABLE "clients"
(
	"id"            serial  PRIMARY KEY,
	"login"         character varying(300) NOT NULL,
	"pass"          character varying(300) NOT NULL,
	"mail"          character varying(300)
) WITH ( OIDS = FALSE );



INSERT INTO clients("login", "pass", "mail") VALUES
('sergei', '123', 'sergei@mail.ru'),
('maksim', '1234', 'maksim@mail.ru'),
('gena', '12345', 'gena@mail.ru')