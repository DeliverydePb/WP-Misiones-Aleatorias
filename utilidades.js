function aleatorioEntre(min,max,decim) {
    let numero = Math.random() * (max - min) + min;
    return parseFloat(numero.toFixed(decim));
}


function consultaClima(fecha, oceano) {
	
	let apiUrl = "https://archive-api.open-meteo.com/v1/archive?latitude=" +oceano.lat+ "&longitude=" +oceano.lon+ "&start_date="+fecha.anio+"-"+fecha.mes+"-"+fecha.dia+"&end_date="+fecha.anio+"-"+fecha.mes+"-"+fecha.dia+"&hourly=weather_code,wind_speed_10m,wind_direction_10m&timezone=Europe%2FBerlin&daily=sunset,sunrise";
	
	// Realiza la solicitud a la API
    var response = UrlFetchApp.fetch(apiUrl);

    // Analiza la respuesta JSON
    var datosClimaticos = JSON.parse(response.getContentText());

    // Obtener el índice de la hora específica en el array de horas
    var indiceHora = datosClimaticos.hourly.time.indexOf(horaEspecifica);

    // Obtener la velocidad del viento para la hora específica
    var vientoVelocidad = Math.round(Math.min(15,(datosClimaticos.hourly.wind_speed_10m[indiceHora])/3.33));
	var vientoDir = datosClimaticos.hourly.wind_direction_10m[indiceHora];

    // Extraer las cadenas de texto del objeto 'daily'
    var salidaSolISO = datosClimaticos.daily.sunrise[0];
    var puestaSolISO = datosClimaticos.daily.sunset[0];

    // La hora formateada (ej: "06:45")
    var horaSalida = salidaSolISO.split("T")[1];
    var horaPuesta = puestaSolISO.split("T")[1];

    clima.vientoVelocidad = vientoVelocidad;
	clima.vientoDireccion = vientoDir;
    clima.amanecer = horaSalida;
    clima.atardecer = horaPuesta;
	
}

function
   
