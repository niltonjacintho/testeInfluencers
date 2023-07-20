DROP TABLE if exists influenciador;
CREATE SEQUENCE influenciadores_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- Permissions

ALTER SEQUENCE influenciadores_id_seq OWNER TO postgres;
GRANT ALL ON SEQUENCE influenciadores_id_seq TO postgres;

CREATE TABLE influenciador (
	id int4 NOT NULL DEFAULT nextval('influenciadores_id_seq'::regclass),
	nome text NULL,
	fullname text NULL,
	nick text NULL,
	senha text NULL,
	telefone varchar(100) NULL,
	email varchar(100) NULL,
	instagram varchar(100) NULL,
	youtube varchar(100) NULL,
	facebook varchar(100) NULL,
	outros varchar(100) NULL,
	votos int4 NOT NULL DEFAULT 0,
	uf bpchar(2) NULL,
	CONSTRAINT influenciadores_pkey PRIMARY KEY (id)
);

CREATE OR REPLACE FUNCTION randomvote(qtd integer)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
BEGIN
	update influenciador 
	set votos = votos + 1 where influenciador.id in (select i.id from influenciador i inner join 
		(select round(100* random()) as id from generate_series(1, qtd) ) as re on i.id  = re.id); 
	return 0;
END;
$function$
;

-- Permissions

ALTER FUNCTION randomvote(int4) OWNER TO postgres;
GRANT ALL ON FUNCTION randomvote(int4) TO postgres;


