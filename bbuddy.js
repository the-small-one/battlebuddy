// ==UserScript==
// @name       Hverse Bot
// @namespace  https://hentaiverse.org/
// @version    1.0
// @description  Battle Buddy for hentaiverse
// @match      https://hentaiverse.org/*
// @run-at document-end
// copyright  2018+, You
// ==/UserScript==window.battle.lock_action);


////////////////////////////////////////////////////////////
// BASE FUNCTIONS - that which talks to the page directly //
////////////////////////////////////////////////////////////


function getSelfHealth() {
    return parseInt(document.getElementById('vrhb').textContent);
}

function getSelfPercentHealth() {
    return document.getElementById('vbh').children[0].children[0].clientWidth / document.getElementById('vbh').clientWidth * 100;
}

function getSelfMana() {
    return parseInt(document.getElementById('vrm').textContent);
}

function getSelfSpirit() {
    return parseInt(document.getElementById('vrs').textContent);
}

// returns the number of full charges
function getSelfOvercharge() {
    try {
        return document.getElementById('vcp').children[0].children.length;
    } catch (e) {
        return 0;
    }
}

function checkContinue() {
    var element = document.getElementById('btcp');
    if (element != null) {
        return true;
    }
    return false;
}

function continueBattle() {
    document.getElementById('btcp').click();
}

//turns spirit stance on or off
function toggleSpirit() {
    battle.lock_action(this, 0, 'spirit');
}

//focuses for a turn
function focus() {
    battle.lock_action(this, 0, 'focus');
}

//defends for a turn
function defend() {
    battle.lock_action(this, 0, 'defend');
}

// performs current locked action on monster
// 0 based indexing
function attack(monster) {
    document.getElementById('pane_monster').children[monster].click();
}

function lockAttack() {
    document.getElementById('ckey_attack').click();
}

var spells = {
    'fiery blast': 111,
    'freeze': 121,
    'shockblast': 131,
    'gale': 141,
    'smite': 151,
    'corruption': 161,
    'drain': 211,
    'weaken': 212,
    'slow': 221,
    'sleep': 222,
    'cure': 311,
    'regen': 312,
    'protection': 411,
    'haste': 412,
    'shadow veil': 413,
    'absorb': 421,
    'spark of life': 422,
    'flee': 1001,
    'scan': 1011,
    'great cleave': 2301,
    'rending blow': 2302
};

function lockSpell(spellName) {
    var spellId = spells[spellName.toLowerCase()];
    document.getElementById("" + spellId).click();
}

