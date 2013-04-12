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
