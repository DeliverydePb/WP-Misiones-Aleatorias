    // --- VARIABLES GLOBALES ---
	
    let fecha={
        diaNumero:"",
        anio:"",
        mes:"",
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

    let cambioDireccion = "";
    let sonaresActivos = "";

    // --- FUNCIÓN 1: Definir y calcular los valores variables ---

    function establecerFecha() {
        fecha.diaNumero = aleatorioEntre(0,851,0);
        let tiempo = new Date(1939, 8, 1); 
        tiempo.setDate(tiempo.getDate() + fecha.diaNumero);
      // Extraemos el día, mes y año asegurando que tengan dos dígitos
        fecha.dia = String(tiempo.getDate()).padStart(2, '0');
        fecha.mes = String(tiempo.getMonth() + 1).padStart(2, '0'); // Sumamos 1 para volver al formato humano (1-12)
        fecha.anio = tiempo.getFullYear();
    }
	
	function lugar(){
		oceano.numero=aleatorioEntre(0,3,0);
		if (oceano==0) {oceano.nombre = "Mar del Norte"; oceano.lat = 56.45; oceano.lon = -3.10;}
		if (oceano==1) {oceano.nombre = "Mar Baltico"; oceano.lat = 55.71; oceano.lon = 18.60;}
		if (oceano==2) {oceano.nombre = "Mar de Noruega"; oceano.lat = 67.24; oceano.lon = -2.73;}
		if (oceano==3) {oceano.nombre = "Golfo de Vizcaya"; oceano.lat = 45.47; oceano.lon = -5.57;}
	}
	

	

    function definirVariablesMision() {
        // Generar horas aleatorias realistas (Amanecer entre 04:30 y 06:29, Atardecer entre 18:30 y 20:59)
        let horaAmanecer = Math.floor(Math.random() * 2) + 4; // 4 o 5
        let minAmanecer = String(Math.floor(Math.random() * 60)).padStart(2, '0');
        amanecer = `0${horaAmanecer}:${minAmanecer}`;

        let horaAtardecer = Math.floor(Math.random() * 3) + 18; // 18, 19 o 20
        let minAtardecer = String(Math.floor(Math.random() * 60)).padStart(2, '0');
        atardecer = `${horaAtardecer}:${minAtardecer}`;

        // Definir Si/No aleatoriamente (50% de probabilidad)
        cambioDireccion = Math.random() < 0.5 ? "Si" : "No";
        sonaresActivos = Math.random() < 0.5 ? "Si" : "No";
    }

    // Actualizar la interfaz visual de la página
    function actualizarPantalla() {
        document.getElementById("ui-cambio").innerText = cambioDireccion;
        document.getElementById("ui-sonares").innerText = sonaresActivos;
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
MissionDescription(Orden de Patrulla: ${fecha.dia} de Agosto de 1941
De: Befehlshaber der Unterseeboote
Asunto: Órdenes de Operación
Kapitänleutnant:

Su área de patrulla asignada será en el Mar Lala.
Objetivo de la Misión:
Interrupción y destrucción de convoyes aliados y buques mercantes solitarios que transiten por su área. Cada tonelada hundida contribuye directamente a la asfixia de la máquina de guerra enemiga.
Inteligencia Reciente:
Nuestra inteligencia indica un aumento en la actividad de convoyes. Se sospecha la mayor presencia de escoltas.
Tácticas y Prioridades:
Ataque a Convoyes: La prioridad máxima es la intercepción y ataque a convoyes. Reporte contactos y este alerta a la coordinacion para la formacion de manadas de lobos.
Buques Solitarios: Los buques solitarios que ofrezcan blancos fáciles deben ser atacados con el cañon de cubierta siempre que las condiciones lo permitan y no ponga en riesgo la seguridad del submarino.
Meteorología: Se espera que las condiciones meteorológicas en su área de patrulla sean variables, con periodos de mar gruesa.
Amanecer: 05:39
Atardecer: 19:54
Confío en su experiencia y determinación, Kapitänleutnant. Que la fortuna lo acompañe. La Patria espera resultados.) // Mission description. 
EncodedOrders() // Depricated. Kept for backwards compatability. 
MissionCompletedText(Felicitaciones, ha logrado hundir al menos un barco.) // Text that is shown when the mission is completed. 
MissionFailedText(Ha abandonado la mision antes de lograr el objetivo.) // Text that is shown when the mission is failed. 
NumTorpsFwd(0) // Depricated. Kept for backwards compatability. 
NumTorpsAft(0) // Depricated. Kept for backwards compatability. 
NumT1(1) // number of available type T1 torpedoes 
NumT2(2) // number of available type T2 torpedoes 
ConvoyCourse(105) // 0-359, -1 = random. 
ConvoySpeed(14) // 1-15, -1 = random. Limited by the slowest ship in the convoy. 
AOB0(-1) 
AOB1(-1) 
AOB2(-1) 
AOB3(-1) 
Year(1941) 
Month(9) 
Day(2) 
Hour(12) // 0-23, -1 = random. 
Minute(12) // 0-59, -1 = random. 
Location(0) // 0 = North sea. 1 = Baltic sea. 2 = Norwegian sea. 3 = Bay of biscay. 
Weather(2) // 0 = Clear, 1 = Overcast, 2 = Foggy 
WindSpeed(3) // 1-20 
TonnageGoal(0) // The players must sink this number of tonnes to complete the mission. Can be zero. 
TargetList(,,) // The players must sink these ships in order to complete the mission. Can be empty. 
AntiTargetList() // The mission is lost if any of these ships are sunk. 
TimeLimit(0) // The goal(s) must be completed within this time limit. Time value is in minutes. 0 = no time limit. 
MerchantList(MT9, LM33, HT23, MT34, LM20, LM37, LM16, MT26, HF10, HF41, HT14, HF37, LM35, HT5, HF14, LM6, MT8, HT30, HF43, HT15, LM32, HF27,) // This is a list of ships that will be spawned in addition to the ships specified in TargetList 
Destroyers(3) // Number of destroyers in the mission. Can be zero. 
Corvettes(0) 
Sloops(3) 
MissionEndsIfDiscovered(False) // The mission ends if any U-boat is discovered. 
ShowMissionObjectives(2) // 0 = Always show. 1 = Show when completed. 2 = Never show. 
EncodedMessageDelay(0) // Adds a delay to the encoded message shown at the start. 
ConvoySpawnDistance(7999) // The spawn distance for the convoy. 
ForceManualNavigation(False) // Forces the players to navigate manually if true. If false this is optional. 
ForceRealMorse(False) // Forces the players to use real morse. If false this is optional. 
RandomSeed(0) // random seed. 0 = random. 
OrdersList(Order[Timer|71|26/8/1941
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
    function ejecutarGeneracion() {
        establecerFecha();
        definirVariablesMision();
        actualizarPantalla();
        construirYDescargarArchivo();
    }
