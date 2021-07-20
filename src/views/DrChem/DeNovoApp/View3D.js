import React, { useRef, useEffect } from 'react';
import Miew from 'miew';

import './View3D.scss';

export default function View3D({ representation3d }) {
  const visRef = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    instanceRef.current = new Miew({
      container: visRef?.current,
      load: representation3d.smiles,
    });

    if (instanceRef.current.init()) {
      instanceRef.current.run();

    }
  }, [])

  return (
    <div className="view-3d">
      <div ref={visRef} className="miew-container" style={{ width: '100%', height: '100%' }}/>
    </div>
  )
}
