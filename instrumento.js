import * as a from "./armonia.js";
import * as r from "./ritmo.js";
import * as s from './sonidos.js';
import * as p from "./punteo.js"


///////////// linear transformation para normalizar/mapear 0 a -60db y 1 a 0db ///////////// 

// :: Number => Number
function normalizarVolumen(v) {
  return ((60 * v) - 60)
}

///////////// Establecer Tempo ///////////// 

// :: number => Number
// export function establecerTempo(t) {
//   Tone.Transport.bpm.value = t * 2;

//   if (Tone.Transport.state !== "started") {
//     Tone.Transport.start(); // start with a tiny 0.1s delay
//   }
// }

export function establecerTempo(t) {
  Tone.Transport.bpm.value = t * 2;

  if (Tone.Transport.state !== "started") {
    // const startTime = Tone.now() + 0.1;
    // Tone.Transport.start(startTime);
    Tone.Transport.start("+0.1"); 
    // elay to be safe
  }

  // Return current global time for scheduling
  return Tone.now();
}
///////////// Detener secuencia ///////////// 

export function stopSequence(docId = null) {



  // Dispose of all bombo samplers

  // (if your IDs include docId prefix like "doc_0_jam_default")


  Object.keys(bomboSampler)
    .filter(id => id.startsWith(docId))
    .forEach(id => {
      bomboSampler[id].dispose();
      delete bomboSampler[id];  // Remove reference
    });

  // Dispose of all bombo channels
  Object.keys(canalDelBombo)
    .filter(id => id.startsWith(docId))
    .forEach(id => {
      canalDelBombo[id].dispose();
      delete canalDelBombo[id];  // Remove reference
    });

  // Dispose of all bombo effects
  Object.keys(efectosDelBombo)
    .filter(id => id.startsWith(docId))
    .forEach(id => {
      if (efectosDelBombo[id].delay) {
        efectosDelBombo[id].delay.dispose();
      }
      if (efectosDelBombo[id].reverb) {
        efectosDelBombo[id].reverb.dispose();
      }
      delete efectosDelBombo[id];
    });

  // Dispose of all jam samplers
  Object.keys(jamblockSampler)
    .filter(id => id.startsWith(docId))
    .forEach(id => {
      jamblockSampler[id].dispose();
      delete jamblockSampler[id];  // Remove reference
    });

  // Dispose of all jam channels
  Object.keys(canalDelJamblock)
    .filter(id => id.startsWith(docId))
    .forEach(id => {
      canalDelJamblock[id].dispose();
      delete canalDelJamblock[id];  // Remove reference
    });

  // Dispose of all Jamblock effects
  Object.keys(efectosDelJamblock)
    .filter(id => id.startsWith(docId))
    .forEach(id => {
      if (efectosDelJamblock[id].delay) {
        efectosDelJamblock[id].delay.dispose();
      }
      if (efectosDelJamblock[id].reverb) {
        efectosDelJamblock[id].reverb.dispose();
      }
      delete efectosDelJamblock[id];
    });

  // Dispose of all guiro samplers
  Object.keys(guiroSampler)
    .filter(id => id.startsWith(docId))
    .forEach(id => {
      guiroSampler[id].dispose();
      delete guiroSampler[id];  // Remove reference
    });

  // Dispose of all guiro channels
  Object.keys(canalDelGuiro)
    .filter(id => id.startsWith(docId))
    .forEach(id => {
      canalDelGuiro[id].dispose();
      delete canalDelGuiro[id];  // Remove reference
    });

  // Dispose of all guiro effects
  Object.keys(efectosDelGuiro)
    .filter(id => id.startsWith(docId))
    .forEach(id => {
      if (efectosDelGuiro[id].delay) {
        efectosDelGuiro[id].delay.dispose();
      }
      if (efectosDelGuiro[id].reverb) {
        efectosDelGuiro[id].reverb.dispose();
      }
      delete efectosDelGuiro[id];
    });

  // Dispose of all contras samplers
  Object.keys(contrasSampler)
    .filter(id => id.startsWith(docId))
    .forEach(id => {
      contrasSampler[id].dispose();
      delete contrasSampler[id];  // Remove reference
    });

  // Dispose of all contras channels
  Object.keys(canalDelContratiempo)
    .filter(id => id.startsWith(docId))
    .forEach(id => {
      canalDelContratiempo[id].dispose();
      delete canalDelContratiempo[id];  // Remove reference
    });

  // Dispose of all contras effects
  Object.keys(efectosDelContratiempo)
    .filter(id => id.startsWith(docId))
    .forEach(id => {
      if (efectosDelContratiempo[id].delay) {
        efectosDelContratiempo[id].delay.dispose();
      }
      if (efectosDelContratiempo[id].reverb) {
        efectosDelContratiempo[id].reverb.dispose();
      }
      delete efectosDelContratiempo[id];
    });

  // Dispose of all teclado samplers
  Object.keys(tecladoSampler)
    .filter(id => id.startsWith(docId))
    .forEach(id => {
      tecladoSampler[id].dispose();
      delete tecladoSampler[id];  // Remove reference
    });

  // Dispose of all teclado channels
  Object.keys(canalDelTeclado)
    .filter(id => id.startsWith(docId))
    .forEach(id => {
      canalDelTeclado[id].dispose();
      delete canalDelTeclado[id];  // Remove reference
    });

  // Dispose of all teclado effects
  Object.keys(efectosDelTeclado)
    .filter(id => id.startsWith(docId))
    .forEach(id => {
      if (efectosDelTeclado[id].delay) {
        efectosDelTeclado[id].delay.dispose();
      }
      if (efectosDelTeclado[id].reverb) {
        efectosDelTeclado[id].reverb.dispose();
      }
      delete efectosDelTeclado[id];
    });

  // Dispose of all bajo samplers
  Object.keys(bajoSampler)
    .filter(id => id.startsWith(docId))
    .forEach(id => {
      bajoSampler[id].dispose();
      delete bajoSampler[id];  // Remove reference
    });

  // Dispose of all bajo channels
  Object.keys(canalDelBajo)
    .filter(id => id.startsWith(docId))
    .forEach(id => {
      canalDelBajo[id].dispose();
      delete canalDelBajo[id];  // Remove reference
    });

  // Dispose of all bajo effects
  Object.keys(efectosDelBajo)
    .filter(id => id.startsWith(docId))
    .forEach(id => {
      if (efectosDelBajo[id].delay) {
        efectosDelBajo[id].delay.dispose();
      }
      if (efectosDelBajo[id].reverb) {
        efectosDelBajo[id].reverb.dispose();
      }
      delete efectosDelBajo[id];
    });

  // Dispose of all congas samplers
  Object.keys(congaSampler)
    .filter(id => id.startsWith(docId))
    .forEach(id => {
      congaSampler[id].dispose();
      delete congaSampler[id];  // Remove reference
    });

  // Dispose of all congas channels
  Object.keys(canalDeLaConga)
    .filter(id => id.startsWith(docId))
    .forEach(id => {
      canalDeLaConga[id].dispose();
      delete canalDeLaConga[id];  // Remove reference
    });
  // Dispose of all congas effects
  Object.keys(efectosDeLaConga)
    .filter(id => id.startsWith(docId))
    .forEach(id => {
      if (efectosDeLaConga[id].delay) {
        efectosDeLaConga[id].delay.dispose();
      }
      if (efectosDeLaConga[id].reverb) {
        efectosDeLaConga[id].reverb.dispose();
      }
      delete efectosDeLaConga[id];
    });

  // Dispose of all sequences
  if (sequencesByDoc[docId]) {
    const sequences = sequencesByDoc[docId];
    Object.keys(sequences).forEach(id => {
      const now = Math.max(0, Tone.now());
      sequences[id].stop(now);   // stop safely, clamped to ≥ 0
      sequences[id].dispose();
      delete sequences[id];
    });
    delete sequencesByDoc[docId]; // Clean up the document entry
  };


  // Stop the transport
  // Tone.Transport.stop();

  // Reset Transport position if needed
  // Tone.Transport.position = 0;

  // Check if any other doc still has active sequences
  const otherDocsActive = Object.keys(sequencesByDoc).some(otherId => {
    return otherId !== docId && Object.keys(sequencesByDoc[otherId]).length > 0;
  });

  // Only reset if no other document is active
  // if (!otherDocsActive) {
  //   Tone.Transport.position = 0;
  // }
    Tone.Transport.position = 0;
    Tone.Transport.stop();
    console.log("Transport position reset to 0");

}

