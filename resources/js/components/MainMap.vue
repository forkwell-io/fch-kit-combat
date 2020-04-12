<template>
    <div class="wh-100" style="position: relative;">
        <div id="map" class="wh-100"></div>
        <div class="overlay-top-right" style="width: 20rem; z-index: 500;">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import L from 'leaflet';
    import toastr from 'toastr';

    export default {
        props: [
            'assetUrl',
            'loginUrl',
            'fetchMarkerUrl',
            'createMarkerUrl',
            'userName',
        ],
        data() {
            return {
                markerIcon: null,
                userMarkerIcon: null,
                selectionMarkerIcon: null,

                map: null,
                markersLayer: null,
                heatLayer: null,
                selectionMarker: null,
                lat: null,
                lng: null,
            }
        },
        mounted() {
            // Toastr settings
            toastr.options.positionClass = 'toast-bottom-right';


            // Marker settings
            this.markerIcon = L.icon({
                iconUrl: this.assetUrl + 'img/markers/marker-red.png',
                iconSize: [48, 48],
                iconAnchor: [23, 48],
                popupAnchor: [0, -48],
                shadowUrl: this.assetUrl + 'img/markers/marker-shadow.png',
                shadowSize: [48, 48],
                shadowAnchor: [23, 48]
            });

            this.userMarkerIcon = L.icon({
                iconUrl: this.assetUrl + 'img/markers/marker-purple.png',
                iconSize: [48, 48],
                iconAnchor: [23, 48],
                popupAnchor: [0, -48],
                shadowUrl: this.assetUrl + 'img/markers/marker-shadow.png',
                shadowSize: [48, 48],
                shadowAnchor: [23, 48]
            });
            
            this.selectionMarkerIcon = L.icon({
                iconUrl: this.assetUrl + 'img/markers/marker-blue.png',
                iconSize: [48, 48],
                iconAnchor: [23, 48],
                popupAnchor: [0, -48],
                shadowUrl: this.assetUrl + 'img/markers/marker-shadow.png',
                shadowSize: [48, 48],
                shadowAnchor: [23, 48]
            });

            // Load map
            this.map = L.map('map').setView([0, 0], 2);

            // Load tile

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                minZoom: 2,
                maxZoom: 19,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.map);
            
            // Get user location

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    this.map.setView([position.coords.latitude, position.coords.longitude], 19);
                });
            } else { 
                alert('Geolocation is not supported by this browser.');
            }

            // Events

            this.map.on('click', this.click);
            this.map.on('zoom', this.zoom);

            // Get all markers for the past 30 days
            this.fetch();
        },
        methods: {
            async fetch() {
                this.markersLayer = L.layerGroup();

                const res = await axios.get(this.fetchMarkerUrl);
                let heatData = [];

                res.data.forEach(r => {
                    L.marker([r.latitude, r.longitude], {icon: r.name==this.userName ? this.userMarkerIcon : this.markerIcon}).addTo(this.markersLayer)
                        .bindPopup(`<b>${r.name}</b><br>${r.latitude}, ${r.longitude}`);
                    
                    heatData.push([r.latitude, r.longitude, 100]);
                });

                this.markersLayer.addTo(this.map);
                this.heatLayer = L.heatLayer(heatData, {radius: 10});
            },
            click(ev) {
                this.lat = Number(ev.latlng.lat.toFixed(8));
                this.lng = Number(ev.latlng.lng.toFixed(8));

                // Popup

                var div = L.DomUtil.create('div', '');
                var p = L.DomUtil.create('p', '', div);
                p.innerHTML = `${this.lat.toFixed(8)}, ${this.lng.toFixed(8)}`;
                var container = L.DomUtil.create('div', 'd-flex flex-row justify-content-center', div);
                var btn = L.DomUtil.create('button', 'btn btn-outline-success btn-block', container);
                btn.setAttribute('type', 'button');
                btn.innerHTML = 'Pin this point';

                const popup = L.popup().setContent(div);

                // Button events

                L.DomEvent.on(btn, 'click', this.pin);

                // Marker
                
                if (this.selectionMarker == null) {
                    const options = {
                        icon: this.selectionMarkerIcon,
                        draggable: true,
                    };

                    this.selectionMarker = L.marker([this.lat, this.lng], options).addTo(this.map)
                        .bindPopup(popup)
                        .openPopup();
                    
                    this.selectionMarker.on('dragend', ev => {
                        this.lat = ev.target._latlng.lat;
                        this.lng = ev.target._latlng.lng;
                    });
                }
                else {
                    this.selectionMarker.setLatLng([this.lat, this.lng]);

                    this.selectionMarker.bindPopup(popup).openPopup();
                }

                // Map

                this.map.setView([this.lat, this.lng]);
            },
            zoom(ev) {
                if (ev.target._zoom >= 17)
                {
                    this.map.removeLayer(this.heatLayer);
                    this.markersLayer.addTo(this.map);
                }
                else
                {
                    this.map.removeLayer(this.markersLayer);
                    this.heatLayer.addTo(this.map);
                }
            },
            pin() {
                if (this.userName == '')
                {
                    window.location.href = this.loginUrl;
                    return;
                }

                axios.post(this.createMarkerUrl, {
                    latitude: this.lat,
                    longitude: this.lng,
                }).then(res => {
                    switch (res.data.status) {
                        case 'success':
                            toastr.success(`Your point is successfully pinned. You have ${res.data.credits==0?'no':res.data.credits} credit${res.data.credits==1?'':'s'} left.`, 'Success!');

                            // Set credits text
                            document.getElementById('creditsNavText').innerHTML = `Credits: <b>${res.data.credits}</b>`;

                            // Remove selection marker
                            this.map.removeLayer(this.selectionMarker);
                            this.selectionMarker = null;

                            // Add marker
                            const options = {
                                icon: this.userMarkerIcon,
                            };
                            L.marker([this.lat, this.lng], options).addTo(this.markersLayer)
                                .bindPopup(`<b>${this.userName}</b><br>${this.lat}, ${this.lng}`);
                            
                            this.heatLayer.addLatLng([this.lat, this.lng, 100]);
                            break;
                        case 'no_credits':
                            toastr.warning('You have used up all your credits for today.', 'No Credits!');
                            break;
                    }    
                });
            }
        },
    }
</script>
