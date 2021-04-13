import React from 'react';

export const canvasSize = {
    width: 1200,
    height: 600,
};

export const contextSettings = {
    frameRate:50,
    paused: false,
    stepMode: false,
    restart: false,
    nextStep: false,
    numberOfElementsChanged: false,
    numberOfElements: 40,
};

export const context = React.createContext(contextSettings);