var items = {
    "10005": {
        "n": "Health Gem",
        "q": "This powerup will restore a large amount of health."
    },
    "10006": {
        "n": "Mana Gem",
        "q": "This powerup will restore a moderate amount of mana."
    },
    "10007": {
        "n": "Spirit Gem",
        "q": "This powerup will restore a small amount of spirit."
    },
    "10008": {
        "n": "Mystic Gem",
        "q": "This powerup will grant you the Channeling effect."
    },
    "11191": {
        "n": "Health Draught",
        "q": "Provides a long-lasting health restoration effect."
    },
    "11195": {
        "n": "Health Potion",
        "q": "Instantly restores a large amount of health."
    },
    "11199": {
        "n": "Health Elixir",
        "q": "Fully restores health, and grants a long-lasting health restoration effect."
    },
    "11291": {
        "n": "Mana Draught",
        "q": "Provides a long-lasting mana restoration effect."
    },
    "11295": {
        "n": "Mana Potion",
        "q": "Instantly restores a moderate amount of mana."
    },
    "11299": {
        "n": "Mana Elixir",
        "q": "Fully restores mana, and grants a long-lasting mana restoration effect."
    },
    "11391": {
        "n": "Spirit Draught",
        "q": "Provides a long-lasting spirit restoration effect."
    },
    "11395": {
        "n": "Spirit Potion",
        "q": "Instantly restores a moderate amount of spirit."
    },
    "11399": {
        "n": "Spirit Elixir",
        "q": "Fully restores spirit, and grants a long-lasting spirit restoration effect."
    },
    "11401": {
        "n": "Energy Drink",
        "q": "Restores 10 points of Stamina, up to the maximum of 99. When used in battle, also boosts Overcharge and Spirit by 10% for ten turns."
    },
    "11402": {
        "n": "Caffeinated Candy",
        "q": "Restores 5 points of Stamina, up to the maximum of 99. When used in battle, also boosts Overcharge and Spirit by 10% for five turns."
    },
    "11501": {
        "n": "Last Elixir",
        "q": "Fully restores all vitals, and grants long-lasting restoration effects."
    },
    "12101": {
        "n": "Infusion of Flames",
        "q": "You gain +25% resistance to Fire elemental attacks and do 25% more damage with Fire magicks."
    },
    "12201": {
        "n": "Infusion of Frost",
        "q": "You gain +25% resistance to Cold elemental attacks and do 25% more damage with Cold magicks."
    },
    "12301": {
        "n": "Infusion of Lightning",
        "q": "You gain +25% resistance to Elec elemental attacks and do 25% more damage with Elec magicks."
    },
    "12401": {
        "n": "Infusion of Storms",
        "q": "You gain +25% resistance to Wind elemental attacks and do 25% more damage with Wind magicks."
    },
    "12501": {
        "n": "Infusion of Divinity",
        "q": "You gain +25% resistance to Holy elemental attacks and do 25% more damage with Holy magicks."
    },
    "12601": {
        "n": "Infusion of Darkness",
        "q": "You gain +25% resistance to Dark elemental attacks and do 25% more damage with Dark magicks."
    },
    "13101": {
        "n": "Scroll of Swiftness",
        "q": "Grants the Haste effect."
    },
    "13111": {
        "n": "Scroll of Protection",
        "q": "Grants the Protection effect."
    },
    "13199": {
        "n": "Scroll of the Avatar",
        "q": "Grants the Haste and Protection effects with twice the normal duration."
    },
    "13201": {
        "n": "Scroll of Absorption",
        "q": "Grants the Absorb effect."
    },
    "13211": {
        "n": "Scroll of Shadows",
        "q": "Grants the Shadow Veil effect."
    },
    "13221": {
        "n": "Scroll of Life",
        "q": "Grants the Spark of Life effect."
    },
    "13299": {
        "n": "Scroll of the Gods",
        "q": "Grants the Absorb, Shadow Veil and Spark of Life effects with twice the normal duration."
    },
    "19111": {
        "n": "Flower Vase",
        "q": "There are three flowers in a vase. The third flower is green."
    },
    "19131": {
        "n": "Bubble-Gum",
        "q": "It is time to kick ass and chew bubble-gum... and here is some gum."
    }
};

function getItemName(itemNumber) {
    try {
        var funcDef = document.getElementById('ikey_' + itemNumber).onmouseover.toString();
        return items[funcDef.split('\n')[1].split(/[()]+/)[1]].n.toLowerCase();
    } catch (e) {
        return "none";
    }
}

var manaNames = ["mana draught", "mana potion", "mana elixir"]
function isManaItem(itemName){
    if(manaNames.indexOf(itemName) != -1){
        return true;
    }
    return false;
}

function nextItem() {
    for (var i = 1; i <= 5; i++) {
        if (document.getElementById('ikey_' + i) != null) {
            return i;
        }
    }
    return 0;
}

//uses the item at position n
//will waste a turn if called with a bad n
function useItem(itemNumber) {
    try {
        document.getElementById('ikey_' + itemNumber).click();
    } catch (e) {
        return;
    }
}

//returns a string of whatever gem is in the inventory, in the form of "health gem" or "mystic gem", etc
function getGem() {
    try {
        var children = document.getElementById('ikey_p').children[0].children;
        var gemName = '';
        for (var i = 0; i < children.length; i++) {
            var c = children[i].className.slice(-1);
            if (c >= 'a' && c <= 'z') {
                gemName += c;
            } else {
                gemName += ' ';
            }
        }
        return gemName;
    } catch (e) {
        return 'none';
    }
}

//uses whatever gem is currently in inventory
//If no gem, wastes a turn
function useGem() {
    document.getElementById('ikey_p').click();
}

//gets the number of buffs currently in the buff bar
function getBuffLength() {
    return document.getElementById('pane_effects').getElementsByTagName('img').length;
}


//gets the name of the buff at position n (starts at 0) in the buff bar
function getBuffAt(buffNumber) {
    try {
        var imgArr = document.getElementById('pane_effects').children[buffNumber].src.split(/[\/.]+/);
        return imgArr[imgArr.length - 2].toLowerCase();
    } catch (e) {
        return 'undefined';
    }
}

//returns a list of all buffs on the bar
//normalizes to all lowercase, for consistency
function getBuffs() {
    var r = [];
    for (var i = 0; i < getBuffLength(); i++) {
        r.push(getBuffAt(i).toLowerCase());
    }
    return r;
}

