import React, { useState } from 'react';

import { TogglerSwitch } from '@datarobot/design-system/js/toggler-switch';

import './View2D.scss';

export default function View2D({ representation2d }) {
  const [showInsights, setShowInsights] = useState(false);

  return (
    <div className="view-2d">
      <TogglerSwitch
        id="image-insights"
        checked={showInsights}
        onChange={() => setShowInsights(!showInsights)}
        labelText="Show image with insights"
        class
      />
      <div className="view-2d-wrap">
        {showInsights ? (
          <img src={`data:image/png;base64, ${representation2d.imageWithInsights}`}  />
        ) : (
          <img src={`data:image/png;base64, ${representation2d.image}`}  />
        )}
      </div>
    </div>
  )
}
