class Pokemon {
    constructor(nom, hp, attaque, defense, sort) {
        this.nom = nom;
        this.hp = hp;
        this.attaque = attaque;
        this.defense = defense;
        this.sort = sort;
    }

    attaquer(cible) {
        const degats = Math.max(0, this.attaque - cible.defense);
        cible.hp -= degats;
        console.log(`${this.nom} attaque ${cible.nom} infligeant ${degats} dégâts.`);
    }

    utiliserSort(cible) {
        this.sort(cible);
    }

    afficherStats() {
        console.log(`${this.nom} - HP: ${this.hp}, Attaque: ${this.attaque}, Défense: ${this.defense}`);
    }

    estKO() {
        return this.hp <= 0;
    }
}

class Dresseur {
    constructor(nom) {
        this.nom = nom;
        this.pokemons = [];
        this.inventaire = [];
    }

    ajouterPokemon(pokemon) {
        this.pokemons.push(pokemon);
    }

    choisirPokemon() {
        return this.pokemons.find(pokemon => !pokemon.estKO());
    }

    ajouterObjet(objet) {
        this.inventaire.push(objet);
    }

    utiliserObjet(nomObjet, cible) {
        const objet = this.inventaire.find(o => o.nom === nomObjet);
        if (objet) {
            objet.utiliser(cible);
            this.inventaire = this.inventaire.filter(o => o.nom !== nomObjet);
        }
    }

    tousPokemonKO() {
        return this.pokemons.every(pokemon => pokemon.estKO());
    }
}

class Objet {
    constructor(nom, effet) {
        this.nom = nom;
        this.effet = effet;
    }

    utiliser(cible) {
        this.effet(cible);
        console.log(`${this.nom} utilisé sur ${cible.nom}.`);
    }
}

const pikachu = new Pokemon("Pikachu", 100, 25, 10, (cible) => {
    const degats = 30; // Attaque spéciale
    cible.hp -= degats;
    console.log(`${pikachu.nom} utilise attaque éclair sur ${cible.nom} infligeant ${degats} dégâts.`);
});

const bulbizarre = new Pokemon("Bulbizarre", 120, 20, 15, (cible) => {
    const degats = 20; // Attaque spéciale
    cible.hp -= degats;
    console.log(`${bulbizarre.nom} utilise attaque empoisonnée sur ${cible.nom} infligeant ${degats} dégâts.`);
});

const potion = new Objet("Potion", (cible) => {
    cible.hp += 20;
    console.log(`${cible.nom} récupère 20 HP.`);
});

const boostAttaque = new Objet("Boost d'attaque", (cible) => {
    cible.attaque += 5;
    console.log(`${cible.nom} KO!.`);
});

const dresseur1 = new Dresseur("Sacha");
const dresseur2 = new Dresseur("Ondine");

dresseur1.ajouterPokemon(pikachu);
dresseur2.ajouterPokemon(bulbizarre);

dresseur1.ajouterObjet(potion);
dresseur2.ajouterObjet(boostAttaque);

let tour = 1;
while (!dresseur1.tousPokemonKO() && !dresseur2.tousPokemonKO()) {
    console.log(`\n--- Tour ${tour} ---`);
    
    const pokemon1 = dresseur1.choisirPokemon();
    const pokemon2 = dresseur2.choisirPokemon();

    // Dresseur 1 attaque
    pokemon1.attaquer(pokemon2);
    pokemon2.afficherStats();

    // Vérification de KO
    if (pokemon2.estKO()) {
        console.log(`${pokemon2.nom} est KO!`);
        continue;
    }

    // Dresseur 2 attaque
    pokemon2.attaquer(pokemon1);
    pokemon1.afficherStats();

    // Vérification de KO
    if (pokemon1.estKO()) {
        console.log(`${pokemon1.nom} est KO!`);
    }

    tour++;
}

if (dresseur1.tousPokemonKO()) {
    console.log(`${dresseur1.nom} a perdu le combat!`);
} else {
    console.log(`${dresseur2.nom} a perdu le combat!`);
}