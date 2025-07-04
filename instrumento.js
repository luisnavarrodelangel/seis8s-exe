import * as a from "./armonia.js";
import * as r from "./ritmo.js";
import * as s from './sonidos.js';
import * as p from "./punteo.js"


///////////// linear transformation para normalizar/mapear 0 a -60db y 1 a 0db ///////////// 

// :: Number => Number
function normalizarVolumen(v){
  return ((60 * v) - 60)
}

///////////// Establecer Tempo ///////////// 

// :: number => Number
export function establecerTempo(t){
  if (Tone.Transport.state !== "started") {
  Tone.Transport.bpm.value = t * 2; // Set the tempo to 120 BPM
  Tone.Transport.start();
} else {
  Tone.Transport.bpm.value = t * 2; 
 }
}

///////////// Detener secuencia ///////////// 

export function stopSequence() {
  // Stop the transport
  Tone.Transport.stop();

  // Dispose of all samplers
  Object.keys(bomboSampler).forEach(id => {
    bomboSampler[id].dispose();
    delete bomboSampler[id];  // Remove reference
  });

  // Dispose of all channels
  Object.keys(canalDelBombo).forEach(id => {
    canalDelBombo[id].dispose();
    delete canalDelBombo[id];  // Remove reference
  });

   // Dispose of all samplers
   Object.keys(jamblockSampler).forEach(id => {
    jamblockSampler[id].dispose();
    delete jamblockSampler[id];  // Remove reference
  });

  // Dispose of all channels
  Object.keys(canalDelJamblock).forEach(id => {
    canalDelJamblock[id].dispose();
    delete canalDelJamblock[id];  // Remove reference
  });

    // Dispose of all samplers
    Object.keys(guiroSampler).forEach(id => {
      guiroSampler[id].dispose();
      delete guiroSampler[id];  // Remove reference
    });
  
    // Dispose of all channels
    Object.keys(canalDelGuiro).forEach(id => {
      canalDelGuiro[id].dispose();
      delete canalDelGuiro[id];  // Remove reference
    });
  
   // Dispose of all samplers
    Object.keys(contrasSampler).forEach(id => {
      contrasSampler[id].dispose();
      delete contrasSampler[id];  // Remove reference
    });

    // Dispose of all channels
    Object.keys(canalDelContratiempo).forEach(id => {
      canalDelContratiempo[id].dispose();
      delete canalDelContratiempo[id];  // Remove reference
    });
  
  
    // Dispose of all samplers
  Object.keys(tecladoSampler).forEach(id => {
    tecladoSampler[id].dispose();
    delete tecladoSampler[id];  // Remove reference
  });

  // Dispose of all channels
  Object.keys(canalDelTeclado).forEach(id => {
    canalDelTeclado[id].dispose();
    delete canalDelTeclado[id];  // Remove reference
  });
  
    // Dispose of all samplers
  Object.keys(bajoSampler).forEach(id => {
    bajoSampler[id].dispose();
    delete bajoSampler[id];  // Remove reference
  });

  // Dispose of all channels
  Object.keys(canalDelBajo).forEach(id => {
    canalDelBajo[id].dispose();
    delete canalDelBajo[id];  // Remove reference
  });
    
     // Dispose of all samplers
  Object.keys(congaSampler).forEach(id => {
    congaSampler[id].dispose();
    delete congaSampler[id];  // Remove reference
  });

  // Dispose of all channels
  Object.keys(canalDeLaConga).forEach(id => {
    canalDeLaConga[id].dispose();
    delete canalDeLaConga[id];  // Remove reference
  });

 // Dispose of all sequences
  Object.keys(sequences).forEach(id => {
    sequences[id].stop();   // Stop the sequence
    sequences[id].dispose(); // Dispose of the sequence
    delete sequences[id];    // Remove reference
  });

  // Reset Transport position if needed
  Tone.Transport.position = 0;

  
}

