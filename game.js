const PLAYERS = [
    { name: 'Player 1', color: 'rgba(220, 20, 60, 0.75)' },
    { name: 'Player 2', color: 'rgba(30, 144, 255, 0.75)' },
    { name: 'Player 3', color: 'rgba(50, 205, 50, 0.75)' },
    { name: 'Player 4', color: 'rgba(255, 165, 0, 0.75)' },
    { name: 'Player 5', color: 'rgba(138, 43, 226, 0.75)' },
    { name: 'Player 6', color: 'rgba(255, 20, 147, 0.75)' }
];

const TERRITORIES = [
    { id: 'alaska', name: 'Alaska', continent: 'north-america', x: 10, y: 15 },
    { id: 'nw-territory', name: 'NW Territory', continent: 'north-america', x: 16, y: 18 },
    { id: 'greenland', name: 'Greenland', continent: 'north-america', x: 30, y: 10 },
    { id: 'alberta', name: 'Alberta', continent: 'north-america', x: 14, y: 25 },
    { id: 'ontario', name: 'Ontario', continent: 'north-america', x: 20, y: 27 },
    { id: 'quebec', name: 'Quebec', continent: 'north-america', x: 26, y: 27 },
    { id: 'western-us', name: 'W USA', continent: 'north-america', x: 14, y: 33 },
    { id: 'eastern-us', name: 'E USA', continent: 'north-america', x: 22, y: 35 },
    { id: 'central-america', name: 'C America', continent: 'north-america', x: 16, y: 42 },

    { id: 'venezuela', name: 'Venezuela', continent: 'south-america', x: 22, y: 50 },
    { id: 'peru', name: 'Peru', continent: 'south-america', x: 20, y: 60 },
    { id: 'brazil', name: 'Brazil', continent: 'south-america', x: 28, y: 58 },
    { id: 'argentina', name: 'Argentina', continent: 'south-america', x: 24, y: 70 },

    { id: 'iceland', name: 'Iceland', continent: 'europe', x: 38, y: 15 },
    { id: 'scandinavia', name: 'Scandinavia', continent: 'europe', x: 44, y: 17 },
    { id: 'great-britain', name: 'Britain', continent: 'europe', x: 40, y: 24 },
    { id: 'northern-europe', name: 'N Europe', continent: 'europe', x: 46, y: 26 },
    { id: 'western-europe', name: 'W Europe', continent: 'europe', x: 42, y: 32 },
    { id: 'southern-europe', name: 'S Europe', continent: 'europe', x: 48, y: 32 },
    { id: 'ukraine', name: 'Ukraine', continent: 'europe', x: 52, y: 24 },

    { id: 'north-africa', name: 'N Africa', continent: 'africa', x: 42, y: 42 },
    { id: 'egypt', name: 'Egypt', continent: 'africa', x: 50, y: 40 },
    { id: 'east-africa', name: 'E Africa', continent: 'africa', x: 52, y: 50 },
    { id: 'congo', name: 'Congo', continent: 'africa', x: 46, y: 54 },
    { id: 'south-africa', name: 'S Africa', continent: 'africa', x: 48, y: 65 },
    { id: 'madagascar', name: 'Madagascar', continent: 'africa', x: 56, y: 63 },

    { id: 'ural', name: 'Ural', continent: 'asia', x: 58, y: 23 },
    { id: 'siberia', name: 'Siberia', continent: 'asia', x: 64, y: 18 },
    { id: 'yakutsk', name: 'Yakutsk', continent: 'asia', x: 72, y: 16 },
    { id: 'irkutsk', name: 'Irkutsk', continent: 'asia', x: 68, y: 23 },
    { id: 'kamchatka', name: 'Kamchatka', continent: 'asia', x: 78, y: 18 },
    { id: 'afghanistan', name: 'Afghanistan', continent: 'asia', x: 58, y: 32 },
    { id: 'middle-east', name: 'M East', continent: 'asia', x: 54, y: 38 },
    { id: 'india', name: 'India', continent: 'asia', x: 62, y: 42 },
    { id: 'china', name: 'China', continent: 'asia', x: 68, y: 35 },
    { id: 'mongolia', name: 'Mongolia', continent: 'asia', x: 72, y: 27 },
    { id: 'japan', name: 'Japan', continent: 'asia', x: 80, y: 30 },
    { id: 'siam', name: 'Siam', continent: 'asia', x: 68, y: 47 },

    { id: 'indonesia', name: 'Indonesia', continent: 'australia', x: 72, y: 58 },
    { id: 'new-guinea', name: 'N Guinea', continent: 'australia', x: 78, y: 60 },
    { id: 'western-australia', name: 'W Australia', continent: 'australia', x: 72, y: 70 },
    { id: 'eastern-australia', name: 'E Australia', continent: 'australia', x: 80, y: 70 }
];

