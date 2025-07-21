{

function myFills(n) {
    if (n === 1) {
      return [ createProperty("duration", '4n'),  createProperty("duration", '4n'),  createProperty("duration", '4n'),  createProperty("duration", '4n')];  // 𝅘𝅥  𝅘𝅥 𝅘𝅥 𝅘𝅥 
    }
  }

function getInstrumentVelocity(instrumentName, noteIndex, beatPosition, parte, note = null) {
      const baseVelocities = {
        'jam': 0.6, 
        'jamblock': 0.6, 
        'guiro': 0.7,
        'bombo': 0.8,
        'congas': 0.75,
        'contratiempo': 0.6,
        'contratiempos': 0.6,
        'contras': 0.6,       
        'bajo': 0.8,
        'teclado': 0.7
      };
      
      let baseVel = baseVelocities[instrumentName] || 0.7;
      
      // Instrument-specific velocity patterns
      switch(instrumentName) {
        case 'jam':
        case 'jamblock':
        return getJamblockVelocity(beatPosition, parte);
        case 'guiro':
          return getGuiroVelocity(beatPosition, parte);
        case 'bombo':
          return getBomboVelocity(beatPosition);
        case 'congas':
          return getCongasVelocity(note);
        case 'contratiempo':
        case 'contratiempos':
        case 'contras':
          return getContratiempoVelocity(beatPosition, parte);
        case 'bajo':
          return getBajoVelocity(beatPosition, noteIndex);
        case 'teclado':
          return getTecladoVelocity(beatPosition, parte);
        default:
          return humanizeVelocity(baseVel);
      }
    }
    
function getJamblockVelocity (beatPosition, parte) {
 const fineCumbiaPattern = {
        // Beat 1 with 32nd note subdivisions
          // Beat 1
        0: 0.7,       // Strong downbeat scrape (HIGH)
        0.125: 0.1,   // 32nd note ghost (LOW)
        0.25: 0.3,    // 16th note light scrape (LOW-MED)
        0.375: 0.15,  // 32nd note ghost (LOW)
        0.5: 0.4,     // 8th note upbeat (MEDIUM)
        0.625: 0.2,   // 32nd note ghost (LOW)
        0.75: 0.3,    // 16th note (LOW-MED)
        0.875: 0.25,  // 32nd note (LOW)
        
        // Beat 2
        1: 0.6,     // Quarter note
        1.125: 0.15, // 32nd note
        1.25: 0.2,  // 16th note
        1.375: 0.1, // 32nd note
        1.5: 0.3,   // 8th note
        1.625: 0.2, // 32nd note
        1.75: 0.4,  // 16th note
        1.875: 0.3, // 32nd note
        
        // Beat 3
        2: 0.7,     // Accent
        2.125: 0.2, // 32nd note
        2.25: 0.3,  // 16th note
        2.375: 0.25, // 32nd note
        2.5: 0.5,   // 8th note
        2.625: 0.3, // 32nd note
        2.75: 0.4,  // 16th note
        2.875: 0.35, // 32nd note
        
        // Beat 4
        3: 0.4,     // Quarter note
        3.125: 0.1, // 32nd note ghost
        3.25: 0.2,  // 16th note
        3.375: 0.15, // 32nd note
        3.5: 0.8,   // Syncopated accent
        3.625: 0.4, // 32nd note
        3.75: 0.6,  // 16th note
        3.875: 0.5  // 32nd note buildup
    };
      
    const roundedBeat = Math.round(beatPosition * 8) / 8;  // Changed from *2 to *8 for 32nd notes
    const patternVel = fineCumbiaPattern[roundedBeat] ?? 0.6;  // Changed from cumbiaPattern to fineCumbiaPattern
    return humanizeVelocity(patternVel);
}


function getGuiroVelocity(beatPosition, parte) {
    // Enhanced cumbia güiro pattern with 32nd note subdivisions
    const fineCumbiaPattern = {
        // Beat 1 with 32nd note subdivisions
          // Beat 1
        0: 0.7,       // Strong downbeat scrape (HIGH)
        0.125: 0.1,   // 32nd note ghost (LOW)
        0.25: 0.3,    // 16th note light scrape (LOW-MED)
        0.375: 0.15,  // 32nd note ghost (LOW)
        0.5: 0.4,     // 8th note upbeat (MEDIUM)
        0.625: 0.2,   // 32nd note ghost (LOW)
        0.75: 0.3,    // 16th note (LOW-MED)
        0.875: 0.25,  // 32nd note (LOW)
        
        // Beat 2
        1: 0.6,     // Quarter note
        1.125: 0.15, // 32nd note
        1.25: 0.2,  // 16th note
        1.375: 0.1, // 32nd note
        1.5: 0.3,   // 8th note
        1.625: 0.2, // 32nd note
        1.75: 0.4,  // 16th note
        1.875: 0.3, // 32nd note
        
        // Beat 3
        2: 0.7,     // Accent
        2.125: 0.2, // 32nd note
        2.25: 0.3,  // 16th note
        2.375: 0.25, // 32nd note
        2.5: 0.5,   // 8th note
        2.625: 0.3, // 32nd note
        2.75: 0.4,  // 16th note
        2.875: 0.35, // 32nd note
        
        // Beat 4
        3: 0.4,     // Quarter note
        3.125: 0.1, // 32nd note ghost
        3.25: 0.2,  // 16th note
        3.375: 0.15, // 32nd note
        3.5: 0.8,   // Syncopated accent
        3.625: 0.4, // 32nd note
        3.75: 0.6,  // 16th note
        3.875: 0.5  // 32nd note buildup
    };
      
    const roundedBeat = Math.round(beatPosition * 8) / 8;  // Changed from *2 to *8 for 32nd notes
    const patternVel = fineCumbiaPattern[roundedBeat] ?? 0.6;  // Changed from cumbiaPattern to fineCumbiaPattern
    return humanizeVelocity(patternVel);
}
    
   function getBomboVelocity(beatPosition) {
    // Enhanced bombo pattern with 32nd note subdivisions
    const bomboPattern = {
        // Beat 1
        0: 0.9,      // Strong downbeat
        0.125: 0.1,  // Ghost kick (32nd)
        0.25: 0.2,   // Light ghost (16th)
        0.375: 0.15, // Micro ghost (32nd)
        0.5: 0.3,    // Light fill (8th)
        0.625: 0.1,  // Ghost (32nd)
        0.75: 0.25,  // Fill (16th)
        0.875: 0.2,  // Setup ghost (32nd)
        
        // Beat 2
        1: 0.6,      // Medium kick
        1.125: 0.15, // Ghost (32nd)
        1.25: 0.2,   // Light (16th)
        1.375: 0.1,  // Ghost (32nd)
        1.5: 0.4,    // Medium fill (8th)
        1.625: 0.2,  // Ghost (32nd)
        1.75: 0.3,   // Fill (16th)
        1.875: 0.25, // Build (32nd)
        
        // Beat 3
        2: 0.8,      // Strong backbeat
        2.125: 0.2,  // Ghost (32nd)
        2.25: 0.3,   // Fill (16th)
        2.375: 0.15, // Ghost (32nd)
        2.5: 0.4,    // Medium (8th)
        2.625: 0.25, // Ghost (32nd)
        2.75: 0.35,  // Fill (16th)
        2.875: 0.3,  // Setup (32nd)
        
        // Beat 4
        3: 0.5,      // Light kick
        3.125: 0.1,  // Ghost (32nd)
        3.25: 0.2,   // Light fill (16th)
        3.375: 0.15, // Ghost (32nd)
        3.5: 0.3,    // Light (8th)
        3.625: 0.2,  // Ghost (32nd)
        3.75: 0.4,   // Build fill (16th)
        3.875: 0.35  // Leading to next bar (32nd)
    };
    
    const roundedBeat = Math.round(beatPosition * 8) / 8;  // 32nd note precision
    const patternVel = bomboPattern[roundedBeat] ?? 0.7;
    return humanizeVelocity(patternVel);
}
    
 /*   function getCongasVelocity(beatPosition, parte) {
      // Different velocities for different conga sounds
      const congaVelocities = {
    'C4': 0.8,  // 'a' - abierto (open) - Correct, this is loud
    'D4': 0.7,  // 's' - slap - Could even be 0.8, slaps are sharp and loud
    'E4': 0.6,  // 'm' - muteado (muted) - Much quieter!
    'F4': 0.2,  // 't' - talon (heel) - Subtle, low sound
    'G4': 0.1   // 'p' - punta (toe/finger) - Very quiet touch
};
      
      // Add rhythmic emphasis
      const rhythmicBoost = beatPosition % 1 === 0 ? 1.1 : 0.9;
      return humanizeVelocity(0.7 * rhythmicBoost);
    }
   */
 
   function getCongasVelocity(note) {
    // Different velocities for different conga sounds
    const congaVelocities = {
        'C4': 0.8,  // 'a' - abierto (open) - Correct, this is loud
        'D4': 0.7,  // 's' - slap - Could even be 0.8, slaps are sharp and loud
        'E4': 0.6,  // 'm' - muteado (muted) - Much quieter!
        'F4': 0.2,  // 't' - talon (heel) - Subtle, low sound
        'G4': 0.1   // 'p' - punta (toe/finger) - Very quiet touch
    };
    
    const baseVelocity = congaVelocities[note] || 0.5;
    
    // Add randomization (±10% variation)
    const randomFactor = 0.9 + (Math.random() * 0.2); // Range: 0.9 to 1.1
    
    return humanizeVelocity(baseVelocity * randomFactor);
} 
   /* function getContratiempoVelocity(beatPosition) {
      // Emphasize off-beats
      const isOffbeat = (beatPosition + 0.5) % 1 === 0;
      const baseVel = isOffbeat ? 0.8 : 0.4;
      return humanizeVelocity(baseVel);
    }
    */

    function getContratiempoVelocity(beatPosition, parte) {
    // Enhanced cumbia güiro pattern with 32nd note subdivisions
    const fineCumbiaPattern = {
        // Beat 1 with 32nd note subdivisions
          // Beat 1
        0: 0.7,       // Strong downbeat scrape (HIGH)
        0.125: 0.1,   // 32nd note ghost (LOW)
        0.25: 0.3,    // 16th note light scrape (LOW-MED)
        0.375: 0.15,  // 32nd note ghost (LOW)
        0.5: 0.4,     // 8th note upbeat (MEDIUM)
        0.625: 0.2,   // 32nd note ghost (LOW)
        0.75: 0.3,    // 16th note (LOW-MED)
        0.875: 0.25,  // 32nd note (LOW)
        
        // Beat 2
        1: 0.6,     // Quarter note
        1.125: 0.15, // 32nd note
        1.25: 0.2,  // 16th note
        1.375: 0.1, // 32nd note
        1.5: 0.3,   // 8th note
        1.625: 0.2, // 32nd note
        1.75: 0.4,  // 16th note
        1.875: 0.3, // 32nd note
        
        // Beat 3
        2: 0.7,     // Accent
        2.125: 0.2, // 32nd note
        2.25: 0.3,  // 16th note
        2.375: 0.25, // 32nd note
        2.5: 0.5,   // 8th note
        2.625: 0.3, // 32nd note
        2.75: 0.4,  // 16th note
        2.875: 0.35, // 32nd note
        
        // Beat 4
        3: 0.4,     // Quarter note
        3.125: 0.1, // 32nd note ghost
        3.25: 0.2,  // 16th note
        3.375: 0.15, // 32nd note
        3.5: 0.8,   // Syncopated accent
        3.625: 0.4, // 32nd note
        3.75: 0.6,  // 16th note
        3.875: 0.5  // 32nd note buildup
    };
      
    const roundedBeat = Math.round(beatPosition * 8) / 8;  // Changed from *2 to *8 for 32nd notes
    const patternVel = fineCumbiaPattern[roundedBeat] ?? 0.6;  // Changed from cumbiaPattern to fineCumbiaPattern
    return humanizeVelocity(patternVel);
}

function getBajoVelocity(beatPosition, noteIndex) {
    // Enhanced tumbao pattern with 32nd note subdivisions
    const tumbaPattern = {
        // Beat 1
        0: 0.9,      // Strong root note
        0.125: 0.2,  // Ghost note (32nd)
        0.25: 0.3,   // Light fill (16th)
        0.375: 0.15, // Micro ghost (32nd)
        0.5: 0.5,    // Light upbeat (8th)
        0.625: 0.25, // Ghost (32nd)
        0.75: 0.4,   // Fill note (16th)
        0.875: 0.2,  // Leading ghost (32nd)
        
        // Beat 2
        1: 0.6,      // Medium accent
        1.125: 0.15, // Ghost (32nd)
        1.25: 0.3,   // Light (16th)
        1.375: 0.2,  // Ghost (32nd)
        1.5: 0.4,    // Light (8th)
        1.625: 0.3,  // Fill (32nd)
        1.75: 0.35,  // Medium (16th)
        1.875: 0.25, // Setup (32nd)
        
        // Beat 3
        2: 0.7,      // Accent
        2.125: 0.3,  // Ghost (32nd)
        2.25: 0.4,   // Fill (16th)
        2.375: 0.2,  // Ghost (32nd)
        2.5: 0.8,    // Syncopation!
        2.625: 0.4,  // Follow-through (32nd)
        2.75: 0.5,   // Medium (16th)
        2.875: 0.35, // Build (32nd)
        
        // Beat 4
        3: 0.5,      // Light
        3.125: 0.2,  // Ghost (32nd)
        3.25: 0.4,   // Fill (16th)
        3.375: 0.25, // Ghost (32nd)
        3.5: 0.6,    // Leading to next measure (8th)
        3.625: 0.3,  // Setup (32nd)
        3.75: 0.4,   // Build (16th)
        3.875: 0.45  // Final push (32nd)
    };
    
    const roundedBeat = Math.round(beatPosition * 8) / 8;  // 32nd note precision
    const patternVel = tumbaPattern[roundedBeat] ?? 0.7;
    return humanizeVelocity(patternVel);
}
    
   function getTecladoVelocity(beatPosition, parte) {
    if (parte === 'acompañamiento') {
        // Enhanced chord comping pattern with 32nd note subdivisions
        const compingPattern = {
            // Beat 1
            0: 0.6,      // Light downbeat chord
            0.125: 0.2,  // Ghost chord (32nd)
            0.25: 0.3,   // Light stab (16th)
            0.375: 0.15, // Micro ghost (32nd)
            0.5: 0.8,    // Strong upbeat chord
            0.625: 0.4,  // Follow chord (32nd)
            0.75: 0.3,   // Light (16th)
            0.875: 0.25, // Setup (32nd)
            
            // Beat 2
            1: 0.5,      // Light chord
            1.125: 0.2,  // Ghost (32nd)
            1.25: 0.35,  // Medium stab (16th)
            1.375: 0.15, // Ghost (32nd)
            1.5: 0.7,    // Medium upbeat
            1.625: 0.3,  // Light follow (32nd)
            1.75: 0.4,   // Stab (16th)
            1.875: 0.3,  // Build (32nd)
            
            // Beat 3
            2: 0.6,      // Light chord
            2.125: 0.25, // Ghost (32nd)
            2.25: 0.4,   // Medium stab (16th)
            2.375: 0.2,  // Ghost (32nd)
            2.5: 0.9,    // Strong syncopation!
            2.625: 0.5,  // Strong follow (32nd)
            2.75: 0.4,   // Medium (16th)
            2.875: 0.35, // Setup (32nd)
            
            // Beat 4
            3: 0.4,      // Very light chord
            3.125: 0.15, // Ghost (32nd)
            3.25: 0.3,   // Light stab (16th)
            3.375: 0.2,  // Ghost (32nd)
            3.5: 0.7,    // Setup for next measure
            3.625: 0.4,  // Build chord (32nd)
            3.75: 0.5,   // Medium (16th)
            3.875: 0.45  // Final setup (32nd)
        };
        
        const roundedBeat = Math.round(beatPosition * 8) / 8;  // 32nd note precision
        const patternVel = compingPattern[roundedBeat] ?? 0.6;
        return humanizeVelocity(patternVel);
    }
    
    return humanizeVelocity(0.7);
}
    
    function humanizeVelocity(baseVelocity = 0.7) {
      // Add slight randomness for human feel
      const variation = (Math.random() - 0.5) * 0.15;
      return Math.max(0.1, Math.min(1, baseVelocity + variation));
    }
    
    function getBeatPosition(timeString) {
      const [bar, beat, subBeat] = timeString.split(':').map(Number);
      return beat + (subBeat / 4); // Convert to decimal beat position
    }
    
    
    
    function createProperty(key, value) {
      return { [key]: value }; // Return as before for non-object values
    }
    
    function createNestedProperty(parentKey, childProps){ 
      const nestedObj = {}; nestedObj[parentKey] = childProps; return nestedObj; }
    
    const datosDelPrograma = {
      estadoGlobal: {
        armonia: [['Cmaj']],
        tempo: 120, 
        compas: 4, 
        volumen: {
          teclado: 1,
          bajo: 1,
          guiro: 1,
          contras: 1,
          contratiempo: 1,
          contratiempos: 1,
          jam: 1,
          jamblock: 1,
          bombo: 1,
          congas: 1
        },
        paneo: {
          teclado: 0.5,
          bajo: 0.5, 
          guiro: 0.5, 
          contras: 0.5, 
          contratiempo: 0.5, 
          contratiempos: 0.5,
          jam: 0.5,
          jamblock: 0.5, 
          bombo: 0.5, 
          congas: 0.5
        },    
      },
        adornarPunteoConfigs: false,
        pistas: []
  }
    
    //se debe llamar nota para cuadrar con las notas de Tonejs
    const defaultElementoDeParte = {
      time: '0:0:0', 
      note: 'C4',  // nota o grado
      duration: '1n', 
      octavaRelativa: 0, 
      velocity: 0.7  // Add default velocity
    
      }
      
    const defaultMusicalObject = {
      name: '',
      id: 'default', // Add id field
      volumen: 1, // Default volume
      paneo: 0.5, // Default panning
      sonido: 0,
      octavaAbsoluta: 5,
      notas: ['C4'], // Default note
      parte: {
        type: null,
        parteList:[]
        }
    }; 

    
  const punteoDefaults = {
    densidadPasos: 0.7,
    usarEscalaJazz: true,
    tipoOrnamento: 'chromatic',
    mantenerNotasObjetivo: true,
    duracionPasos: '8n',
    subdivisionMinima: '4n',
    espaciadoPasos: 1
  };
      
    
    function completeMusicalObject(inputObject) {
      // Merge inputObject with defaultMusicalObject
      const completedObject = { ...defaultMusicalObject, ...inputObject };
      
      // Use global volumen and paneo if not set in inputObject
      // if (!inputObject.hasOwnProperty('volumen')) {
      //   completedObject.volumen = datosDelPrograma.estadoGlobal.volumen;
      // }
     
     if (!inputObject.hasOwnProperty('paneo')) {
          const instrumento = completedObject.name;
          const paneoGlobal = datosDelPrograma.estadoGlobal.paneo;
          completedObject.paneo = paneoGlobal?.[instrumento] ?? 0.5;
        }

    if (!inputObject.hasOwnProperty('volumen')) {
        const instrumento = completedObject.name;
        const volumenGlobal = datosDelPrograma.estadoGlobal.volumen;
        completedObject.volumen = volumenGlobal?.[instrumento] ?? 1;
          } else {
        // Normalize the volume based on global state
        const instrumento = completedObject.name;
        const volumenGlobal = datosDelPrograma.estadoGlobal.volumen;
        completedObject.volumen = completedObject.volumen * volumenGlobal?.[instrumento]
          }
            
        // Ensure `parte` exists with a default empty `type`
      if (!inputObject.hasOwnProperty('parte')) {
        completedObject.parte.type = null,
        completedObject.parte.parteList = [];
      }

      // Add punteo-specific defaults if the type is 'punteo'
  /*if (completedObject.parte && completedObject.parte.type === 'punteo') {
    completedObject = { ...completedObject, ...punteoDefaults };
  }
    */  
       // Execute the octava method
      function octavaAbsolutaf(instrumento){
        if (instrumento === "bajo") {
          return 4;
        } else {
          return 5;
        }
      };
      
      if (!inputObject.hasOwnProperty('octavaAbsoluta')) {
        completedObject.octavaAbsoluta = octavaAbsolutaf(completedObject.name);
        }
        
     
      return completedObject;
    }
    
    function crearAcorde(xs){
      return xs.join(" ").trim()
      };
      
    // Enhanced completeParteObject with dynamic velocity
    function completeParteObject(inputObject) {
      const completedObject = { ...defaultElementoDeParte, ...inputObject };
      
      // Add dynamic velocity based on context
      if (!inputObject.hasOwnProperty('velocity')) {
        // We'll need to get this context from the parsing process
        // For now, set a default that will be updated during processing
        completedObject.velocity = 0.7;
      }
      
      return completedObject;
    }
    
      
    
    // :: [Object] -> [Object]
    function beatCounter(bar) {
      bar.forEach((item, index) => {
        const beat = index % 4; // Ensures the beat is within the 0-3 range (for 4/4 time)
        const barNum = Math.floor(index / 4); // Increments the bar number after every 4 beats
        item.time = `${barNum}:${beat}:0`; // Update the time property
      });
      return bar; // Optional: return the modified array
    }
      //:: [Object] -> Int -> [Object]
      //[{ time: '1n', note: 'C4', duration: '1n', size: 1}, ...]
      
    function numeroDeCompas(compas, numeroDeCompas){
        compas.forEach((elemento) => {
         let [bar, beat, subBeat] = elemento.time.split(':').map(Number);
          elemento.time = `${numeroDeCompas}:${beat}:${subBeat}`;
      });
    }
    
    //:: [Object] -> [Object]
    // Convert note duration to time (assuming 4n = 1, 8n = 0.5, etc.)
    const duracionNotaADuracionEnTiempo = (duracion) => {
        const duracionMap = {
            '1n': 4,
            '2n': 2,
            '4n': 1,
            '8n': 0.5,
            '16n': 0.25
        };
        return duracionMap[duracion] || 1; // Default to quarter note duration
    };
    
    
    function agregarTiempo(timeProperty, duracion) {
        let [bar, beat, subBeat] = timeProperty.split(':').map(Number);
        
        // Add the duration to the beat
        beat += duracion;
    
        // Extract the decimal part from the beat and add it to subBeat
        let beatInteger = Math.floor(beat);  // Get the integer part of the beat
        let beatFraction = beat - beatInteger;  // Get the fractional part of the beat
    
        // Convert the fractional part into subBeat units (assuming 1 beat = 4 subBeats)
        subBeat += beatFraction * 4;
    
        // Handle overflow of subBeat into beats
        if (subBeat >= 4) { // Assuming sub-beat division of 4 (quarter notes)
            beatInteger += Math.floor(subBeat / 4);
            subBeat %= 4;
        }
    
        return `${bar}:${beatInteger}:${Math.round(subBeat)}`;
    }
    
    
    
    // Function to assign time positions to notes, adjusting only beat and sub-beat
    function asignarPosTiempoDeNotasPorCompas(compas) {
        compas.forEach((elemento, index) => {
            if (index === 0) {
                elemento.time = elemento.time; // First note keeps its original time
            } else {
                let duracionNotaAnterior = duracionNotaADuracionEnTiempo(compas[index - 1].duration);
                elemento.time = agregarTiempo(compas[index - 1].time, duracionNotaAnterior);
            }
        });
    
        return compas;
    }
    
    // MODIFIED: Remove global variable dependencies
function procesarCompasConVelocidades(compas, instrumentName, parteType) {
  return compas.map((elemento, index) => {
    const beatPosition = getBeatPosition(elemento.time);
    const dynamicVelocity = getInstrumentVelocity(
      instrumentName,
      index,
      beatPosition,
      parteType, 
      elemento.note
      );
    
    return {
      ...elemento,
      velocity: dynamicVelocity
    };
  });
}
    
   // MODIFIED: Simplified function - no global variables
function asignarNumeroDeCompas(listaDeCompases) {
  listaDeCompases.forEach((compas, index) => {
    numeroDeCompas(compas, index);
  });
  return listaDeCompases;
}
    // NEW: Function to process velocities for an entire parte
function procesarVelocidadesEnParte(parteObject, instrumentName) {
  if (parteObject && parteObject.parteList) {
    const processedParteList = parteObject.parteList.map(compas => 
      procesarCompasConVelocidades(compas, instrumentName, parteObject.type)
    );
    return {
      ...parteObject,
      parteList: processedParteList
    };
  }
  return parteObject;
}
      
    } 
    
    
    
    
    //start = _ (pista / estadoGlobal)* {return datosDelPrograma }
    start = (_ LineComment / _ MultiLineComment / _ pista / _ estadoGlobal)* _ EndOfInput {return datosDelPrograma }
    estadoGlobal
      = _ k:("armonia" / "acordes") _ v:listaDeAcordesGlobalesOlistaDeAcordeGlobal _  {
              if (v.length == 0) {
               return error(k + ' requiere uno o más compases con acordes')
              } else return datosDelPrograma.estadoGlobal.armonia = v
            }
      / _ k:("tempo" / "t") _ v:entero _  {return datosDelPrograma.estadoGlobal.tempo = v}
      / _ k:("compas" / "c") _ v:string _  {return datosDelPrograma.estadoGlobal.compas = v}
      / volumenes
      / paneos

      // volumenes globales
        volumenes = volumenGlobalSimple
                  / volumenGlobalMultiple
                  / volumenGlobalPresets

        volumenGlobalPresets
          = _ ("volumen"/ "v") _ "preset" _ n:number _ {
            if (n === 1) {         
              // // Preset 1: Balanced Groove (already given)
            return datosDelPrograma.estadoGlobal.volumen = {
              teclado: 0.85,         // softer, supportive harmony
              bajo: 0.85,            // driving force, but not overpowering
              guiro: 0.75,           // bright but percussive — slightly in the background
              contras: 0.8,         // rhythmic core, mid-layer
              contratiempo: 0.8,    
              contratiempos: 0.8,   
              jam: 0.75,             // bright/tight sound — lower to avoid harshness
              jamblock: 0.75,
              bombo: 0.75,           // bass drum, keep full power!
              congas: 0.75           // central to the groove — just under the bombo
            }
            } else if (n === 2){
            // Percussion Forward: Emphasizes the groove and rhythm section, great for breakdowns or dance segments.
              return datosDelPrograma.estadoGlobal.volumen = {
                teclado: 0.90,         // very subtle harmony
                bajo: 0.85,            // still present to support rhythm
                guiro: 1.0,           // driving pulse, front and center
                contras: 1.0,         // bright and energetic
                contratiempo: 1.0,    
                contratiempos: 1.0,   
                jam: 0.9,             
                jamblock: 0.9,        // strong and snappy
                bombo: 0.9,           // essential thump
                congas: 1.0           // percussive engine
              };              
              } else if (n === 3) {
                  // "Melodic Focus" - Brings harmony and melodic elements to the front. Ideal for solo sections or intros.
                  return datosDelPrograma.estadoGlobal.volumen = {
                    teclado: 0.95,         // featured!
                    bajo: 0.9,            // tight with harmony
                    guiro: 0.75,           // light background texture
                    contras: 0.75,         // dialed down a bit
                    contratiempo: 0.75,    
                    contratiempos: 0.75,
                    jam: 0.75, 
                    jamblock: 0.75,        // reduce clicky percs
                    bombo: 0.75,           // soft thump to not overpower melody
                    congas: 0.75
                  };                  
              } else if (n === 4) {
                //"Low-End Power" - Thick, punchy mix with heavy emphasis on the bajo and bombo — for a club or dubby remix feel.
                return datosDelPrograma.estadoGlobal.volumen = {
                  teclado: 0.85,
                  bajo: 1.0,            // big fat bass
                  guiro: 0.75,
                  contras: 0.75,
                  contratiempo: 0.75,
                  contratiempos: 0.75,
                  jam: 0.7,
                  jamblock: 0.7,
                  bombo: 0.9,           // boom!
                  congas: 0.85
                };                
                } else {
                  return error("Numero de preset es muy grande. Solo hay 4 presets")
                }  
          }

     volumenGlobalSimple =
         _ k:("volumen" / "v") _ v:decimal _  {
            if (v >= 0 && v <= 1) {
               const volumen = datosDelPrograma.estadoGlobal.volumen;
               Object.keys(volumen).forEach(instrument => {
                 volumen[instrument] = v
                 });
               return null
              } else {
                error("volumen requiere un número entre 0 y 1");
              }
          }

 
      volumenGlobalMultiple
      = _ k:("volumen" / "v") _ "{" _ v:(volumenGlobalInstrumentoIndividual|.., _ "," _|) _ "}"  {return v} 


      volumenGlobalInstrumentoIndividual
      = _ i:instrumentIdentifierSinRetorno _ v:decimal _ {
        if (v >= 0 && v <= 1) {
        const volumen = datosDelPrograma.estadoGlobal.volumen;
        volumen[i] = v     
      } else {
      error("volumen requiere un número entre 0 y 1");  
      }
      }

      // paneos globales

      paneos = paneoGlobalSimple
            / paneoGlobalMultiple
            / paneoGlobalPresets

      
    
     paneoGlobalPresets
       = _ "paneo" _ "preset" _ n:number _ {
         if (n === 1) {         
          // "Stage Left-Right" (Percussion Spread)
         return datosDelPrograma.estadoGlobal.paneo = {
            teclado: 0.6,
            bajo: 0.4,
            guiro: 0.9,
            contras: 0.3,
            contratiempo: 0.3,
            contratiempos: 0.3,
            jam: 0.1,
            jamblock: 0.1,
            bombo: 0.5,
            congas: 0.4
          };
        } else if (n === 2){
          //Abstract spatial: low frequencies centered, high and mids spread around
           return datosDelPrograma.estadoGlobal.paneo = {
                teclado: 0.2,
                bajo: 0.5,
                guiro: 0.8,
                contras: 0.1,
                contratiempo: 0.1,
                contratiempos: 0.1,
                jam: 0.7,
                jamblock: 0.7,
                bombo: 0.5,
                congas: 0.4
              };
          } else if (n === 3) {
              // Typical salsa or Latin stage setup (bajo, congas, and bongó slightly left; guiro and bells right).
              return datosDelPrograma.estadoGlobal.paneo = {
                  teclado: 0.6,
                  bajo: 0.3,
                  guiro: 0.8,
                  contras: 0.75,
                  contratiempo: 0.75,
                  contratiempos: 0.75,
                  jam: 0.85,
                  jamblock: 0.85,
                  bombo: 0.4,
                  congas: 0.35
                };
          } else if (n === 4) {
            //Spatial play with alternating directions — every element zig-zags L-R.
            return datosDelPrograma.estadoGlobal.paneo = {
                  teclado: 0.1,
                  bajo: 0.9,
                  guiro: 0.2,
                  contras: 0.8,
                  contratiempo: 0.3,
                  contratiempos: 0.3,
                  jam: 0.4,
                  jamblock: 0.4,
                  bombo: 0.5,
                  congas: 0.5
                };
            } else {
              return error("Numero de preset es muy grande. Solo hay 4 presets")
            }  
       }
               
      paneoGlobalMultiple
        = _ k:("paneo" / "p") _ "{" _ p:(paneoGlobalInstrumentoIndividual|.., _ "," _|) _ "}"  {return p} 


      paneoGlobalInstrumentoIndividual
        = _ i:instrumentIdentifierSinRetorno _ v:decimal _ {
          if (v >= 0 && v <= 1) {
          const paneo = datosDelPrograma.estadoGlobal.paneo;
          paneo[i] = v     
        } else {
        error("paneo requiere un número entre 0 y 1");  
        }
        }
      
        instrumentIdentifierSinRetorno
      = i:"bajo"
      / i:"teclado" 
      / i:"bombo"
      / i:"guiro"
      / i:("contras" / "contratiempos" / "contratiempo") 
      / i:"congas" 
      / i: ( "jamblock" / "jam") 

      paneoGlobalSimple
          = _ k:("paneo" / "p") _ v:decimal _  {
       if (v >= 0 && v <= 1) {
         const paneo = datosDelPrograma.estadoGlobal.paneo;
          Object.keys(paneo).forEach(instrument => {
             paneo[instrument] = v
          });
              return null
      } else {
        error("paneo requiere un número entre 0 y 1");
      }
      }


         
    pista 
      = _ i:instrumentIdentifier  _ p:listaDePropiedadesConOpciones? _  {
       
        // Prepare the musical object by merging properties (if any)
        let pista = Object.assign({}, i);
        if (p) {
            Object.assign(pista, ...p);
        } 
        
    
         // Check for both notas and parte properties
        if (pista.notas && pista.parte) {
          error("No se puede usar 'notas' y 'parte' al mismo tiempo en un instrumento.");
        }
         
         pista = completeMusicalObject(pista);

         // Fix note values based on instrument context
        if (pista.name === 'congas' && pista.parte && pista.parte.parteList) {
          pista.parte.parteList.forEach(compas => {
            compas.forEach(elemento => {
              if (elemento.note === 1) {
                elemento.note = 'C4'; // Default conga hit
              }
            });
          });
        }
    
        if (pista.parte.type === "acompañamiento" || pista.parte.type === "acompañamiento"){
          if (pista.name != "teclado") {
                error(` ${pista.name} no usa ${pista.parte.type}.`);     
            }    
         }
         
         if (pista.parte.type === "tumbao"){
             if (pista.name != "bajo") {
                 error(` ${pista.name} no usa ${pista.parte.type}`);     
             }    
         }  
       
       if (pista.parte.type === "ritmo"){
             if (pista.name != "bombo" && pista.name != "contratiempo" && pista.name != "contratiempos" && pista.name != "contras" && pista.name != "guiro" && pista.name != "jam" && pista.name != "jamblock") {
                 error(` ${pista.name} no usa ${pista.parte.type}`);     
             }    
         }
         
         if (pista.parte.type === "marcha"){
             if (pista.name != "congas") {
                 error(` ${pista.name} no usa ${pista.parte.type}`);     
             }    
         }
         
     // NEW: Process velocities here in the pista rule
    if (pista.parte && pista.parte.parteList && pista.parte.parteList.length > 0) {
      pista.parte = procesarVelocidadesEnParte(pista.parte, pista.name);
    }
    
                
        // Find if an instrument with the same name and id already exists
        let existingIndex = datosDelPrograma.pistas.findIndex(obj => obj.name === pista.name && obj.id === pista.id);
    
        if (existingIndex !== -1) {
          // If found, overwrite the existing object
          datosDelPrograma.pistas[existingIndex] = Object.assign(datosDelPrograma.pistas[existingIndex], pista);
        } else {
          // Otherwise, add the new instrument
          datosDelPrograma.pistas.push(pista);
        }
    
        return datosDelPrograma.pistas;
    }
    
    instrumentIdentifier
      = i:"bajo" {return createProperty("name", i)}
      / i:"teclado" {return createProperty("name", i)}
      / i:"bombo" {return createProperty("name", i)}
      / i:"guiro" {return createProperty("name", i)}
      / i:("contras" / "contratiempos" / "contratiempo") {return createProperty("name", i)}
      / i:"congas" {return createProperty("name", i)}
      / i: ( "jamblock" / "jam") {return createProperty ("name", i)}
      

    listaDePropiedadesConOpciones
     = _ p:listaDePropiedades? _ pc:propiedadCompases? _ {      
      if (p && pc) {
      return [...p, pc];
     } else if (p) {
      return p
     } else if (pc) {
      return [pc]      
     } else {
      return []
      }
     }

    listaDePropiedades
      = "(" _ p:(propiedad|.., _ "," _|) _ ")" _ { return p }
      
    propiedad 
      = _ k:("sonido" / "s") _ v:entero _ {return createProperty("sonido", v)}
      / _ k:("id") _ "\"" _ v:string _ "\"" _ {return createProperty("id", v)}
      / _ k:("paneo" / "p") _ v:decimal _ {
      if (v >= 0 && v <= 1) {
      return createProperty("paneo", v);
      } else {
        error("paneo requiere un número entre 0 y 1");
      }
      }
      / _ k:("volumen" / "v") _ v:decimal _ {
       if (v >= 0 && v <= 1) {        
      return createProperty("volumen", v);
      } else {
        error("volumen requiere un número entre 0 y 1");
      }
      }
      / _ k:("octava" / "o") _ v:entero _ {return createProperty("octavaAbsoluta", v)}