export function desconectarPistasBorradas(id) {
        // Stop and dispose of any sequences if they exist
    if (sequences[id]) {
      sequences[id].stop();
      sequences[id].dispose();
      delete sequences[id];
      console.log(`Sequence ${id} disposed`);
    }
  
    if (bomboSampler[id]) {
      bomboSampler[id].releaseAll();
      bomboSampler[id].disconnect();
      bomboSampler[id].dispose();
      delete bomboSampler[id];
    }

    if (canalDelBombo[id]) {
      canalDelBombo[id].disconnect();
      canalDelBombo[id].dispose();
      delete canalDelBombo[id];
    }

    if (jamblockSampler[id]) {
      jamblockSampler[id].releaseAll();
      jamblockSampler[id].disconnect();
      jamblockSampler[id].dispose();
      delete jamblockSampler[id];
    }

    if (canalDelJamblock[id]) {
      canalDelJamblock[id].disconnect();
      canalDelJamblock[id].dispose();
      delete canalDelJamblock[id];
    }
  
    if (guiroSampler[id]) {
      guiroSampler[id].releaseAll();
      guiroSampler[id].disconnect();
      guiroSampler[id].dispose();
      delete guiroSampler[id];
    }

    if (canalDelGuiro[id]) {
      canalDelGuiro[id].disconnect();
      canalDelGuiro[id].dispose();
      delete canalDelGuiro[id];
    }
  

   if (contrasSampler[id]) {
      contrasSampler[id].releaseAll();
      contrasSampler[id].disconnect();
      contrasSampler[id].dispose();
      delete contrasSampler[id];
    }

    if (canalDelContratiempo[id]) {
      canalDelContratiempo[id].disconnect();
      canalDelContratiempo[id].dispose();
      delete canalDelContratiempo[id];
    }
  
  if (tecladoSampler[id]) {
      tecladoSampler[id].releaseAll();
      tecladoSampler[id].disconnect();
      tecladoSampler[id].dispose();
      delete tecladoSampler[id];
    }

    if (canalDelTeclado[id]) {
      canalDelTeclado[id].disconnect();
      canalDelTeclado[id].dispose();
      delete canalDelTeclado[id];
    }
  
  if (bajoSampler[id]) {
      bajoSampler[id].releaseAll();
      bajoSampler[id].disconnect();
      bajoSampler[id].dispose();
      delete bajoSampler[id];
    }

    if (canalDelBajo[id]) {
      canalDelBajo[id].disconnect();
      canalDelBajo[id].dispose();
      delete canalDelBajo[id];
    }
  
  
  if (congaSampler[id]) {
      congaSampler[id].releaseAll();
      congaSampler[id].disconnect();
      congaSampler[id].dispose();
      delete congaSampler[id];
    }

    if (canalDeLaConga[id]) {
      canalDeLaConga[id].disconnect();
      canalDeLaConga[id].dispose();
      delete canalDeLaConga[id];
    }
}



///////////// Definiciones globales de instrumentos ///////////// 

// let seq1, seq2, seq3, seq4, seq5, canalDelTeclado2;
let sequences = {};  // Object to store sequences dynamically by id

///////////// Sampler de la conga ///////////// 


let congaSampler = {};  // Initialize bomboSampler as an object to store multiple samplers
let canalDeLaConga = {}; // Initialize canalDelBombo as an object to store multiple channels

export function congaSamplerF(indiceSonido, id, volumen, paneo) {
  
  // Initialize the sampler if it's not already created  
  if (!congaSampler[id] || congaSampler[id]._currentSound !== indiceSonido) {
    congaSampler[id] = new Tone.Sampler({
      urls: {
        C4: s.getAudioBuffer("congas", indiceSonido).get('quinto_abierto'),
        D4: s.getAudioBuffer("congas", indiceSonido).get('quinto_palma'),
        E4: s.getAudioBuffer("congas", indiceSonido).get('quinto_muteado'),
        F4: s.getAudioBuffer("congas", indiceSonido).get('quinto_talon'),
        G4: s.getAudioBuffer("congas", indiceSonido).get('quinto_punta')
      }, 
      release: 1
    });
    congaSampler[id]._currentSound = indiceSonido; // Store current sound for comparison

  }

  // Initialize the channel if not created yet
  if (!canalDeLaConga[id]) {
    canalDeLaConga[id] = new Tone.Channel({
      volume: normalizarVolumen(volumen), // Initial volume
      pan: (paneo * 2) - 1,  // Initial pan
    }).toDestination();
  } else {
    // If the channel already exists, update its parameters
    canalDeLaConga[id].volume.value = normalizarVolumen(volumen);
    canalDeLaConga[id].pan.value = (paneo * 2) - 1;
  }

  // Connect the sampler to its corresponding channel
  congaSampler[id].connect(canalDeLaConga[id]);  // Connect the sampler to the channel
}