//gets the remaining duration (as displayed by the tooltip) of the buff at the given position
function getBuffDuration(buffNumber) {
    try {
        return 200; //document.getElementById('pane_effects').children[1].children[0].children[buffNumber].attributes.item(1).firstChild.data.split(',')[2].split(' ')[1].split(')')[0];
    } catch (e) {
        return 0;
    }
}

//checks if a specific buff is in the list - needs to be the exact name given by getBuffAt()
function checkForBuff(buffName) {
    if (getBuffs().indexOf(buffName.toLowerCase()) != -1) {
        return true;
    } else {
        return false;
    }
}

//gets the number of monsters - alive or dead
function getNumMonsters() {
    return document.getElementById('pane_monster').children.length;
}

//tells if monster at n is dead or not
function isMonsterDead(monsterIndex) {
    var monsterElement = document.getElementById('pane_monster').children[monsterIndex];
    var opacity = parseFloat(window.getComputedStyle(monsterElement, null).getPropertyValue('opacity'));
    if (opacity == 1.0) {
        return false;
    }
    return true;
}

//estimates monster health as a percent
function getMonsterHealth(monsterIndex) {
    return document.getElementById('pane_monster').children[monsterIndex].children[2].children[0].children[0].firstElementChild.width * 5 / 6;
}

//estimates monster mana as a percent - same as health
function getMonsterMana(monsterIndex) {
    return document.getElementById('pane_monster').children[monsterIndex].children[2].children[1].children[0].firstElementChild.width * 5 / 6;
}

//estimates monster spirit as a percent - same as health
//error if the monster doesn't have spirit
function getMonsterSpirit(monsterIndex) {
    try {
        return document.getElementById('pane_monster').children[monsterIndex].children[2].children[2].children[0].firstElementChild.width * 5 / 6;
    } catch (e) {
        return 0;
    }
}

//gets number of dead monsters
function getDeadNumber() {
    var c = 0;
    for (var i = 0; i < getNumMonsters(); i++) {
        if (isMonsterDead(i)) {
            c++;
        }
    }
    return c;
}

//checks if there is a pony present, via checking if the box for monsters exists
//Will also trigger if the character dies, though only after a continue()
function checkPony() {
    try {
        document.getElementById('pane_monster').toString();
        return false;
    } catch (e) {
        return true;
    }
}

///////////////////////////////////////////////////////////////////////
// AI - that which actually decides what to do for a given situation //
///////////////////////////////////////////////////////////////////////

//given that we want to (physical) attack something, pick what to attack
//current form: looks for groups of size five, then four, ... then chooses the middle one (ie 2h style)
function chooseTarget(STYLE) {
    if (STYLE == 'twohand') {
        // CHOOSE MONSTER IN LARGEST GROUP (all groups at or larger than 5 are treated the same)
        for (var i = 5; i >= 1; i--) {
            var n = 0;
            for (var j = 0; j < getNumMonsters(); j++) {
                if (!isMonsterDead(j)) {
                    n++;
                } else {
                    n = 0;
                }
                if (n == i) {
                    return j - Math.floor((n - 1) / 2);
                }
            }
        }
        return null;
    }
    if (STYLE == 'dual' || STYLE == 'mage') {
        //CHOOSE MONSTER WITH HIGHEST MANA
        var m = 0;
        var x = 0;
        for (i = 1; i <= getNumMonsters(); i++) {
            if (!isMonsterDead(i)) {
                if (m < getMonsterMana(i)) {
                    x = i;
                    m = getMonsterMana(i);
                }
            }
        }
        return x;
    }
}

//given we want to attack something, choose how we attack it and lock that action
function bAttack(STYLE) {
    if (STYLE == 'twohand' || STYLE == 'dual') {
        //Sword style
        console.log("In fighting style");
        lockAttack();
        console.log("locked attack");
        var target = chooseTarget(STYLE);
        console.log("target = " + target);
        attack(target);
        return;
    }
    if (STYLE == 'mage') {
        //Magic
        var spellSize = 0;
        spellSize = 4 - Math.floor((getSelfMana() + getSelfOvercharge()) / 66);
        for (var i = 4; i >= spellSize; i--) {
            var n = 0;
            for (var j = 1; j <= getNumMonsters(); j++) {
                if (!isMonsterDead(j)) {
                    n++;
                } else {
                    n = 0;
                }
                if (n == i) {
                    console.log('smite?');
                    lockSpell('smite', j - Math.floor((n - 1) / 2));
                    return;
                }
            }
        }
        attack(chooseTarget(STYLE));
        return;
    }
}