export function desconectarPistasBorradas(id, docId) {

  // Construct a namespaced key for this document
  const key = `${docId}_${id}`;

  // Stop and dispose of any sequences if they exist
  if (sequencesByDoc[docId] && sequencesByDoc[docId][id]) {
    sequencesByDoc[docId][id].stop();
    sequencesByDoc[docId][id].dispose();
    delete sequencesByDoc[docId][id];
    console.log(`Sequence ${id} disposed from doc ${docId}`);
  }

  if (bomboSampler[key]) {
    bomboSampler[key].releaseAll();
    bomboSampler[key].disconnect();
    bomboSampler[key].dispose();
    delete bomboSampler[key];
  }

  if (canalDelBombo[key]) {
    canalDelBombo[key].disconnect();
    canalDelBombo[key].dispose();
    delete canalDelBombo[key];
  }

  // desconectar efectos de pistas del Bombo borradas
  if (efectosDelBombo[key]) {
    if (efectosDelBombo[key].delay) {
      efectosDelBombo[key].delay.disconnect();
      efectosDelBombo[key].delay.dispose();
    }
    if (efectosDelBombo[key].reverb) {
      efectosDelBombo[key].reverb.disconnect();
      efectosDelBombo[key].reverb.dispose();
    }
    delete efectosDelBombo[key];
  }

  if (jamblockSampler[key]) {
    jamblockSampler[key].releaseAll();
    jamblockSampler[key].disconnect();
    jamblockSampler[key].dispose();
    delete jamblockSampler[key];
  }



  if (canalDelJamblock[key]) {
    canalDelJamblock[key].disconnect();
    canalDelJamblock[key].dispose();
    delete canalDelJamblock[key];
  }

  // desconectar efectos de pistas del jamblock borradas
  if (efectosDelJamblock[key]) {
    if (efectosDelJamblock[key].delay) {
      efectosDelJamblock[key].delay.disconnect();
      efectosDelJamblock[key].delay.dispose();
    }
    if (efectosDelJamblock[key].reverb) {
      efectosDelJamblock[key].reverb.disconnect();
      efectosDelJamblock[key].reverb.dispose();
    }
    delete efectosDelJamblock[key];
  }


  if (guiroSampler[key]) {
    guiroSampler[key].releaseAll();
    guiroSampler[key].disconnect();
    guiroSampler[key].dispose();
    delete guiroSampler[key];
  }

  if (canalDelGuiro[key]) {
    canalDelGuiro[key].disconnect();
    canalDelGuiro[key].dispose();
    delete canalDelGuiro[key];
  }

  // desconectar efectos de pistas del Guiro borradas
  if (efectosDelGuiro[key]) {
    if (efectosDelGuiro[key].delay) {
      efectosDelGuiro[key].delay.disconnect();
      efectosDelGuiro[key].delay.dispose();
    }
    if (efectosDelGuiro[key].reverb) {
      efectosDelGuiro[key].reverb.disconnect();
      efectosDelGuiro[key].reverb.dispose();
    }
    delete efectosDelGuiro[key];
  }


  if (contrasSampler[key]) {
    contrasSampler[key].releaseAll();
    contrasSampler[key].disconnect();
    contrasSampler[key].dispose();
    delete contrasSampler[key];
  }

  if (canalDelContratiempo[key]) {
    canalDelContratiempo[key].disconnect();
    canalDelContratiempo[key].dispose();
    delete canalDelContratiempo[key];
  }

  // desconectar efectos de pistas del Contratiempo borradas
  if (efectosDelContratiempo[key]) {
    if (efectosDelContratiempo[key].delay) {
      efectosDelContratiempo[key].delay.disconnect();
      efectosDelContratiempo[key].delay.dispose();
    }
    if (efectosDelContratiempo[key].reverb) {
      efectosDelContratiempo[key].reverb.disconnect();
      efectosDelContratiempo[key].reverb.dispose();
    }
    delete efectosDelContratiempo[key];
  }

  if (tecladoSampler[key]) {
    tecladoSampler[key].releaseAll();
    tecladoSampler[key].disconnect();
    tecladoSampler[key].dispose();
    delete tecladoSampler[key];
  }

  if (canalDelTeclado[key]) {
    canalDelTeclado[key].disconnect();
    canalDelTeclado[key].dispose();
    delete canalDelTeclado[key];
  }

  // desconectar efectos de pistas del teclado borradas
  if (efectosDelTeclado[key]) {
    if (efectosDelTeclado[key].delay) {
      efectosDelTeclado[key].delay.disconnect();
      efectosDelTeclado[key].delay.dispose();
    }
    if (efectosDelTeclado[key].reverb) {
      efectosDelTeclado[key].reverb.disconnect();
      efectosDelTeclado[key].reverb.dispose();
    }
    delete efectosDelTeclado[key];
  }

  if (bajoSampler[key]) {
    bajoSampler[key].releaseAll();
    bajoSampler[key].disconnect();
    bajoSampler[key].dispose();
    delete bajoSampler[key];
  }

  if (canalDelBajo[key]) {
    canalDelBajo[key].disconnect();
    canalDelBajo[key].dispose();
    delete canalDelBajo[key];
  }

  // desconectar efectos de pistas del Bajo borradas
  if (efectosDelBajo[key]) {
    if (efectosDelBajo[key].delay) {
      efectosDelBajo[key].delay.disconnect();
      efectosDelBajo[key].delay.dispose();
    }
    if (efectosDelBajo[key].reverb) {
      efectosDelBajo[key].reverb.disconnect();
      efectosDelBajo[key].reverb.dispose();
    }
    delete efectosDelBajo[key];
  }

  if (congaSampler[key]) {
    congaSampler[key].releaseAll();
    congaSampler[key].disconnect();
    congaSampler[key].dispose();
    delete congaSampler[key];
  }

  if (canalDeLaConga[key]) {
    canalDeLaConga[key].disconnect();
    canalDeLaConga[key].dispose();
    delete canalDeLaConga[key];
  }


  // desconectar efectos de pistas de la conga borradas
  if (efectosDeLaConga[key]) {
    if (efectosDeLaConga[key].delay) {
      efectosDeLaConga[key].delay.disconnect();
      efectosDeLaConga[key].delay.dispose();
    }
    if (efectosDeLaConga[key].reverb) {
      efectosDeLaConga[key].reverb.disconnect();
      efectosDeLaConga[key].reverb.dispose();
    }
    delete efectosDeLaConga[key];
  }

}


///////////// Definiciones globales de instrumentos ///////////// 

// let seq1, seq2, seq3, seq4, seq5, canalDelTeclado2;
const sequencesByDoc = {};  // { docId: { seqId: Tone.Sequence|Part, ... }, ... }

///////////// Sampler de la conga ///////////// 


let congaSampler = {};  // Initialize bomboSampler as an object to store multiple samplers
let canalDeLaConga = {}; // Initialize canalDelBombo as an object to store multiple channels
let efectosDeLaConga = {};

export function congaSamplerF(indiceSonido, id, volumen, rampDuration, paneo, efectosConfig = {}) {

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

  // Default effect settings
  const defaultConfig = {
    delayWet: 0,    // 0 = completely dry (off), 1 = completely wet (on)
    reverbWet: 0,   // 0 = completely dry (off), 1 = completely wet (on)
    delayTime: "8n",
    delayFeedback: 0.3,
    reverbDecay: 3,
    reverbPreDelay: 0.2
  };

  // Merge with provided config
  const config = { ...defaultConfig, ...efectosConfig };


  // Efectos por canal
  if (!efectosDeLaConga[id]) {
    let delay = new Tone.FeedbackDelay(config.delayTime, config.delayFeedback) //tiempo, feedback
    let reverb = new Tone.Reverb({
      decay: config.reverbDecay,
      preDelay: config.reverbPreDelay
    });

    //set initial dry/wet (off/on) values
    delay.wet.value = config.delayWet;
    reverb.wet.value = config.reverbWet;

    //crear canal
    canalDeLaConga[id] = new Tone.Channel({
      volume: normalizarVolumen(volumen), // Volume in decibels
      pan: (paneo * 2) - 1,    // Panning from 0 (left) to 1 (right)
    }).toDestination();

    //Cadena de efectos: Sample -> Delay -> Reverb -> Canal -> Destination
    congaSampler[id].chain(delay, reverb, canalDeLaConga[id]);
    efectosDeLaConga[id] = { delay, reverb }; //guardar referencias 

  } else {
    // If the channel already exists, update its parameters with ramp

    if (rampDuration > 0) {
      canalDeLaConga[id].volume.linearRampTo(normalizarVolumen(volumen), rampDuration);
    } else {
      canalDeLaConga[id].volume.value = normalizarVolumen(volumen);
    }
    canalDeLaConga[id].pan.value = (paneo * 2) - 1;

    // Update wet/dry values if provided
    if (config.delayWet !== undefined) {
      efectosDeLaConga[id].delay.wet.value = config.delayWet;
    }
    if (config.reverbWet !== undefined) {
      efectosDeLaConga[id].reverb.wet.value = config.reverbWet;
    }
  }

  // Connect the sampler to its corresponding channel
  // congaSampler[id].connect(canalDeLaConga[id]);  
}