///////////// Sampler del bombo ///////////// 


let bomboSampler = {};  // Initialize bomboSampler as an object to store multiple samplers
let canalDelBombo = {}; // Initialize canalDelBombo as an object to store multiple channels

export function bomboSamplerF(indiceSonido, id, volumen, paneo) {

   // Initialize the sampler if it's not already created or if sound changed
   if (!bomboSampler[id] || bomboSampler[id]._currentSound !== indiceSonido) {

    bomboSampler[id] = new Tone.Sampler({
      urls: {C4: s.getAudioBuffer("bombo", indiceSonido).get('C2')}, // Use indiceSonido as index
      release: 1
    });
    bomboSampler[id]._currentSound = indiceSonido; // Store current sound for comparison
    
  }

  // Initialize the channel if not created yet
  if (!canalDelBombo[id]) {
    canalDelBombo[id] = new Tone.Channel({
      volume: normalizarVolumen(volumen), // Initial volume
      pan: (paneo * 2) - 1,  // Initial pan
    }).toDestination();
  } else {
    // If the channel already exists, update its parameters
    canalDelBombo[id].volume.value = normalizarVolumen(volumen);
    canalDelBombo[id].pan.value = (paneo * 2) - 1;
  }

  // Connect the sampler to its corresponding channel
  bomboSampler[id].connect(canalDelBombo[id]);  // Connect the sampler to the channel
}


///////////// Sampler del jamblock ///////////// 


let jamblockSampler = {};  // Initialize jamblockSampler as an object to store multiple samplers
let canalDelJamblock = {}; // Initialize canalDelJamblock as an object to store multiple channels

export function jamblockSamplerF(indiceSonido, id, volumen, paneo) {

   // Initialize the sampler if it's not already created or if sound changed
   if (!jamblockSampler[id] || jamblockSampler[id]._currentSound !== indiceSonido) {

    jamblockSampler[id] = new Tone.Sampler({
      urls: {C4: s.getAudioBuffer("jamblock", indiceSonido).get('jamblock0')}, // Use indiceSonido as index
      release: 1
    });
    jamblockSampler[id]._currentSound = indiceSonido; // Store current sound for comparison
    
  }

  // Initialize the channel if not created yet
  if (!canalDelJamblock[id]) {
    canalDelJamblock[id] = new Tone.Channel({
      volume: normalizarVolumen(volumen), // Initial volume
      pan: (paneo * 2) - 1,  // Initial pan
    }).toDestination();
  } else {
    // If the channel already exists, update its parameters
    canalDelJamblock[id].volume.value = normalizarVolumen(volumen);
    canalDelJamblock[id].pan.value = (paneo * 2) - 1;
  }

  // Connect the sampler to its corresponding channel
  jamblockSampler[id].connect(canalDelJamblock[id]);  // Connect the sampler to the channel
}



///////////// Sampler de los contratiempos /////
let contrasSampler = {};
let canalDelContratiempo = {};


