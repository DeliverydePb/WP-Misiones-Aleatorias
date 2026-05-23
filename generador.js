    // --- VARIABLES GLOBALES ---
    let diaDelaGuera = "";
    let fechaMision = "";
    let anioMision = "";
    let mesMision = "";
    let diaMision = "";
    let horaMision = "";
    let minutoMision = "";
    let amanecer = "";
    let atardecer = "";
    let cambioDireccion = "";
    let sonaresActivos = "";

    // --- FUNCIÓN 1: Definir y calcular los valores variables ---

    function establecerFecha() {
        diaDelaGuera = aleatorioEntre(0,851,0);
        let fecha = new Date(1939, 9, 1); 
        fecha.setDate(fecha.getDate() + diaDelaGuera);
      // Extraemos el día, mes y año asegurando que tengan dos dígitos
        diaMision = String(fecha.getDate()).padStart(2, '0');
        mesMision = String(fecha.getMonth() + 1).padStart(2, '0'); // Sumamos 1 para volver al formato humano (1-12)
        anioMision = fecha.getFullYear();
        fechaMision = `${diaMision}/${mesMision}/${anioMision}`;
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
        let contenidoTexto = `Su área de patrulla asignada será en el Mar Lala.
Objetivo de la Misión:
Interrupción y destrucción de convoyes aliados y buques mercantes solitarios que transiten por su área. Cada tonelada hundida contribuye directamente a la asfixia de la máquina de guerra enemiga.
Inteligencia Reciente:
Nuestra inteligencia indica un aumento en la actividad de convoyes. Se sospecha la mayor presencia de escoltas.
Tácticas y Prioridades:
Ataque a Convoyes: La prioridad máxima es la intercepción y ataque a convoyes. Reporte contactos y este alerta a la coordinacion para la formacion de manadas de lobos.
Buques Solitarios: Los buques solitarios que ofrezcan blancos fáciles deben ser atacados con el cañon de cubierta siempre que las condiciones lo permitan y no ponga en riesgo la seguridad del submarino.
Meteorología: Se espera que las condiciones meteorológicas en su área de patrulla sean variables, con periodos de mar gruesa.
Año:${anioMision}
Mes:${mesMision}
Día:${diaMision}
Fecha:${fechaMision}
Amanecer: ${amanecer}
Atardecer: ${atardecer}
Cambio de dirección del convoy: ${cambioDireccion}
Sonares Activos: ${sonaresActivos}`;

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