//      / _ k:("notas" / "n" / "punteo") _ v:(notaSola / listaDeNotas / notaMidiSola / listaDeNotasMidi / compasOListaDeCompases) _ {return createProperty("notas", v)}
     
     propiedadCompases
     = _ k:("marcha" / "tumbao" / "acompañamiento" / "acompanamiento" / "ritmo") _ v:compasOListaDeCompases _ {
             if (v.length == 0) {
             return error(k + " " + 'requiere uno o más compases')
           } else {         
         return createNestedProperty("parte", { type: k, parteList: v });
           }
        }
        / _ k:("punteo") _ activarAdornarPunteo? _ v:compasOListaDeCompases _ {          
        if (v.length == 0) {
                    return error(k + " " + 'requiere uno o más compases')
                  } else {                       
                   return createNestedProperty("parte", { type: k, parteList: v });
                  }
                }


punteoConfigs 
 = activarAdornarPunteo

 activarAdornarPunteo 
    =  _ "(" _ "auto" _ a:(verdadero/falso) _ ")" _ {
       datosDelPrograma.adornarPunteoConfigs = a;
       return null
    }

/*
listaConfigPunteo 
= configUsarEscalaJazzPunteo
/ configTipoOrnamentoPunteo
/ configMantenerNotasObjetivoPunteo 
/ configDuracionPasosPunteo
/ configSubdivisionMinimaPunteo
/ configEspaciadoPasosPunteo

configUsarEscalaJazzPunteo =  "true" { return true; } / "false" { return false; }
configTipoOrnamentoPunteo = _ ("ornamento" / "o") _ o:("chromatic" / "scalar" / "arpeggiated") _ {return createProperty ("tipoOrnamento", o)}
configMantenerNotasObjetivoPunteo = "true" { return true; } / "false" { return false; }
configDuracionPasosPunteo = r:number { return r + 'n'; } // ex. '8n'
configSubdivisionMinimaPunteo = r:number { return r + 'n'; } // ex. '4n'
configEspaciadoPasosPunteo = number
  */

    compasOListaDeCompases 
     = listaDeCompases
    / compasSimpleWrapped 
    

    // Wrap single measures in an array to maintain consistency