// Simple function to control effect wetness (0 = off, 1 = full effect)
export function setCongaEffects(id, delayWet = 0, reverbWet = 0) {
  if (!efectosDeLaConga[id]) {
    console.log(`No effects found for congas ${id}`);
    return;
  }

  efectosDeLaConga[id].delay.wet.value = delayWet;
  efectosDeLaConga[id].reverb.wet.value = reverbWet;

  console.log(`Conga ${id} effects - Delay: ${delayWet * 100}%, Reverb: ${reverbWet * 100}%`);
}

export function congaEffectsOn(id, preset = 'apagado') {
  const presets = {
    apagado: [0, 0],
    ligero: [0.15, 0.1],     // Light effects  
    moderado: [0.3, 0.2],    // Moderate delay and reverb
    alto: [0.6, 0.5],      // Heavy effects
    delay: [0.4, 0],    // Only delay
    reverb: [0, 0.4]    // Only reverb
  };

  const [delayWet, reverbWet] = presets[preset] || presets.default;
  setCongaEffects(id, delayWet, reverbWet);
}


///////////// Sampler del bombo ///////////// 


let bomboSampler = {};  // Initialize bomboSampler as an object to store multiple samplers
let canalDelBombo = {}; // Initialize canalDelBombo as an object to store multiple channels
let efectosDelBombo = {};

export function bomboSamplerF(indiceSonido, id, volumen, rampDuration, paneo, efectosConfig = {}) {

  // Initialize the sampler if it's not already created or if sound changed
  if (!bomboSampler[id] || bomboSampler[id]._currentSound !== indiceSonido) {

    bomboSampler[id] = new Tone.Sampler({
      urls: { C4: s.getAudioBuffer("bombo", indiceSonido).get('C2') }, // Use indiceSonido as index
      release: 1
    });
    bomboSampler[id]._currentSound = indiceSonido; // Store current sound for comparison

  }

  // Default effect settings
  const defaultConfig = {
    delayWet: 0,    // 0 = completely dry (off), 1 = completely wet (on)
    reverbWet: 0,   // 0 = completely dry (off), 1 = completely wet (on)
    delayTime: "8n",
    delayFeedback: 0.3,
    reverbDecay: 3,
    reverbPreDelay: 0.2
  };

  // Merge with provided config
  const config = { ...defaultConfig, ...efectosConfig };


  // Efectos por canal
  if (!efectosDelBombo[id]) {
    let delay = new Tone.FeedbackDelay(config.delayTime, config.delayFeedback) //tiempo, feedback
    let reverb = new Tone.Reverb({
      decay: config.reverbDecay,
      preDelay: config.reverbPreDelay
    });

    //set initial dry/wet (off/on) values
    delay.wet.value = config.delayWet;
    reverb.wet.value = config.reverbWet;

    //crear canal
    canalDelBombo[id] = new Tone.Channel({
      volume: normalizarVolumen(volumen), // Volume in decibels
      pan: (paneo * 2) - 1,    // Panning from 0 (left) to 1 (right)
    }).toDestination();

    //Cadena de efectos: Sample -> Delay -> Reverb -> Canal -> Destination
    bomboSampler[id].chain(delay, reverb, canalDelBombo[id]);
    efectosDelBombo[id] = { delay, reverb }; //guardar referencias 
  } else {
    // If the channel already exists, update its parameters

    if (rampDuration > 0) {
      canalDelBombo[id].volume.linearRampTo(normalizarVolumen(volumen), rampDuration);
    } else {
      canalDelBombo[id].volume.value = normalizarVolumen(volumen);
    }

    canalDelBombo[id].pan.value = (paneo * 2) - 1;
    // Update wet/dry values if provided
    if (config.delayWet !== undefined) {
      efectosDelBombo[id].delay.wet.value = config.delayWet;
    }
    if (config.reverbWet !== undefined) {
      efectosDelBombo[id].reverb.wet.value = config.reverbWet;
    }
  }

  // Connect the sampler to its corresponding channel
  // bomboSampler[id].connect(canalDelBombo[id]);  
}

// Simple function to control effect wetness (0 = off, 1 = full effect)
export function setBomboEffects(id, delayWet = 0, reverbWet = 0) {
  if (!efectosDelBombo[id]) {
    console.log(`No effects found for bombo ${id}`);
    return;
  }

  efectosDelBombo[id].delay.wet.value = delayWet;
  efectosDelBombo[id].reverb.wet.value = reverbWet;

  console.log(`Bombo ${id} effects - Delay: ${delayWet * 100}%, Reverb: ${reverbWet * 100}%`);
}

export function bomboEffectsOn(id, preset = 'apagado') {
  const presets = {
    apagado: [0, 0],
    ligero: [0.15, 0.1],     // Light effects  
    moderado: [0.3, 0.2],    // Moderate delay and reverb
    alto: [0.6, 0.5],      // Heavy effects
    delay: [0.4, 0],    // Only delay
    reverb: [0, 0.4]    // Only reverb
  };

  const [delayWet, reverbWet] = presets[preset] || presets.default;
  setBomboEffects(id, delayWet, reverbWet);
}

///////////// Sampler del jamblock ///////////// 


let jamblockSampler = {};  // Initialize jamblockSampler as an object to store multiple samplers
let canalDelJamblock = {}; // Initialize canalDelJamblock as an object to store multiple channels
let efectosDelJamblock = {};

export function jamblockSamplerF(indiceSonido, id, volumen, rampDuration, paneo, efectosConfig = {}) {

  // Initialize the sampler if it's not already created or if sound changed
  if (!jamblockSampler[id] || jamblockSampler[id]._currentSound !== indiceSonido) {

    jamblockSampler[id] = new Tone.Sampler({
      urls: { C4: s.getAudioBuffer("jamblock", indiceSonido).get('jamblock0') }, // Use indiceSonido as index
      release: 1
    });
    jamblockSampler[id]._currentSound = indiceSonido; // Store current sound for comparison

  }

  // Default effect settings
  const defaultConfig = {
    delayWet: 0,    // 0 = completely dry (off), 1 = completely wet (on)
    reverbWet: 0,   // 0 = completely dry (off), 1 = completely wet (on)
    delayTime: "8n",
    delayFeedback: 0.3,
    reverbDecay: 3,
    reverbPreDelay: 0.2
  };

  // Merge with provided config
  const config = { ...defaultConfig, ...efectosConfig };


  // Efectos por canal
  if (!efectosDelJamblock[id]) {
    let delay = new Tone.FeedbackDelay(config.delayTime, config.delayFeedback) //tiempo, feedback
    let reverb = new Tone.Reverb({
      decay: config.reverbDecay,
      preDelay: config.reverbPreDelay
    });

    //set initial dry/wet (off/on) values
    delay.wet.value = config.delayWet;
    reverb.wet.value = config.reverbWet;

    //crear canal
    canalDelJamblock[id] = new Tone.Channel({
      volume: normalizarVolumen(volumen), // Volume in decibels
      pan: (paneo * 2) - 1,    // Panning from 0 (left) to 1 (right)
    }).toDestination();

    //Cadena de efectos: Sample -> Delay -> Reverb -> Canal -> Destination
    jamblockSampler[id].chain(delay, reverb, canalDelJamblock[id]);
    efectosDelJamblock[id] = { delay, reverb }; //guardar referencias 
  } else {
    // If the channel already exists, update its parameters
    if (rampDuration > 0) {
      canalDelJamblock[id].volume.linearRampTo(normalizarVolumen(volumen), rampDuration);
    } else {
      canalDelJamblock[id].volume.value = normalizarVolumen(volumen);
    }
    canalDelJamblock[id].pan.value = (paneo * 2) - 1;

    // Update wet/dry values if provided
    if (config.delayWet !== undefined) {
      efectosDelJamblock[id].delay.wet.value = config.delayWet;
    }
    if (config.reverbWet !== undefined) {
      efectosDelJamblock[id].reverb.wet.value = config.reverbWet;
    }

  }

  // Connect the sampler to its corresponding channel
  // jamblockSampler[id].connect(canalDelJamblock[id]); 
  jamblockSampler[id].chain(
    efectosDelJamblock[id].delay,
    efectosDelJamblock[id].reverb,
    canalDelJamblock[id]
  );
}

