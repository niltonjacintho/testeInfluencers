-- public.canais definition

-- Drop table

-- DROP TABLE public.canais;

CREATE TABLE public.canais (
	id serial4 NOT NULL,
	instagram text NULL,
	youtube text NULL,
	facebook text NULL,
	linkedin text NULL,
	outros text NULL,
	CONSTRAINT canais_pkey PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE public.canais OWNER TO postgres;
GRANT ALL ON TABLE public.canais TO postgres;


-- public.contatos definition

-- Drop table

-- DROP TABLE public.contatos;

CREATE TABLE public.contatos (
	id serial4 NOT NULL,
	telefone text NULL,
	whatsapp text NULL,
	email text NULL,
	telefone_igual_whatsapp bool NULL,
	CONSTRAINT contatos_pkey PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE public.contatos OWNER TO postgres;
GRANT ALL ON TABLE public.contatos TO postgres;


-- public.influenciador definition

-- Drop table

-- DROP TABLE public.influenciador;

CREATE TABLE public.influenciador (
	id int4 NOT NULL DEFAULT nextval('influenciadores_id_seq'::regclass),
	nome text NULL,
	fullname text NULL,
	nick text NULL,
	senha text NULL,
	contato_id int4 NULL,
	canal_id int4 NULL,
	CONSTRAINT influenciadores_pkey PRIMARY KEY (id),
	CONSTRAINT influenciadores_canal_id_fkey FOREIGN KEY (canal_id) REFERENCES public.canais(id),
	CONSTRAINT influenciadores_contato_id_fkey FOREIGN KEY (contato_id) REFERENCES public.contatos(id)
);

-- Permissions

ALTER TABLE public.influenciador OWNER TO postgres;
GRANT ALL ON TABLE public.influenciador TO postgres;


-- public.votos definition

-- Drop table

-- DROP TABLE public.votos;

CREATE TABLE public.votos (
	id serial4 NOT NULL,
	influenciador_id int2 NOT NULL,
	CONSTRAINT votos_pkey PRIMARY KEY (id),
	CONSTRAINT votos_fk FOREIGN KEY (influenciador_id) REFERENCES public.influenciador(id)
);

-- Permissions

ALTER TABLE public.votos OWNER TO postgres;
GRANT ALL ON TABLE public.votos TO postgres;