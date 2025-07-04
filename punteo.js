// Enhanced melody generation with passing notes and jazz improvisation
// This builds on your existing lineaMelodica function



// Main function to enhance a melody with passing notes and ornaments
export function adornarMelodia(melodiaBase, armonia, configuracion = {}) {
    const config = {
      densidadPasos: 0.7, // Probability of adding passing notes (0-1)  // Fewer passing notes
      usarEscalaJazz: true,
      tipoOrnamento: 'chromatic', // 'chromatic', 'scalar', 'arpeggiated'
      mantenerNotasObjetivo: true,
      duracionPasos: '8n', // Require quarter note gaps minimum
      subdivisionMinima: '4n', // Minimum note duration for ornaments
      espaciadoPasos: 1,           // Double the spacing between notes
//       The espaciadoPasos parameter works as a multiplier:

// 1.0 = normal spacing
// 1.5 = 1.5x more spaced out
// 2.0 = double the spacing
// 0.5 = half the spacing (more compressed)

      ...configuracion
    };
  
    let melodiaAdornada = [];
    
    for (let i = 0; i < melodiaBase.length; i++) {
      const notaActual = melodiaBase[i];
      const notaSiguiente = melodiaBase[i + 1];
      
      // Always add the target note
      melodiaAdornada.push({ ...notaActual });
      
      // Add passing notes between target notes
      if (notaSiguiente && config.mantenerNotasObjetivo) {
        const passingNotes = generarNotasDePaso(
          notaActual, 
          notaSiguiente, 
          armonia, 
          config
        );
        melodiaAdornada.push(...passingNotes);
      }
    }
    
    return melodiaAdornada;
  }
  
  // Generate passing notes between two target notes
  function generarNotasDePaso(notaInicio, notaFin, armonia, config) {
    const passingNotes = [];
    
    // Parse the time positions
    const tiempoInicio = parseToneTime(notaInicio.time);
    const tiempoFin = parseToneTime(notaFin.time);
    
    // Calculate available time for passing notes
    const tiempoDisponible = tiempoFin - tiempoInicio;
    
    // Only add passing notes if there's enough time
    if (tiempoDisponible <= getNoteDurationInSixteenths(config.subdivisionMinima)) {
      return passingNotes;
    }
    
    // Get the chord scale for this time position
    const acordeActual = obtenerAcordeEnTiempo(notaInicio.time, armonia);
    const escala = obtenerEscalaDelAcorde(acordeActual, config.usarEscalaJazz);
    
    // Generate passing notes based on the approach type
    switch (config.tipoOrnamento) {
      case 'chromatic':
        return generarPasosCromaticos(notaInicio, notaFin, tiempoDisponible, config);
      case 'scalar':
        return generarPasosEscalares(notaInicio, notaFin, escala, tiempoDisponible, config);
      case 'arpeggiated':
        return generarArpegios(notaInicio, notaFin, acordeActual, tiempoDisponible, config);
      default:
        return [];
    }
  }
  
  // Generate chromatic passing notes
  function generarPasosCromaticos(notaInicio, notaFin, tiempoDisponible, config) {
    const passingNotes = [];
    
    // Convert notes to MIDI numbers for easier calculation
    const midiInicio = Tonal.Note.midi(notaInicio.note);
    const midiFin = Tonal.Note.midi(notaFin.note);
    
    if (!midiInicio || !midiFin) return [];
    
    const intervalo = midiFin - midiInicio;
    const direccion = Math.sign(intervalo);
    
    // Only add chromatic passing notes if the interval is suitable
    if (Math.abs(intervalo) > 1 && Math.abs(intervalo) <= 7) {
        // Use configurable duration instead of hardcoded '4n'
    const duracionPaso = config.duracionPasos || '4n'; // Default to quarter notes (slower)
   
      const numPasos = Math.min(
        Math.abs(intervalo) - 1, 
        Math.floor(tiempoDisponible / getNoteDurationInSixteenths(duracionPaso))
      );

      
      for (let i = 1; i <= numPasos; i++) {
        const midiPaso = midiInicio + (direccion * i);
        const notaPaso = Tonal.Note.fromMidi(midiPaso);
        
        const tiempoPaso = calcularTiempoIntermedioConEspacio(
          notaInicio.time, 
          notaFin.time, 
          i / (numPasos + 1), 
            config.espaciadoPasos || 1 // Use configurable spacing factor

        );
        
        passingNotes.push({
          time: tiempoPaso,
          note: notaPaso,
          duration: duracionPaso, // Use configurable duration
          velocity: notaInicio.velocity * 0.6, // Slightly softer
          ornament: true
        });
      }
    }
    
    return passingNotes;
  }
  
  // Generate scalar passing notes using chord scales
  function generarPasosEscalares(notaInicio, notaFin, escala, tiempoDisponible, config) {
    const passingNotes = [];
    
    if (!escala || escala.length === 0) {
      console.log('No scale available for scalar passing notes');
      return [];
    }
    
    const notaInicioSinOctava = Tonal.Note.pitchClass(notaInicio.note);
    const notaFinSinOctava = Tonal.Note.pitchClass(notaFin.note);
    
    console.log('Generating scalar steps from', notaInicioSinOctava, 'to', notaFinSinOctava, 'using scale:', escala);
    
    // Find positions in scale
    const posInicio = escala.indexOf(notaInicioSinOctava);
    const posFin = escala.indexOf(notaFinSinOctava);
    
    if (posInicio === -1 || posFin === -1) {
      console.log('Notes not found in scale, posInicio:', posInicio, 'posFin:', posFin);
      return [];
    }
    
    const direccion = Math.sign(posFin - posInicio);
    const octavaBase = Tonal.Note.octave(notaInicio.note);

    // Use configurable duration instead of hardcoded '8n'
  const duracionPaso = config.duracionPasos || '4n'; // Default to quarter notes (slower)

    
    // Generate scalar movement
    const numPasos = Math.min(
      Math.abs(posFin - posInicio) - 1,
      Math.floor(tiempoDisponible / getNoteDurationInSixteenths(duracionPaso))
    );
    
    console.log('Will generate', numPasos, 'scalar passing notes');
    
    for (let i = 1; i <= numPasos; i++) {
      const posEscala = (posInicio + (direccion * i) + escala.length) % escala.length;
      const notaPaso = escala[posEscala] + octavaBase;
      
      const tiempoPaso = calcularTiempoIntermedioConEspacio(
        notaInicio.time,
        notaFin.time,
        i / (numPasos + 1), 
        config.espaciadoPasos || 1 // Use configurable spacing factor
    );
      
      console.log('Adding passing note:', notaPaso, 'at time:', tiempoPaso);
      
      passingNotes.push({
        time: tiempoPaso,
        note: notaPaso,
        duration: duracionPaso, // Use configurable duration
        velocity: notaInicio.velocity * 0.6,
        ornament: true
      });
    }
    
    return passingNotes;
  }
  
  // Get chord scale (jazz approach)
  function obtenerEscalaDelAcorde(simboloAcorde, usarEscalaJazz = true) {
    if (!simboloAcorde) {
      console.log('No chord symbol found:', simboloAcorde);
      return [];
    }
    
    const chordInfo = Tonal.Chord.get(simboloAcorde);
    const tonica = chordInfo.tonic;
    
    console.log('Getting scale for chord:', simboloAcorde, 'tonic:', tonica);
    
    // Jazz chord scale mapping
    const escalasPorTipo = {
      'M': 'major', // Cmaj7 -> C major
      'm': 'dorian', // Cm7 -> C dorian
      '7': 'mixolydian', // C7 -> C mixolydian
      'm7b5': 'locrian', // Cm7b5 -> C locrian
      'dim': 'diminished', // Cdim -> C diminished
      'aug': 'whole tone', // Caug -> C whole tone
    };
    
    // Determine scale type based on chord quality
    let tipoEscala = 'major'; // default
    
    if (chordInfo.quality === 'Minor') {
      tipoEscala = 'dorian';
    } else if (chordInfo.quality === 'Dominant') {
      tipoEscala = 'mixolydian';
    } else if (chordInfo.aliases && chordInfo.aliases.some(alias => alias.includes('dim'))) {
      tipoEscala = 'diminished';
    }
    
    // Get scale notes
    try {
      const escala = Tonal.Scale.get(`${tonica} ${tipoEscala}`).notes;
      console.log('Generated scale:', escala);
      return escala;
    } catch (error) {
      console.log('Scale generation failed, using chord tones:', chordInfo.notes);
      // Fallback to chord tones if scale generation fails
      return chordInfo.notes;
    }
  }
  
  // Helper function to get chord at specific time
  function obtenerAcordeEnTiempo(tiempo, armonia) {
    // armonia format: [['Cmaj'], ['Dm'], ...]
    const compas = parseInt(tiempo.split(':')[0]);
    const acordeArray = armonia[compas % armonia.length];
    
    // Return the first chord symbol in the array
    return acordeArray && acordeArray[0] ? acordeArray[0] : null;
  }
  
  // Helper functions for time calculations
  function parseToneTime(timeString) {
    const [bars, beats, sixteenths] = timeString.split(':').map(Number);
    return bars * 16 + beats * 4 + sixteenths;
  }
  
  function getNoteDurationInSixteenths(duration) {
    const duracionMap = {
      '1n': 16, '2n': 8, '4n': 4, '8n': 2, '16n': 1
    };
    return duracionMap[duration] || 4;
  }
  
  
  function calcularTiempoIntermedio(tiempoInicio, tiempoFin, proporcion) {
    const inicioSixteenths = parseToneTime(tiempoInicio);
    const finSixteenths = parseToneTime(tiempoFin);

    const intermedioSixteenths = inicioSixteenths + 
      (finSixteenths - inicioSixteenths) * proporcion;
    
    const bars = Math.floor(intermedioSixteenths / 16);
    const beats = Math.floor((intermedioSixteenths % 16) / 4);
    const sixteenths = Math.floor(intermedioSixteenths % 4);
    
    return `${bars}:${beats}:${sixteenths}`;
  }

