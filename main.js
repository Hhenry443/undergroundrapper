class Rapper {
    constructor(happy, hungry, pain, name){
        this.happy = happy;
        this.hungry = hungry;
        this.pain = pain;
        this.name = name;
    }
    
    eat(food){
        switch (food){
            case "Fried Chicken":
                this.hungry = this.hungry - 10;
                break;
            case "Bread":
                this.hungry = this.hungry - 5;
                break;
            case "Spaghetti":
                this.hungry = this.hungry - 15;
                break;
        }
        // Prevent negative hunger
        if (this.hungry < 0) this.hungry = 0;
    }
    
    update() {
        this.decreaseStats();
        // this.checkEvents();
    }
    
    decreaseStats() {
        // Update stats every 5 seconds
        this.happy--;
        this.hungry++;
        this.pain--;
        
        // Keep stats within reasonable bounds
        if (this.happy < 0) this.happy = 0;
        if (this.hungry > 100) this.hungry = 100;
        if (this.pain < 0) this.pain = 0;
    }
}

class UI {
    constructor() {
        this.happiness = document.getElementById('happiness');
        this.hungry = document.getElementById('hungry');
        this.pain = document.getElementById('pain');
        this.rapperSprite = document.getElementById('rapper-sprite');
    }
    
    update(rapper) {
        this.happiness.innerText = `${rapper.happy}`;
        this.hungry.innerText = `${rapper.hungry}`;
        this.pain.innerText = `${rapper.pain}`;
        // this.updateRapperAnimation(rapper);
    }
    
    updateRapperAnimation(rapper) {
        // Change sprite based on rapper state
        if (rapper.hungry > 80) {
            this.rapperSprite.className = 'rapper hungry';
        } else if (rapper.happy > 80) {
            this.rapperSprite.className = 'rapper happy';
        } else {
            this.rapperSprite.className = 'rapper normal';
        }
    }
}

class GameLoop {
    constructor(rapper, ui){
        this.rapper = rapper;
        this.ui = ui;
        this.isRunning = false;
        this.rapperStatsInterval = null;
        this.UIInterval = null;
    }
    
    start() {
        if (this.isRunning) return; // Prevent multiple intervals
        
        this.isRunning = true;
        
        // Update immediately when starting
        this.rapper.update();
        this.ui.update(this.rapper);
        
        // Set up interval to update every 2.5 seconds (2500ms) for rapper stats
        this.rapperStatsInterval = setInterval(() => {
            if (this.isRunning) {
                this.rapper.update();
                this.ui.update(this.rapper);
            }
        }, 2500);

        // Set up interval to update every 0.5 seconds (500ms) for UI
        this.rapperStatsInterval = setInterval(() => {
            if (this.isRunning) {
                this.ui.update(this.rapper);
            }
        }, 500);
    }
    
    stop() {
        this.isRunning = false;
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}

// Initialize the game
var currentRapper = new Rapper(100, 0, 0, "Fakemink");
var UIManager = new UI();
var gameLoop = new GameLoop(currentRapper, UIManager);

// Start the game
gameLoop.start();