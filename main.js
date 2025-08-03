class Rapper {
    constructor(happy, hungry, pain, name){
        this.happy = happy;
        this.hungry = hungry;
        this.pain = pain;
        this.name = name;
    }

    taunt(){
        this.happy = this.happy - 20
        // Prevent negative happiness
        if (this.happy < 0) this.happy = 0;
    }

    feed(food){
        switch (food){
            case "Fried Chicken":
                this.hungry = this.hungry - 10;
                this.happy = this.happy + 10
                break;
            case "Bread":
                this.hungry = this.hungry - 5;
                this.happy = this.happy + 10
                break;
            case "Spaghetti":
                this.hungry = this.hungry - 15;
                this.happy = this.happy + 10
                break;
            case "Slop":
                this.hungry = this.hungry - 10;
                this.happy = this.happy - 10
                this.pain = this.pain + 5
                break;
        }
        // Prevent negative hunger & happy
        if (this.hungry < 0) this.hungry = 0;
        if (this.happy < 0) this.happy = 0;
        if (this.happy > 100) this.happy = 100;
        if (this.pain > 100) this.pain = 100;
    }

    yell() {
        // yell decreases happiness and gives pain. 
        this.happy = this.happy - 20
        this.pain = this.pain + 5

        // Prevent negative values
        if (this.happy < 0) this.happy = 0;
        if (this.pain > 100) this.pain = 100;
    }

    hit() {
        // hit decreases happiness and gives pain. 
        // opposite values to yelling
        this.happy = this.happy - 5
        this.pain = this.pain + 20

        // Prevent negative values
        if (this.happy < 0) this.happy = 0;
        if (this.pain > 100) this.pain = 100;
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
        this.feedMenu = document.getElementById('feedMenu')
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

    toggleFeedMenu() {
        this.feedMenu.classList.toggle('hidden')
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

        // Set up interval to update every 10ms for UI
        this.rapperStatsInterval = setInterval(() => {
            if (this.isRunning) {
                    this.ui.update(this.rapper);
            }
        }, 10);
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