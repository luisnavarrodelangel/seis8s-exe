////////////////Armonía en letra a notas explícitas /////////////////////////

// [String] -> [String], e.g.,  => ["C", "E", "E", "G"]
function obtenerNotasDelAcorde(acorde) {
  // Check if 'acorde' is an array and has elements - sometimes it is passed a null value I think
  if (!Array.isArray(acorde) || acorde.length === 0) return [];

  return acorde.map(nombreAcorde => {
    const chord = Tonal.Chord.get(nombreAcorde);
   const grados = {}
  
    // Map intervals to degrees (e.g., "1P" -> 1, "3M" -> 3, "9M" -> 9, etc.)
    chord.intervals.forEach((interval, i) => {
      const grado = Tonal.Interval.num(interval); // ← use this!
      grados[grado] = chord.notes[i];
    });

    return {
      ...chord, 
      grados
    };
  });
}


// [[String]] -> [[Object]]
export function armoniaEnNotasExplicitas(armonia){
  const armoniaNotas = armonia.map((acorde) => obtenerNotasDelAcorde(acorde));
  return armoniaNotas
}




///////////////// Melodia //////////////////////

// :: [[{time, note, duration} , ... ], ... ] -> [[{tonal chord}], ... ] -> [{time, note, duration} , ... ]
export function lineaMelodica(parte, armonia, octavaAbsoluta) {
  const result = parte.map((p, index) => {
    const harmonyForPart = armonia[index % armonia.length];  // Get the corresponding harmony
    return listaDeGradosDeAcordesALineaMelodica(p, harmonyForPart, octavaAbsoluta);
  }).flat();

  console.log(result);
  return result;
}


// :: {time, note duration} -> {tonal chord} -> {time, note duration}
function asignarNotasDeLineaMelodicaSegunGradosDelAcorde(elementoParte, chordProperties, octavaAbsoluta) {

  if (elementoParte.note === null) return elementoParte; // Preserve rests without modifying

  const grado = elementoParte.note;
  const octava = octavaAbsoluta + elementoParte.octavaRelativa;
  const notaGrado = chordProperties.grados[grado];

  if (notaGrado) {
    elementoParte.note = notaGrado + String(octava);
  } else {
    elementoParte.note = null; // Degree not present in chord
  }

  return elementoParte;
}


// :: [{time, note, duration} , ... ] -> [{tonal chord}] -> [{time, note duration}, ...]
function listaDeGradosDeAcordesALineaMelodica(elementosParteList, chordPropertiesList, octavaAbsoluta) {
  return elementosParteList.map(elemento => {
    const chordProperties = chordPropertiesList[0]; // Assuming one chord per segment
    return asignarNotasDeLineaMelodicaSegunGradosDelAcorde({ ...elemento }, chordProperties, octavaAbsoluta);
  });
}






/////////////////// Línea del bajo //////////////////////

// :: {time, note dureation} -> {tonal chord} -> {time, note dureation}
// function asignarNotasDelBajoSegunGradosDelAcorde(elementoParte, chordProperties, octavaAbsoluta) {
//   const grados = {
//     null: null,
//     1: chordProperties.tonic,
//     3: chordProperties.notes[1] || null,
//     5: chordProperties.notes[2] || null,
//     7: chordProperties.notes[3] || null
//   };
  
//   const grado = elementoParte.note;
//   const octava = octavaAbsoluta + elementoParte.octavaRelativa;

//   if (grados[grado] !== null) {
//     elementoParte.note = grados[grado] + String(octava);  
//   } 
//   return elementoParte;
// }

// // :: [{time, note, duration} , ... ] -> [{tonal chord}] -> [{time, note duration}, ...]
// function listaDeGradosDeAcordesAlistaDeNotasDelBajo(elementosParteList, chordPropertiesList, octavaAbsoluta) {
//   return elementosParteList.map(elemento => {
//     const chordProperties = chordPropertiesList[0];
//     return asignarNotasDelBajoSegunGradosDelAcorde({ ...elemento }, chordProperties, octavaAbsoluta);
//   });
// } 


// // :: [[{time, note, duration} , ... ], ... ] -> [[{tonal chord}], ... ] -> [{time, note, duration} , ... ]
// export function lineaDelBajo(parte, armonia, octavaAbsoluta) {
//   const result = parte.map((p, index) => {
//     const harmonyForPart = armonia[index % armonia.length];  // Get the corresponding harmony
//     return listaDeGradosDeAcordesAlistaDeNotasDelBajo(p, harmonyForPart, octavaAbsoluta);
//   }).flat().filter(elemento => elemento.note !== null);
//   console.log(result);
//   return result
// }


function asignarNotasDelBajoSegunGradosDelAcorde(elementoParte, chordProperties, octavaAbsoluta) {
  if (elementoParte.note === null) return elementoParte; // Preserve rests without modifying

  const grado = elementoParte.note;
  const octava = octavaAbsoluta + elementoParte.octavaRelativa;
  const notaGrado = chordProperties.grados[grado];

  if (notaGrado) {
    elementoParte.note = notaGrado + String(octava);
  } else {
    elementoParte.note = null; // Degree not present in chord
  }

  return elementoParte;
}