// Simple function to control effect wetness (0 = off, 1 = full effect)
export function setJamblockEffects(id, delayWet = 0, reverbWet = 0) {
  if (!efectosDelJamblock[id]) {
    console.log(`No effects found for Jamblock ${id}`);
    return;
  }

  efectosDelJamblock[id].delay.wet.value = delayWet;
  efectosDelJamblock[id].reverb.wet.value = reverbWet;

  console.log(`Jamblock ${id} effects - Delay: ${delayWet * 100}%, Reverb: ${reverbWet * 100}%`);
}

export function JamblockEffectsOn(id, preset = 'apagado') {
  const presets = {
    apagado: [0, 0],
    ligero: [0.15, 0.1],     // Light effects  
    moderado: [0.3, 0.2],    // Moderate delay and reverb
    alto: [0.6, 0.5],      // Heavy effects
    delay: [0.4, 0],    // Only delay
    reverb: [0, 0.4]    // Only reverb
  };

  const [delayWet, reverbWet] = presets[preset] || presets.default;
  setJamblockEffects(id, delayWet, reverbWet);
}

///////////// Sampler de los contratiempos /////
let contrasSampler = {};
let canalDelContratiempo = {};
let efectosDelContratiempo = {};


export function contrasSamplerF(indiceSonido, id, volumen, rampDuration, paneo, efectosConfig = {}) {


  // Initialize the sampler if it's not already created
  if (!contrasSampler[id] || contrasSampler[id]._currentSound !== indiceSonido) {
    contrasSampler[id] = new Tone.Sampler({
      urls: { C4: s.getAudioBuffer("contratiempo", indiceSonido).get('F%232') }, // Use indiceSonido as index
      release: 1
    });
    contrasSampler[id]._currentSound = indiceSonido; // Store current sound for comparison
  }


  // Default effect settings
  const defaultConfig = {
    delayWet: 0,    // 0 = completely dry (off), 1 = completely wet (on)
    reverbWet: 0,   // 0 = completely dry (off), 1 = completely wet (on)
    delayTime: "8n",
    delayFeedback: 0.3,
    reverbDecay: 3,
    reverbPreDelay: 0.2
  };

  // Merge with provided config
  const config = { ...defaultConfig, ...efectosConfig };


  // Efectos por canal
  if (!efectosDelContratiempo[id]) {
    let delay = new Tone.FeedbackDelay(config.delayTime, config.delayFeedback) //tiempo, feedback
    let reverb = new Tone.Reverb({
      decay: config.reverbDecay,
      preDelay: config.reverbPreDelay
    });

    //set initial dry/wet (off/on) values
    delay.wet.value = config.delayWet;
    reverb.wet.value = config.reverbWet;

    //crear canal
    canalDelContratiempo[id] = new Tone.Channel({
      volume: normalizarVolumen(volumen), // Volume in decibels
      pan: (paneo * 2) - 1,    // Panning from 0 (left) to 1 (right)
    }).toDestination();

    //Cadena de efectos: Sample -> Delay -> Reverb -> Canal -> Destination
    contrasSampler[id].chain(delay, reverb, canalDelContratiempo[id]);
    efectosDelContratiempo[id] = { delay, reverb }; //guardar referencias 
  } else {
    // If the channel already exists, update its parameters
    if (rampDuration > 0) {
      canalDelContratiempo[id].volume.linearRampTo(normalizarVolumen(volumen), rampDuration);
    } else {
      canalDelContratiempo[id].volume.value = normalizarVolumen(volumen);
    }
    canalDelContratiempo[id].pan.value = (paneo * 2) - 1;

    // Update wet/dry values if provided
    if (config.delayWet !== undefined) {
      efectosDelContratiempo[id].delay.wet.value = config.delayWet;
    }
    if (config.reverbWet !== undefined) {
      efectosDelContratiempo[id].reverb.wet.value = config.reverbWet;
    }
  }

  // contrasSampler[id].connect(canalDelContratiempo[id]); 
  contrasSampler[id].chain(
    efectosDelContratiempo[id].delay,
    efectosDelContratiempo[id].reverb,
    canalDelContratiempo[id]
  );

}

// Simple function to control effect wetness (0 = off, 1 = full effect)
export function setContratiempoEffects(id, delayWet = 0, reverbWet = 0) {
  if (!efectosDelContratiempo[id]) {
    console.log(`No effects found for contras ${id}`);
    return;
  }

  efectosDelContratiempo[id].delay.wet.value = delayWet;
  efectosDelContratiempo[id].reverb.wet.value = reverbWet;

  console.log(`Contratiempo ${id} effects - Delay: ${delayWet * 100}%, Reverb: ${reverbWet * 100}%`);
}

export function contratiempoEffectsOn(id, preset = 'apagado') {
  const presets = {
    apagado: [0, 0],
    ligero: [0.15, 0.1],     // Light effects  
    moderado: [0.3, 0.2],    // Moderate delay and reverb
    alto: [0.6, 0.5],      // Heavy effects
    delay: [0.4, 0],    // Only delay
    reverb: [0, 0.4]    // Only reverb
  };

  const [delayWet, reverbWet] = presets[preset] || presets.default;
  setContratiempoEffects(id, delayWet, reverbWet);
}



///////////// Sampler del guiro ///////////// 


let guiroSampler = {};  // Initialize guiroSampler as an object to store multiple samplers
let canalDelGuiro = {}; // Initialize canalDelguiro as an object to store multiple channels
let efectosDelGuiro = {};

export function guiroSamplerF(indiceSonido, id, volumen, rampDuration, paneo, efectosConfig = {}) {

  // Initialize the sampler if it's not already created or if sound changed
  if (!guiroSampler[id] || guiroSampler[id]._currentSound !== indiceSonido) {

    guiroSampler[id] = new Tone.Sampler({
      urls: { C4: s.getAudioBuffer("guiro", indiceSonido).get('C2') }, // Use indiceSonido as index
      release: 1
    });
    guiroSampler[id]._currentSound = indiceSonido; // Store current sound for comparison
  }

  // Default effect settings
  const defaultConfig = {
    delayWet: 0,    // 0 = completely dry (off), 1 = completely wet (on)
    reverbWet: 0,   // 0 = completely dry (off), 1 = completely wet (on)
    delayTime: "8n",
    delayFeedback: 0.3,
    reverbDecay: 3,
    reverbPreDelay: 0.2
  };

  // Merge with provided config
  const config = { ...defaultConfig, ...efectosConfig };


  // Efectos por canal
  if (!efectosDelGuiro[id]) {
    let delay = new Tone.FeedbackDelay(config.delayTime, config.delayFeedback) //tiempo, feedback
    let reverb = new Tone.Reverb({
      decay: config.reverbDecay,
      preDelay: config.reverbPreDelay
    });

    //set initial dry/wet (off/on) values
    delay.wet.value = config.delayWet;
    reverb.wet.value = config.reverbWet;

    //crear canal
    canalDelGuiro[id] = new Tone.Channel({
      volume: normalizarVolumen(volumen), // Volume in decibels
      pan: (paneo * 2) - 1,    // Panning from 0 (left) to 1 (right)
    }).toDestination();

    //Cadena de efectos: Sample -> Delay -> Reverb -> Canal -> Destination
    guiroSampler[id].chain(delay, reverb, canalDelGuiro[id]);
    efectosDelGuiro[id] = { delay, reverb }; //guardar referencias 
  } else {
    // If the channel already exists, update its parameters
    if (rampDuration > 0) {
      canalDelGuiro[id].volume.linearRampTo(normalizarVolumen(volumen), rampDuration);
    } else {
      canalDelGuiro[id].volume.value = normalizarVolumen(volumen);
    }

    canalDelGuiro[id].pan.value = (paneo * 2) - 1;

    // Update wet/dry values if provided
    if (config.delayWet !== undefined) {
      efectosDelGuiro[id].delay.wet.value = config.delayWet;
    }
    if (config.reverbWet !== undefined) {
      efectosDelGuiro[id].reverb.wet.value = config.reverbWet;
    }
  }

  // Connect the sampler to its corresponding channel
  // guiroSampler[id].connect(canalDelGuiro[id]);  

  guiroSampler[id].chain(
    efectosDelGuiro[id].delay,
    efectosDelGuiro[id].reverb,
    canalDelGuiro[id]
  );
}



