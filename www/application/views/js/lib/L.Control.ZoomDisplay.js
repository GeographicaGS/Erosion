L.Control.ZoomDisplay = L.Control.extend({
    
    options: {
        position: 'topleft'
    },

    onAdd: function (map) {
        this._map = map;
        this._container = L.DomUtil.create('div', "leaflet-control-zoom-display"),
        this.updateMapZoom(map.getZoom());
        map.on('zoomend', this.onMapZoomEnd, this);
        return this._container;
    },

    onRemove: function (map) {
        map.off('zoomend', this.onMapZoomEnd, this);
    },

    onMapZoomEnd: function (e) {
        this.updateMapZoom(this._map.getZoom());
    },

    updateMapZoom: function (zoom) {
        if(typeof(zoom) === "undefined"){zoom = ""}
        this._container.innerHTML = zoom;
    }
});

L.Map.mergeOptions({
    zoomDisplayControl: true
});

L.control.zoomDisplay = function (options) {
    return new L.Control.ZoomDisplay(options);
};