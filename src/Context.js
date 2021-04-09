import React from 'react';

export const canvasSettings = {
    width: 1200,
    height: 600,
    frameRate: 10
};

export const context = React.createContext(canvasSettings);