export function contrasSamplerF(indiceSonido, id, volumen, paneo) {
  

  // Initialize the sampler if it's not already created
  if (!contrasSampler[id] || contrasSampler[id]._currentSound !== indiceSonido) {
  contrasSampler[id] = new Tone.Sampler({
    urls: {C4: s.getAudioBuffer("contratiempo", indiceSonido).get('F%232')}, // Use indiceSonido as index
    release: 1
      });
      contrasSampler[id]._currentSound = indiceSonido; // Store current sound for comparison
}

    // Initialize the channel if not created yet
    if (!canalDelContratiempo[id]) {
      canalDelContratiempo[id] = new Tone.Channel({
        volume: normalizarVolumen(volumen), // Initial volume
        pan: (paneo * 2) - 1,  // Initial pan
      }).toDestination();
    } else {
    // If the channel already exists, update its parameters
    canalDelContratiempo[id].volume.value = normalizarVolumen(volumen);
    canalDelContratiempo[id].pan.value = (paneo * 2) - 1;
  }
      
      contrasSampler[id].connect(canalDelContratiempo[id]);  // Connect once

}


///////////// Sampler del guiro ///////////// 


let guiroSampler = {};  // Initialize guiroSampler as an object to store multiple samplers
let canalDelGuiro = {}; // Initialize canalDelguiro as an object to store multiple channels

export function guiroSamplerF(indiceSonido, id, volumen, paneo) {

   // Initialize the sampler if it's not already created or if sound changed
   if (!guiroSampler[id] || guiroSampler[id]._currentSound !== indiceSonido) {

    guiroSampler[id] = new Tone.Sampler({
      urls: {C4: s.getAudioBuffer("guiro", indiceSonido).get('C2')}, // Use indiceSonido as index
      release: 1
    });
    guiroSampler[id]._currentSound = indiceSonido; // Store current sound for comparison
    
  }

  // Initialize the channel if not created yet
  if (!canalDelGuiro[id]) {
    canalDelGuiro[id] = new Tone.Channel({
      volume: normalizarVolumen(volumen), // Initial volume
      pan: (paneo * 2) - 1,  // Initial pan
    }).toDestination();
  } else {
    // If the channel already exists, update its parameters
    canalDelGuiro[id].volume.value = normalizarVolumen(volumen);
    canalDelGuiro[id].pan.value = (paneo * 2) - 1;
  }

  // Connect the sampler to its corresponding channel
  guiroSampler[id].connect(canalDelGuiro[id]);  // Connect the sampler to the channel
}

   
   

///////////// Sampler del Teclado ///////////// 

let tecladoSampler = {};
let canalDelTeclado = {};

export function tecladoSamplerF(indiceSonido, id, volumen, paneo) {
   
  if (!tecladoSampler[id] || tecladoSampler[id]._currentSoundIndex !== indiceSonido) {
   tecladoSampler[id] = new Tone.Sampler({
          urls: {C5: s.getAudioBuffer("teclado", indiceSonido).get('C5')}, // Use indiceSonido as index
        release: 1
      });
      tecladoSampler[id]._currentSoundIndex = indiceSonido; // Store current sound for comparison 
    }
  
  if (!canalDelTeclado[id]) {    
   canalDelTeclado[id] = new Tone.Channel({
    volume:  normalizarVolumen(volumen), // Volume in decibels
    pan: (paneo * 2) -1,    // Panning from 0 (left) to 1 (right)
  }).toDestination();
  } else {
    // If the channel already exists, update its parameters
    canalDelTeclado[id].volume.value = normalizarVolumen(volumen);
    canalDelTeclado[id].pan.value = (paneo * 2) - 1;
  }

   tecladoSampler[id].connect(canalDelTeclado[id]);

}

///////////// Sampler del Bajo ///////////// 

let bajoSampler = {};
let canalDelBajo = {};

export function bajoSamplerF(indiceSonido, id, volumen, paneo) {
    

  // Initialize or update the sampler if the sound has changed
  if (!bajoSampler[id] || bajoSampler[id]._currentSoundIndex !== indiceSonido) {
    
     bajoSampler[id] = new Tone.Sampler({
      urls: {C4: s.getAudioBuffer("bajo", indiceSonido).get('C4')}, // Use indiceSonido as index
        release: 1
      });
    } 
  
  if (!canalDelBajo[id]) {
   canalDelBajo[id] = new Tone.Channel({
    volume:  normalizarVolumen(volumen), // Volume in decibels
    pan: (paneo * 2) -1,    // Panning from 0 (left) to 1 (right)
  }).toDestination();
  } else {
    // If the channel already exists, update its parameters
    canalDelBajo[id].volume.value = normalizarVolumen(volumen);
    canalDelBajo[id].pan.value = (paneo * 2) - 1;
  }

   bajoSampler[id].connect(canalDelBajo[id]);
}