// Enhanced version with spacing control
function calcularTiempoIntermedioConEspacio(tiempoInicio, tiempoFin, proporcion, espaciado = 1) {
    const inicioSixteenths = parseToneTime(tiempoInicio);
    const finSixteenths = parseToneTime(tiempoFin);
    
    // Apply spacing multiplier to slow down the placement
    const tiempoTotal = (finSixteenths - inicioSixteenths) * espaciado;
    const intermedioSixteenths = inicioSixteenths + (tiempoTotal * proporcion);
    
    const bars = Math.floor(intermedioSixteenths / 16);
    const beats = Math.floor((intermedioSixteenths % 16) / 4);
    const sixteenths = Math.floor(intermedioSixteenths % 4);
    
    return `${bars}:${beats}:${sixteenths}`;
  }
  
  // Enhanced rhythm generation
  export function generarRitmoJazz(melodiaBase, configuracion = {}) {
    const config = {
      swing: 0.1, // Swing feel (0-1)
      sincopa: 0.3, // Syncopation probability
      variacionDuracion: true,
      ...configuracion
    };
    
    return melodiaBase.map(nota => {
      let nuevaNota = { ...nota };
      
      // Add swing feel
      if (config.swing > 0) {
        const tiempo = parseToneTime(nota.time);
        const esOffbeat = (tiempo % 2) === 1; // Odd sixteenth notes
        
        if (esOffbeat && Math.random() < config.swing) {
          // Slightly delay off-beat notes for swing feel
          const nuevoTiempo = tiempo + 0.1;
          nuevaNota.time = convertirSixteenthsATiempo(nuevoTiempo);
        }
      }
      
      // Add duration variation
      if (config.variacionDuracion && Math.random() < 1) {
        const duraciones = ['8n', '4n', '8n.', '4n.'];
        nuevaNota.duration = duraciones[Math.floor(Math.random() * duraciones.length)];
        // console.log(`🎛 Changing duration of ${nota.note} at ${nota.time} to ${nuevaNota.duration}`);

      }
      
      return nuevaNota;

    });
  }
  
  function convertirSixteenthsATiempo(sixteenths) {
    const bars = Math.floor(sixteenths / 16);
    const beats = Math.floor((sixteenths % 16) / 4);
    const remainder = sixteenths % 4;
    return `${bars}:${beats}:${remainder}`;
  }

//   TODO:

// check/ask why the notes are too fast? - ok
//check missing rests - ok!
// allow all degrees of the chord to be used in the target notes like 7nth, 4th if sus, etc -- ok
// add parsing option for choosing the approach type (chromatic, scalar, arpeggiated)and others