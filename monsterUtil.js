//gets the number of monsters - alive or dead
function getNumMonsters() {
    return document.getElementById('pane_monster').children.length;
}

//tells if monster at n is dead or not
function isMonsterDead(monsterIndex) {
    var monsterElement = document.getElementById('pane_monster').children[monsterIndex];
    var opacity = parseFloat(window.getComputedStyle(monsterElement, null).getPropertyValue('opacity'));
    if (opacity == 1.0)
        return false;
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
    try{
        return document.getElementById('pane_monster').children[monsterIndex].children[2].children[2].children[0].firstElementChild.width * 5 / 6;
    }
    catch (e){
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