///////////// Toca secuencia ///////////// 

  // let seq;

export function tocaSecuencia(armonia, instrumento, id, volumen, paneo, indiceSonido, cuantizar, notas, parteTipo, parte, octavaAbsoluta) {
  
  // const id = instrumento + "_" + identificador; //bajo_default

  if (sequences[id]) {
    sequences[id].stop();
    sequences[id].dispose();
    // sequences[id] = null;
    delete sequences[id];  // Remove the reference to the old sequence

  }

  ///////////// Bajo /////////////

  if (instrumento === "bajo") {

    // let indiceSonido = s.sonidos.bajo[indiceSonido].nombre;
    bajoSamplerF(indiceSonido, id, volumen, paneo)

     
      if (parte.length == 0 ) {  
        console.log("¡Comenzando secuencia del bajo!");

        // Create and start the sequence
          
      Tone.loaded().then(() => {
      console.log("Sampler fully loaded!");
        sequences[id] = new Tone.Sequence((time, note) => {
        const letterNote = typeof note === "number" 
        ? Tone.Frequency(note, "midi").toNote()  // condition ? expressionIfTrue : expressionIfFalse;
        : note;
          bajoSampler[id].triggerAttackRelease(letterNote, 0.1, time);
        }, notas, '1m');   // '1m' represents one measure as the interval

        sequences[id].start(0);

      });

      //  bajo (n [[@], [𝅗𝅥 𝅗𝅥], [𝅘𝅥 𝅘𝅥 𝅘𝅥 𝅘𝅥], []])   
  } else if (parte.length > 0) {
     console.log("¡Comenzando tumbao del bajo!")

     let _armonia = a.armoniaEnNotasExplicitas(armonia);    
     let _parte = a.lineaDelBajo(parte, _armonia, octavaAbsoluta);

     Tone.loaded().then(() => {
       sequences[id] = new Tone.Part((time, value) => {
        if (value.note !== null) {
          bajoSampler[id].triggerAttackRelease(value.note, value.duration, time, value.velocity);
        }
    }, _parte).start(0);
       
       
      console.log('Sequence created for bajo', id, sequences[id]);

       sequences[id].loop = true; // Enable looping
       sequences[id].humanize = "128n"; // Add humanization

       let numeroDeCompases = a.numberOfMeasures(_parte);
       sequences[id].loopEnd = numeroDeCompases + 1 + "m"
              

     })
  }
}
    
///////////// Teclado /////////////

  if (instrumento === "teclado"){
      
    // let indiceSonido = s.sonidos.teclado[indiceSonido].nombre;  
    tecladoSamplerF(indiceSonido, id, volumen, paneo);
    
     if (parteTipo === null) {  // Logical operator corrected
        console.log("¡Comenzando secuencia del teclado!");
  
// let secuenciaDeNotasYacordes = crearAcordeDesdeLista(['E4', 'C4 D5 E5   ']); 
//     let secuenciaDeNotasYacordes = a.crearAcordeDesdeLista(notas); 
//    console.log("sec de notas y acordes", secuenciaDeNotasYacordes)

//        Tone.loaded().then(() => {
//       secuenciaDeNotasYacordes.forEach(function (n, index){            
//         new Tone.Sequence((time, note) => {
//          tecladoSampler[id].triggerAttackRelease(note, 0.1, time);
// }, n, '1m').start(0);
//       });
//    });
       
 
    Tone.loaded().then(() => {
       sequences[id] =  new Tone.Sequence((time, note) => {
         const letterNote = typeof note === "number" 
        ? Tone.Frequency(note, "midi").toNote()  // condition ? expressionIfTrue : expressionIfFalse;
        : note;
         tecladoSampler[id].triggerAttackRelease(letterNote, 0.1, time);
    }, notas, '1m').start(0);
      });

       
                    
} else if (parteTipo === 'acompanamiento' || parteTipo === 'acompañamiento') {
     console.log("¡Comenzando acompañamiento del teclado!")
    
    // const parteTeclado = [{ "time": "0:1:0", "note": ['C4', 'E4', 'G4'], "duration": "4n" }, { "time": "0:3:0", "note": ['G4', 'B4', 'D4'], "duration": "4n" }]
   // :: [{time, note, duration} , ... ] -> [{tonal chord}] -> [{time, note duration}, ...]

    let armoniaT = a.armoniaEnNotasExplicitas(armonia);    
    // let eParte = { "time": "0:0:0", "note": 1, "duration": "4n", "octavaRelativa": 0 }
    // let acorde = Tonal.Chord.get('Cmaj')
    
    // let parteTeclado_ =  a.asignarNotasSegunGradosDelAcordeTeclado(eParte, acorde, octavaAbsoluta);
    let parteTeclado_ =  a.acordesDelTeclado(parte, armoniaT, octavaAbsoluta);
    
    // :: [{time, note, duration} , ... ] -> [{tonal chord}] -> [{time, note duration}, ...]
 // function listaDeGradosAlistaDeNotasTeclado(elementosParteList, chordPropertiesList, octavaAbsoluta)
          
     Tone.loaded().then(() => {
       sequences[id] = new Tone.Part((time, value) => {
        if (value.note !== null) {
          tecladoSampler[id].triggerAttackRelease(value.note, value.duration, time, value.velocity);  
        }
         // console.log("acorde", value.note);
    }, parteTeclado_).start(0);

       console.log('Sequence created for teclado' + id.toString(), id, sequences[id]);

      sequences[id].loop = true; // Enable looping
      sequences[id].humanize = "128n"; // Add humanization
  
       let numeroDeCompases = a.numberOfMeasures(parteTeclado_);
       sequences[id].loopEnd = numeroDeCompases + 1 + "m"
     });

     
  } else if (parteTipo === 'punteo') {
      console.log("¡Comenzando melodía del teclado!")
      let armoniaT = a.armoniaEnNotasExplicitas(armonia);    
      let parteTeclado_ =  a.lineaMelodica(parte, armoniaT, octavaAbsoluta);
      
      console.log("Before adornar:", parteTeclado_);
      console.log("Raw harmony:", armonia); // This should show [['Cmaj'], ['Dm']]
    
      // Enhanced melody ornamentation with jazz approach
      const configuracionMelodia = {
        densidadPasos: 0.7, // More passing notes
        usarEscalaJazz: true,
        tipoOrnamento: 'scalar', // Use chord scales
        mantenerNotasObjetivo: true,
        subdivisionMinima: '16n', // Minimum note duration for ornaments
        espaciadoPasos: 1, 

        // swing: 0.1, //coming from p.generarRitmoJazz
        // variacionDuracion: true
      };

    

      // Use the raw harmony array instead of armoniaT
      parteTeclado_ = p.adornarMelodia(parteTeclado_, armonia, configuracionMelodia);
      console.log("After adronar melodia", parteTeclado_);


      Tone.loaded().then(() => {
        sequences[id] = new Tone.Part((time, value) => {
            // Different velocity for ornamental notes
            const finalVelocity = value.ornament ? value.velocity * 0.8 : value.velocity;

            if (value.note !== null) {
            tecladoSampler[id].triggerAttackRelease(value.note, value.duration, time, finalVelocity);  
            // console.log("Playing note:", value.note, "at", time, "ornament:", !!value.ornament);
            }
          }, parteTeclado_).start(0);
 
     console.log('Enhanced sequence created for teclado' + id.toString(), id, sequences[id]);
 
       sequences[id].loop = true; // Enable looping
       sequences[id].humanize = "128n"; // Add humanization
   
        let numeroDeCompases = a.numberOfMeasures(parteTeclado_);
        sequences[id].loopEnd = numeroDeCompases + 1 + "m"
      });
      // const parteTeclado = [{ "time": "0:1:0", "note": ['C4', 'E4', 'G4'], "duration": "4n" }, { "time": "0:3:0", "note": ['G4', 'B4', 'D4'], "duration": "4n" }] 
}
  }
  
  
  
  ///////////// Bombo /////////////


   if (instrumento === "bombo") {   
     
     

    // let indiceSonido = s.sonidos.bombo[indiceSonido].nombre;
     bomboSamplerF(indiceSonido, id, volumen, paneo);
     
     if (parte.length == 0 ) {  
        console.log("¡Comenzando secuencia del bombo!");

        // Create and start the sequence
        
      Tone.loaded().then(() => {
      console.log("Sampler fully loaded!");
        sequences[id] = new Tone.Sequence((time, note) => {
          bomboSampler[id].triggerAttackRelease(note, 0.1, time);
        }, notas, '1m');   // '1m' represents one measure as the interval

        sequences[id].start(0);

      });

  } else if (parte.length > 0) {
     console.log("¡Comenzando ritmo del bombo!")

      let parteDelBombo =  r.filtrarYaplanarParte(parte)

      Tone.loaded().then(() => {
       sequences[id] = new Tone.Part((time, value) => {
        if (value.note !== null) {
          bomboSampler[id].triggerAttackRelease(value.note, value.duration, time, value.velocity);
        }
    }, parteDelBombo).start(0);
        
      console.log('Sequence created for bombo' + id.toString(), id, sequences[id]);

      sequences[id].loop = true; // Enable looping
      sequences[id].humanize = "128n"; // Add humanization  
       let numeroDeCompases = a.numberOfMeasures(parteDelBombo);
       sequences[id].loopEnd = numeroDeCompases + 1 + "m"
     })
   }
   }
  
  //////////////////////jamblock////////////////////


  if (instrumento === "jamblock" || instrumento === "jam")  {   
     
     jamblockSamplerF(indiceSonido, id, volumen, paneo);
     
     if (parte.length == 0 ) {  
        console.log("¡Comenzando secuencia del jamblock!");

        // Create and start the sequence
        
      Tone.loaded().then(() => {
      console.log("Sampler fully loaded!");
        sequences[id] = new Tone.Sequence((time, note) => {
          jamblockSampler[id].triggerAttackRelease(note, 0.1, time);
        }, notas, '1m');   // '1m' represents one measure as the interval

        sequences[id].start(0);

      });

  } else if (parte.length > 0) {
     console.log("¡Comenzando ritmo del jamblock!")

      let parteDelJamblock =  r.filtrarYaplanarParte(parte)

      Tone.loaded().then(() => {
       sequences[id] = new Tone.Part((time, value) => {
        jamblockSampler[id].triggerAttackRelease(value.note, value.duration, time, value.velocity);
    }, parteDelJamblock).start(0);
        
      console.log('Sequence created for jamblock' + id.toString(), id, sequences[id]);

      sequences[id].loop = true; // Enable looping
      sequences[id].humanize = "128n"; // Add humanization  
      let numeroDeCompases = a.numberOfMeasures(parteDelJamblock);
      sequences[id].loopEnd = numeroDeCompases + 1 + "m"
     })
   }
   }
  
  
  
  ///////////////contratiempos
  
  
  if (instrumento === "contratiempo" || instrumento === "contratiempos" || instrumento === "contras")  {
    
    // let indiceSonido = s.sonidos.contratiempo[indiceSonido].nombre;
    contrasSamplerF(indiceSonido, id, volumen, paneo);     
  
    if (parte.length == 0 ) {  
        console.log("¡Comenzando secuencia del contratiempo!");

        // Create and start the sequence
        
      Tone.loaded().then(() => {
      console.log("Sampler fully loaded!");
        sequences[id] = new Tone.Sequence((time, note) => {
          contrasSampler[id].triggerAttackRelease(note, 0.1, time);
        }, notas, '1m');   // '1m' represents one measure as the interval

        sequences[id].start(0);

      });

  } else if (parte.length > 0) {
     console.log("¡Comenzando ritmo del contratiempo!")

    
    let parteDelContratiempo =  r.filtrarYaplanarParte(parte)
     
      Tone.loaded().then(() => {
       sequences[id] = new Tone.Part((time, value) => {
        contrasSampler[id].triggerAttackRelease(value.note, value.duration, time, value.velocity);
    }, parteDelContratiempo).start(0);
        
      console.log('Sequence created for contras' + id.toString(), id, sequences[id]);

      sequences[id].loop = true; // Enable looping
      sequences[id].humanize = "128n"; // Add humanization  
       let numeroDeCompases = a.numberOfMeasures(parteDelContratiempo);
       sequences[id].loopEnd = numeroDeCompases + 1 + "m"
     });
   }
  }
  
  
  ///////////////conga///////////////
  
  
  if (instrumento === "congas")  {
    
    // let indiceSonido = s.sonidos.congas[indiceSonido].nombre;
    congaSamplerF(indiceSonido, id, volumen, paneo);     
  
    if (parte.length == 0 ) {  
        console.log("¡Comenzando secuencia del conga!");

        // Create and start the sequence
        
      Tone.loaded().then(() => {
      console.log("Sampler fully loaded!");
        sequences[id] = new Tone.Sequence((time, note) => {
          congaSampler[id].triggerAttackRelease(note, 0.1, time);
        }, notas, '1m');   // '1m' represents one measure as the interval

        sequences[id].start(0);

      });

  } else if (parte.length > 0) {
     console.log("¡Comenzando ritmo del conga!")

    
    let parteDeLaConga =  r.filtrarYaplanarParte(parte)
     
      Tone.loaded().then(() => {
       sequences[id] = new Tone.Part((time, value) => {
        congaSampler[id].triggerAttackRelease(value.note, value.duration, time, value.velocity);
    }, parteDeLaConga).start(0);
        
      console.log('Sequence created for conga' + id.toString(), id, sequences[id]);

      sequences[id].loop = true; // Enable looping
      sequences[id].humanize = "128n"; // Add humanization  
       let numeroDeCompases = a.numberOfMeasures(parteDeLaConga);
       sequences[id].loopEnd = numeroDeCompases + 1 + "m"
     });
   }
  }


   ///////////// guiro /////////////


   if (instrumento === "guiro") {   
     
     

    // let indiceSonido = s.sonidos.guiro[indiceSonido].nombre;
     guiroSamplerF(indiceSonido, id, volumen, paneo);
     
     if (parte.length == 0 ) {  
        console.log("¡Comenzando secuencia del guiro!");

        // Create and start the sequence
        
      Tone.loaded().then(() => {
      console.log("Sampler fully loaded!");
        sequences[id] = new Tone.Sequence((time, note) => {
          guiroSampler[id].triggerAttackRelease(note, 0.1, time);
        }, notas, '1m');   // '1m' represents one measure as the interval

        sequences[id].start(0);

      });

  } else if (parte.length > 0) {
     console.log("¡Comenzando ritmo del guiro!")

      let parteDelguiro =  r.filtrarYaplanarParte(parte)

      Tone.loaded().then(() => {
       sequences[id] = new Tone.Part((time, value) => {
        guiroSampler[id].triggerAttackRelease(value.note, value.duration, time, value.velocity);
    }, parteDelguiro).start(0);
        
      console.log('Sequence created for guiro' + id.toString(), id, sequences[id]);

      sequences[id].loop = true; // Enable looping
      sequences[id].humanize = "128n"; // Add humanization
  
       let numeroDeCompases = a.numberOfMeasures(parteDelguiro);
       sequences[id].loopEnd = numeroDeCompases + 1 + "m"
     })
   }
   }
  
  
}
  



