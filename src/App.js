import React, { useState, useEffect, useMemo, useCallback } from 'react';

const LOCAL_STORAGE_NAME = '@tecnologies';

function App() {
  const [tecnologies, setTecnologies] = useState([]);
  const [newTecnology, setNewTecnology] = useState('');

  useEffect(() => {
    const storedTecnologies = localStorage.getItem(LOCAL_STORAGE_NAME);
    if (storedTecnologies) {
      setTecnologies(JSON.parse(storedTecnologies));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(tecnologies));
  }, [tecnologies]);

  const tecnologiesSize = useMemo(() => {
    return tecnologies.length;
  }, [tecnologies]);

  const handleAdd = useCallback(() => {
    setTecnologies([...tecnologies, newTecnology]);
    setNewTecnology('');
  }, [newTecnology, tecnologies]);

  return (
    <>
      <ul>
        {tecnologies.map(tecnology => (
          <li key={tecnology}>{tecnology}</li>
        ))}
      </ul>

      <p>Você tem {tecnologiesSize} tecnologias</p>

      <input
        type="text"
        onChange={event => setNewTecnology(event.target.value)}
        value={newTecnology}
      />

      <button type="button" onClick={handleAdd}>
        Add
      </button>
    </>
  );
}

export default App;
