'use strict';

import dom from './dom.js';
import render from './render.js';
import settings from './settings.js';
import data from './data.js';

// FUNKTIONEN
const domMapping = () => {
    settings.elements.main = dom.$('main');
    settings.elements.btnReload = dom.$('#btnReload');
}

const appendEventListeners = () => {
    settings.elements.btnReload.addEventListener('click', () => {
        fillData();
        render.table();
    })
}

const fillData = () => {
    // Elemente vermischen
    // intermediate
    let tags = data.tags;

    tags.forEach((val, index) => {
        let random = ~~(Math.random() * data.tags.length);
        [tags[index], tags[random]] = [tags[random], tags[index]];
    })

    // Array füllen
    settings.overview = [];
    for (let y = 0; y < settings.height; y++) {
        // Eintrag in Übersicht
        let overviewRow = [];
        settings.overview.push(overviewRow);

        for (let x = 0; x < settings.height; x++) {
            let overviewObj = {
                x, y,
                selected: false,
                text: tags.pop()
            }
            overviewRow.push(overviewObj);
        }
    }
    data.saveData();
}


const loadData = () => {
    const loaded = localStorage.getItem('overview');
    if (loaded) {
        settings.overview = JSON.parse(loaded);
    } else {
        fillData();
    }
    console.log(settings.overview);

}

const init = () => {
    domMapping();
    appendEventListeners();
    loadData();
    // fillData();
    render.table();
}

// INIT
init();