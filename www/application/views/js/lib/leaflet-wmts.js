/*
 * Copyright (c) 2008-2013 Institut National de l'information Geographique et forestiere France, released under the
 * BSD license.
 */

/*---------------------------------------------------------
 *Nouvelle classe de Leaflet pour supporter les flux WMTS (bas�e sur L.TileLayer.WMS)
 *New Leaflet's class to support WMTS (based on L.TileLayer.WMS)
 */
L.TileLayer.WMTS = L.TileLayer.extend({

        defaultWmtsParams: {
                service: 'WMTS',
                request: 'GetTile',
                version: '1.0.0',
                layer: '',
                style: '',
                tilematrixSet: '',
                format: 'image/jpeg'
        },

        initialize: function (url, options) { // (String, Object)
                this._url = url;
                var wmtsParams = L.extend({}, this.defaultWmtsParams),
                    tileSize = options.tileSize || this.options.tileSize;
                if (options.detectRetina && L.Browser.retina) {
                        wmtsParams.width = wmtsParams.height = tileSize * 2;
                } else {
                        wmtsParams.width = wmtsParams.height = tileSize;
                }
                for (var i in options) {
                        // all keys that are not TileLayer options go to WMTS params
                        if (!this.options.hasOwnProperty(i) && i!="matrixIds") {
                                wmtsParams[i] = options[i];
                        }
                }
                this.wmtsParams = wmtsParams;
                this.matrixIds = options.matrixIds;
                L.setOptions(this, options);
        },

        onAdd: function (map) {
                L.TileLayer.prototype.onAdd.call(this, map);
        },

        getTileUrl: function (tilePoint, zoom) { // (Point, Number) -> String
                var map = this._map;
                crs = map.options.crs;
                tileSize = this.options.tileSize;
                nwPoint = tilePoint.multiplyBy(tileSize);
                //+/-1 pour �tre dans la tuile
                nwPoint.x+=1;
                nwPoint.y-=1; 
                sePoint = nwPoint.add(new L.Point(tileSize, tileSize)); 
                nw = crs.project(map.unproject(nwPoint, zoom));
                se = crs.project(map.unproject(sePoint, zoom));  
                tilewidth = se.x-nw.x;
                zoom=map.getZoom();
                ident = this.matrixIds[zoom].identifier;
                X0 = this.matrixIds[zoom].topLeftCorner.lng;
                Y0 = this.matrixIds[zoom].topLeftCorner.lat;
                tilecol=Math.floor((nw.x-X0)/tilewidth);
                tilerow=-Math.floor((nw.y-Y0)/tilewidth);
                url = L.Util.template(this._url, {s: this._getSubdomain(tilePoint)});
                return url + L.Util.getParamString(this.wmtsParams, url) + "&tilematrix=" + ident + "&tilerow=" + tilerow +"&tilecol=" + tilecol ;
        },

        setParams: function (params, noRedraw) {
                L.extend(this.wmtsParams, params);
                if (!noRedraw) {
                        this.redraw();
                }
                return this;
        }
});

L.tileLayer.wmts = function (url, options) {
        return new L.TileLayer.WMTS(url, options);
};