class GameState {
    constructor() {
        this.currentPlayerIndex = 0;
        this.selectedTerritory = null;
        this.territories = {};
        this.resources = {
            gold: 100, logs: 50, lumber: 20, stone: 30, coal: 10, iron: 10, pigskins: 5,
            wheat: 40, flour: 20, bread: 10, wine: 5, sausages: 5,
            axe: 2, bow: 2, sword: 1, 'wooden-shield': 3, 'iron-shield': 1,
            'iron-armor': 1, 'leather-armor': 2, horses: 3
        };
        this.constructions = [];

        TERRITORIES.forEach(t => {
            const ownerIndex = Math.floor(Math.random() * PLAYERS.length);
            this.territories[t.id] = {
                ...t,
                owner: ownerIndex,
                units: Math.floor(Math.random() * 5) + 3,
                civilians: Math.floor(Math.random() * 50) + 20,
                buildings: Math.floor(Math.random() * 8) + 2
            };
        });
    }

    selectTerritory(id) {
        this.selectedTerritory = id;
        updateUI();
    }

    endTurn() {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % PLAYERS.length;
        this.selectedTerritory = null;

        if (this.constructions.length > 0) {
            this.constructions = this.constructions.map(c => {
                c.timeLeft--;
                return c;
            }).filter(c => c.timeLeft > 0);
        }

        updateUI();
    }

    addConstruction(building, time) {
        this.constructions.push({ building, timeLeft: time });
        updateUI();
    }
}

let gameState = new GameState();

function initGame() {
    const territoriesContainer = document.getElementById('territories-container');

    TERRITORIES.forEach(territory => {
        const btn = document.createElement('button');
        btn.className = 'territory';
        btn.textContent = territory.id.substring(0, 2).toUpperCase();
        btn.style.left = `${territory.x}%`;
        btn.style.top = `${territory.y}%`;

        const terrData = gameState.territories[territory.id];
        btn.classList.add(`player${terrData.owner + 1}`);

        btn.onclick = () => {
            gameState.selectTerritory(territory.id);
        };

        territoriesContainer.appendChild(btn);
    });

    document.getElementById('close-menu').onclick = () => {
        document.getElementById('left-menu').classList.add('hidden');
        gameState.selectedTerritory = null;
        updateUI();
    };

    document.getElementById('end-turn').onclick = () => {
        gameState.endTurn();
    };

    updateUI();
}

function updateUI() {
    const leftMenu = document.getElementById('left-menu');

    if (gameState.selectedTerritory) {
        const terrData = gameState.territories[gameState.selectedTerritory];
        const territory = TERRITORIES.find(t => t.id === gameState.selectedTerritory);

        leftMenu.classList.remove('hidden');
        document.getElementById('territory-name').textContent = territory.name;
        document.getElementById('military-units').textContent = terrData.units;
        document.getElementById('civilians').textContent = terrData.civilians;

        const buildingsList = document.getElementById('buildings-list');
        buildingsList.innerHTML = '';
        for (let i = 0; i < terrData.buildings; i++) {
            const building = document.createElement('p');
            building.textContent = ['Barracks', 'Farm', 'Market', 'Castle', 'Smithy', 'Tavern'][i % 6];
            buildingsList.appendChild(building);
        }

        const constructionList = document.getElementById('construction-list');
        constructionList.innerHTML = '';
        gameState.constructions.forEach(c => {
            const item = document.createElement('p');
            item.textContent = `${c.building}: ${c.timeLeft} turns`;
            constructionList.appendChild(item);
        });

        if (gameState.constructions.length === 0) {
            const btn = document.createElement('button');
            btn.textContent = 'Build Farm (3 turns)';
            btn.onclick = () => gameState.addConstruction('Farm', 3);
            constructionList.appendChild(btn);
        }

        document.querySelectorAll('.territory').forEach(btn => {
            btn.classList.remove('selected');
        });
        document.querySelector(`.territory:nth-child(${TERRITORIES.findIndex(t => t.id === gameState.selectedTerritory) + 1})`).classList.add('selected');
    } else {
        leftMenu.classList.add('hidden');
    }

    const playersList = document.getElementById('players-list');
    playersList.innerHTML = '';
    PLAYERS.forEach((player, idx) => {
        const territoryCount = Object.values(gameState.territories).filter(t => t.owner === idx).length;
        const item = document.createElement('div');
        item.className = 'player-item';
        item.innerHTML = `
            <span><span class="player-color" style="background: ${player.color}"></span>${player.name}</span>
            <span>${territoryCount}</span>
        `;
        if (idx === gameState.currentPlayerIndex) {
            item.style.fontWeight = 'bold';
            item.style.color = '#daa520';
        }
        playersList.appendChild(item);
    });

    Object.keys(gameState.resources).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = gameState.resources[key];
        }
    });
}

document.addEventListener('DOMContentLoaded', initGame);