// Simple function to control effect wetness (0 = off, 1 = full effect)
export function setGuiroEffects(id, delayWet = 0, reverbWet = 0) {
  if (!efectosDelGuiro[id]) {
    console.log(`No effects found for guiro ${id}`);
    return;
  }

  efectosDelGuiro[id].delay.wet.value = delayWet;
  efectosDelGuiro[id].reverb.wet.value = reverbWet;

  console.log(`Guiro ${id} effects - Delay: ${delayWet * 100}%, Reverb: ${reverbWet * 100}%`);
}

export function guiroEffectsOn(id, preset = 'apagado') {
  const presets = {
    apagado: [0, 0],
    ligero: [0.15, 0.1],     // Light effects  
    moderado: [0.3, 0.2],    // Moderate delay and reverb
    alto: [0.6, 0.5],      // Heavy effects
    delay: [0.4, 0],    // Only delay
    reverb: [0, 0.4]    // Only reverb
  };

  const [delayWet, reverbWet] = presets[preset] || presets.default;
  setGuiroEffects(id, delayWet, reverbWet);
}



///////////// Sampler del Teclado ///////////// 

let tecladoSampler = {};
let canalDelTeclado = {};
// Crear efectos globales o por instancia
let efectosDelTeclado = {};

export function tecladoSamplerF(indiceSonido, id, volumen, rampDuration, paneo, efectosConfig = {}) {

  // Track if we're creating a new sampler
  const isNewSampler = !tecladoSampler[id] || tecladoSampler[id]._currentSoundIndex !== indiceSonido;

  if (isNewSampler) {
    tecladoSampler[id] = new Tone.Sampler({
      urls: { C5: s.getAudioBuffer("teclado", indiceSonido).get('C5') }, // Use indiceSonido as index
      release: 1
    });
    tecladoSampler[id]._currentSoundIndex = indiceSonido; // Store current sound for comparison 
  }



  // Default effect settings
  const defaultConfig = {
    delayWet: 0,    // 0 = completely dry (off), 1 = completely wet (on)
    reverbWet: 0,   // 0 = completely dry (off), 1 = completely wet (on)
    delayTime: "8n",
    delayFeedback: 0.3,
    reverbDecay: 3,
    reverbPreDelay: 0.2
  };

  // Merge with provided config
  const config = { ...defaultConfig, ...efectosConfig };


  // if (!canalDelTeclado[id]) {    
  //  canalDelTeclado[id] = new Tone.Channel({
  //   volume:  normalizarVolumen(volumen), // Volume in decibels
  //   pan: (paneo * 2) -1,    // Panning from 0 (left) to 1 (right)
  // }).toDestination();

  // Efectos por canal
  if (!efectosDelTeclado[id]) {
    let delay = new Tone.FeedbackDelay(config.delayTime, config.delayFeedback) //tiempo, feedback
    let reverb = new Tone.Reverb({
      decay: config.reverbDecay,
      preDelay: config.reverbPreDelay
    });

    //set initial dry/wet (off/on) values
    delay.wet.value = config.delayWet;
    reverb.wet.value = config.reverbWet;

    //crear canal
    canalDelTeclado[id] = new Tone.Channel({
      volume: normalizarVolumen(volumen), // Volume in decibels
      pan: (paneo * 2) - 1,    // Panning from 0 (left) to 1 (right)
    }).toDestination();

    //Cadena de efectos: Sample -> Delay -> Reverb -> Canal -> Destination
    tecladoSampler[id].chain(delay, reverb, canalDelTeclado[id]);
    efectosDelTeclado[id] = { delay, reverb }; //guardar referencias 
  } else {
    // If the channel already exists, update its parameters
    if (rampDuration > 0) {
      canalDelTeclado[id].volume.linearRampTo(normalizarVolumen(volumen), rampDuration);
    } else {
      canalDelTeclado[id].volume.value = normalizarVolumen(volumen);
    }
    canalDelTeclado[id].pan.value = (paneo * 2) - 1;

    // Update wet/dry values if provided
    if (config.delayWet !== undefined) {
      efectosDelTeclado[id].delay.wet.value = config.delayWet;
    }
    if (config.reverbWet !== undefined) {
      efectosDelTeclado[id].reverb.wet.value = config.reverbWet;
    }
  }

  //  tecladoSampler[id].connect(canalDelTeclado[id]);
  tecladoSampler[id].chain(
    efectosDelTeclado[id].delay,
    efectosDelTeclado[id].reverb,
    canalDelTeclado[id]
  );

  // CRITICAL: Reconnect chain if sampler changed (runs after both if/else)
  // if (isNewSampler) {
  //   tecladoSampler[id].chain(
  //     efectosDelTeclado[id].delay, 
  //     efectosDelTeclado[id].reverb, 
  //     canalDelTeclado[id]
  //   );
  // } 

}

// Simple function to control effect wetness (0 = off, 1 = full effect)
export function setTecladoEffects(id, delayWet = 0, reverbWet = 0) {
  if (!efectosDelTeclado[id]) {
    console.log(`No effects found for teclado ${id}`);
    return;
  }

  efectosDelTeclado[id].delay.wet.value = delayWet;
  efectosDelTeclado[id].reverb.wet.value = reverbWet;

  console.log(`Teclado ${id} effects - Delay: ${delayWet * 100}%, Reverb: ${reverbWet * 100}%`);
}

export function tecladoEffectsOn(id, preset = 'apagado') {
  const presets = {
    apagado: [0, 0],
    ligero: [0.15, 0.1],     // Light effects  
    moderado: [0.3, 0.2],    // Moderate delay and reverb
    alto: [0.6, 0.5],      // Heavy effects
    delay: [0.4, 0],    // Only delay
    reverb: [0, 0.4]    // Only reverb
  };

  const [delayWet, reverbWet] = presets[preset] || presets.default;
  setTecladoEffects(id, delayWet, reverbWet);
}

///////////// Sampler del Bajo ///////////// 

let bajoSampler = {};
let canalDelBajo = {};
let efectosDelBajo = {};

