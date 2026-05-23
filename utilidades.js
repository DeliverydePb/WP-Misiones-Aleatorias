function aleatorioEntre(min,max,decim) {
    let numero = Math.random() * (max - min) + min;
    return parseFloat(numero.toFixed(decim));
}


async function consultaClima(fecha, oceano) {

    // Si aún no definiste la hora de la misión, usamos las 12 del mediodía por defecto
    let horaMision = fecha.hora; 
    let horaFormateada = String(horaMision).padStart(2, '0');

    let apiUrl = "https://archive-api.open-meteo.com/v1/archive?latitude=" + oceano.lat + 
                 "&longitude=" + oceano.lon + 
                 "&start_date=" + fecha.anio + "-" + fecha.mes + "-" + fecha.dia + 
                 "&end_date=" + fecha.anio + "-" + fecha.mes + "-" + fecha.dia + 
                 "&hourly=weather_code,wind_speed_10m,wind_direction_10m&timezone=Europe%2FBerlin&daily=sunset,sunrise";
    
    try {
        // Usamos el fetch nativo del navegador
        let response = await fetch(apiUrl);
        let datosClimaticos = await response.json();

        // Fabricamos el formato de hora que usa la API: "AÑO-MES-DIAThora:00"
        let horaEspecifica = `${fecha.anio}-${fecha.mes}-${fecha.dia}T${horaFormateada}:00`;
        let indiceHora = datosClimaticos.hourly.time.indexOf(horaEspecifica);

        // Guardamos los datos DIRECTAMENTE en tu objeto global 'clima'
        clima.vientoVelocidad = Math.round(Math.min(15, (datosClimaticos.hourly.wind_speed_10m[indiceHora]) / 3.33));
        clima.vientoDireccion = datosClimaticos.hourly.wind_direction_10m[indiceHora];

        // Extraemos las horas de sol
        let salidaSolISO = datosClimaticos.daily.sunrise[0];
        let puestaSolISO = datosClimaticos.daily.sunset[0];

        clima.amanecer = salidaSolISO.split("T")[1];
        clima.atardecer = puestaSolISO.split("T")[1];

        console.log("¡Clima real cargado con éxito!", clima);

    } catch (error) {
        console.error("La API falló, usando clima de respaldo:", error);
        // Valores por si no hay internet o falla la API
        clima.vientoVelocidad = "5";
        clima.vientoDireccion = "180";
        clima.amanecer = "06:00";
        clima.atardecer = "19:30";
    }
}
	
