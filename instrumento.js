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
export function establecerTempo(t) {
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

  // Dispose of all bombo samplers
  Object.keys(bomboSampler).forEach(id => {
    bomboSampler[id].dispose();
    delete bomboSampler[id];  // Remove reference
  });

  // Dispose of all bombo channels
  Object.keys(canalDelBombo).forEach(id => {
    canalDelBombo[id].dispose();
    delete canalDelBombo[id];  // Remove reference
  });

  // Dispose of all bombo effects
  Object.keys(efectosDelBombo).forEach(id => {
    if (efectosDelBombo[id].delay) {
      efectosDelBombo[id].delay.dispose();
    }
    if (efectosDelBombo[id].reverb) {
      efectosDelBombo[id].reverb.dispose();
    }
    delete efectosDelBombo[id];
  });

  // Dispose of all jam samplers
  Object.keys(jamblockSampler).forEach(id => {
    jamblockSampler[id].dispose();
    delete jamblockSampler[id];  // Remove reference
  });

  // Dispose of all jam channels
  Object.keys(canalDelJamblock).forEach(id => {
    canalDelJamblock[id].dispose();
    delete canalDelJamblock[id];  // Remove reference
  });

  // Dispose of all Jamblock effects
  Object.keys(efectosDelJamblock).forEach(id => {
    if (efectosDelJamblock[id].delay) {
      efectosDelJamblock[id].delay.dispose();
    }
    if (efectosDelJamblock[id].reverb) {
      efectosDelJamblock[id].reverb.dispose();
    }
    delete efectosDelJamblock[id];
  });

  // Dispose of all guiro samplers
  Object.keys(guiroSampler).forEach(id => {
    guiroSampler[id].dispose();
    delete guiroSampler[id];  // Remove reference
  });

  // Dispose of all guiro channels
  Object.keys(canalDelGuiro).forEach(id => {
    canalDelGuiro[id].dispose();
    delete canalDelGuiro[id];  // Remove reference
  });

  // Dispose of all guiro effects
  Object.keys(efectosDelGuiro).forEach(id => {
    if (efectosDelGuiro[id].delay) {
      efectosDelGuiro[id].delay.dispose();
    }
    if (efectosDelGuiro[id].reverb) {
      efectosDelGuiro[id].reverb.dispose();
    }
    delete efectosDelGuiro[id];
  });

  // Dispose of all contras samplers
  Object.keys(contrasSampler).forEach(id => {
    contrasSampler[id].dispose();
    delete contrasSampler[id];  // Remove reference
  });

  // Dispose of all contras channels
  Object.keys(canalDelContratiempo).forEach(id => {
    canalDelContratiempo[id].dispose();
    delete canalDelContratiempo[id];  // Remove reference
  });

  // Dispose of all contras effects
  Object.keys(efectosDelContratiempo).forEach(id => {
    if (efectosDelContratiempo[id].delay) {
      efectosDelContratiempo[id].delay.dispose();
    }
    if (efectosDelContratiempo[id].reverb) {
      efectosDelContratiempo[id].reverb.dispose();
    }
    delete efectosDelContratiempo[id];
  });

  // Dispose of all teclado samplers
  Object.keys(tecladoSampler).forEach(id => {
    tecladoSampler[id].dispose();
    delete tecladoSampler[id];  // Remove reference
  });

  // Dispose of all teclado channels
  Object.keys(canalDelTeclado).forEach(id => {
    canalDelTeclado[id].dispose();
    delete canalDelTeclado[id];  // Remove reference
  });

  // Dispose of all teclado effects
  Object.keys(efectosDelTeclado).forEach(id => {
    if (efectosDelTeclado[id].delay) {
      efectosDelTeclado[id].delay.dispose();
    }
    if (efectosDelTeclado[id].reverb) {
      efectosDelTeclado[id].reverb.dispose();
    }
    delete efectosDelTeclado[id];
  });

  // Dispose of all bajo samplers
  Object.keys(bajoSampler).forEach(id => {
    bajoSampler[id].dispose();
    delete bajoSampler[id];  // Remove reference
  });

  // Dispose of all bajo channels
  Object.keys(canalDelBajo).forEach(id => {
    canalDelBajo[id].dispose();
    delete canalDelBajo[id];  // Remove reference
  });

  // Dispose of all bajo effects
  Object.keys(efectosDelBajo).forEach(id => {
    if (efectosDelBajo[id].delay) {
      efectosDelBajo[id].delay.dispose();
    }
    if (efectosDelBajo[id].reverb) {
      efectosDelBajo[id].reverb.dispose();
    }
    delete efectosDelBajo[id];
  });

  // Dispose of all congas samplers
  Object.keys(congaSampler).forEach(id => {
    congaSampler[id].dispose();
    delete congaSampler[id];  // Remove reference
  });

  // Dispose of all congas channels
  Object.keys(canalDeLaConga).forEach(id => {
    canalDeLaConga[id].dispose();
    delete canalDeLaConga[id];  // Remove reference
  });
  // Dispose of all congas effects
  Object.keys(efectosDeLaConga).forEach(id => {
    if (efectosDeLaConga[id].delay) {
      efectosDeLaConga[id].delay.dispose();
    }
    if (efectosDeLaConga[id].reverb) {
      efectosDeLaConga[id].reverb.dispose();
    }
    delete efectosDeLaConga[id];
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

  // desconectar efectos de pistas del Bombo borradas
  if (efectosDelBombo[id]) {
    if (efectosDelBombo[id].delay) {
      efectosDelBombo[id].delay.disconnect();
      efectosDelBombo[id].delay.dispose();
    }
    if (efectosDelBombo[id].reverb) {
      efectosDelBombo[id].reverb.disconnect();
      efectosDelBombo[id].reverb.dispose();
    }
    delete efectosDelBombo[id];
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

  // desconectar efectos de pistas del jamblock borradas
  if (efectosDelJamblock[id]) {
    if (efectosDelJamblock[id].delay) {
      efectosDelJamblock[id].delay.disconnect();
      efectosDelJamblock[id].delay.dispose();
    }
    if (efectosDelJamblock[id].reverb) {
      efectosDelJamblock[id].reverb.disconnect();
      efectosDelJamblock[id].reverb.dispose();
    }
    delete efectosDelJamblock[id];
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

  // desconectar efectos de pistas del Guiro borradas
  if (efectosDelGuiro[id]) {
    if (efectosDelGuiro[id].delay) {
      efectosDelGuiro[id].delay.disconnect();
      efectosDelGuiro[id].delay.dispose();
    }
    if (efectosDelGuiro[id].reverb) {
      efectosDelGuiro[id].reverb.disconnect();
      efectosDelGuiro[id].reverb.dispose();
    }
    delete efectosDelGuiro[id];
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

  // desconectar efectos de pistas del Contratiempo borradas
  if (efectosDelContratiempo[id]) {
    if (efectosDelContratiempo[id].delay) {
      efectosDelContratiempo[id].delay.disconnect();
      efectosDelContratiempo[id].delay.dispose();
    }
    if (efectosDelContratiempo[id].reverb) {
      efectosDelContratiempo[id].reverb.disconnect();
      efectosDelContratiempo[id].reverb.dispose();
    }
    delete efectosDelContratiempo[id];
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

  // desconectar efectos de pistas del teclado borradas
  if (efectosDelTeclado[id]) {
    if (efectosDelTeclado[id].delay) {
      efectosDelTeclado[id].delay.disconnect();
      efectosDelTeclado[id].delay.dispose();
    }
    if (efectosDelTeclado[id].reverb) {
      efectosDelTeclado[id].reverb.disconnect();
      efectosDelTeclado[id].reverb.dispose();
    }
    delete efectosDelTeclado[id];
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

  // desconectar efectos de pistas del Bajo borradas
  if (efectosDelBajo[id]) {
    if (efectosDelBajo[id].delay) {
      efectosDelBajo[id].delay.disconnect();
      efectosDelBajo[id].delay.dispose();
    }
    if (efectosDelBajo[id].reverb) {
      efectosDelBajo[id].reverb.disconnect();
      efectosDelBajo[id].reverb.dispose();
    }
    delete efectosDelBajo[id];
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


  // desconectar efectos de pistas de la conga borradas
  if (efectosDeLaConga[id]) {
    if (efectosDeLaConga[id].delay) {
      efectosDeLaConga[id].delay.disconnect();
      efectosDeLaConga[id].delay.dispose();
    }
    if (efectosDeLaConga[id].reverb) {
      efectosDeLaConga[id].reverb.disconnect();
      efectosDeLaConga[id].reverb.dispose();
    }
    delete efectosDeLaConga[id];
  }

}


///////////// Definiciones globales de instrumentos ///////////// 

// let seq1, seq2, seq3, seq4, seq5, canalDelTeclado2;
let sequences = {};  // Object to store sequences dynamically by id

///////////// Sampler de la conga ///////////// 


let congaSampler = {};  // Initialize bomboSampler as an object to store multiple samplers
let canalDeLaConga = {}; // Initialize canalDelBombo as an object to store multiple channels
let efectosDeLaConga = {};

export function congaSamplerF(indiceSonido, id, volumen, paneo, efectosConfig = {}) {

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
    // If the channel already exists, update its parameters
    canalDeLaConga[id].volume.value = normalizarVolumen(volumen);
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

export function bomboSamplerF(indiceSonido, id, volumen, paneo, efectosConfig = {}) {

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
    canalDelBombo[id].volume.value = normalizarVolumen(volumen);
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

export function jamblockSamplerF(indiceSonido, id, volumen, paneo, efectosConfig = {}) {

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
    canalDelJamblock[id].volume.value = normalizarVolumen(volumen);
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


export function contrasSamplerF(indiceSonido, id, volumen, paneo, efectosConfig = {}) {


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
    canalDelContratiempo[id].volume.value = normalizarVolumen(volumen);
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

export function guiroSamplerF(indiceSonido, id, volumen, paneo, efectosConfig = {}) {

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
    canalDelGuiro[id].volume.value = normalizarVolumen(volumen);
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

export function tecladoSamplerF(indiceSonido, id, volumen, paneo, efectosConfig = {}) {

  if (!tecladoSampler[id] || tecladoSampler[id]._currentSoundIndex !== indiceSonido) {
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
    canalDelTeclado[id].volume.value = normalizarVolumen(volumen);
    canalDelTeclado[id].pan.value = (paneo * 2) - 1;

    // Update wet/dry values if provided
    if (config.delayWet !== undefined) {
      efectosDelTeclado[id].delay.wet.value = config.delayWet;
    }
    if (config.reverbWet !== undefined) {
      efectosDelTeclado[id].reverb.wet.value = config.reverbWet;
    }
  }

  // tecladoSampler[id].connect(canalDelTeclado[id]);

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

export function bajoSamplerF(indiceSonido, id, volumen, paneo, efectosConfig = {}) {

  // Initialize or update the sampler if the sound has changed
  if (!bajoSampler[id] || bajoSampler[id]._currentSoundIndex !== indiceSonido) {

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
  canalDelBajo[id].volume.value = normalizarVolumen(volumen);
  canalDelBajo[id].pan.value = (paneo * 2) - 1;

  // Update wet/dry values if provided
  if (config.delayWet !== undefined) {
    efectosDelBajo[id].delay.wet.value = config.delayWet;
  }
  if (config.reverbWet !== undefined) {
    efectosDelBajo[id].reverb.wet.value = config.reverbWet;
  }
}

  // bajoSampler[id].connect(canalDelBajo[id]);
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

export function tocaSecuencia(armonia, instrumento, id, volumen, paneo, indiceSonido, cuantizar, notas, parteTipo, parte, octavaAbsoluta, adornarPunteo, efectos) {

  // const id = instrumento + "_" + identificador; //bajo_default

  if (sequences[id]) {
    sequences[id].stop();
    sequences[id].dispose();
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
    bajoSamplerF(indiceSonido, id, volumen, paneo, efectosConfig)


    if (parte.length == 0) {
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
      console.log("lineaDelBajo", _parte);

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
    tecladoSamplerF(indiceSonido, id, volumen, paneo, efectosConfig);

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
        sequences[id] = new Tone.Sequence((time, note) => {
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
      let parteTeclado_ = a.acordesDelTeclado(parte, armoniaT, octavaAbsoluta);

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
    bomboSamplerF(indiceSonido, id, volumen, paneo, efectosConfig);

    if (parte.length == 0) {
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

      let parteDelBombo = r.filtrarYaplanarParte(parte)

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

    jamblockSamplerF(indiceSonido, id, volumen, paneo, efectosConfig);

    if (parte.length == 0) {
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

      let parteDelJamblock = r.filtrarYaplanarParte(parte)

      Tone.loaded().then(() => {
        sequences[id] = new Tone.Part((time, value) => {
          if (value.note !== null) {
            jamblockSampler[id].triggerAttackRelease(value.note, value.duration, time, value.velocity);
          }
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
    contrasSamplerF(indiceSonido, id, volumen, paneo, efectosConfig);

    if (parte.length == 0) {
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


      let parteDelContratiempo = r.filtrarYaplanarParte(parte)

      Tone.loaded().then(() => {
        sequences[id] = new Tone.Part((time, value) => {
          if (value.note !== null) {
            contrasSampler[id].triggerAttackRelease(value.note, value.duration, time, value.velocity);
          }
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
    congaSamplerF(indiceSonido, id, volumen, paneo, efectosConfig);

    if (parte.length == 0) {
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


      let parteDeLaConga = r.filtrarYaplanarParte(parte)

      Tone.loaded().then(() => {
        sequences[id] = new Tone.Part((time, value) => {
          if (value.note !== null) {
            congaSampler[id].triggerAttackRelease(value.note, value.duration, time, value.velocity);
          }
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
    guiroSamplerF(indiceSonido, id, volumen, paneo, efectosConfig);

    if (parte.length == 0) {
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

      let parteDelguiro = r.filtrarYaplanarParte(parte)

      Tone.loaded().then(() => {
        sequences[id] = new Tone.Part((time, value) => {
          if (value.note !== null) {
            guiroSampler[id].triggerAttackRelease(value.note, value.duration, time, value.velocity);
          }
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