export function bajoSamplerF(indiceSonido, id, volumen, rampDuration, paneo, efectosConfig = {}) {

  // Initialize or update the sampler if the sound has changed
  const isNewSampler = !bajoSampler[id] || bajoSampler[id]._currentSoundIndex !== indiceSonido

  if (isNewSampler) {

    bajoSampler[id] = new Tone.Sampler({
      urls: { C4: s.getAudioBuffer("bajo", indiceSonido).get('C4') }, // Use indiceSonido as index
      release: 1
    });
    bajoSampler[id]._currentSoundIndex = indiceSonido; // Store current sound for comparison 
  }


  // Default effect settings
  const defaultConfig = {
    delayWet: 0,    // 0 = completely dry (off), 1 = completely wet (on)
    reverbWet: 0,   // 0 = completely dry (off), 1 = completely wet (on)
    delayTime: "8n",
    delayFeedback: 0.3,
    reverbDecay: 3,
    reverbPreDelay: 0.2
  };

  // Merge with provided config
  const config = { ...defaultConfig, ...efectosConfig };


  // Efectos por canal
  if (!efectosDelBajo[id]) {
    let delay = new Tone.FeedbackDelay(config.delayTime, config.delayFeedback) //tiempo, feedback
    let reverb = new Tone.Reverb({
      decay: config.reverbDecay,
      preDelay: config.reverbPreDelay
    });

    //set initial dry/wet (off/on) values
    delay.wet.value = config.delayWet;
    reverb.wet.value = config.reverbWet;

    //crear canal
    canalDelBajo[id] = new Tone.Channel({
      volume: normalizarVolumen(volumen), // Volume in decibels
      pan: (paneo * 2) - 1,    // Panning from 0 (left) to 1 (right)
    }).toDestination();

    //Cadena de efectos: Sample -> Delay -> Reverb -> Canal -> Destination
    bajoSampler[id].chain(delay, reverb, canalDelBajo[id]);
    efectosDelBajo[id] = { delay, reverb }; //guardar referencias 
  } else {
    // If the channel already exists, update its parameters
    if (rampDuration > 0) {
      canalDelBajo[id].volume.linearRampTo(normalizarVolumen(volumen), rampDuration);
    } else {
      canalDelBajo[id].volume.value = normalizarVolumen(volumen);
    }

    canalDelBajo[id].pan.value = (paneo * 2) - 1;

    // Update wet/dry values if provided
    if (config.delayWet !== undefined) {
      efectosDelBajo[id].delay.wet.value = config.delayWet;
    }
    if (config.reverbWet !== undefined) {
      efectosDelBajo[id].reverb.wet.value = config.reverbWet;
    }
    // bajoSampler[id].connect(canalDelBajo[id]);
    // ✅ Reconnect if sampler changed
    if (isNewSampler) {
      bajoSampler[id].chain(
        efectosDelBajo[id].delay,
        efectosDelBajo[id].reverb,
        canalDelBajo[id]
      );
    }
  }
}


// Simple function to control effect wetness (0 = off, 1 = full effect)
export function setBajoEffects(id, delayWet = 0, reverbWet = 0) {
  if (!efectosDelBajo[id]) {
    console.log(`No effects found for bajo ${id}`);
    return;
  }

  efectosDelBajo[id].delay.wet.value = delayWet;
  efectosDelBajo[id].reverb.wet.value = reverbWet;

  console.log(`Bajo ${id} effects - Delay: ${delayWet * 100}%, Reverb: ${reverbWet * 100}%`);
}

export function bajoEffectsOn(id, preset = 'apagado') {
  const presets = {
    apagado: [0, 0],
    ligero: [0.15, 0.1],     // Light effects  
    moderado: [0.3, 0.2],    // Moderate delay and reverb
    alto: [0.6, 0.5],      // Heavy effects
    delay: [0.4, 0],    // Only delay
    reverb: [0, 0.4]    // Only reverb
  };

  const [delayWet, reverbWet] = presets[preset] || presets.default;
  setBajoEffects(id, delayWet, reverbWet);
}



///////////// Toca secuencia ///////////// 

// let seq;

