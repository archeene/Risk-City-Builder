const PLAYERS = [
    { name: 'HUMAN', color: 'rgba(220, 20, 60, 0.75)' },
    { name: 'Player 2', color: 'rgba(30, 144, 255, 0.75)' },
    { name: 'Player 3', color: 'rgba(50, 205, 50, 0.75)' },
    { name: 'Player 4', color: 'rgba(255, 165, 0, 0.75)' },
];
let zoomLevel = 1.33;
const TERRITORIES = [
    { id: 'alaska', name: 'Alaska', continent: 'north-america', x: 60, y: 130, neighbors: ['nw-territory', 'alberta', 'kamchatka'] },
    { id: 'nw-territory', name: 'NW Territory', continent: 'north-america', x: 210, y: 125, neighbors: ['alaska', 'alberta', 'ontario', 'greenland'] },
    { id: 'greenland', name: 'Greenland', continent: 'north-america', x: 440, y: 90, neighbors: ['nw-territory', 'ontario', 'quebec', 'iceland'] },
    { id: 'alberta', name: 'Alberta', continent: 'north-america', x: 170, y: 185, neighbors: ['alaska', 'nw-territory', 'ontario', 'western-us'] },
    { id: 'ontario', name: 'Ontario', continent: 'north-america', x: 255, y: 200, neighbors: ['nw-territory', 'alberta', 'quebec', 'western-us', 'eastern-us', 'greenland'] },
    { id: 'quebec', name: 'Quebec', continent: 'north-america', x: 345, y: 190, neighbors: ['ontario', 'eastern-us', 'greenland'] },
    { id: 'western-us', name: 'W USA', continent: 'north-america', x: 175, y: 265, neighbors: ['alberta', 'ontario', 'eastern-us', 'central-america'] },
    { id: 'eastern-us', name: 'E USA', continent: 'north-america', x: 280, y: 285, neighbors: ['western-us', 'ontario', 'quebec', 'central-america'] },
    { id: 'central-america', name: 'C America', continent: 'north-america', x: 180, y: 355, neighbors: ['western-us', 'eastern-us', 'venezuela'] },
    { id: 'venezuela', name: 'Venezuela', continent: 'south-america', x: 280, y: 420, neighbors: ['central-america', 'peru', 'brazil'] },
    { id: 'peru', name: 'Peru', continent: 'south-america', x: 295, y: 520, neighbors: ['venezuela', 'brazil', 'argentina'] },
    { id: 'brazil', name: 'Brazil', continent: 'south-america', x: 380, y: 510, neighbors: ['venezuela', 'peru', 'argentina', 'north-africa'] },
    { id: 'argentina', name: 'Argentina', continent: 'south-america', x: 305, y: 625, neighbors: ['peru', 'brazil'] },
    { id: 'iceland', name: 'Iceland', continent: 'europe', x: 545, y: 150, neighbors: ['greenland', 'scandinavia', 'great-britain'] },
    { id: 'scandinavia', name: 'Scandinavia', continent: 'europe', x: 650, y: 135, neighbors: ['iceland', 'great-britain', 'northern-europe', 'ukraine'] },
    { id: 'great-britain', name: 'Britain', continent: 'europe', x: 530, y: 240, neighbors: ['iceland', 'scandinavia', 'northern-europe', 'western-europe'] },
    { id: 'northern-europe', name: 'N Europe', continent: 'europe', x: 645, y: 245, neighbors: ['scandinavia', 'great-britain', 'western-europe', 'southern-europe', 'ukraine'] },
    { id: 'western-europe', name: 'W Europe', continent: 'europe', x: 540, y: 340, neighbors: ['great-britain', 'northern-europe', 'southern-europe', 'north-africa'] },
    { id: 'southern-europe', name: 'S Europe', continent: 'europe', x: 655, y: 330, neighbors: ['northern-europe', 'western-europe', 'ukraine', 'egypt', 'middle-east'] },
    { id: 'ukraine', name: 'Ukraine', continent: 'europe', x: 770, y: 200, neighbors: ['scandinavia', 'northern-europe', 'southern-europe', 'ural', 'afghanistan', 'middle-east'] },
    { id: 'north-africa', name: 'N Africa', continent: 'africa', x: 590, y: 465, neighbors: ['western-europe', 'brazil', 'egypt', 'east-africa', 'congo'] },
    { id: 'egypt', name: 'Egypt', continent: 'africa', x: 690, y: 445, neighbors: ['north-africa', 'east-africa', 'southern-europe', 'middle-east'] },
    { id: 'east-africa', name: 'E Africa', continent: 'africa', x: 775, y: 520, neighbors: ['north-africa', 'egypt', 'middle-east', 'madagascar', 'south-africa', 'congo'] },
    { id: 'congo', name: 'Congo', continent: 'africa', x: 695, y: 570, neighbors: ['north-africa', 'east-africa', 'south-africa'] },
    { id: 'south-africa', name: 'S Africa', continent: 'africa', x: 705, y: 670, neighbors: ['congo', 'east-africa', 'madagascar'] },
    { id: 'madagascar', name: 'Madagascar', continent: 'africa', x: 825, y: 660, neighbors: ['east-africa', 'south-africa'] },
    { id: 'ural', name: 'Ural', continent: 'asia', x: 910, y: 175, neighbors: ['ukraine', 'siberia', 'afghanistan', 'china'] },
    { id: 'siberia', name: 'Siberia', continent: 'asia', x: 975, y: 125, neighbors: ['ural', 'yakutsk', 'irkutsk', 'mongolia', 'china'] },
    { id: 'yakutsk', name: 'Yakutsk', continent: 'asia', x: 1080, y: 89, neighbors: ['siberia', 'irkutsk', 'kamchatka'] },
    { id: 'irkutsk', name: 'Irkutsk', continent: 'asia', x: 1055, y: 190, neighbors: ['siberia', 'yakutsk', 'mongolia', 'kamchatka'] },
    { id: 'kamchatka', name: 'Kamchatka', continent: 'asia', x: 1180, y: 110, neighbors: ['yakutsk', 'irkutsk', 'mongolia', 'japan', 'alaska'] },
    { id: 'afghanistan', name: 'Afghanistan', continent: 'asia', x: 880, y: 275, neighbors: ['ukraine', 'ural', 'china', 'india', 'middle-east'] },
    { id: 'middle-east', name: 'M East', continent: 'asia', x: 810, y: 395, neighbors: ['ukraine', 'afghanistan', 'india', 'egypt', 'east-africa', 'southern-europe'] },
    { id: 'india', name: 'India', continent: 'asia', x: 955, y: 395, neighbors: ['afghanistan', 'middle-east', 'china', 'siam'] },
    { id: 'china', name: 'China', continent: 'asia', x: 1030, y: 340, neighbors: ['afghanistan', 'ural', 'siberia', 'mongolia', 'india', 'siam'] },
    { id: 'mongolia', name: 'Mongolia', continent: 'asia', x: 1090, y: 270, neighbors: ['siberia', 'irkutsk', 'kamchatka', 'china', 'japan'] },
    { id: 'japan', name: 'Japan', continent: 'asia', x: 1205, y: 270, neighbors: ['kamchatka', 'mongolia'] },
    { id: 'siam', name: 'Siam', continent: 'asia', x: 1060, y: 425, neighbors: ['india', 'china', 'indonesia'] },
    { id: 'indonesia', name: 'Indonesia', continent: 'australia', x: 1080, y: 535, neighbors: ['siam', 'new-guinea', 'western-australia'] },
    { id: 'new-guinea', name: 'N Guinea', continent: 'australia', x: 1195, y: 520, neighbors: ['indonesia', 'western-australia', 'eastern-australia'] },
    { id: 'western-australia', name: 'W Australia', continent: 'australia', x: 1096, y: 670, neighbors: ['indonesia', 'new-guinea', 'eastern-australia'] },
    { id: 'eastern-australia', name: 'E Australia', continent: 'australia', x: 1195, y: 635, neighbors: ['new-guinea', 'western-australia'] }
];
class GameState {
    constructor() {
        this.currentPlayerIndex = 0;
        this.selectedTerritory = null;
        this.territories = {};
        this.resources = {
    gold: 100, logs: 50, lumber: 20, stone: 30,
    wheat: 40, flour: 20, bread: 10, wine: 5, sausages: 5,
    axes: 2, bows: 2, swords: 1, 'wooden-shields': 3, 'iron-shields': 1,
    'iron-armor': 1, 'leather-armor': 2, horses: 3
};
        this.constructions = [];
        const shuffledTerritories = [...TERRITORIES].sort(() => Math.random() - 0.5);
        shuffledTerritories.forEach((t, index) => {
            const ownerIndex = index % PLAYERS.length;
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
let viewMode = 'Global';
let attackMode = false;
let moveMode = false;
let attackingTerritory = null;
let movingTerritory = null;
function initGame() {
    const territoriesContainer = document.getElementById('territories-container');
    const mapScrollContainer = document.getElementById('map-scroll-container');
    const mapWrapper = document.getElementById('map-wrapper');
    TERRITORIES.forEach(territory => {
        const wrapper = document.createElement('div');
        wrapper.className = 'territory-wrapper';
        wrapper.style.left = `${territory.x}px`;
        wrapper.style.top = `${territory.y - 40}px`;
        wrapper.style.width = '48px';
        wrapper.style.height = '80px';
        const unitImg = document.createElement('img');
        unitImg.className = 'territory-unit-image';
        unitImg.style.width = '40px';
        unitImg.style.height = '40px';
        const btn = document.createElement('button');
        btn.className = 'territory';
        btn.style.width = '48px';
        btn.style.height = '48px';
        const terrData = gameState.territories[territory.id];
        btn.classList.add(`player${terrData.owner + 1}`);
        if (terrData.units <= 5) {
            unitImg.src = 'assets/swordsman.png';
        } else if (terrData.units <= 10) {
            unitImg.src = 'assets/knight.png';
        } else {
            unitImg.src = 'assets/catapult.png';
        }
        btn.onclick = () => {
            handleTerritoryClick(territory.id);
        };
        wrapper.appendChild(unitImg);
        wrapper.appendChild(btn);
        territoriesContainer.appendChild(wrapper);
    });
    mapScrollContainer.addEventListener('wheel', (e) => {
        if (e.ctrlKey) {
            e.preventDefault();
            const delta = e.deltaY > 0 ? 0.9 : 1.1;
            zoomLevel = Math.max(0.5, Math.min(zoomLevel * delta, 3));
            mapWrapper.style.transform = `scale(${zoomLevel})`;
        }
    });
    document.addEventListener('keydown', (e) => {
        const scrollAmount = 50;
        switch(e.key) {
            case 'ArrowUp':
                e.preventDefault();
                mapScrollContainer.scrollTop -= scrollAmount;
                break;
            case 'ArrowDown':
                e.preventDefault();
                mapScrollContainer.scrollTop += scrollAmount;
                break;
            case 'ArrowLeft':
                e.preventDefault();
                mapScrollContainer.scrollLeft -= scrollAmount;
                break;
            case 'ArrowRight':
                e.preventDefault();
                mapScrollContainer.scrollLeft += scrollAmount;
                break;
        }
    });
    let isDragging = false;
    let startX, startY, scrollLeft, scrollTop;
    mapScrollContainer.addEventListener('mousedown', (e) => {
        if (e.target.closest('.territory')) return;
        isDragging = true;
        mapScrollContainer.style.cursor = 'grabbing';
        startX = e.pageX - mapScrollContainer.offsetLeft;
        startY = e.pageY - mapScrollContainer.offsetTop;
        scrollLeft = mapScrollContainer.scrollLeft;
        scrollTop = mapScrollContainer.scrollTop;
    });
    mapScrollContainer.addEventListener('mouseleave', () => {
        isDragging = false;
        mapScrollContainer.style.cursor = 'default';
    });
    mapScrollContainer.addEventListener('mouseup', () => {
        isDragging = false;
        mapScrollContainer.style.cursor = 'default';
    });
    mapScrollContainer.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - mapScrollContainer.offsetLeft;
        const y = e.pageY - mapScrollContainer.offsetTop;
        const walkX = (x - startX) * 1.5;
        const walkY = (y - startY) * 1.5;
        mapScrollContainer.scrollLeft = scrollLeft - walkX;
        mapScrollContainer.scrollTop = scrollTop - walkY;
    });
    document.getElementById('end-turn').onclick = () => {
        gameState.endTurn();
    };
    // Create left toolbar container
    const leftToolbar = document.createElement('div');
    leftToolbar.id = 'left-toolbar';
    leftToolbar.style.position = 'fixed';
    leftToolbar.style.left = '0';
    leftToolbar.style.bottom = '125px';
    leftToolbar.style.width = '270px';
    leftToolbar.style.height = '140px';
    leftToolbar.style.background = 'rgba(42, 24, 16, 0.95)';
    leftToolbar.style.borderTop = '3px solid #8b6939';
    leftToolbar.style.borderRight = '3px solid #8b6939';
    leftToolbar.style.borderBottom = '3px solid #8b6939';
    leftToolbar.style.padding = '10px';
    leftToolbar.style.display = 'grid';
    leftToolbar.style.gridTemplateColumns = 'repeat(2, 1fr)';
    leftToolbar.style.gap = '10px';
    leftToolbar.style.zIndex = '102';
    document.body.appendChild(leftToolbar);

    // New Game button (green)
    const newGameButton = document.createElement('button');
    newGameButton.textContent = 'New Game';
    newGameButton.style.width = '120px';
    newGameButton.style.padding = '12px';
    newGameButton.style.background = 'linear-gradient(180deg, #32cd32 0%, #006400 100%)';
    newGameButton.style.border = '2px solid #00ff00';
    newGameButton.style.color = '#f4e4c1';
    newGameButton.style.fontFamily = "'Courier New', monospace";
    newGameButton.style.fontWeight = 'bold';
    newGameButton.style.cursor = 'pointer';
    newGameButton.style.borderRadius = '4px';
    newGameButton.style.transition = 'all 0.3s';
    newGameButton.style.fontSize = '14px';
    newGameButton.onmouseover = () => {
        newGameButton.style.background = 'linear-gradient(180deg, #00ff00 0%, #32cd32 100%)';
        newGameButton.style.transform = 'translateY(-2px)';
    };
    newGameButton.onmouseout = () => {
        newGameButton.style.background = 'linear-gradient(180deg, #32cd32 0%, #006400 100%)';
        newGameButton.style.transform = 'translateY(0)';
    };
    newGameButton.onclick = () => {
        // Create confirmation popup
        const popup = document.createElement('div');
        popup.style.position = 'fixed';
        popup.style.top = '50%';
        popup.style.left = '50%';
        popup.style.transform = 'translate(-50%, -50%)';
        popup.style.background = 'rgba(42, 24, 16, 0.95)';
        popup.style.border = '3px solid #8b6939';
        popup.style.padding = '20px';
        popup.style.zIndex = '200';
        popup.style.color = '#f4e4c1';
        popup.style.fontFamily = "'Courier New', monospace";
        popup.style.textAlign = 'center';
        popup.innerHTML = '<p>Are you sure you want to start a new game?</p>';

        const yesBtn = document.createElement('button');
        yesBtn.textContent = 'Yes';
        yesBtn.style.marginRight = '10px';
        yesBtn.style.padding = '8px 16px';
        yesBtn.style.background = 'linear-gradient(180deg, #8b6939 0%, #5a4030 100%)';
        yesBtn.style.border = '2px solid #daa520';
        yesBtn.style.color = '#f4e4c1';
        yesBtn.style.fontFamily = "'Courier New', monospace";
        yesBtn.style.fontWeight = 'bold';
        yesBtn.style.cursor = 'pointer';
        yesBtn.style.borderRadius = '4px';
        yesBtn.style.transition = 'all 0.3s';
        yesBtn.onmouseover = () => {
            yesBtn.style.background = 'linear-gradient(180deg, #daa520 0%, #8b6939 100%)';
            yesBtn.style.transform = 'translateY(-2px)';
        };
        yesBtn.onmouseout = () => {
            yesBtn.style.background = 'linear-gradient(180deg, #8b6939 0%, #5a4030 100%)';
            yesBtn.style.transform = 'translateY(0)';
        };
        yesBtn.onclick = () => {
            gameState = new GameState();
            updateUI();
            document.body.removeChild(popup);
        };

        const noBtn = document.createElement('button');
        noBtn.textContent = 'No';
        noBtn.style.padding = '8px 16px';
        noBtn.style.background = 'linear-gradient(180deg, #8b6939 0%, #5a4030 100%)';
        noBtn.style.border = '2px solid #daa520';
        noBtn.style.color = '#f4e4c1';
        noBtn.style.fontFamily = "'Courier New', monospace";
        noBtn.style.fontWeight = 'bold';
        noBtn.style.cursor = 'pointer';
        noBtn.style.borderRadius = '4px';
        noBtn.style.transition = 'all 0.3s';
        noBtn.onmouseover = () => {
            noBtn.style.background = 'linear-gradient(180deg, #daa520 0%, #8b6939 100%)';
            noBtn.style.transform = 'translateY(-2px)';
        };
        noBtn.onmouseout = () => {
            noBtn.style.background = 'linear-gradient(180deg, #8b6939 0%, #5a4030 100%)';
            noBtn.style.transform = 'translateY(0)';
        };
        noBtn.onclick = () => {
            document.body.removeChild(popup);
        };

        popup.appendChild(yesBtn);
        popup.appendChild(noBtn);
        document.body.appendChild(popup);
    };
    leftToolbar.appendChild(newGameButton);

    // Save/Load button (blue)
    const saveLoadButton = document.createElement('button');
    saveLoadButton.textContent = 'Save/Load';
    saveLoadButton.style.width = '120px';
    saveLoadButton.style.padding = '12px';
    saveLoadButton.style.background = 'linear-gradient(180deg, #1e90ff 0%, #000080 100%)';
    saveLoadButton.style.border = '2px solid #0000ff';
    saveLoadButton.style.color = '#f4e4c1';
    saveLoadButton.style.fontFamily = "'Courier New', monospace";
    saveLoadButton.style.fontWeight = 'bold';
    saveLoadButton.style.cursor = 'pointer';
    saveLoadButton.style.borderRadius = '4px';
    saveLoadButton.style.transition = 'all 0.3s';
    saveLoadButton.style.fontSize = '14px';
    saveLoadButton.onmouseover = () => {
        saveLoadButton.style.background = 'linear-gradient(180deg, #0000ff 0%, #1e90ff 100%)';
        saveLoadButton.style.transform = 'translateY(-2px)';
    };
    saveLoadButton.onmouseout = () => {
        saveLoadButton.style.background = 'linear-gradient(180deg, #1e90ff 0%, #000080 100%)';
        saveLoadButton.style.transform = 'translateY(0)';
    };
    saveLoadButton.onclick = () => {
        // Create save/load popup
        const popup = document.createElement('div');
        popup.style.position = 'fixed';
        popup.style.top = '50%';
        popup.style.left = '50%';
        popup.style.transform = 'translate(-50%, -50%)';
        popup.style.background = 'rgba(42, 24, 16, 0.95)';
        popup.style.border = '3px solid #8b6939';
        popup.style.padding = '20px';
        popup.style.zIndex = '200';
        popup.style.color = '#f4e4c1';
        popup.style.fontFamily = "'Courier New', monospace";
        popup.style.textAlign = 'center';
        popup.innerHTML = '<p>Save or Load Game</p>';

        const saveBtn = document.createElement('button');
        saveBtn.textContent = 'Save Game';
        saveBtn.style.marginRight = '10px';
        saveBtn.style.padding = '8px 16px';
        saveBtn.style.background = 'linear-gradient(180deg, #8b6939 0%, #5a4030 100%)';
        saveBtn.style.border = '2px solid #daa520';
        saveBtn.style.color = '#f4e4c1';
        saveBtn.style.fontFamily = "'Courier New', monospace";
        saveBtn.style.fontWeight = 'bold';
        saveBtn.style.cursor = 'pointer';
        saveBtn.style.borderRadius = '4px';
        saveBtn.style.transition = 'all 0.3s';
        saveBtn.onmouseover = () => {
            saveBtn.style.background = 'linear-gradient(180deg, #daa520 0%, #8b6939 100%)';
            saveBtn.style.transform = 'translateY(-2px)';
        };
        saveBtn.onmouseout = () => {
            saveBtn.style.background = 'linear-gradient(180deg, #8b6939 0%, #5a4030 100%)';
            saveBtn.style.transform = 'translateY(0)';
        };
        saveBtn.onclick = () => {
            const exportData = {
                currentPlayerIndex: gameState.currentPlayerIndex,
                selectedTerritory: gameState.selectedTerritory,
                territories: gameState.territories,
                resources: gameState.resources,
                constructions: gameState.constructions,
                exportDate: new Date().toISOString()
            };
            localStorage.setItem('gameSave', JSON.stringify(exportData));
            alert('Game saved!');
            document.body.removeChild(popup);
        };

        const loadBtn = document.createElement('button');
        loadBtn.textContent = 'Load Game';
        loadBtn.style.padding = '8px 16px';
        loadBtn.style.background = 'linear-gradient(180deg, #8b6939 0%, #5a4030 100%)';
        loadBtn.style.border = '2px solid #daa520';
        loadBtn.style.color = '#f4e4c1';
        loadBtn.style.fontFamily = "'Courier New', monospace";
        loadBtn.style.fontWeight = 'bold';
        loadBtn.style.cursor = 'pointer';
        loadBtn.style.borderRadius = '4px';
        loadBtn.style.transition = 'all 0.3s';
        loadBtn.onmouseover = () => {
            loadBtn.style.background = 'linear-gradient(180deg, #daa520 0%, #8b6939 100%)';
            loadBtn.style.transform = 'translateY(-2px)';
        };
        loadBtn.onmouseout = () => {
            loadBtn.style.background = 'linear-gradient(180deg, #8b6939 0%, #5a4030 100%)';
            loadBtn.style.transform = 'translateY(0)';
        };
        loadBtn.onclick = () => {
            const saved = localStorage.getItem('gameSave');
            if (saved) {
                const importData = JSON.parse(saved);
                gameState.currentPlayerIndex = importData.currentPlayerIndex;
                gameState.selectedTerritory = importData.selectedTerritory;
                gameState.territories = importData.territories;
                gameState.resources = importData.resources;
                gameState.constructions = importData.constructions;
                updateUI();
                alert('Game loaded!');
            } else {
                alert('No saved game found');
            }
            document.body.removeChild(popup);
        };

        popup.appendChild(saveBtn);
        popup.appendChild(loadBtn);
        document.body.appendChild(popup);
    };
    leftToolbar.appendChild(saveLoadButton);
    // Attack button (red)
    const attackButton = document.createElement('button');
    attackButton.textContent = 'Attack';
    attackButton.style.width = '120px';
    attackButton.style.padding = '12px';
    attackButton.style.background = 'linear-gradient(180deg, #dc143c 0%, #8b0000 100%)';
    attackButton.style.border = '2px solid #ff0000';
    attackButton.style.color = '#f4e4c1';
    attackButton.style.fontFamily = "'Courier New', monospace";
    attackButton.style.fontWeight = 'bold';
    attackButton.style.cursor = 'pointer';
    attackButton.style.borderRadius = '4px';
    attackButton.style.transition = 'all 0.3s';
    attackButton.style.fontSize = '14px';
    attackButton.onmouseover = () => {
        if (!attackMode) {
            attackButton.style.background = 'linear-gradient(180deg, #ff0000 0%, #dc143c 100%)';
            attackButton.style.transform = 'translateY(-2px)';
        }
    };
    attackButton.onmouseout = () => {
        if (!attackMode) {
            attackButton.style.background = 'linear-gradient(180deg, #dc143c 0%, #8b0000 100%)';
            attackButton.style.transform = 'translateY(0)';
        }
    };
    attackButton.onclick = () => {
        if (gameState.currentPlayerIndex !== 0 || !gameState.selectedTerritory) return;
        const selectedTerr = gameState.territories[gameState.selectedTerritory];
        if (selectedTerr.owner !== 0 || selectedTerr.units < 2) return;
        attackMode = !attackMode;
        attackingTerritory = attackMode ? gameState.selectedTerritory : null;
        if (attackMode) {
            attackButton.style.background = 'linear-gradient(180deg, #ffff00 0%, #daa520 100%)';
            attackButton.style.borderColor = '#ffff00';
            attackButton.style.boxShadow = '0 0 15px rgba(255, 255, 0, 0.8)';
        } else {
            attackButton.style.background = 'linear-gradient(180deg, #dc143c 0%, #8b0000 100%)';
            attackButton.style.borderColor = '#ff0000';
            attackButton.style.boxShadow = 'none';
        }
        updateUI();
    };
    leftToolbar.appendChild(attackButton);

    // Move button (purple)
    const moveButton = document.createElement('button');
    moveButton.textContent = 'Move';
    moveButton.style.width = '120px';
    moveButton.style.padding = '12px';
    moveButton.style.background = 'linear-gradient(180deg, #9370db 0%, #4b0082 100%)';
    moveButton.style.border = '2px solid #9370db';
    moveButton.style.color = '#f4e4c1';
    moveButton.style.fontFamily = "'Courier New', monospace";
    moveButton.style.fontWeight = 'bold';
    moveButton.style.cursor = 'pointer';
    moveButton.style.borderRadius = '4px';
    moveButton.style.transition = 'all 0.3s';
    moveButton.style.fontSize = '14px';
    moveButton.onmouseover = () => {
        if (!moveMode) {
            moveButton.style.background = 'linear-gradient(180deg, #ba55d3 0%, #9370db 100%)';
            moveButton.style.transform = 'translateY(-2px)';
        }
    };
    moveButton.onmouseout = () => {
        if (!moveMode) {
            moveButton.style.background = 'linear-gradient(180deg, #9370db 0%, #4b0082 100%)';
            moveButton.style.transform = 'translateY(0)';
        }
    };
    moveButton.onclick = () => {
        if (gameState.currentPlayerIndex !== 0 || !gameState.selectedTerritory) return;
        const selectedTerr = gameState.territories[gameState.selectedTerritory];
        if (selectedTerr.owner !== 0 || selectedTerr.units < 2) return;

        if (attackMode) {
            attackMode = false;
            attackingTerritory = null;
            const attackBtn = leftToolbar.children[2];
            attackBtn.style.background = 'linear-gradient(180deg, #dc143c 0%, #8b0000 100%)';
            attackBtn.style.borderColor = '#ff0000';
            attackBtn.style.boxShadow = 'none';
        }

        moveMode = !moveMode;
        movingTerritory = moveMode ? gameState.selectedTerritory : null;
        if (moveMode) {
            moveButton.style.background = 'linear-gradient(180deg, #ffff00 0%, #daa520 100%)';
            moveButton.style.borderColor = '#ffff00';
            moveButton.style.boxShadow = '0 0 15px rgba(255, 255, 0, 0.8)';
        } else {
            moveButton.style.background = 'linear-gradient(180deg, #9370db 0%, #4b0082 100%)';
            moveButton.style.borderColor = '#9370db';
            moveButton.style.boxShadow = 'none';
        }
        updateUI();
    };
    leftToolbar.appendChild(moveButton);

    // Toggle view button
    const toggleViewButton = document.createElement('button');
    toggleViewButton.textContent = viewMode;
    toggleViewButton.style.width = '120px';
    toggleViewButton.style.padding = '12px';
    toggleViewButton.style.background = 'linear-gradient(180deg, #8b6939 0%, #5a4030 100%)';
    toggleViewButton.style.border = '2px solid #daa520';
    toggleViewButton.style.color = '#f4e4c1';
    toggleViewButton.style.fontFamily = "'Courier New', monospace";
    toggleViewButton.style.fontWeight = 'bold';
    toggleViewButton.style.cursor = 'pointer';
    toggleViewButton.style.borderRadius = '4px';
    toggleViewButton.style.transition = 'all 0.3s';
    toggleViewButton.style.fontSize = '14px';
    toggleViewButton.onmouseover = () => {
        toggleViewButton.style.background = 'linear-gradient(180deg, #daa520 0%, #8b6939 100%)';
        toggleViewButton.style.transform = 'translateY(-2px)';
    };
    toggleViewButton.onmouseout = () => {
        toggleViewButton.style.background = 'linear-gradient(180deg, #8b6939 0%, #5a4030 100%)';
        toggleViewButton.style.transform = 'translateY(0)';
    };
    toggleViewButton.onclick = () => {
        viewMode = viewMode === 'Global' ? 'City' : 'Global';
        toggleViewButton.textContent = viewMode;
        console.log(`Switched to ${viewMode}`);
        // Placeholder for view switch functionality
    };
    leftToolbar.appendChild(toggleViewButton);

    mapWrapper.style.transform = `scale(${zoomLevel})`;
    updateUI();
}

function handleTerritoryClick(territoryId) {
    const terrData = gameState.territories[territoryId];

    if (!attackMode && !moveMode) {
        gameState.selectTerritory(territoryId);
        return;
    }

    if (attackMode) {
        if (terrData.owner === 0 && terrData.units >= 2) {
            attackingTerritory = territoryId;
            gameState.selectTerritory(territoryId);
            updateUI();
        } else if (attackingTerritory && terrData.owner !== 0 && isAdjacent(attackingTerritory, territoryId)) {
            initiateAttack(attackingTerritory, territoryId);
        }
    }

    if (moveMode) {
        if (terrData.owner === 0 && terrData.units >= 2) {
            movingTerritory = territoryId;
            gameState.selectTerritory(territoryId);
            updateUI();
        } else if (movingTerritory && terrData.owner === 0 && isAdjacent(movingTerritory, territoryId)) {
            executeMove(movingTerritory, territoryId);
        }
    }
}

function isAdjacent(territory1Id, territory2Id) {
    const territory1 = TERRITORIES.find(t => t.id === territory1Id);
    return territory1.neighbors.includes(territory2Id);
}

function initiateAttack(attackerId, defenderId) {
    const attacker = gameState.territories[attackerId];
    const defender = gameState.territories[defenderId];
    const maxAttackTroops = attacker.units - 1;

    showAttackPopup(attackerId, defenderId, maxAttackTroops);
}

function showAttackPopup(attackerId, defenderId, maxTroops) {
    const attacker = gameState.territories[attackerId];
    const defender = gameState.territories[defenderId];
    const attackerTerritory = TERRITORIES.find(t => t.id === attackerId);
    const defenderTerritory = TERRITORIES.find(t => t.id === defenderId);

    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.background = 'rgba(42, 24, 16, 0.98)';
    popup.style.border = '4px solid #daa520';
    popup.style.padding = '30px';
    popup.style.zIndex = '200';
    popup.style.color = '#f4e4c1';
    popup.style.fontFamily = "'Courier New', monospace";
    popup.style.textAlign = 'center';
    popup.style.minWidth = '400px';
    popup.style.borderRadius = '8px';
    popup.style.boxShadow = '0 0 30px rgba(218, 165, 32, 0.5)';

    popup.innerHTML = `
        <h2 style="color: #daa520; margin-bottom: 20px;">Attack!</h2>
        <p style="margin-bottom: 10px;"><strong>${attackerTerritory.name}</strong> (${attacker.units} units)</p>
        <p style="margin-bottom: 20px;">attacking</p>
        <p style="margin-bottom: 20px;"><strong>${defenderTerritory.name}</strong> (${defender.units} units)</p>
        <p style="margin-bottom: 10px;">How many troops to attack with?</p>
        <p style="margin-bottom: 20px; font-size: 12px;">(Max: ${maxTroops})</p>
    `;

    const input = document.createElement('input');
    input.type = 'number';
    input.min = '1';
    input.max = maxTroops.toString();
    input.value = Math.min(3, maxTroops).toString();
    input.style.width = '100px';
    input.style.padding = '8px';
    input.style.marginBottom = '20px';
    input.style.fontSize = '16px';
    input.style.textAlign = 'center';
    input.style.background = '#2a1810';
    input.style.border = '2px solid #8b6939';
    input.style.color = '#f4e4c1';
    input.style.borderRadius = '4px';
    popup.appendChild(input);

    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.gap = '10px';
    buttonContainer.style.justifyContent = 'center';

    const attackBtn = document.createElement('button');
    attackBtn.textContent = 'Attack!';
    attackBtn.style.padding = '10px 20px';
    attackBtn.style.background = 'linear-gradient(180deg, #dc143c 0%, #8b0000 100%)';
    attackBtn.style.border = '2px solid #ff0000';
    attackBtn.style.color = '#f4e4c1';
    attackBtn.style.fontFamily = "'Courier New', monospace";
    attackBtn.style.fontWeight = 'bold';
    attackBtn.style.cursor = 'pointer';
    attackBtn.style.borderRadius = '4px';
    attackBtn.onclick = () => {
        const troops = parseInt(input.value);
        if (troops >= 1 && troops <= maxTroops) {
            document.body.removeChild(popup);
            executeCombat(attackerId, defenderId, troops);
        }
    };

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.style.padding = '10px 20px';
    cancelBtn.style.background = 'linear-gradient(180deg, #8b6939 0%, #5a4030 100%)';
    cancelBtn.style.border = '2px solid #daa520';
    cancelBtn.style.color = '#f4e4c1';
    cancelBtn.style.fontFamily = "'Courier New', monospace";
    cancelBtn.style.fontWeight = 'bold';
    cancelBtn.style.cursor = 'pointer';
    cancelBtn.style.borderRadius = '4px';
    cancelBtn.onclick = () => {
        document.body.removeChild(popup);
        attackingTerritory = null;
    };

    buttonContainer.appendChild(attackBtn);
    buttonContainer.appendChild(cancelBtn);
    popup.appendChild(buttonContainer);
    document.body.appendChild(popup);
}

function executeCombat(attackerId, defenderId, attackTroops) {
    const attacker = gameState.territories[attackerId];
    const defender = gameState.territories[defenderId];

    const attackDice = Math.min(3, attackTroops);
    const defenseDice = Math.min(2, defender.units);

    const attackRolls = Array.from({length: attackDice}, () => Math.floor(Math.random() * 6) + 1).sort((a, b) => b - a);
    const defenseRolls = Array.from({length: defenseDice}, () => Math.floor(Math.random() * 6) + 1).sort((a, b) => b - a);

    let attackerLosses = 0;
    let defenderLosses = 0;

    for (let i = 0; i < Math.min(attackRolls.length, defenseRolls.length); i++) {
        if (attackRolls[i] > defenseRolls[i]) {
            defenderLosses++;
        } else {
            attackerLosses++;
        }
    }

    attacker.units -= attackerLosses;
    defender.units -= defenderLosses;

    const conquered = defender.units <= 0;
    if (conquered) {
        defender.owner = attacker.owner;
        defender.units = attackTroops - attackerLosses;
        attacker.units -= (attackTroops - attackerLosses);
    }

    showCombatResult(attackerId, defenderId, attackRolls, defenseRolls, attackerLosses, defenderLosses, conquered);
}

function showCombatResult(attackerId, defenderId, attackRolls, defenseRolls, attackerLosses, defenderLosses, conquered) {
    const attackerTerritory = TERRITORIES.find(t => t.id === attackerId);
    const defenderTerritory = TERRITORIES.find(t => t.id === defenderId);

    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.background = 'rgba(42, 24, 16, 0.98)';
    popup.style.border = '4px solid #daa520';
    popup.style.padding = '30px';
    popup.style.zIndex = '200';
    popup.style.color = '#f4e4c1';
    popup.style.fontFamily = "'Courier New', monospace";
    popup.style.textAlign = 'center';
    popup.style.minWidth = '400px';
    popup.style.borderRadius = '8px';
    popup.style.boxShadow = '0 0 30px rgba(218, 165, 32, 0.5)';

    const resultText = conquered ?
        `<h2 style="color: #32cd32; margin-bottom: 20px;">VICTORY!</h2><p style="margin-bottom: 20px;">${attackerTerritory.name} conquered ${defenderTerritory.name}!</p>` :
        `<h2 style="color: #daa520; margin-bottom: 20px;">Battle Result</h2>`;

    popup.innerHTML = `
        ${resultText}
        <div style="display: flex; justify-content: space-around; margin-bottom: 20px;">
            <div>
                <p style="font-weight: bold; color: #ff0000;">Attacker Dice</p>
                <p style="font-size: 24px;">${attackRolls.join(', ')}</p>
            </div>
            <div>
                <p style="font-weight: bold; color: #1e90ff;">Defender Dice</p>
                <p style="font-size: 24px;">${defenseRolls.join(', ')}</p>
            </div>
        </div>
        <p style="margin-bottom: 10px;">Attacker lost: ${attackerLosses} units</p>
        <p style="margin-bottom: 20px;">Defender lost: ${defenderLosses} units</p>
    `;

    const okBtn = document.createElement('button');
    okBtn.textContent = 'Continue';
    okBtn.style.padding = '10px 30px';
    okBtn.style.background = 'linear-gradient(180deg, #8b6939 0%, #5a4030 100%)';
    okBtn.style.border = '2px solid #daa520';
    okBtn.style.color = '#f4e4c1';
    okBtn.style.fontFamily = "'Courier New', monospace";
    okBtn.style.fontWeight = 'bold';
    okBtn.style.cursor = 'pointer';
    okBtn.style.borderRadius = '4px';
    okBtn.onclick = () => {
        document.body.removeChild(popup);
        attackMode = false;
        attackingTerritory = null;
        updateUI();
    };

    popup.appendChild(okBtn);
    document.body.appendChild(popup);
}

function executeMove(fromId, toId) {
    const from = gameState.territories[fromId];
    const to = gameState.territories[toId];
    const maxMoveUnits = from.units - 1;

    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.background = 'rgba(42, 24, 16, 0.98)';
    popup.style.border = '4px solid #9370db';
    popup.style.padding = '30px';
    popup.style.zIndex = '200';
    popup.style.color = '#f4e4c1';
    popup.style.fontFamily = "'Courier New', monospace";
    popup.style.textAlign = 'center';
    popup.style.minWidth = '400px';
    popup.style.borderRadius = '8px';
    popup.style.boxShadow = '0 0 30px rgba(147, 112, 219, 0.5)';

    const fromTerritory = TERRITORIES.find(t => t.id === fromId);
    const toTerritory = TERRITORIES.find(t => t.id === toId);

    popup.innerHTML = `
        <h2 style="color: #9370db; margin-bottom: 20px;">Move Troops</h2>
        <p style="margin-bottom: 10px;"><strong>${fromTerritory.name}</strong> (${from.units} units)</p>
        <p style="margin-bottom: 20px;">to</p>
        <p style="margin-bottom: 20px;"><strong>${toTerritory.name}</strong> (${to.units} units)</p>
        <p style="margin-bottom: 10px;">How many troops to move?</p>
        <p style="margin-bottom: 20px; font-size: 12px;">(Max: ${maxMoveUnits})</p>
    `;

    const input = document.createElement('input');
    input.type = 'number';
    input.min = '1';
    input.max = maxMoveUnits.toString();
    input.value = Math.min(maxMoveUnits, 1).toString();
    input.style.width = '100px';
    input.style.padding = '8px';
    input.style.marginBottom = '20px';
    input.style.fontSize = '16px';
    input.style.textAlign = 'center';
    input.style.background = '#2a1810';
    input.style.border = '2px solid #8b6939';
    input.style.color = '#f4e4c1';
    input.style.borderRadius = '4px';
    popup.appendChild(input);

    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.gap = '10px';
    buttonContainer.style.justifyContent = 'center';

    const moveBtn = document.createElement('button');
    moveBtn.textContent = 'Move';
    moveBtn.style.padding = '10px 20px';
    moveBtn.style.background = 'linear-gradient(180deg, #9370db 0%, #4b0082 100%)';
    moveBtn.style.border = '2px solid #9370db';
    moveBtn.style.color = '#f4e4c1';
    moveBtn.style.fontFamily = "'Courier New', monospace";
    moveBtn.style.fontWeight = 'bold';
    moveBtn.style.cursor = 'pointer';
    moveBtn.style.borderRadius = '4px';
    moveBtn.onclick = () => {
        const troops = parseInt(input.value);
        if (troops >= 1 && troops <= maxMoveUnits) {
            from.units -= troops;
            to.units += troops;
            document.body.removeChild(popup);
            moveMode = false;
            movingTerritory = null;
            updateUI();
        }
    };

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.style.padding = '10px 20px';
    cancelBtn.style.background = 'linear-gradient(180deg, #8b6939 0%, #5a4030 100%)';
    cancelBtn.style.border = '2px solid #daa520';
    cancelBtn.style.color = '#f4e4c1';
    cancelBtn.style.fontFamily = "'Courier New', monospace";
    cancelBtn.style.fontWeight = 'bold';
    cancelBtn.style.cursor = 'pointer';
    cancelBtn.style.borderRadius = '4px';
    cancelBtn.onclick = () => {
        document.body.removeChild(popup);
        movingTerritory = null;
    };

    buttonContainer.appendChild(moveBtn);
    buttonContainer.appendChild(cancelBtn);
    popup.appendChild(buttonContainer);
    document.body.appendChild(popup);
}

function updateUI() {
    const territoryInfo = document.getElementById('territory-info');
    if (gameState.selectedTerritory) {
        const terrData = gameState.territories[gameState.selectedTerritory];
        const territory = TERRITORIES.find(t => t.id === gameState.selectedTerritory);
        territoryInfo.classList.remove('hidden');
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
    } else {
        territoryInfo.classList.add('hidden');
    }
    // Update territory displays
    document.querySelectorAll('.territory-wrapper').forEach((wrapper, idx) => {
        const territory = TERRITORIES[idx];
        const terrData = gameState.territories[territory.id];
        wrapper.style.width = '48px';
        wrapper.style.height = '80px';
        const btn = wrapper.querySelector('.territory');
        btn.className = 'territory';
        btn.classList.add(`player${terrData.owner + 1}`);
        btn.style.width = '48px';
        btn.style.height = '48px';
        btn.style.flexDirection = 'column';
        btn.innerHTML = `<span style="color: red; font-size: 15px;">${terrData.units}</span><span style="color: green; font-size: 15px;">${terrData.civilians}</span>`;
        const unitImg = wrapper.querySelector('.territory-unit-image');
        unitImg.style.width = '40px';
        unitImg.style.height = '40px';
        if (terrData.units <= 5) {
            unitImg.src = 'assets/swordsman.png';
        } else if (terrData.units <= 10) {
            unitImg.src = 'assets/knight.png';
        } else {
            unitImg.src = 'assets/catapult.png';
        }
        btn.classList.remove('selected', 'attackable', 'moveable');
        if (gameState.selectedTerritory === territory.id) {
            btn.classList.add('selected');
        }
        if (attackMode && attackingTerritory && isAdjacent(attackingTerritory, territory.id) && terrData.owner !== 0) {
            btn.classList.add('attackable');
        }
        if (moveMode && movingTerritory && isAdjacent(movingTerritory, territory.id) && terrData.owner === 0) {
            btn.classList.add('moveable');
        }
    });
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