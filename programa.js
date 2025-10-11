import * as a from "./armonia.js";
import * as i from "./instrumento.js";



export default class Programa {
  constructor() {
    this.estado = null;
    this.stateHistory = [];// Array to store different states
  }

  stop = (docId) => {
    i.stopSequence(docId);
  }

  ejecutar = async (datosDelPrograma, docId) => {
    this.estado = datosDelPrograma;
    await this.programa(
      datosDelPrograma.estadoGlobal,
      datosDelPrograma.pistas,
      datosDelPrograma.adornarPunteoConfigs,
      docId
    );
  }
  // let stateHistory = []; 
  // Array to store different states

  updateState(newList) {
    this.stateHistory.push([...newList]); // Store a copy of the new state

    // Keep only the last two states
    if (this.stateHistory.length > 2) {
      this.stateHistory.shift();
    }
  }

  findDeletedItems() {
    if (this.stateHistory.length === 2) {
      const [previousState, currentState] = this.stateHistory;

      // Log the states for verification
      console.log("Previous state:", previousState);
      console.log("Current state:", currentState);

      // Identify items in previousState not in currentState by comparing `name` and `id`
      const deletedItems = previousState.filter(prevItem =>
        !currentState.some(currItem =>
          currItem.name === prevItem.name && currItem.id === prevItem.id
        )
      );

      console.log("Deleted items:", deletedItems);
      return deletedItems;
    }
    return [];
  }


  // Main function that manages state updates and deletion tracking
  programa = async (estadoGlobal, pistas, adornarPunteoConfigs, docId) => {
    console.log("estado global", estadoGlobal)
    console.log("docId", docId)
    // Update tempo and harmony

    pistas.forEach((pista) => {
      pista.id = docId + '_' + pista.name + "_" + pista.id; // Include docId in the ID
    });

    this.updateState(pistas);
    const deletedItems = this.findDeletedItems();

    // Iterate over deleted items and call desconectarPistasBorradas for each
    deletedItems.forEach(item => {
      // Assuming each item has an id property
      const id = item.id; // Extract the id from the item
      i.desconectarPistasBorradas(id, docId); // Call the function with the individual id
    });



    // Process the current pistas
    if (pistas.length === 0) {
      i.stopSequence();
      return;
    }

    // Wait for all sequences to be ready
    const readySequences = await Promise.all(
      pistas.map(pista =>
        i.tocaSecuencia(
          estadoGlobal.armonia,
          pista.name,
          pista.id,
          pista.volumen,
          pista.paneo,
          pista.sonido,
          '1m',
          pista.notas,
          pista.parte.type,
          pista.parte.parteList,
          pista.octavaAbsoluta,
          adornarPunteoConfigs,
          pista.efectos,
          estadoGlobal.volumenRampDuration,
          docId
        )
      )
    );

    // Start the Transport only after all sequences are ready
    // const startTime = i.establecerTempo(estadoGlobal.tempo)
    // readySequences.forEach(seq => seq.start(startTime) + 5);

    const startTime = i.establecerTempo(estadoGlobal.tempo);

    // Start only the sequences for this doc
    readySequences.forEach(seq => {
      seq.start(startTime)  // schedule relative to global Transport
    });


  }
}
