import React from 'react';

export const canvasSize = {
    width: 1200,
    height: 600,
};

export const contextSettings = {
    frameRate:10,
    paused: false,
    stepMode: false,
    restart: false,
};

export const context = React.createContext(contextSettings);