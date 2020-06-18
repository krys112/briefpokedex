import React from 'react';

export const StatProgress = (props) => {
  console.log('proprs are ', props);
  let maxStat;
  switch (props.name) {
    case 'hp':
      maxStat = 255;
      break;
    case 'attack':
      maxStat = 190;
      break;
    case 'defense':
      maxStat = 230;
      break;
    case 'special-attack':
      maxStat = 194;
      break;
    case 'special-defense':
      maxStat = 230;
      break;
    case 'speed':
      maxStat = 180;
      break;
  }

  let percent = props.stat * (100 / maxStat);

  return (
    <div className="progress">
      <div
        className="progress-bar"
        role="progressbar"
        style={{ width: `${percent}%` }}
      >
      </div>
    </div>
  )
}