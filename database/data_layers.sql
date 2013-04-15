-- Creation of data layers, from original import to layer tables
-- IMPORTANT: run as erosion_user

-- Tasa de anchura disponible de playa 2007
create table aux_tables.layer__anchura_tasa_disp_07 as
with points as (
  select
    gid_new as gid,
    st_transform(dump_geom, 4326) as geom,
    anchura_disp as value
  from
    aux_tables.anchura_tasa_disp_07
)
select
  gid,
  st_x(geom) as x,
  st_y(geom) as y,
  value
from
  points;

-- Erosión deltas 01 - 09
create table aux_tables.layer__erosion_deltas_01_09 as
with points as (
  select
    gid,
	st_transform((st_dump(geom)).geom, 4326) as geom,
  case 
  	when positivo is not null and negativo is null then positivo
	when positivo is null and negativo is not null then -negativo
  end as value
from
  import.erosion_deltas_puntos01_09
)
select
  gid,
  st_x(geom) as x,
  st_y(geom) as y,
  value
from
  points;

-- Erosión deltas 56 - 09
create table aux_tables.layer__erosion_deltas_56_09 as
with points as (
  select
    gid,
	st_transform((st_dump(geom)).geom, 4326) as geom,
  case 
  	when positivo is not null and negativo is null then positivo
	when positivo is null and negativo is not null then -negativo
  end as value
from
  import.erosion_deltas_puntos56_09
)
select
  gid,
  st_x(geom) as x,
  st_y(geom) as y,
  value
from
  points;

-- Erosión deltas 56 - 79
create table aux_tables.layer__erosion_deltas_56_79 as
with points as (
  select
    gid,
	st_transform((st_dump(geom)).geom, 4326) as geom,
  case 
  	when positivo is not null and negativo is null then positivo
	when positivo is null and negativo is not null then -negativo
  end as value
from
  import.erosion_deltas_puntos56_79
)
select
  gid,
  st_x(geom) as x,
  st_y(geom) as y,
  value
from
  points;

-- Erosión deltas 79 - 84
create table aux_tables.layer__erosion_deltas_79_84 as
with points as (
  select
    gid,
	st_transform((st_dump(geom)).geom, 4326) as geom,
  case 
  	when positivo is not null and negativo is null then positivo
	when positivo is null and negativo is not null then -negativo
  end as value
from
  import.erosion_deltas_puntos79_84
)
select
  gid,
  st_x(geom) as x,
  st_y(geom) as y,
  value
from
  points;

-- Erosión deltas 84 - 01
create table aux_tables.layer__erosion_deltas_84_01 as
with points as (
  select
    gid,
	st_transform((st_dump(geom)).geom, 4326) as geom,
  case 
  	when positivo is not null and negativo is null then positivo
	when positivo is null and negativo is not null then -negativo
  end as value
from
  import.erosion_deltas_puntos84_01
)
select
  gid,
  st_x(geom) as x,
  st_y(geom) as y,
  value
from
  points;
