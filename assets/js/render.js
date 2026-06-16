'use strict';

import settings from './settings.js';
import data from './data.js';
import dom from './dom.js';

const render = {
    handleClick(dataset) {
        // console.log(dataset);
        dataset.selected = !dataset.selected;
        render.table();
        render.checkIfWon(dataset.x, dataset.y);

        data.saveData();
    },
    checkIfWon(x, y) {
        // vertikal
        // console.log( settings.overview.flat()); //.filter()
        let hasWonVertical = settings.overview
            .flat()
            .filter(el => el.x == x)
            .every(el => el.selected);

        let hasWonHorizontal = settings.overview
            .flat()
            .filter(el => el.y == y)
            .every(el => el.selected);

        // console.log('H', hasWonHorizontal);
        // console.log('V', hasWonVertical);

        if (hasWonHorizontal) {
            settings.overview
                .flat()
                .filter(el => el.y == y)
                .forEach(el => el.domEl.classList.add('winner'));
        }
        if (hasWonVertical) {
            settings.overview
                .flat()
                .filter(el => el.x == x)
                .forEach(el => el.domEl.classList.add('winner'));
        }
    },
    table() {
        // Leeren
        settings.elements.main.innerHTML = '';

        // Tabelle neu aufbauen
        const elTable = dom.create({
            type: 'table',
            parent: elements.main,
            cssClassName: 'raster'
        })

        settings.overview.forEach(row => {
            // for (let y = 0; y < settings.height; y++) {
            const elRow = dom.create({
                type: 'tr',
                parent: elTable
            })

            // Eintrag in Übersicht
            row.forEach(dataset => {
                // for (let x = 0; x < settings.height; x++) {

                const elField = dom.create({
                    type: 'td',
                    parent: elRow,
                    content: dataset.text,
                    cssClassName: `${dataset.selected ? 'selected' : 'unselected'}`
                })

                elField.addEventListener('click', () => render.handleClick(dataset));

                dataset.domEl = elField;

            })

        })

    }
}

export default render;
export let elements = settings.elements;