function listaDeGradosDeAcordesAlistaDeNotasDelBajo(elementosParteList, chordProperties, octavaAbsoluta) {
  return elementosParteList.map(elemento => {
    return asignarNotasDelBajoSegunGradosDelAcorde({ ...elemento }, chordProperties[0], octavaAbsoluta);
  });
}


export function lineaDelBajo(parte, armonia, octavaAbsoluta) {
  const result = parte.map((p, index) => {
    const harmonyForPart = armonia[index % armonia.length];
    return listaDeGradosDeAcordesAlistaDeNotasDelBajo(p, harmonyForPart, octavaAbsoluta);
  }).flat();

  console.log(result);
  return result;
}


/////////////////// Acordes del teclado //////////////////////

// const parteTeclado = [{ "time": "0:2:0", "note": ['C4', 'E4', 'G4'], "duration": "4n" }, { "time": "0:4:0", "note": ['C4', 'E4', 'G4'], "duration": "4n" }]
 // :: {time, note dureation} -> {tonal chord} -> [{time, note: [lista de notas del acorde] dureation}, ...]
// function asignarNotasDelTecladoSegunGradosDelAcorde(elementoParte, chordProperties, octavaAbsoluta) {
//   const grados = {
//     null: null,
//     1: chordProperties.tonic,
//     3: chordProperties.notes[1] || null,
//     5: chordProperties.notes[2] || null,
//     7: chordProperties.notes[3] || null
//   };
  
//   const grado = elementoParte.note;
//   const octava = octavaAbsoluta + elementoParte.octavaRelativa;
//   let chordNotes = [];

//   if (grados[grado] !== null){
//     if (grados[7] === null) {
//     chordNotes.push(grados[1] + String(octava), grados[3] + String(octava), grados[5] + String(octava));
//   } else {
//     chordNotes.push(grados[1] + String(octava), grados[3] + String(octava), grados[5] + String(octava), grados[7] + String(octava));
//   }
// }

//   elementoParte.note = chordNotes;
//   // console.log("elementoParte", elementoParte);
//   return elementoParte;
// }

function asignarNotasDelTecladoSegunGradosDelAcorde(elementoParte, chordProperties, octavaAbsoluta) {
  if (elementoParte.note === null) return elementoParte; // Preserve rests
  
    const octava = octavaAbsoluta + elementoParte.octavaRelativa;
    const grados = chordProperties.grados || {};

    // Get all the available degrees (sorted numerically for musical order)
  const gradosOrdenados = Object.keys(grados)
  .map(Number)
  .sort((a, b) => a - b);

  // TODO:
  // Limit voicings to 4 notes? Just .slice(0, 4)
  // Add drop-2 logic? Shuffle degrees and shift octaves
  // Avoid muddy low-register 11ths/13ths? Filter based on range
  // Add inversions? Reorder gradosOrdenados

  const chordNotes = gradosOrdenados.map(grado => grados[grado] + String(octava));
  elementoParte.note = chordNotes.length > 0 ? chordNotes : null;


  return elementoParte;
}

// :: [{time, note, duration} , ... ] -> [{tonal chord}] -> [{time, note duration}, ...]
function listaDeGradosDeAcordesAlistaDeNotasDelTeclado(elementosParteList, chordPropertiesList, octavaAbsoluta) {
  return elementosParteList.map(elemento => {
    const chordProperties = chordPropertiesList[0];
      // console.log("asignarNotas", asignarNotasDelTecladoSegunGradosDelAcorde({ ...elemento }, chordProperties, octavaAbsoluta));
    return asignarNotasDelTecladoSegunGradosDelAcorde({ ...elemento }, chordProperties, octavaAbsoluta);
  });
} 

// :: [[{time, note, duration} , ... ], ... ] -> [[{tonal chord}], ... ] -> [{time, note, duration} , ... ]
export function acordesDelTeclado(parte, armonia, octavaAbsoluta) {
  const result = parte.map((p, index) => {
    const harmonyForPart = armonia[index % armonia.length];
    return listaDeGradosDeAcordesAlistaDeNotasDelTeclado(p, harmonyForPart, octavaAbsoluta);
  }).flat();

  return result;
}

// export function acordesDelTeclado(parte, armonia, octavaAbsoluta) {
//   const result = parte.map((p, index) => {
//     const harmonyForPart = armonia[index % armonia.length];  // Get the corresponding harmony
//     // console.log("listaDeGrados", listaDeGradosDeAcordesAlistaDeNotasDelTeclado(p, harmonyForPart, octavaAbsoluta));

//     return listaDeGradosDeAcordesAlistaDeNotasDelTeclado(p, harmonyForPart, octavaAbsoluta);
//   }).flat().filter(elemento => elemento.note !== null);
//       // console.log("result", result);
//   return result
// }




/////////////////// Contar número de compases //////////////////////


// :: [{time, note, duration} , ... ] -> Int
 export function numberOfMeasures(parte){ 
    let lastElement = parte[parte.length - 1];  // Step 1: Access the last element
    let timeValue = lastElement.time;      // Step 2: Get the 'time' value
    let timeParts = timeValue.split(':'); // Step 3: Split the 'time' value by ':'
   return parseInt(timeParts[0], 10);    // Step 4: Get the first element
  }