compasSimpleWrapped
 = compas:compasSimple {
     return [compas]; // Always return an array of measures
 }

 

    // TODO lista de lista de parte
    listaDeCompases
      =  _ "[" _ ls:compas|.., _ "|" _ | _ "]"  {
            // Aplanar cualquier compás que sea un array de compases (por repeticiones)
        let compasesAplanados = [];
        ls.forEach(compas => {
          if (Array.isArray(compas) && Array.isArray(compas[0])){
            //es un array de compases (repeticion)
            compasesAplanados.push(...compas);
          } else {
            //es un compas normal
            compasesAplanados.push(compas);
          }
        });
  
            return asignarNumeroDeCompas(compasesAplanados)
         }
         
    compas
      = compasConRepeticionMultiple
      / compasSimple  
      

      
    compasSimple 
       = _  ls:parte|.., _| _ {
         // Flatten `ls` safely
       const notas = ls.flatMap(item => Array.isArray(item) ? item : [item]);

        let tamanoDelCompas = notas.reduce((acc, obj) => acc + duracionNotaADuracionEnTiempo(obj.duration), 0);
    
        if (tamanoDelCompas == datosDelPrograma.estadoGlobal.compas) {
          let compasBase = asignarPosTiempoDeNotasPorCompas(notas);  // [{ time: '1n', note: 'C4', duration: '1n'}, ...]
          return compasBase; // retorna un solo compas (no array)
    
        } else if (tamanoDelCompas < datosDelPrograma.estadoGlobal.compas) {
          return error('El tamano del compas es menor a ' + datosDelPrograma.estadoGlobal.compas)
        } else if (tamanoDelCompas > datosDelPrograma.estadoGlobal.compas) {
          return error('El tamano del compas es mayor a ' + datosDelPrograma.estadoGlobal.compas)
        }
      }

      // Nueva regla para repetición de múltiples compases
  compasConRepeticionMultiple 
    = ":" _ compases:compasEnRepeticion|.., _ "|" _ | _ ":" _ rep:repeticionCompas? _  {
        // Validar cada compás individual
        let compasesValidados = [];
        
        for (let compas of compases) {
          let tamanoDelCompas = compas.reduce((acc, obj) => acc + duracionNotaADuracionEnTiempo(obj.duration), 0);
          
          if (tamanoDelCompas == datosDelPrograma.estadoGlobal.compas) {
            let compasBase = asignarPosTiempoDeNotasPorCompas(compas);
            compasesValidados.push(compasBase);
          } else if (tamanoDelCompas < datosDelPrograma.estadoGlobal.compas) {
            return error('El tamano del compas es menor a ' + datosDelPrograma.estadoGlobal.compas)
          } else if (tamanoDelCompas > datosDelPrograma.estadoGlobal.compas) {
            return error('El tamano del compas es mayor a ' + datosDelPrograma.estadoGlobal.compas)
          }
        }
        
        // Si no se especifica repetición, usar 2 por defecto
        let veces = rep ? rep.veces : 2;
        let resultado = [];
        
        for (let i = 0; i < veces; i++) {
          // Agregar todos los compases en cada repetición
          compasesValidados.forEach(compas => {
            resultado.push(compas.map(n => ({ ...n, time: n.time })));
          });
        }
        
        return resultado;
    }

    // Nueva regla para manejar compases dentro de repeticiones múltiples
  compasEnRepeticion
    = _ ls:parte|.., _| _ {
        const notas = ls.flatMap(item => Array.isArray(item) ? item : [item]);
        return notas; // Retorna las partes sin procesar, se validarán en compasConRepeticionMultiple
    }
    
   compasConRepeticion 
      = ":" _ ls:parte|.., _| _ ":" _ rep:repeticionCompas? {
          const notas = ls.flatMap(item => Array.isArray(item) ? item : [item]);
          let tamanoDelCompas = notas.reduce((acc, obj) => acc + duracionNotaADuracionEnTiempo(obj.duration), 0);
    
      if (tamanoDelCompas == datosDelPrograma.estadoGlobal.compas) {
    
          let compasBase = asignarPosTiempoDeNotasPorCompas(notas);
          let compases = [];
    
          let veces = rep ? rep.veces : 2;

          for (let i = 0; i < veces; i++) {
            compases.push(compasBase.map(n => ({ ...n, time: n.time })));
          }
    
          return compases;
      } else if (tamanoDelCompas < datosDelPrograma.estadoGlobal.compas) {
          return error('El tamano del compas es menor a ' + datosDelPrograma.estadoGlobal.compas)
        } else if (tamanoDelCompas > datosDelPrograma.estadoGlobal.compas) {
          return error('El tamano del compas es mayor a ' + datosDelPrograma.estadoGlobal.compas)
        }
      }
       
    //nueva regla para manejar la sintaxis de repeticion
    repeticionCompas
      =  veces:entero  {
        return {veces: veces}
      } 
    

    
    listaDeNotas
      = _ "[" _ notaOListaDeNotas:listaDeNotaOlistaDeNotas? _ "]" _ { return notaOListaDeNotas || []; }
    
    listaDeNotasMidi
      = _ "[" _ notaMidiOListaDeNotasMidi:listaDeNotaMidiOlistaDeNotasMidi? _ "]" _ { return notaMidiOListaDeNotasMidi || []; }
    
    listaDeNotaOlistaDeNotas =  notaOListaDeNotas|.., _ "," _| 
    
    listaDeNotaMidiOlistaDeNotasMidi =  notaMidiOListaDeNotasMidi|.., _ "," _| 
    
    notaOListaDeNotas =  nota / acorde / listaDeNotas 
    notaMidiOListaDeNotasMidi = silencio / notaMidi / listaDeNotasMidi
    
    acorde = "\"" _ n1:nota _ n2:nota? _ n3:nota? _ n4:nota? _ n5:nota? _ "\"" {
    return crearAcorde([n1, n2, n3, n4, n5]) }
    
    silencio = "~" {return null}
    
    notaSola
     = n:nota {return [n]}
     
     notaMidiSola
     = n:notaMidi {return [n]}
     
     nota
     = letra:letra alteracion:alteracion? octava:entero? {
         const accidental = alteracion || "";
         const octave = (octava !== null) ? String(octava) : "";
         return { note: letra + accidental + octave };
       }
   
    
    notaMidi
      = n:entero {
        return {note: n}
      }
    
    cualidad
       = "M7"
       / "M"
       / "mayor7" {return 'maj7'} 
       / "mayor" {return 'maj'} 
       / "maj7"
       / "maj" 
       / "min7"
       / "min" 
       / "menor7b5" {return 'm7b5'}  
       / "menor7" {return 'min7'}
       / "menor" {return 'min'}  
       / "m7b5"
       / "m7"
       / "m"
       / "dim"
       / "aug"
       / "sus2"
       / "sus4"
       / "7"
       
       
        
    alteracion
      = "#" / "bb" / "b" / "x" 
      
    letra
      = alfabetoIngles / alfabetoLatino
    
      
    alfabetoIngles 
      = $[A, B, C, D, E, F, G] 
      
    alfabetoLatino
      = 'do' {return 'C'} 
      / 're' {return 'D'} 
      / 'mi' {return 'E'} 
      / 'fa' {return 'F'} 
      / 'sol' {return 'G'} 
      / 'la' {return 'A'} 
      / 'si' {return 'B'}
    
    ////ritmo más grados del bajo

   

    parte 
    = _ v:partes _ {
        if (Array.isArray(v)) {
          return v.map(p => completeParteObject(p))
        } else         
         return completeParteObject(v); // { time: '1n', note: 'C4', duration: '1n' }
         }
    

    partes
      = ritmoMasGradoDelBajoMasOctavaRelativa
       / ritmoSinGradoDelBajoMasOctavaRelativa
       / ritmoMasGradoDelBajo
       / ritmoMasNotas 
       / ritmoMasTipoDeGolpeDeLaConga
       / ritmoSinGradoDelBajo
  //    /  marchaSinGolpeDeLaConga
      / silenciosDeFigurasMusicales
      / repiques

     repiques
      = _ ("repique" / "r") _ n:number {
        if (n === 1) {
          const figurasMusicales = [
            { duration: '4n', note: 1 },
            { duration: '4n', note: 1 },
            { duration: '8n', note: null },
            { duration: '8n', note: 1 },
            { duration: '8n', note: 1 },
            { duration: '8n', note: 1 }
          ];
          const resultado = figurasMusicales.map(f => Object.assign({}, f));
        return resultado
         
      } else if (n === 2) {
        const figurasMusicales = [
          { duration: '4n', note: 1 },
          { duration: '8n', note: 1 },
          { duration: '8n', note: 1 },
          { duration: '8n', note: null },
          { duration: '8n', note: 1 },
          { duration: '4n', note: 1 }
        ];
        const resultado = figurasMusicales.map(f => Object.assign({}, f));
        return resultado

      } else if (n === 3) {
        const figurasMusicales = [
          { duration: '8n', note: 1 },
          { duration: '8n', note: 1 },
          { duration: '8n', note: 1 },
          { duration: '8n', note: 1 },
          { duration: '4n', note: 1 },
          { duration: '4n', note: 1 }
        ];
        const resultado = figurasMusicales.map(f => Object.assign({}, f));
        return resultado

      } else if (n === 4) {
        const figurasMusicales = [
          { duration: '8n', note: null},
          { duration: '8n', note: 1 },
          { duration: '8n', note: 1 },
          { duration: '8n', note: 1 },
          { duration: '8n', note: 1 },
          { duration: '8n', note: 1 },
          { duration: '4n', note: 1 }
        ];
        const resultado = figurasMusicales.map(f => Object.assign({}, f));
        return resultado

        // better for guira
        } if (n === 5) {
          const figurasMusicales = [
            { duration: '16n', note: 1 },
            { duration: '16n', note: 1 },
            { duration: '16n', note: 1 },
            { duration: '16n', note: 1 },
            { duration: '4n', note: 1 },
            { duration: '16n', note: 1 },
            { duration: '16n', note: 1 },
            { duration: '16n', note: 1 },
            { duration: '16n', note: 1 },
            { duration: '4n', note: 1 }
          ];
          const resultado = figurasMusicales.map(f => Object.assign({}, f));
        return resultado
         
      } else if (n === 6) {
        const figurasMusicales = [
          { duration: '8n', note: 1 },
          { duration: '8n', note: 1 },
          { duration: '16n', note: 1 },
          { duration: '16n', note: 1 },
          { duration: '16n', note: null},
          { duration: '16n', note: 1 },
          { duration: '4n', note: 1 },
          { duration: '16n', note: 1 },
          { duration: '16n', note: 1 },
          { duration: '16n', note: 1 },
          { duration: '16n', note: 1 }          
        ];
        const resultado = figurasMusicales.map(f => Object.assign({}, f));
        return resultado

// for congas or bongo
      } else if (n === 7) {
        const figurasMusicales = [
          { duration: '4n', note: null },
          { duration: '4n', note: null },
          { duration: '16n', note: "C4" },
          { duration: '16n', note: "C4" },
          { duration: '16n', note: "C4"},
          { duration: '16n', note: "C4" },
          { duration: '16n', note: "C4" },
          { duration: '16n', note: "C4" },
          { duration: '16n', note: "C4"},
          { duration: '16n', note: "C4" }            
        ];
        const resultado = figurasMusicales.map(f => Object.assign({}, f));
        return resultado

      } else if (n === 8) {
        const figurasMusicales = [
            { duration: '8n', note: 'C4' },
            { duration: '8n', note: 'C5' },
            { duration: '8n', note: 'B4' },
            { duration: '8n', note: 'C5' },
            { duration: '8n', note: 'B4' },
            { duration: '8n', note: 'C5' },
            { duration: '4n', note: null }
          
          // { duration: '8n', note: "F4" },
          // { duration: '8n', note: "D4" },
          // { duration: '4n', note: null },
          // { duration: '16n', note: "C4" },
          // { duration: '16n', note: "C4" },
          // { duration: '16n', note: "F4"},
          // { duration: '16n', note: "C4" },
          // { duration: '16n', note: "F4" },
          // { duration: '16n', note: "C4" },
          // { duration: '16n', note: "F4"},
          // { duration: '16n', note: "C4" }            
        ];
        const resultado = figurasMusicales.map(f => Object.assign({}, f));
        return resultado

      } else if (n === 9) {
        const figurasMusicales = [
          { duration: '16n', note: "F4" },
          { duration: '16n', note: "G4" },
          { duration: '16n', note: null},
          { duration: '16n', note: "F4" },
          { duration: '16n', note: "C4" },
          { duration: '16n', note: null },
          { duration: '16n', note: "C4"},
          { duration: '16n', note: "F4" },
          { duration: '16n', note: null },
          { duration: '16n', note: "G4" },
          { duration: '16n', note: "C4"},
          { duration: '16n', note: null },
          { duration: '16n', note: "C4" },
          { duration: '16n', note: "F4" },
          { duration: '16n', note: "G4"},
          { duration: '16n', note: "C4" }            
        ];
        const resultado = figurasMusicales.map(f => Object.assign({}, f));
        return resultado
      } else {return error("Numero de preset es muy grande. Solo hay 9 presets")}
    }


      // = _ 'a' _ {return createProperty("note", "C4")}
      // / _ 's' {return createProperty("note", "D4")}
      // / _ 'm' _ {return createProperty("note", "E4")}
      // / _ 't' _ {return createProperty("note", "F4")}
      // / _ 'p' _ {return createProperty("note", "G4")}
        
      
    

    silenciosDeFigurasMusicales
       = _ s:silencioDeFiguraMusical {
       let g = createProperty("note", null);
       return Object.assign({}, s, g)
       }
       
    ritmoSinGradoDelBajoMasOctavaRelativa
       = _ r:ritmoSinGradoDelBajo _ o:octavaRelativa _ {
          return Object.assign({}, r, o);
        }
    
    ritmoSinGradoDelBajo
       = _ f:figuraMusical {
       let g = createProperty("note", 1);
       return Object.assign({}, f, g)
       }
       
  /*   marchaSinGolpeDeLaConga
       = _ f:figuraMusical {
       let g = createProperty("note", 'C4');
       return Object.assign(f, g)
       }

    */   
       
    ritmoMasGradoDelBajoMasOctavaRelativa
       = _ r:ritmoMasGradoDelBajo _ o:octavaRelativa _ {
          return Object.assign({}, r, o);
        }
       
    ritmoMasGradoDelBajo 
        = _ f:figuraMusical _ "/" _ g:gradoDelBajo _ {
        return Object.assign({}, f, g);
        }
      
    // i think notaMidi wont work since it will translate to degrees?
    ritmoMasNotas
       =  _ f:figuraMusical _ "/" _ n:(nota / notaMidi) {
       return Object.assign({}, f, n)
      }


    
    ritmoMasTipoDeGolpeDeLaConga 
        = _ f:figuraMusical _ "/" _ g:golpeDeLasCongas _ {
        return Object.assign({}, f, g);
        }
    
    //octava arriba o abajo 
    octavaRelativa = octavaArriba
                   / octavaAbajo
                   
    octavaArriba 
             = _ '^' _ {return createProperty("octavaRelativa", 1)}
    
    octavaAbajo
             = _ '_' _ {return createProperty("octavaRelativa", (-1))}
             
    //grados bajo
    gradoDelBajo 
       = n:number {return createProperty("note", n);}
    
    golpeDeLasCongas
       = _ 'a' _ {return createProperty("note", "C4")}
       / _ 's' {return createProperty("note", "D4")}
       / _ 'm' _ {return createProperty("note", "E4")}
       / _ 't' _ {return createProperty("note", "F4")}
       / _ 'p' _ {return createProperty("note", "G4")}
    
    // notacion ritmica
     
     //{ time: '1n', note: 'C4', duration: '1n' } 
    figuraMusical
       = _ '𝅝' _ {return createProperty("duration", '1n');}
       / _ '𝅗𝅥' _ {return createProperty("duration", '2n');}
       / _ '𝅘𝅥' _   {return createProperty("duration", '4n');}   
       / _ '𝅘𝅥𝅮' _ {return createProperty("duration", '8n');}   
       / _ '𝅘𝅥𝅯' _  {return createProperty("duration", '16n');}
       
     silencioDeFiguraMusical
       = _ '𝄻' _ {return createProperty("duration", '1n');}
       / _ '𝄼' _ {return createProperty("duration", '2n');}
       / _ '𝄽' _ {return createProperty("duration", '4n');}
       / _ '𝄾' _ {return createProperty("duration", '8n');}
       / _ '𝄿' _ {return createProperty("duration", '16n');}
       
       
    ///////// acordes estado global   
    listaDeAcordesGlobalesOlistaDeAcordeGlobal
    = listaDeAcordesGlobales
    / listaDeAcordeGlobalWrapped
 
    /* listaDeAcordesGlobales
       =  _ "[" _ ls:listaDeAcordeGlobal|.., _ "|" | _ "]" _ {return ls} */


    listaDeAcordesGlobales
  = _ "[" _ contenido:contenidoDeCompases|.., _ "|" | _ "]" _ { 
 return contenido.flatMap(element => {
        if (Array.isArray(element) && Array.isArray(element[0])) {
            // This is from acordesConRepeticion - already array of measures
            return element;
        } else {
            // This is from listaDeAcordeGlobal - wrap as single measure
            return [element];
        }
    });    } 

    
      listaDeAcordeGlobalWrapped
      = acordeGlobal:listaDeAcordeGlobal  {
          return [acordeGlobal]; // Always return an array of measures
      }

