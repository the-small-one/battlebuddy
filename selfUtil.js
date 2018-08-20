function getSelfHealth() {
    return parseInt(document.getElementById('vrhb').textContent);
}

function getSelfPercentHealth() {
    return document.getElementById('vbh').children[0].children[0].clientWidth / document.getElementById('vbh').clientWidth;
}

function getSelfMana() {
    return parseInt(document.getElementById('vrm').textContent);
}

function getSelfSpirit() {
    return parseInt(document.getElementById('vrs').textContent);
}

// returns the number of full charges
function getSelfOvercharge() {
    return document.getElementById('vcp').children[0].children.length;
}

function checkContinue() {
    var element = document.getElementById('btcp');
    if (element != null)
        return true;
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

function lockAttack(){
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
        for(var i = 0; i < children.length; i++){
            var c = children[i].className.slice(-1);
            if(c >= 'a' && c <= 'z'){
                gemName += c;
            }
            else{
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
        return document.getElementById('pane_effects').children[1].children[0].children[n].attributes.item(1).firstChild.data.split(',')[2].split(' ')[1].split(')')[0];
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
