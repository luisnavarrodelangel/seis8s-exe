{
       
    function getInstrumentVelocity(instrumentName, noteIndex, beatPosition, parte) {
      const baseVelocities = {
        'guiro': 0.7,
        'bombo': 0.8,
        'congas': 0.75,
        'contratiempo': 0.6,
        'bajo': 0.8,
        'teclado': 0.7
      };
      
      let baseVel = baseVelocities[instrumentName] || 'undefined';
      
      // Instrument-specific velocity patterns
      switch(instrumentName) {
        case 'guiro':
          return getGuiroVelocity(beatPosition, parte);
        case 'bombo':
          return getBomboVelocity(beatPosition);
        case 'congas':
          return getCongasVelocity(beatPosition, parte);
        case 'contratiempo':
        case 'contratiempos':
        case 'contras':
          return getContratiempoVelocity(beatPosition);
        case 'bajo':
          return getBajoVelocity(beatPosition, noteIndex);
        case 'teclado':
          return getTecladoVelocity(beatPosition, parte);
        default:
          return humanizeVelocity(baseVel);
      }
    }
    
    function getGuiroVelocity(beatPosition, parte) {
      // Cumbia güiro pattern with proper accents
      const cumbiaPattern = {
        0: 0,   // Strong downbeat scrape
        0.5: 0.4, // Light upbeat
        1: 0.6,   // Medium beat
        1.5: 0.3, // Light
        2: 0.7,   // Accent
        2.5: 0.5, // Medium
        3: 0.4,   // Light
        3.5: 0.8  // Syncopated accent
        
      };
      
     const roundedBeat = Math.round(beatPosition * 2) / 2;
     const patternVel = cumbiaPattern[roundedBeat] ?? 0.6;  // Use ?? instead of || to allow 0  return humanizeVelocity(patternVel); 
     return humanizeVelocity(patternVel);
    
    }
    
    function getBomboVelocity(beatPosition) {
      // Strong on 1 and 3, lighter on 2 and 4
      const bomboPattern = {
        0: 0.9,   // Strong downbeat
        1: 0.6,   // Medium
        2: 0.8,   // Strong backbeat
        3: 0.5    // Light
      };
      
      const patternVel = bomboPattern[Math.floor(beatPosition) % 4] || 0.7;
      return humanizeVelocity(patternVel);
    }
    
    function getCongasVelocity(beatPosition, parte) {
      // Different velocities for different conga sounds
      const congaVelocities = {
        'C4': 0.8,  // 'a' - abierto (open)
        'D4': 0.6,  // 's' - slap
        'E4': 0.7,  // 'm' - mano (hand)
        'F4': 0.9,  // 't' - tono (tone)
        'G4': 0.5   // 'p' - palm
      };
      
      // Add rhythmic emphasis
      const rhythmicBoost = beatPosition % 1 === 0 ? 1.1 : 0.9;
      return humanizeVelocity(0.7 * rhythmicBoost);
    }
    
    function getContratiempoVelocity(beatPosition) {
      // Emphasize off-beats
      const isOffbeat = (beatPosition + 0.5) % 1 === 0;
      const baseVel = isOffbeat ? 0.8 : 0.4;
      return humanizeVelocity(baseVel);
    }
    
    function getBajoVelocity(beatPosition, noteIndex) {
      // Tumbao pattern emphasis
      const tumbaPattern = {
        0: 0.9,    // Strong root
        0.5: 0.5,  // Light
        1: 0.6,    // Medium
        1.5: 0.4,  // Light
        2: 0.7,    // Accent
        2.5: 0.8,  // Syncopation
        3: 0.5,    // Light
        3.5: 0.6   // Leading to next measure
      };
      
      const patternVel = tumbaPattern[beatPosition % 4] || 0.7;
      return humanizeVelocity(patternVel);
    }
    
    function getTecladoVelocity(beatPosition, parte) {
      if (parte === 'acompañamiento') {
        // Chord comping pattern
        const compingPattern = {
          0: 0.6,    // Light downbeat
          0.5: 0.8,  // Strong upbeat
          1: 0.5,    // Light
          1.5: 0.7,  // Medium upbeat
          2: 0.6,    // Light
          2.5: 0.9,  // Strong syncopation
          3: 0.4,    // Very light
          3.5: 0.7   // Setup for next measure
        };
        const patternVel = compingPattern[beatPosition % 4] || 0.6;
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
        volumen: 1, 
        paneo: 0.5
      },
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
    }
    
    
    function normalizarVolumenDeInstrumento(v){
      return v * datosDelPrograma.estadoGlobal.volumen;
    }
    
    function completeMusicalObject(inputObject) {
      // Merge inputObject with defaultMusicalObject
      const completedObject = { ...defaultMusicalObject, ...inputObject };
      
      // Use global volumen and paneo if not set in inputObject
      if (!inputObject.hasOwnProperty('volumen')) {
        completedObject.volumen = datosDelPrograma.estadoGlobal.volumen;
      }
      if (!inputObject.hasOwnProperty('paneo')) {
        completedObject.paneo = datosDelPrograma.estadoGlobal.paneo;
      }
      
        // Ensure `parte` exists with a default empty `type`
      if (!inputObject.hasOwnProperty('parte')) {
        completedObject.parte.type = null,
        completedObject.parte.parteList = [];
      }
      
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
    const dynamicVelocity = getInstrumentVelocity(instrumentName, index, beatPosition, parteType);
    
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
      = _ k:("armonia" / "acordes") _ v:listaDeAcordesGlobales _ ";" _ {
              if (v.length == 0) {
               return error(k + ' requiere uno o más compases con acordes')
              } else return datosDelPrograma.estadoGlobal.armonia = v
            }
      / _ k:("tempo" / "t") _ v:entero _ ";" _ {return datosDelPrograma.estadoGlobal.tempo = v}
      / _ k:("compas" / "c") _ v:string _ ";" _ {return datosDelPrograma.estadoGlobal.compas = v}
      / _ k:("volumen" / "v") _ v:decimal _ ";" _ {
        if (v >= 0 && v <= 1) {
          return datosDelPrograma.estadoGlobal.volumen = v
      } else {
        error("volumen requiere un número entre 0 y 1");
      }
    }
      / _ k:("paneo" / "p") _ v:decimal _ ";" _ {
       if (v >= 0 && v <= 1) {
          return datosDelPrograma.estadoGlobal.paneo = v
      } else {
        error("paneo requiere un número entre 0 y 1");
      }
      }
      
         
    pista 
      = _ i:instrumentIdentifier  _ p:listaDePropiedades? _ ";" _ {
       
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
             if (pista.name != "bombo" && pista.name != "contratiempo" && pista.name != "contratiempos" && pista.name != "contras" && pista.name != "guiro") {
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
      
    
    listaDePropiedades
      = "(" _ p:(propiedad|.., _ "," _|) _ ")" {return p}
      
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
      return createProperty("volumen", normalizarVolumenDeInstrumento(v));
      } else {
        error("volumen requiere un número entre 0 y 1");
      }
      }
      / _ k:("octava" / "o") _ v:entero _ {return createProperty("octavaAbsoluta", v)}
      / _ k:("notas" / "n" / "punteo") _ v:(notaSola / listaDeNotas / notaMidiSola / listaDeNotasMidi) _ {return createProperty("notas", v)}
      / _ k:("marcha" / "tumbao" / "acompañamiento" / "acompanamiento" / "ritmo") _ v:listaDeCompases _ {
             if (v.length == 0) {
             return error(k + " " + 'requiere uno o más compases')
           } else {
    // Process the compases with velocity information

        
           // SIMPLIFIED: Just return the parte structure, velocities will be processed later
         return createNestedProperty("parte", { type: k, parteList: v });
           }
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
    // Note: instrumentName and parteType need to be passed from the calling context
            // This will require restructuring how these are called from the 'propiedad' rule
            return asignarNumeroDeCompas(compasesAplanados)
         }
         
    compas
      = compasConRepeticion
      / compasSimple
    
    
    
      
    compasSimple 
       = _  ls:parte|.., _| _ {
        let tamanoDelCompas = ls.reduce((acc, obj) => acc + duracionNotaADuracionEnTiempo(obj.duration), 0);
    
        if (tamanoDelCompas == datosDelPrograma.estadoGlobal.compas) {
          let compasBase = asignarPosTiempoDeNotasPorCompas(ls);  // [{ time: '1n', note: 'C4', duration: '1n'}, ...]
          return compasBase; // retorna un solo compas (no array)
    
        } else if (tamanoDelCompas < datosDelPrograma.estadoGlobal.compas) {
          return error('El tamano del compas es menor a ' + datosDelPrograma.estadoGlobal.compas)
        } else if (tamanoDelCompas > datosDelPrograma.estadoGlobal.compas) {
          return error('El tamano del compas es mayor a ' + datosDelPrograma.estadoGlobal.compas)
        }
      }
    
    compasConRepeticion 
      = ":" _ notas:parte|.., _| _ ":" _ rep:repeticionCompas {
          let tamanoDelCompas = notas.reduce((acc, obj) => acc + duracionNotaADuracionEnTiempo(obj.duration), 0);
    
      if (tamanoDelCompas == datosDelPrograma.estadoGlobal.compas) {
    
          let compasBase = asignarPosTiempoDeNotasPorCompas(notas);
          let compases = [];
    
          for (let i = 0; i < rep.veces; i++) {
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
    
    parte 
      = _ v:partes _ {
           //let parte = Object.assign({}, v);
           return completeParteObject(v); // { time: '1n', note: 'C4', duration: '1n' }
           }
    
    listaDeNotas
      = _ "[" _ notaOListaDeNotas:listaDeNotaOlistaDeNotas? _ "]" _ { return notaOListaDeNotas || []; }
    
    listaDeNotasMidi
      = _ "[" _ notaMidiOListaDeNotasMidi:listaDeNotaMidiOlistaDeNotasMidi? _ "]" _ { return notaMidiOListaDeNotasMidi || []; }
    
    listaDeNotaOlistaDeNotas =  notaOListaDeNotas|.., _ "," _| 
    
    listaDeNotaMidiOlistaDeNotasMidi =  notaMidiOListaDeNotasMidi|.., _ "," _| 
    
    notaOListaDeNotas =  silencio / nota / acorde / listaDeNotas 
    notaMidiOListaDeNotasMidi = silencio / notaMidi / listaDeNotasMidi
    
    acorde = "\"" _ n1:nota _ n2:nota? _ n3:nota? _ n4:nota? _ n5:nota? _ "\"" {
    return crearAcorde([n1, n2, n3, n4, n5]) }
    
    silencio = "~" {return null}
    
    notaSola
     = n:nota {return [n]}
     
     notaMidiSola
     = n:notaMidi {return [n]}
     
    nota
      = letra:letra alteracion:alteracion? octava:entero {
      if (alteracion == null) {
        return (letra + octava)
      } else {
          return (letra + alteracion + octava)
      }
    }
    
    notaMidi
      = n:entero {
       return n
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
    
    partes
      = ritmoMasGradoDelBajoMasOctavaRelativa
       / ritmoSinGradoDelBajoMasOctavaRelativa
       / ritmoMasGradoDelBajo
       / ritmoMasTipoDeGolpeDeLaConga
       / ritmoSinGradoDelBajo
      /  marchaSinGolpeDeLaConga
      / silenciosDeFigurasMusicales
      
      
    silenciosDeFigurasMusicales
       = _ s:silencioDeFiguraMusical {
       let g = createProperty("note", null);
       return Object.assign(s, g)
       }
       
    ritmoSinGradoDelBajoMasOctavaRelativa
       = _ r:ritmoSinGradoDelBajo _ o:octavaRelativa _ {
          return Object.assign({}, r, o);
        }
    
    ritmoSinGradoDelBajo
       = _ f:figuraMusical {
       let g = createProperty("note", 1);
       return Object.assign(f, g)
       }
       
     marchaSinGolpeDeLaConga
       = _ f:figuraMusical {
       let g = createProperty("note", 'C4');
       return Object.assign(f, g)
       }
       
    ritmoMasGradoDelBajoMasOctavaRelativa
       = _ r:ritmoMasGradoDelBajo _ o:octavaRelativa _ {
          return Object.assign({}, r, o);
        }
       
    ritmoMasGradoDelBajo 
        = _ f:figuraMusical _ "/" _ g:gradoDelBajo _ {
        return Object.assign({}, f, g);
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
    
    //grados bajo
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
    listaDeAcordesGlobales
       =  ls:listaDeAcordeGlobal|.., _|  {return ls}
    
    
    listaDeAcordeGlobal
       = _ "|" _ ls:acordeGlobal|.., _| _ "|" _ {
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
       = head:entero tail: ("." entero)? {
      const decimalPart = tail ? parseFloat(`0.${tail[1]}`) : 0;
      const result = head + decimalPart
        return result
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
    