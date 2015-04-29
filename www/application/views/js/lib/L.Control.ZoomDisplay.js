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
        if($(this._container).parent().hasClass("leaflet-right") || $(this._container).parent().length == 0){
            $(".scaleNumeric.right").text("1:" + this.zoom2scale(zoom));
        }
        if($(this._container).parent().hasClass("leaflet-left") || $(this._container).parent().length == 0){
            $(".scaleNumeric.left").text("1:" + this.zoom2scale(zoom));
        }
    },

    zoom2scale:function(zoom){
        if(zoom<0){
            return None
        }
        return this.numberWithDots(Math.round(559082264.028/(Math.pow(2,zoom))));
    },

    numberWithDots:function(number){
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
});

L.Map.mergeOptions({
    zoomDisplayControl: true
});

L.control.zoomDisplay = function (options) {
    return new L.Control.ZoomDisplay(options);
};