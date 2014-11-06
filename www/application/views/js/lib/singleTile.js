L.SingleTileWMSLayer = L.ImageOverlay.extend({
    defaultWmsParams: {
        service: 'WMS',
        request: 'GetMap',
        version: '1.1.1',
        layers: '',
        styles: '',
        format: 'image/jpeg',
        transparent: false
    },
    initialize: function (url, options) { // (String, Object)

        this._url = url;
        this.zIndex = options.zIndex
        if (url.indexOf("{s}") != -1){
            this.options.subdomains = options.subdomains = '1234';
        }
        var wmsParams = L.extend({}, this.defaultWmsParams);

        /*
        if (options.detectRetina && L.Browser.retina) {
            wmsParams.width = wmsParams.height = this.options.tileSize * 2;
        } else {
            wmsParams.width = wmsParams.height = this.options.tileSize;
        }
*/
        for (var i in options) {
            if (!this.options.hasOwnProperty(i)) {
                wmsParams[i] = options[i];
            }
        }

        this.wmsParams = wmsParams;

        // = imageSwap et affichée now
        this._isSwap = false;
        this._imageSwap = null;

        L.setOptions(this, options);
    },

    onAdd: function (map) {
        this._map = map;

        var projectionKey = parseFloat(this.wmsParams.version) >= 1.3 ? 'crs' : 'srs';
        this.wmsParams[projectionKey] = map.options.crs.code;
        //
        this._bounds = map.getBounds();
        // pan
        map.on('moveend', this._onViewReset, this);
        // hide on zoom
        if (map.options.zoomAnimation && L.Browser.any3d) {
            map.on('zoomanim', this._onZoomAnim, this);
        }
        // request a first image on add
        this._onViewReset();
        // override
        //L.ImageOverlay.prototype.onAdd.call(this, map);
        this.setZIndex(this.zIndex);
    },

    onRemove: function (map) {
        // super()
        L.ImageOverlay.prototype.onRemove.call(this, map);
        // add
        if (this._imageSwap){
            map.getPanes().overlayPane.removeChild(this._imageSwap);
        }
        map.off('moveend', this._onViewReset, this);
        map.off('zoomanim', this._onZoomAnim, this);
        this._imagesCreated = false;
    },

    setZIndex: function (zIndex) {
        // $(this._image).parent().css({"z-index":zIndex});
        $(this._image).next().css({"z-index":zIndex});
        $(this._image).css({"z-index":zIndex});
    },

    setOpacity: function (opacity) {
        this.options.opacity = opacity;
        $(this._imageSwap).css({"opacity":this.options.opacity});
        $(this._image).css({"opacity":this.options.opacity});
    }, 

    _onViewReset: function () {
        this._futureBounds = this._map.getBounds();
        var map = this._map;
        var crs = map.options.crs;
        var nwLatLng = this._futureBounds.getNorthWest();
        var seLatLng = this._futureBounds.getSouthEast();
        var topLeft = this._map.latLngToLayerPoint(nwLatLng);
        var bottomRight = this._map.latLngToLayerPoint(seLatLng);
        var size = bottomRight.subtract(topLeft);
        var nw = crs.project(nwLatLng),
            se = crs.project(seLatLng);
        var bbox = [nw.x, se.y, se.x, nw.y].join(',');
        var url = this._url;
        this.wmsParams.width = size.x;
        this.wmsParams.height = size.y;
        var imageSrc = url + L.Util.getParamString(this.wmsParams, url) + "&bbox=" + bbox;
        this.swapImage(imageSrc, this._futureBounds);
        $(this._imageSwap).css({"opacity":this.options.opacity})
        $(this._image).css({"opacity":this.options.opacity});
    },


    _reset: function () {
        var el = this._isSwap ? this._imageSwap : this._image;
        if (!el){
            return;
        }
        /** @type {L.LatLng} */
        var nwLatLng = this._bounds.getNorthWest();
        var seLatLng = this._bounds.getSouthEast();
        var topLeft = this._map.latLngToLayerPoint(nwLatLng);
        var bottomRight = this._map.latLngToLayerPoint(seLatLng);
        var size = bottomRight.subtract(topLeft);
        L.DomUtil.setPosition(el, topLeft);
        el.width = size.x;
        el.height = size.y;

    },



    _onZoomAnim: function(){
        if (this._imageSwap){
            // this._imageSwap.style.visibility = 'hidden';
        }
        if (this._image){
            // this._image.style.visibility = 'hidden';
        }
    },
    _onSwapImageLoad:function () {
        if (this._isSwap){
            this._imageSwap.style.visibility = 'hidden';
            this._image.style.visibility = '';
        } else {
            this._imageSwap.style.visibility = '';
            this._image.style.visibility = 'hidden';
        }
        this._isSwap = !this._isSwap;
        this._bounds = this._futureBounds;
        this._reset();

    },


    swapImage:function (src, bounds) {
        if (!this._imagesCreated){
            this._image = this._createImageSwap();
            this._imageSwap = this._createImageSwap();
            this._imagesCreated = true;
        }
        if (this._isSwap){
            this._image.src = src;
        } else {
            this._imageSwap.src = src;
        }
        // do not assign the bound here, this will be done after the next image
        this._futureBounds = bounds;
        // allows to re-position the image while waiting for the swap.
        // attention : the does not work while resizing, because of the wrong bound (size in pixel)
        this._reset();
    },
    _createImageSwap:function () {
        var el = L.DomUtil.create('img', 'leaflet-image-layer');
        L.Util.extend(el, {
            galleryimg: 'no',
            onselectstart: L.Util.falseFn,
            onmousemove: L.Util.falseFn,
            onload: L.Util.bind(this._onSwapImageLoad, this)
        });
        this._map._panes.overlayPane.appendChild(el);
        el.style.visibility = '';

        return el;
    }
});