export async function tocaSecuencia(armonia, instrumento, id, volumen, paneo, indiceSonido, cuantizar, notas, parteTipo, parte, octavaAbsoluta, adornarPunteo, efectos, rampDuration, docId) {
  // Remove the return new Promise wrapper since async functions already return promises

  docId = docId || 'global';


  // const id = instrumento + "_" + identificador; //bajo_default
  // Asegúrate de tener docId pasado a la función (docId = 'global' por defecto)
  sequencesByDoc[docId] = sequencesByDoc[docId] || {};
  const sequences = sequencesByDoc[docId];

  if (sequences[id]) {
    sequences[id].stop();
    sequences[id].dispose && sequences[id].dispose();
    // sequences[id] = null;
    delete sequences[id];  // Remove the reference to the old sequence

  }

  ///////////// Bajo /////////////

  if (instrumento === "bajo") {

    // Handle different efectos parameter types
    let efectosConfig = {};

    if (efectos === 'apagado' || efectos === false || efectos === 'default') {
      efectosConfig = { delayWet: 0, reverbWet: 0 };
    } else if (efectos === 'prendido' || efectos === true || efectos === 'ligero') {
      efectosConfig = { delayWet: 0.15, reverbWet: 0.1 };
    } else if (efectos === 'moderado') {
      efectosConfig = { delayWet: 0.3, reverbWet: 0.2 };
    } else if (efectos === 'alto') {
      efectosConfig = { delayWet: 0.6, reverbWet: 0.5 };
    } else if (efectos === 'delay') {
      efectosConfig = { delayWet: 0.4, reverbWet: 0 };
    } else if (efectos === 'reverb') {
      efectosConfig = { delayWet: 0, reverbWet: 0.4 };
    } else if (typeof efectos === 'object') {
      // Custom config object
      efectosConfig = efectos;
    }

    // let indiceSonido = s.sonidos.bajo[indiceSonido].nombre;
    bajoSamplerF(indiceSonido, id, volumen, rampDuration, paneo, efectosConfig)

    // ✅ Wait for the sampler to be ready
    await bajoSampler[id].loaded;

    if (parte.length == 0) {
      console.log("¡Comenzando secuencia del bajo!");

      // Create and start the sequence

      await Tone.loaded()
      console.log("Sampler fully loaded!");
      sequences[id] = new Tone.Sequence((time, note) => {
        const letterNote = typeof note === "number"
          ? Tone.Frequency(note, "midi").toNote()  // condition ? expressionIfTrue : expressionIfFalse;
          : note;
        bajoSampler[id].triggerAttackRelease(letterNote, 0.1, time);
      }, notas, '1m');   // '1m' represents one measure as the interval

      sequences[id].start(0);
      return sequences[id]; // ✅ Resolve here too


      //  bajo (n [[@], [𝅗𝅥 𝅗𝅥], [𝅘𝅥 𝅘𝅥 𝅘𝅥 𝅘𝅥], []])   
    } else if (parte.length > 0) {
      console.log("¡Comenzando tumbao del bajo!")

      let _armonia = a.armoniaEnNotasExplicitas(armonia);
      let _parte = a.lineaDelBajo(parte, _armonia, octavaAbsoluta);
      console.log("lineaDelBajo", _parte);

      await Tone.loaded()
      sequences[id] = new Tone.Part((time, value) => {
        if (value.note !== null) {
          bajoSampler[id].triggerAttackRelease(value.note, value.duration, time, value.velocity);
        }
      }, _parte);


      console.log('Sequence created for bajo', id, sequences[id]);

      sequences[id].loop = true; // Enable looping
      sequences[id].humanize = "128n"; // Add humanization

      let numeroDeCompases = a.numberOfMeasures(_parte);
      sequences[id].loopEnd = numeroDeCompases + 1 + "m"
      sequences[id].start(0);  // ✅ Start separately
      return sequences[id]; // ✅ Resolve here too

    }
  }

  ///////////// Teclado /////////////

  if (instrumento === "teclado") {

    // Handle different efectos parameter types
    let efectosConfig = {};

    if (efectos === 'apagado' || efectos === false || efectos === 'default') {
      efectosConfig = { delayWet: 0, reverbWet: 0 };
    } else if (efectos === 'prendido' || efectos === true || efectos === 'ligero') {
      efectosConfig = { delayWet: 0.15, reverbWet: 0.1 };
    } else if (efectos === 'moderado') {
      efectosConfig = { delayWet: 0.3, reverbWet: 0.2 };
    } else if (efectos === 'alto') {
      efectosConfig = { delayWet: 0.6, reverbWet: 0.5 };
    } else if (efectos === 'delay') {
      efectosConfig = { delayWet: 0.4, reverbWet: 0 };
    } else if (efectos === 'reverb') {
      efectosConfig = { delayWet: 0, reverbWet: 0.4 };
    } else if (typeof efectos === 'object') {
      // Custom config object
      efectosConfig = efectos;
    }

    // let indiceSonido = s.sonidos.teclado[indiceSonido].nombre;  
    tecladoSamplerF(indiceSonido, id, volumen, rampDuration, paneo, efectosConfig);

    // ✅ Wait for the sampler to be ready
    await tecladoSampler[id].loaded;

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


      await Tone.loaded()
      sequences[id] = new Tone.Sequence((time, note) => {
        const letterNote = typeof note === "number"
          ? Tone.Frequency(note, "midi").toNote()  // condition ? expressionIfTrue : expressionIfFalse;
          : note;
        tecladoSampler[id].triggerAttackRelease(letterNote, 0.1, time);
      }, notas, '1m');


      sequences[id].start(0);
      return sequences[id]; // ✅ Return here

    } else if (parteTipo === 'acompanamiento' || parteTipo === 'acompañamiento') {
      console.log("¡Comenzando acompañamiento del teclado!")

      // const parteTeclado = [{ "time": "0:1:0", "note": ['C4', 'E4', 'G4'], "duration": "4n" }, { "time": "0:3:0", "note": ['G4', 'B4', 'D4'], "duration": "4n" }]
      // :: [{time, note, duration} , ... ] -> [{tonal chord}] -> [{time, note duration}, ...]

      let armoniaT = a.armoniaEnNotasExplicitas(armonia);
      // let eParte = { "time": "0:0:0", "note": 1, "duration": "4n", "octavaRelativa": 0 }
      // let acorde = Tonal.Chord.get('Cmaj')

      // let parteTeclado_ =  a.asignarNotasSegunGradosDelAcordeTeclado(eParte, acorde, octavaAbsoluta);
      let parteTeclado_ = a.acordesDelTeclado(parte, armoniaT, octavaAbsoluta);

      // :: [{time, note, duration} , ... ] -> [{tonal chord}] -> [{time, note duration}, ...]
      // function listaDeGradosAlistaDeNotasTeclado(elementosParteList, chordPropertiesList, octavaAbsoluta)

      await Tone.loaded();
      sequences[id] = new Tone.Part((time, value) => {
        if (value.note !== null) {
          tecladoSampler[id].triggerAttackRelease(value.note, value.duration, time, value.velocity);
        }
        // console.log("acorde", value.note);
      }, parteTeclado_);

      console.log('Sequence created for teclado' + id.toString(), id, sequences[id]);

      sequences[id].loop = true; // Enable looping
      sequences[id].humanize = "128n"; // Add humanization

      let numeroDeCompases = a.numberOfMeasures(parteTeclado_);
      sequences[id].loopEnd = numeroDeCompases + 1 + "m"
      sequences[id].start(0);  // ✅ Start separately
      return sequences[id]; // ✅ Resolve here too


    } else if (parteTipo === 'punteo') {
      console.log("¡Comenzando melodía del teclado!")
      let armoniaT = a.armoniaEnNotasExplicitas(armonia);
      let parteTeclado_ = a.lineaMelodica(parte, armoniaT, octavaAbsoluta);

      console.log("Before adornar:", parteTeclado_);
      console.log("Raw harmony:", armonia); // This should show [['Cmaj'], ['Dm']]

      if (adornarPunteo === true) {
        console.log("melodia auto", true)
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
      } else {
        console.log("melodia auto", false)
      }

      await Tone.loaded()
      sequences[id] = new Tone.Part((time, value) => {
        // Different velocity for ornamental notes
        const finalVelocity = value.ornament ? value.velocity * 0.8 : value.velocity;

        if (value.note !== null) {
          tecladoSampler[id].triggerAttackRelease(value.note, value.duration, time, finalVelocity);
          // console.log("Playing note:", value.note, "at", time, "ornament:", !!value.ornament);
        }
      }, parteTeclado_);

      console.log('Enhanced sequence created for teclado' + id.toString(), id, sequences[id]);

      sequences[id].loop = true; // Enable looping
      sequences[id].humanize = "128n"; // Add humanization

      let numeroDeCompases = a.numberOfMeasures(parteTeclado_);
      sequences[id].loopEnd = numeroDeCompases + 1 + "m"
      sequences[id].start(0);  // ✅ Start separately
      return sequences[id]; // ✅ Resolve here too
      // const parteTeclado = [{ "time": "0:1:0", "note": ['C4', 'E4', 'G4'], "duration": "4n" }, { "time": "0:3:0", "note": ['G4', 'B4', 'D4'], "duration": "4n" }] 
    }
  }



  ///////////// Bombo /////////////


  if (instrumento === "bombo") {

    // Handle different efectos parameter types
    let efectosConfig = {};

    if (efectos === 'apagado' || efectos === false || efectos === 'default') {
      efectosConfig = { delayWet: 0, reverbWet: 0 };
    } else if (efectos === 'prendido' || efectos === true || efectos === 'ligero') {
      efectosConfig = { delayWet: 0.15, reverbWet: 0.1 };
    } else if (efectos === 'moderado') {
      efectosConfig = { delayWet: 0.3, reverbWet: 0.2 };
    } else if (efectos === 'alto') {
      efectosConfig = { delayWet: 0.6, reverbWet: 0.5 };
    } else if (efectos === 'delay') {
      efectosConfig = { delayWet: 0.4, reverbWet: 0 };
    } else if (efectos === 'reverb') {
      efectosConfig = { delayWet: 0, reverbWet: 0.4 };
    } else if (typeof efectos === 'object') {
      // Custom config object
      efectosConfig = efectos;
    }

    // let indiceSonido = s.sonidos.bombo[indiceSonido].nombre;
    bomboSamplerF(indiceSonido, id, volumen, rampDuration, paneo, efectosConfig);

    // ✅ Wait for the sampler to be ready
    await bomboSampler[id].loaded;

    if (parte.length == 0) {
      console.log("¡Comenzando secuencia del bombo!");

      // Create and start the sequence

      await Tone.loaded();
      console.log("Sampler fully loaded!");
      sequences[id] = new Tone.Sequence((time, note) => {
        bomboSampler[id].triggerAttackRelease(note, 0.1, time);
      }, notas, '1m');   // '1m' represents one measure as the interval

      sequences[id].start(0);
      return sequences[id]; // ✅ Resolve here too

    } else if (parte.length > 0) {
      console.log("¡Comenzando ritmo del bombo!")

      let parteDelBombo = r.filtrarYaplanarParte(parte)

      await Tone.loaded();
      sequences[id] = new Tone.Part((time, value) => {
        if (value.note !== null) {
          bomboSampler[id].triggerAttackRelease(value.note, value.duration, time, value.velocity);
        }
      }, parteDelBombo);

      console.log('Sequence created for bombo' + id.toString(), id, sequences[id]);

      sequences[id].loop = true; // Enable looping
      sequences[id].humanize = "128n"; // Add humanization  
      let numeroDeCompases = a.numberOfMeasures(parteDelBombo);
      sequences[id].loopEnd = numeroDeCompases + 1 + "m"
      sequences[id].start(0);  // ✅ Start separately
      return sequences[id]; // ✅ Resolve here too

    }
  }

  //////////////////////jamblock////////////////////


  if (instrumento === "jamblock" || instrumento === "jam") {

    // Handle different efectos parameter types
    let efectosConfig = {};

    if (efectos === 'apagado' || efectos === false || efectos === 'default') {
      efectosConfig = { delayWet: 0, reverbWet: 0 };
    } else if (efectos === 'prendido' || efectos === true || efectos === 'ligero') {
      efectosConfig = { delayWet: 0.15, reverbWet: 0.1 };
    } else if (efectos === 'moderado') {
      efectosConfig = { delayWet: 0.3, reverbWet: 0.2 };
    } else if (efectos === 'alto') {
      efectosConfig = { delayWet: 0.6, reverbWet: 0.5 };
    } else if (efectos === 'delay') {
      efectosConfig = { delayWet: 0.4, reverbWet: 0 };
    } else if (efectos === 'reverb') {
      efectosConfig = { delayWet: 0, reverbWet: 0.4 };
    } else if (typeof efectos === 'object') {
      // Custom config object
      efectosConfig = efectos;
    }

    jamblockSamplerF(indiceSonido, id, volumen, rampDuration, paneo, efectosConfig);


    await jamblockSampler[id].loaded;

    if (parte.length == 0) {
      console.log("¡Comenzando secuencia del jamblock!");

      // Create and start the sequence

      await Tone.loaded()
      console.log("Sampler fully loaded!");
      sequences[id] = new Tone.Sequence((time, note) => {
        jamblockSampler[id].triggerAttackRelease(note, 0.1, time);
      }, notas, '1m');   // '1m' represents one measure as the interval

      sequences[id].start(0);
      return sequences[id]; // ✅ Resolve here too

    } else if (parte.length > 0) {
      console.log("¡Comenzando ritmo del jamblock!")

      let parteDelJamblock = r.filtrarYaplanarParte(parte)

      await Tone.loaded()
      sequences[id] = new Tone.Part((time, value) => {
        if (value.note !== null) {
          jamblockSampler[id].triggerAttackRelease(value.note, value.duration, time, value.velocity);
        }
      }, parteDelJamblock);

      console.log('Sequence created for jamblock' + id.toString(), id, sequences[id]);

      sequences[id].loop = true; // Enable looping
      sequences[id].humanize = "128n"; // Add humanization  
      let numeroDeCompases = a.numberOfMeasures(parteDelJamblock);
      sequences[id].loopEnd = numeroDeCompases + 1 + "m"
      sequences[id].start(0);  // ✅ Start separately
      return sequences[id]; // ✅ Resolve here too
    }
  }



  ///////////////contratiempos


  if (instrumento === "contratiempo" || instrumento === "contratiempos" || instrumento === "contras") {

    // Handle different efectos parameter types
    let efectosConfig = {};

    if (efectos === 'apagado' || efectos === false || efectos === 'default') {
      efectosConfig = { delayWet: 0, reverbWet: 0 };
    } else if (efectos === 'prendido' || efectos === true || efectos === 'ligero') {
      efectosConfig = { delayWet: 0.15, reverbWet: 0.1 };
    } else if (efectos === 'moderado') {
      efectosConfig = { delayWet: 0.3, reverbWet: 0.2 };
    } else if (efectos === 'alto') {
      efectosConfig = { delayWet: 0.6, reverbWet: 0.5 };
    } else if (efectos === 'delay') {
      efectosConfig = { delayWet: 0.4, reverbWet: 0 };
    } else if (efectos === 'reverb') {
      efectosConfig = { delayWet: 0, reverbWet: 0.4 };
    } else if (typeof efectos === 'object') {
      // Custom config object
      efectosConfig = efectos;
    }

    // let indiceSonido = s.sonidos.contratiempo[indiceSonido].nombre;
    contrasSamplerF(indiceSonido, id, volumen, rampDuration, paneo, efectosConfig);
    await contrasSampler[id].loaded;

    if (parte.length == 0) {
      console.log("¡Comenzando secuencia del contratiempo!");

      // Create and start the sequence

      await Tone.loaded()
      console.log("Sampler fully loaded!");
      sequences[id] = new Tone.Sequence((time, note) => {
        contrasSampler[id].triggerAttackRelease(note, 0.1, time);
      }, notas, '1m');   // '1m' represents one measure as the interval

      sequences[id].start(0);
      return sequences[id]; // ✅ Resolve here too

    } else if (parte.length > 0) {
      console.log("¡Comenzando ritmo del contratiempo!")


      let parteDelContratiempo = r.filtrarYaplanarParte(parte)

      await Tone.loaded()
      sequences[id] = new Tone.Part((time, value) => {
        if (value.note !== null) {
          contrasSampler[id].triggerAttackRelease(value.note, value.duration, time, value.velocity);
        }
      }, parteDelContratiempo);

      console.log('Sequence created for contras' + id.toString(), id, sequences[id]);

      sequences[id].loop = true; // Enable looping
      sequences[id].humanize = "128n"; // Add humanization  
      let numeroDeCompases = a.numberOfMeasures(parteDelContratiempo);
      sequences[id].loopEnd = numeroDeCompases + 1 + "m"
      sequences[id].start(0);  // ✅ Start separately
      return sequences[id]; // ✅ Resolve here too
    }
  }


  ///////////////conga///////////////


  if (instrumento === "congas") {

    // Handle different efectos parameter types
    let efectosConfig = {};

    if (efectos === 'apagado' || efectos === false || efectos === 'default') {
      efectosConfig = { delayWet: 0, reverbWet: 0 };
    } else if (efectos === 'prendido' || efectos === true || efectos === 'ligero') {
      efectosConfig = { delayWet: 0.15, reverbWet: 0.1 };
    } else if (efectos === 'moderado') {
      efectosConfig = { delayWet: 0.3, reverbWet: 0.2 };
    } else if (efectos === 'alto') {
      efectosConfig = { delayWet: 0.6, reverbWet: 0.5 };
    } else if (efectos === 'delay') {
      efectosConfig = { delayWet: 0.4, reverbWet: 0 };
    } else if (efectos === 'reverb') {
      efectosConfig = { delayWet: 0, reverbWet: 0.4 };
    } else if (typeof efectos === 'object') {
      // Custom config object
      efectosConfig = efectos;
    }
    // let indiceSonido = s.sonidos.congas[indiceSonido].nombre;
    congaSamplerF(indiceSonido, id, volumen, rampDuration, paneo, efectosConfig);
    await congaSampler[id].loaded;

    if (parte.length == 0) {
      console.log("¡Comenzando secuencia del conga!");

      // Create and start the sequence

      await Tone.loaded();
      console.log("Sampler fully loaded!");
      sequences[id] = new Tone.Sequence((time, note) => {
        congaSampler[id].triggerAttackRelease(note, 0.1, time);
      }, notas, '1m');   // '1m' represents one measure as the interval

      sequences[id].start(0);
      return sequences[id]; // ✅ Resolve here too

    } else if (parte.length > 0) {
      console.log("¡Comenzando ritmo del conga!")


      let parteDeLaConga = r.filtrarYaplanarParte(parte)

      await Tone.loaded();
      sequences[id] = new Tone.Part((time, value) => {
        if (value.note !== null) {
          congaSampler[id].triggerAttackRelease(value.note, value.duration, time, value.velocity);
        }
      }, parteDeLaConga);

      console.log('Sequence created for conga' + id.toString(), id, sequences[id]);

      sequences[id].loop = true; // Enable looping
      sequences[id].humanize = "128n"; // Add humanization  
      let numeroDeCompases = a.numberOfMeasures(parteDeLaConga);
      sequences[id].loopEnd = numeroDeCompases + 1 + "m"
      sequences[id].start(0);  // ✅ Start separately
      return sequences[id]; // ✅ Resolve here too
    }
  }


  ///////////// guiro /////////////


  if (instrumento === "guiro") {


    // Handle different efectos parameter types
    let efectosConfig = {};

    if (efectos === 'apagado' || efectos === false || efectos === 'default') {
      efectosConfig = { delayWet: 0, reverbWet: 0 };
    } else if (efectos === 'prendido' || efectos === true || efectos === 'ligero') {
      efectosConfig = { delayWet: 0.15, reverbWet: 0.1 };
    } else if (efectos === 'moderado') {
      efectosConfig = { delayWet: 0.3, reverbWet: 0.2 };
    } else if (efectos === 'alto') {
      efectosConfig = { delayWet: 0.6, reverbWet: 0.5 };
    } else if (efectos === 'delay') {
      efectosConfig = { delayWet: 0.4, reverbWet: 0 };
    } else if (efectos === 'reverb') {
      efectosConfig = { delayWet: 0, reverbWet: 0.4 };
    } else if (typeof efectos === 'object') {
      // Custom config object
      efectosConfig = efectos;
    }
    // let indiceSonido = s.sonidos.guiro[indiceSonido].nombre;
    guiroSamplerF(indiceSonido, id, volumen, rampDuration, paneo, efectosConfig);
    await guiroSampler[id].loaded;

    if (parte.length == 0) {
      console.log("¡Comenzando secuencia del guiro!");

      // Create and start the sequence

      await Tone.loaded()
      console.log("Sampler fully loaded!");
      sequences[id] = new Tone.Sequence((time, note) => {
        guiroSampler[id].triggerAttackRelease(note, 0.1, time);
      }, notas, '1m');   // '1m' represents one measure as the interval

      sequences[id].start(0);
      return sequences[id]; // ✅ Resolve here too

    } else if (parte.length > 0) {
      console.log("¡Comenzando ritmo del guiro!")

      let parteDelguiro = r.filtrarYaplanarParte(parte)

      await Tone.loaded()
      sequences[id] = new Tone.Part((time, value) => {
        if (value.note !== null) {
          guiroSampler[id].triggerAttackRelease(value.note, value.duration, time, value.velocity);
        }
      }, parteDelguiro);

      console.log('Sequence created for guiro' + id.toString(), id, sequences[id]);

      sequences[id].loop = true; // Enable looping
      sequences[id].humanize = "128n"; // Add humanization

      let numeroDeCompases = a.numberOfMeasures(parteDelguiro);
      sequences[id].loopEnd = numeroDeCompases + 1 + "m"
      sequences[id].start(0);  // ✅ Start separately
      return sequences[id]; // ✅ Resolve here too
    }
  }
}
