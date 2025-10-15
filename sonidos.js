
export const baseURL = "https://luisnavarrodelangel.github.io/sonidos-seis8s/";

// lista de sonidos //
export const sonidos = {
  bajo: [
//     9
    { nombre: "bajoSintetico/" },
    { nombre: "bajoAcustico/" },
    { nombre: "bajoAspero/" },
    { nombre: "bajoConDedos/" },
    { nombre: "bajoFretless/" },
    { nombre: "bajoPlumeado/" },
    { nombre: "bajoSlap/" },
    {nombre: "BassLead/"}, //7
    {nombre: "BassSawLead/"} //8
  ],
  teclado: [
//     17
    { nombre: "stereoGrPiano/" }, //0
    { nombre: "stereoPiano/" }, //1
    { nombre: "laPiano/" }, //2
    { nombre: "electricPiano/" },  //3   
    { nombre: "dancePiano/" }, //4
    { nombre: "drawBarOrgan/" }, //5
    { nombre: "stringsPiano/" }, //6
    {nombre: "Calliope1/"}, //7 
    { nombre: "squareLead/" },//8
    { nombre: "sawLead/" },     //9
    {nombre: "SawLead1/"}, //10 
    {nombre: "SawArpeggio1/"}, //11
    {nombre: "SawArpeggio2/"}, //12
    {nombre: "SeqSquare/"}, //13 
    {nombre: "SqrPulseLd/"}, //14
    {nombre: "Trumpet1/"}, //15
    {nombre: "Trumpet2/"}, //16
    {nombre: "acordeon/"} //17

  ],
  bombo: [
    //3
    {nombre: "bomboRoomSet/" },
    { nombre: "bomboStandardSet1/" },
    { nombre: "bomboStandardSet3/" }, 
    { nombre: "bomboEthnicSet/" },
    { nombre: "bomboSynthSet1/" }

  ],
  contratiempo: [
    //2
    { nombre: "contrasRoomSet/" },
    { nombre: "contrasStandardSet4/" }
  ], 
   congas: [
    //2
    { nombre: "quinto-set-uno/" },
    { nombre: "quinto-set-dos/" }, 
   ],
  guiro: [
    //5
    {nombre: "guiro-metalico/"}, 
    {nombre: "guiro-madera-corto/"},
    {nombre: "guiro-maracas/"},
    {nombre: "guiro-shaker/"},
    {nombre: "guiro-shaker2/"},
  ], 
  jamblock: [
    //3
    {nombre: "jamblock/"}, 
    {nombre: "jamblockAgudoStandardSet1/"},
    {nombre: "jamblockGraveStandardSet2/"}
  ]
   
};

// Store preloaded buffers
export const audioBuffers = {};
let loadingPromises = {};

// Function to generate URLs for a sound category
function generateSoundUrls(category, soundConfig) {
  const urls = {};
  const baseUrl = baseURL + soundConfig.nombre;
  
  // Define the notes/samples typically used for each category
  const noteMap = {
    bajo: ['C4'], // Bass typically uses C2
    teclado: ['C5'], // Piano/keyboard uses C4
    bombo: ['C2'], // Kick drum uses C2
    guiro: ['C2'],
    contratiempo: ['F%232'], // Snare/backbeat uses C2
    congas: ['quinto_abierto', 'quinto_palma', 'quinto_muteado', 'quinto_talon', 'quinto_punta'], 
    jamblock: ['jamblock0'] // Jam block uses specific samples
  };
  
  const notes = noteMap[category] || ['C4'];
  
  notes.forEach(note => {
    urls[note] = `${note}.wav`;
  });
  
  return { urls, baseUrl };
}

// Preload a single sound set
export async function preloadSoundSet(category, soundConfig, soundId) {
  const key = `${category}_${soundId}`;
  
  if (audioBuffers[key]) {
    return audioBuffers[key]; // Already loaded
  }
  
  if (loadingPromises[key]) {
    return loadingPromises[key]; // Already loading
  }
  
  const { urls, baseUrl } = generateSoundUrls(category, soundConfig);
  
  loadingPromises[key] = new Promise((resolve, reject) => {
    const buffers = new Tone.ToneAudioBuffers({
      urls,
      baseUrl,
      onload: () => {
        audioBuffers[key] = buffers;
        console.log(`Loaded sound set: ${key}`);
        resolve(buffers);
      },
      onerror: (error) => {
        console.error(`Failed to load sound set: ${key}`, error);
        reject(error);
      }
    });
  });
  
  return loadingPromises[key];
}

// Preload all sounds for a category
export async function preloadCategory(category) {
  const sounds = sonidos[category];
  if (!sounds) {
    throw new Error(`Category ${category} not found`);
  }
  
  const promises = sounds.map((sound, index) => 
    preloadSoundSet(category, sound, index)
  );
  
  try {
    await Promise.all(promises);
    console.log(`All sounds loaded for category: ${category}`);
  } catch (error) {
    console.error(`Failed to load some sounds for category: ${category}`, error);
    throw error;
  }
}

// Preload all sounds
export async function preloadAllSounds() {
  const categories = Object.keys(sonidos);
  const promises = categories.map(category => preloadCategory(category));
  
  try {
    await Promise.all(promises);
    console.log('All sounds preloaded successfully!');
    return true;
  } catch (error) {
    console.error('Failed to preload all sounds:', error);
    throw error;
  }
}

// Get a preloaded buffer
export function getAudioBuffer(category, soundIndex) {
  const key = `${category}_${soundIndex}`;
  return audioBuffers[key];
}