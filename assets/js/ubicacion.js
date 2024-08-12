var id; 
function initMap() {
    navigator.geolocation.clearWatch(id);
    if (navigator.geolocation) {
        id = navigator.geolocation.watchPosition(function (position) {
            //Se inicializa los servicios
            var directionsService = new google.maps.DirectionsService();
            var directionsRenderer = new google.maps.DirectionsRenderer();

            var start = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var combo = document.getElementById("combo").value.split(',');
            var latDestino = combo[0];
            var lngDestino = combo[1];
            var end = new google.maps.LatLng(latDestino, lngDestino);

            var mapOptions = {
                zoom: 15,
                center: start
            }

            var map = new google.maps.Map(document.getElementById('map'), mapOptions);
            directionsRenderer.setMap(map);

            //DirectionRequest que almacena la propiedades requeridas para calcular una ruta
            var request = {
                origin: start,
                destination: end,
                travelMode: 'DRIVING'
            };

            //El servicio envía el DirectionRequest al servidor y devuelve el resultado de la ruta
            directionsService.route(request, function (result, status) {

                //Comprueba que todo haya salido bien y traza la ruta
                if (status == 'OK') {
                    directionsRenderer.setDirections(result);
                }
            });

            //DistanceMatrixRequest que almacena las propiedades requeridas para calcular una distancia entre puntos
            var DistanceRequest = {
                origins: [start],
                destinations: [end],
                travelMode: 'DRIVING'
            };

            //Instancia del servicio DistanceMatrixService
            var service = new google.maps.DistanceMatrixService();

            service.getDistanceMatrix(DistanceRequest, callback);
        });
        
    }

}
function callback(response, status) {
    //Valida si se pudo calcular distancia exitosamente
    if (status !== google.maps.DistanceMatrixStatus.OK) {
        //Error en consola
        console.log('Error:', status);
    } else {
        var Origen = response.originAddresses;
        document.getElementById("Origen").value = Origen;
        //Sacamos la distancia del objeto reponse y mostramos en pantalla
        var distance = response.rows[0].elements[0].distance.text;
        var duration = response.rows[0].elements[0].duration.text;

        document.getElementById("Distancia").value = distance;
        document.getElementById("Duracion").value = duration;
    }
}
