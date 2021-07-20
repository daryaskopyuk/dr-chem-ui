import React, { useRef, useEffect } from 'react';
import Miew from 'miew';

import './View3D.scss';

export default function View3D({ representation3d }) {
  const visRef = useRef(null);
  const instanceRef = useRef(null);

  console.log(111, representation3d);

  useEffect(() => {
    instanceRef.current = new Miew({
      container: visRef?.current,
      settings: {
        fps: false,
        axes: false,
        bg: {color: 0xffffff, transparent: true},
      }
    });

    if (instanceRef.current.init()) {
      instanceRef.current.run();
      instanceRef.current.load(representation3d.moleculeStructure, { sourceType: 'immediate', fileType: 'xyz' });

    }
  }, [])

  return (
    <div className="view-3d">
      <div ref={visRef} className="miew-container" style={{ width: '100%', height: '100%' }}/>
    </div>
  )
}