function AI(STYLE) { //current valid entries are 'mage', 'twohand', and 'dual', though dual also works for sword/board and really means single target physical attacks
    ///////////////////////////////////////////////////////////////////////
    // DEFINITIONS POINT - should be filled in to tell the ai how to act //
    ///////////////////////////////////////////////////////////////////////
    console.log("starting new function call");
    var CURE_HP_CUTOFF = 33;
    var MP_ITEM_CUTOFF = 28;
    var MAINTAIN_BUFFS = ['regen', 'protection'];
    var DEFEND_FOR_HP = false;
    var FOCUS_FOR_MP = true;
    var HP_DEFEND_CUTOFF = 90;
    var MP_FOCUS_CUTOFF = 135;

    //customize above settings per style!
    if (STYLE == 'mage') {
        MAINTAIN_BUFFS.push('spark of life');
    }

    /////////////////////////////////////////////////////////
    // ACTIONS POINT - wherein the ai actually does things //
    /////////////////////////////////////////////////////////

    //make sure there's no pony to ban us
    //beep if there is
    if (checkPony()) {
        var a = new Audio('http://soundbible.com/grab.php?id=2218&type=mp3');
        a.play();
        return;
    } else {}

    //do we need to continue?
    if (checkContinue()) {
        continueBattle();
        return;
    } else {}

    //check for immediate cure need
    if (getSelfPercentHealth() < CURE_HP_CUTOFF) {
        console.log('decided to cast cure');
        if (getGem() == 'health gem') {
            useGem();
        } else {
            lockSpell('cure');
        }
        lockAttack();
        console.log("123123123");
    }

    //manage channeling buff efficently
    //will first see if anything is missing
    //then will check if there are any maintain buffs with under 20 left & cast the one with least time
    //otherwise will cast haste
    if (checkForBuff('channeling') && getSelfMana() > 0) {
        for (var s in MAINTAIN_BUFFS) {
            var t = MAINTAIN_BUFFS[s];
            if (!(checkForBuff(t))) {
                console.log('decided to cast ' + t);
                lockSpell(t);
                return;
            }
        }
        s = 0;
        var buffs = getBuffs;
        var minTime = 10000;
        var buff = "";
        for (s = 0; s < buffs.length; s++) {
            t = buffs[s];
            if (MAINTAIN_BUFFS.indexOf(t) != -1 && getBuffDuration(s) < minTime) {
                minTime = getBuffDuration(s);
                buff = t;
            }
        }
        if (minTime < 20) {
            lockSpell(t);
            return;
        } else {
            lockSpell('haste');
            return;
        }
    }


    //check that mana is castable
    if (getSelfMana() < MP_ITEM_CUTOFF) {
        console.log('decided to drink mana pot');
        if (getGem() == 'mana gem') {
            useGem();
            return;
        } else {
            var kkk = 0;
            for(var i = 1; i <= 5; i++){
                if(getItemName(i) != "none" && isManaItem(getItemName(i))){
                    kkk = i;
                }
            }
            if(kkk != 0){
                useItem(kkk);
                return;
            }
        }
    }


    //check overcharge conditions
    if ((getNumMonsters() - getDeadNumber() == 1) && (getSelfOvercharge() >= 1)) {
        if ((FOCUS_FOR_MP) && (getSelfMana() < MP_FOCUS_CUTOFF)) {
            console.log('decided to focus');
            focus();
            return;
        }
        if ((DEFEND_FOR_HP) && (getSelfHealth() < HP_DEFEND_CUTOFF)) {
            console.log('decided to defend');
            defend();
            return;
        }
    }

    //make sure all asked for buffs are up and running
    for (s in MAINTAIN_BUFFS) {
        t = MAINTAIN_BUFFS[s];
        if (!(checkForBuff(t))) {
            if (getGem() == 'mystic gem') {
                useGem();
                return;
            } else {
                console.log('decided to cast ' + t);
                lockSpell(t);
            }
        }
    }

    //get rid of spirit gems
    if (getGem() == 'spirit') {
        useGem();
    }

    //attack something
    console.log('decided to attack');
    bAttack(STYLE);
}

console.log("starting");

function callAI() {
    var grindfest = document.getElementById('grindfest');
    if(grindfest != null){
        grindfest.children[4].children[0].click();
    }
    else{
        AI('twohand');
    }
}

setInterval(callAI, 500);