contenidoDeCompases
  = elementos:(acordesConRepeticion / listaDeAcordeGlobal) _ {
        // acordesConRepeticion returns [["Am"], ["Am"]], listaDeAcordeGlobal returns ["Bm", "Dm"]
    // We need to return individual measures, not wrap them again
    return elementos;
  }
    

acordesConRepeticion
  = _ ":"
    _ acorde:listaDeAcordeGlobal
    _ ":"
    _ rep:entero? {
      // This returns an array with the chord repeated "rep" times
      let veces = rep ?? 2;
      return Array.from({ length: veces }, () => acorde.slice());
    }
       
    listaDeAcordeGlobal
       = _  ls:acordeGlobal|.., _| _  {
              if (ls.length == 0) {
               return error('Armonia/acordes requiere uno o más acordes')
              } else return ls
             }

    acordeGlobal = _ letra:letra alteracion:alteracion? _ cualidad:cualidad? _ {
      return letra + (alteracion ?? "") + (cualidad ?? "");
    }
    
    
    
    
    
    //////////////////
    // A rule to skip whitespace and line comments
    
    decimal 
       = head:entero tail: ("." enteroString)? {
      const decimalPart = tail ? parseFloat(`0.${tail[1]}`) : 0;
      const result = head + decimalPart
        return result
        }
      
    enteroString = [0-9]+ {
      return text(); // this keeps "001" as a string
    }

    entero = [0-9]+ {
      return parseInt(text(), 10);
    }
    
    number
      = [0-9]+ { return parseFloat(text()); }
    
    string
      = [a-z]+ { return text(); }
        
    
    word
      = $[a-z]i+
      
    // booleans
    verdadero
      = ("verdadero"/"v") { return true; }

    falso
      = ("falso"/"f") { return false; }

      
    // Single-line comment rule
    LineComment
      = "//" (![\r\n] .)*  // Matches "//" followed by any characters except a newline
      { return null; }
    
    
    // Multi-line comment rule
    MultiLineComment
      = "/*" (!"*/" .)* "*/"  // Matches "/* ... */" multi-line comments
      { return null; }
    
    
    // Match and ignore whitespace, comments, or the end of input
    _
      = [ \t\r\n]* (LineComment / MultiLineComment)* [ \t\r\n]*
    
    
    // Define a rule that only matches the end of input
    EndOfInput
      = !.  // Matches only if there's no more input (end of file)
    