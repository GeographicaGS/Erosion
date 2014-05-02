CREATE TABLE public.user
(
  id_user serial NOT NULL,
  name character varying(128),
  surname character varying(255),
  password character varying(64),
  email character varying(255),
  admin boolean,
  username character varying(255),
  CONSTRAINT user_pkey PRIMARY KEY (id_user),
  CONSTRAINT user_unique_email UNIQUE (email)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.user
  OWNER TO erosion_admin;
  
  CREATE TABLE public.category
(
  id_category serial NOT NULL,
  title character varying(128),
  CONSTRAINT category_pkey PRIMARY KEY (id_category)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.category
  OWNER TO erosion_admin;
  
  
  
CREATE TABLE public.draw
(
  id_draw serial NOT NULL,
  titulo character varying(255),
  comentario text,
  id_category integer,
  fecha timestamp without time zone NOT NULL,
  id_user integer,
  tipo character varying(128),
  geom geometry,
  CONSTRAINT draw_pkey PRIMARY KEY (id_draw),
  CONSTRAINT draw_id_category_fkey FOREIGN KEY (id_category)
      REFERENCES public.category (id_category) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT draw_id_user_fkey FOREIGN KEY (id_user)
      REFERENCES public.user (id_user) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.draw
  OWNER TO erosion_admin;

  
 CREATE TABLE public.draw_coment
(
  id_coment serial NOT NULL,
  id_draw integer,
  comentario text,
  fecha timestamp without time zone NOT NULL,
  id_user integer,
  CONSTRAINT draw_coment_pkey PRIMARY KEY (id_coment),
  CONSTRAINT draw_coment_id_draw_fkey FOREIGN KEY (id_draw)
      REFERENCES draw (id_draw) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT draw_coment_id_user_fkey FOREIGN KEY (id_user)
      REFERENCES "user" (id_user) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.draw_coment
  OWNER TO erosion_admin;
  
  
CREATE TABLE public.notification
(
  id_notification serial NOT NULL,
  titulo text,
  texto text,
  id_user integer,
  id_draw integer,
  fecha timestamp without time zone NOT NULL,
  tipo integer,
  CONSTRAINT notification_pkey PRIMARY KEY (id_notification),
  CONSTRAINT notification_id_draw_fkey FOREIGN KEY (id_draw)
      REFERENCES draw (id_draw) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT notification_id_user_fkey FOREIGN KEY (id_user)
      REFERENCES "user" (id_user) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.notification
  OWNER TO erosion_admin;

  
CREATE TABLE public.project
(
  titulo text,
  descripcion text,
  capas text,
  id_user integer,
  CONSTRAINT plan_pkey PRIMARY KEY (titulo),
  CONSTRAINT plan_id_user_fkey FOREIGN KEY (id_user)
      REFERENCES "user" (id_user) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.project
  OWNER TO erosion_admin;
  
alter table public.project add column is_public boolean;
alter table public.user add column is_admin boolean default false;
UPDATE public.user SET is_admin = true WHERE email = 'zujar@us.es';