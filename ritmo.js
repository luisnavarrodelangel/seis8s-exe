///////////// Filtrar silencios (valores null) y aplana la lista de listas a lista - Funcion de ayuda para instrumentos con ritmo //////////////
// export function filtrarYaplanarParte(parteNonFlattened) {
//       let parteFlattened = parteNonFlattened.flat();
//       let filteredParte = parteFlattened.filter(e => e.note !== null);
//       filteredParte.forEach(e => e.note = 'C4');
//       return filteredParte;
//     }

// export function filtrarYaplanarParte(parteNonFlattened) {
//   let parteFlattened = parteNonFlattened.flat();
//   parteFlattened.forEach(e => {
//     e.note = e.note === null ? null : 'C4'; // only assign a note if it's not null
//   });
//   return parteFlattened;
// }

// export function filtrarYaplanarParteCongas(parteNonFlattened) {
//   let parteFlattened = parteNonFlattened.flat();
//   let filteredParte = parteFlattened.filter(e => e.note !== null);
  
//   filteredParte.forEach(e => {
//     if (e.note === 1) {
//       e.note = 'C4';
//     }
//   });

//   return filteredParte;
// }

export function filtrarYaplanarParte(parteNonFlattened) {
  let parteFlattened = parteNonFlattened.flat();

  parteFlattened.forEach(e => {
    if (e.note === 1) {
      e.note = 'C4';
    }
    // Leave note null or other values untouched
  });

  return parteFlattened;
}

