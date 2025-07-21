// only used in percussion instruments

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

