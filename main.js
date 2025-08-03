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
                this.pain = this.pain - 5
                break;
            case "Bread":
                this.hungry = this.hungry - 5;
                this.happy = this.happy + 10
                this.pain = this.pain - 5
                break;
            case "Spaghetti":
                this.hungry = this.hungry - 15;
                this.happy = this.happy + 10
                this.pain = this.pain - 5
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
        if (this.pain < 0) this.pain = 0;
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
        // Update stats every 2.5 seconds
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
        this.rapperSprite = document.getElementById('rapperSprite');
    }
    
    update(rapper) {
        this.happiness.innerText = `${rapper.happy}`;
        this.hungry.innerText = `${rapper.hungry}`;
        this.pain.innerText = `${rapper.pain}`;
        this.updateRapperAnimation(rapper);
    }
    
    updateRapperAnimation(rapper) {
        // Change sprite based on rapper state
        // 9 States. All beautiful
        // Low is below 35, high is above 60

        if (rapper.happy > 50 & rapper.hungry < 50 & rapper.pain < 50) {
            // Rapper really happy
            this.rapperSprite.src = './fakeminkSprites/fakeminkPerfect.png';
        } else if (rapper.happy > 50 & rapper.hungry > 50 & rapper.pain < 50) {
            // Rapper hungry
            this.rapperSprite.src = './fakeminkSprites/fakeminkHungry.png';
        } else if (rapper.happy > 50 & rapper.hungry < 50 & rapper.pain > 50) {
            // Rapper Hurt but happy
            this.rapperSprite.src = './fakeminkSprites/fakeminkHurtButHappy.png';
        } else if (rapper.happy < 50 & rapper.hungry < 50 & rapper.pain < 50) {
            // Rapper Sad
            this.rapperSprite.src = './fakeminkSprites/fakeminkSad.png';
        } else if (rapper.happy < 50 & rapper.hungry > 50 & rapper.pain < 50) {
            // Rapper Hangry
            this.rapperSprite.src = './fakeminkSprites/fakeminkHangry.png';
        } else if (rapper.happy < 50 & rapper.hungry < 50 & rapper.pain > 50) {
            // Rapper Sad Pain
            this.rapperSprite.src = './fakeminkSprites/fakeminkSadPain.png';
        } else if (rapper.happy > 50 & rapper.hungry > 50 & rapper.pain > 50) {
            // Rapper Pain but Happy
            this.rapperSprite.src = './fakeminkSprites/fakeminkPainButHappy.png';
        } else if (rapper.happy < 50 & rapper.hungry > 50 & rapper.pain > 50) {
            // Rapper Awful
            this.rapperSprite.src = './fakeminkSprites/fakeminkAwful.png';
        } else {
            this.rapperSprite.src = './fakeminkSprites/fakeminkNormal.png';
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
        
        // Set up interval to update every 1000ms for rapper stats
        this.rapperStatsInterval = setInterval(() => {
            if (this.isRunning) {
                this.rapper.update();
                this.ui.update(this.rapper);
            }
        }, 1000);

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
var currentRapper = new Rapper(100, 25, 0, "Fakemink");
var UIManager = new UI();
var gameLoop = new GameLoop(currentRapper, UIManager);

// Start the game
gameLoop.start();