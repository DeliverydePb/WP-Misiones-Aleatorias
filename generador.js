    // --- VARIABLES GLOBALES ---
	
    let fecha={
        diaNumero:"",
        anio:"",
        mes:"",
		mesNombre:"",
        dia:"",
        hora:"",
        minuto:""
    }

    let oceano={
        numero:"",
        nombre:"",
        lat:"",
        lon:""
    }

	let clima={
		vientoVelocidad:"",
		vientoDireccion:"",
		niebla:"",
		amanecer:"",
		atardecer:""
	}

	let conv={
		curso:"",
        vel:"",
        mercantes:"",
        destro:"",
        corvet:"",
        sloop:"",
		dist:"",
        cambRmb:"",
        sonar:""
	}
	
	let sub={
		tI:"",
		tII:""
	}

    // Actualizar la interfaz visual de la página
    function actualizarPantalla() {
        document.getElementById("ui-cambio").innerText = conv.cambRmb;
        document.getElementById("ui-sonares").innerText = conv.sonar;
    }
        
    // --- FUNCIÓN 2: Construir el texto y disparar la descarga ---
    function construirYDescargarArchivo() {
        // Combinamos la parte estática con nuestras variables globales
        let contenidoTexto =`
		
// Mission file for the game Wolfpack. https://store.steampowered.com/app/490920/Wolfpack/ 
 
MissionTitle(Mision Aleatoria) // This is the title of the mission. 
ShortDescription(Esta mision se generó de manera aleatoria.) // Workshop description. 
Language(23) // language. 
// Language index: 0 = Arabic,  1 = Bulgarian, 2 = Chinese(Simplified), 3 = Chinese(Traditional), 4 = Czech, 5 = Danish, 6 = Dutch, 7 = English, 
// 8 = Finnish, 9 = French, 10 = German, 11 = Greek, 12 = Hungarian, 13 = Italian, 14 = Japanese, 15 = Korean, 16 = Norwegian, 17 = Polish, 18 = Portuguese, 
// 19 = Portuguese - Brazil, 20 = Romanian, 21 = Russian, 22 = Spanish - Spain, 23 = Spanish - Latin America, 24 = Swedish, 25 = Thai, 26 = Turkish, 
// 27 = Ukrainian, 28 = Vietnamese 
MissionDescription(Orden de Patrulla: ${fecha.dia} de ${fecha.mesNombre} de ${fecha.anio}
De: Befehlshaber der Unterseeboote
Asunto: Órdenes de Operación
Kapitänleutnant:

Su área de patrulla asignada será en el ${oceano.nombre}.
Objetivo de la Misión:
Interrupción y destrucción de convoyes aliados y buques mercantes solitarios que transiten por su área. Cada tonelada hundida contribuye directamente a la asfixia de la máquina de guerra enemiga.
Inteligencia Reciente:
Nuestra inteligencia indica un aumento en la actividad de convoyes. Se sospecha la mayor presencia de escoltas.
Tácticas y Prioridades:
Ataque a Convoyes: La prioridad máxima es la intercepción y ataque a convoyes. Reporte contactos y este alerta a la coordinacion para la formacion de manadas de lobos.
Buques Solitarios: Los buques solitarios que ofrezcan blancos fáciles deben ser atacados con el cañon de cubierta siempre que las condiciones lo permitan y no ponga en riesgo la seguridad del submarino.
Meteorología: Se espera que las condiciones meteorológicas en su área de patrulla sean variables, con periodos de mar gruesa.
Amanecer: ${clima.amanecer}
Atardecer: ${clima.atardecer}
Confío en su experiencia y determinación, Kapitänleutnant. Que la fortuna lo acompañe. La Patria espera resultados.) // Mission description. 
EncodedOrders() // Depricated. Kept for backwards compatability. 
MissionCompletedText(Felicitaciones, ha logrado hundir al menos un barco.) // Text that is shown when the mission is completed. 
MissionFailedText(Ha abandonado la mision antes de lograr el objetivo.) // Text that is shown when the mission is failed. 
NumTorpsFwd(0) // Depricated. Kept for backwards compatability. 
NumTorpsAft(0) // Depricated. Kept for backwards compatability. 
NumT1(${sub.TI}) // number of available type T1 torpedoes 
NumT2(${sub.TII}) // number of available type T2 torpedoes 
ConvoyCourse(${conv.curso}) // 0-359, -1 = random. 
ConvoySpeed(${conv.vel}) // 1-15, -1 = random. Limited by the slowest ship in the convoy. 
AOB0(-1) 
AOB1(-1) 
AOB2(-1) 
AOB3(-1) 
Year(${fecha.anio}) 
Month(${fecha.mes}) 
Day(${fecha.dia}) 
Hour(${fecha.hora}) // 0-23, -1 = random. 
Minute(${fecha.minuto}) // 0-59, -1 = random. 
Location(${oceano.numero}) // 0 = North sea. 1 = Baltic sea. 2 = Norwegian sea. 3 = Bay of biscay. 
Weather(2) // 0 = Clear, 1 = Overcast, 2 = Foggy 
WindSpeed(${clima.vientoVelocidad}) // 1-20 
TonnageGoal(0) // The players must sink this number of tonnes to complete the mission. Can be zero. 
TargetList(,,) // The players must sink these ships in order to complete the mission. Can be empty. 
AntiTargetList() // The mission is lost if any of these ships are sunk. 
TimeLimit(0) // The goal(s) must be completed within this time limit. Time value is in minutes. 0 = no time limit. 
MerchantList(${conv.mercantes}) // This is a list of ships that will be spawned in addition to the ships specified in TargetList 
Destroyers(${conv.destro}) // Number of destroyers in the mission. Can be zero. 
Corvettes(${conv.corvet}) 
Sloops(${conv.sloop}) 
MissionEndsIfDiscovered(False) // The mission ends if any U-boat is discovered. 
ShowMissionObjectives(2) // 0 = Always show. 1 = Show when completed. 2 = Never show. 
EncodedMessageDelay(0) // Adds a delay to the encoded message shown at the start. 
ConvoySpawnDistance(${conv.dist}) // The spawn distance for the convoy. 
ForceManualNavigation(False) // Forces the players to navigate manually if true. If false this is optional. 
ForceRealMorse(False) // Forces the players to use real morse. If false this is optional. 
RandomSeed(0) // random seed. 0 = random. 
OrdersList(Order[Timer|${aleatorioEntre(30,250,0)}|${fecha.dia}/${fecha.mes}/${fecha.anio}
De BdU para todos los submarinos del area.
Se ha detectado un convoy en zona de patrulla.
Utilice todos los medio a su alcance para evitar que lleguen a puerto.]) // This is a list of messages sent to the players from the BDU during the course of the mission.

`;
        // Crear un "Blob" (objeto de datos binarios/texto) con el contenido
        let blob = new Blob([contenidoTexto], { type: "text/plain;charset=utf-8" });
        
        // Crear un enlace temporal en memoria para forzar la descarga
        let enlace = document.createElement("a");
        enlace.href = URL.createObjectURL(blob);
        enlace.download = "LevelFile.txt";
        
        // Simular el clic y remover el enlace
        enlace.click();
        URL.revokeObjectURL(enlace.href);
    }

    // --- FUNCIÓN PRINCIPAL (Orquestadora) ---
    async function ejecutarGeneracion() {
        establecerFecha();
		establecerOceano();
		await consultaClima(fecha, oceano);
		genConv(fecha);
		submarinos();
        actualizarPantalla();
        construirYDescargarArchivo();
    }

	function ajustarVolumen(valor) {
		let video = document.getElementById("bg-video");
		let icono = document.getElementById("icono-volumen");
    
		// Cambiamos el volumen del video (va de 0.0 a 1.0)
		video.volume = valor;
    
		// Modificamos el icono según el nivel para que sea intuitivo
		if (parseFloat(valor) === 0) {
			video.muted = true;
			icono.innerText = "🔈";
		} else {
			video.muted = false; // Desmutea el video si el usuario sube el volumen
			if (valor < 0.5) {
				icono.innerText = "🔉";
			} else {
				icono.innerText = "🔊";
			}
		}
	}