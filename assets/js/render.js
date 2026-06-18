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
        console.log('overview', settings.overview);

        let hasWonVertical = settings.overview
            .flat()
            .filter(el => el.x === x)
            .every(el => el.selected);

        let hasWonHorizontal = settings.overview
            .flat()
            .filter(el => el.y === y)
            .every(el => el.selected);


        let hasWonDiag1 = [0, 1, 2, 3].map((v, i) => {
            return settings.overview
                .flat()
                .filter(el => el.y === i)
                .filter(el => el.x === i)[0]
                .selected
        }).every(el => el === true);

        let hasWonDiag2 = [0, 1, 2, 3].map((v, i) => {
            return settings.overview
                .flat()
                .filter(el => el.y === i)
                .filter(el => el.x === 3 - i)[0]
                .selected
        }).every(el => el === true);

        // console.log(hasWonDiag1, hasWonDiag2);

        if (hasWonHorizontal) {
            settings.overview
                .flat()
                .filter(el => el.y === y)
                .forEach(el => el.domEl.classList.add('winner'));
        }
        if (hasWonVertical) {
            settings.overview
                .flat()
                .filter(el => el.x === x)
                .forEach(el => el.domEl.classList.add('winner'));
        }
        if (hasWonDiag1) {
            settings.overview[0][0].domEl.classList.add('winner');
            settings.overview[1][1].domEl.classList.add('winner');
            settings.overview[2][2].domEl.classList.add('winner');
            settings.overview[3][3].domEl.classList.add('winner');
        }
        if (hasWonDiag2) {
            settings.overview[0][3].domEl.classList.add('winner');
            settings.overview[1][2].domEl.classList.add('winner');
            settings.overview[2][1].domEl.classList.add('winner');
            settings.overview[3][0].domEl.classList.add('winner');
        }
    },
    table
        () {
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