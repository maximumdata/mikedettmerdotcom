let suffixes = [
`Abacus`,`Aboleth`,`Alligator`,`Angel`,`Ankheg`,`Anvil`,`Ape`,`Apple`,`Archon`,`Arrow`,`Artichoke`,`Axe`,
`Baboon`,`Badger`,`Balor`,`Banshee`,`Barbarian`,`Bard`,`Barrel`,`Basilisk`,`Basket`,`Bat`,`Battleaxe`,`Beacon`,`Bear`,`Beech`,`Behir`,`Bell`,`Birch`,`Blade`,`Blanket`,`Blowgun`,`Boar`,`Boat`,`Bolt`,`Book`,`Boot`,`Bottle`,`Bow`,`Bucket`,`Bugbear`,`Bulette`,`Bull`,
`Camel`,`Candle`,`Cardinal`,`Carrot`,`Cart`,`Cat`,`Centaur`,`Chain`,`Cherry`,`Chest`,`Chimera`,`Circle`,`Claw`,`Cleric`,`Cloak`,`Cloaker`,`Clover`,`Club`,`Coat`,`Cockatrice`,`Coin`,`Couatl`,`Cow`,`Crab`,`Crocodile`,`Crossbow`,`Crow`,`Crowbar`,`Crown`,`Crystal`,`Cube`,`Cup`,`Cyclops`,
`Dagger`,`Dart`,`Deer`,`Demon`,`Devil`,`Dog`,`Donkey`,`Door`,`Doppelganger`,`Dove`,`Dragon`,`Drider`,`Drow`,`Druid`,`Drum`,`Dryad`,`Duergar`,`Dulcimer`,`Dwarf`,
`Eagle`,`Edge`,`Elemental`,`Elephant`,`Elf`,`Elk`,`Ettercap`,`Ettin`,`Eye`,
`Fiend`,`Fighter`,`Fish`,`Fist`,`Flail`,`Flask`,`Flower`,`Flute`,`Foot`,`Forest`,`Frog`,`Fungus`,
`Gargoyle`,`Gauntlet`,`Genie`,`Ghost`,`Ghoul`,`Giant`,`Glaive`,`Glass`,`Glove`,`Gnoll`,`Gnome`,`Goat`,`Goblin`,`Golem`,`Goliath`,`Gorgon`,`Grape`,`Grick`,`Griffon`,`Grove`,
`Hag`,`Halberd`,`Halfling`,`Hammer`,`Handaxe`,`Harpy`,`Hawk`,`Head`,`Heart`,`Hex`,`Hippogriff`,`Hoard`,`Hobgoblin`,`Homunculus`,`Horn`,`Horse`,`Hound`,`Hourglass`,`Human`,`Hydra`,`Hyena`,
`Imp`,`Incubus`,`Island`,`Ivy`,
`Jackal`,`Jackdaw`,`Jacket`,`Javelin`,`Jay`,`Jelly`,`Jug`,
`King`,`Kobold`,`Kraken`,
`Ladder`,`Lamia`,`Lamp`,`Lance`,`Lantern`,`Lemon`,`Lich`,`Line`,`Lion`,`Lizard`,`Lizardfolk`,`Lock`,`Lute`,`Lycanthrope`,`Lyre`,
`Mace`,`Mage`,`Magmin`,`Magpie`,`Mammoth`,`Manticore`,`Map`,`Maple`,`Mare`,`Maul`,`Maw`,`Medusa`,`Melon`,`Mephit`,`Mermaid`,`Mimic`,`Minotaur`,`Monk`,`Moose`,`Morningstar`,`Mouth`,`Mug`,`Mule`,`Mummy`,`Mystic`,
`Naga`,`Nail`,`Net`,`Nightmare`,`Nose`,`Noose`,
`Oak`,`Octopus`,`Ogre`,`Ooze`,`Orb`,`Orc`,`Otyugh`,`Owl`,`Owlbear`,
`Paladin`,`Panther`,`Pear`,`Pegasus`,`Pen`,`Pick`,`Pigeon`,`Pike`,`Pit`,`Pitcher`,`Pixie`,`Plate`,`Polyhedral`,`Pomegranate`,`Pony`,`Pot`,`Pouch`,`Pseudodragon`,`Pudding`,
`Queen`,`Quill`,`Quiver`,
`Rakshasa`,`Ram`,`Ranger`,`Rapier`,`Rat`,`Raven`,`Remorhaz`,`Reprieve`,`Respite`,`Rest`,`Revenant`,`Rhinoceros`,`Ring`,`Robe`,`Robin`,`Roc`,`Rogue`,`Rope`,`Rose`,`Rust Monster`,
`Sack`,`Sahuagin`,`Sailor`,`Salamander`,`Sanctuary`,`Sanctum`,`Satyr`,`Scabbard`,`Scimitar`,`Scorpion`,`Scroll`,`Scythe`,`Sea`,`Serpent`,`Shadow`,`Shark`,`Shawm`,`Ship`,`Shovel`,`Sickle`,`Sledge`,`Sling`,`Slumber`,`Snake`,`Sorcerer`,`Spear`,`Specter`,`Spellbook`,`Sphere`,`Sphinx`,`Spider`,`Sprite`,`Square`,`Squirrel`,`Staff`,`Stallion`,`Stirge`,`Stone`,`Succubus`,`Sword`,
`Tackle`,`Tail`,`Tankard`,`Tarrasque`,`Tent`,`Thicket`,`Tiefling`,`Tiger`,`Tome`,`Tooth`,`Torch`,`Totem`,`Trap`,`Trapezoid`,`Treant`,`Tree`,`Triangle`,`Trident`,`Troll`,`Trombone`,`Trumpet`,`Turtle`,
`Unicorn`,
`Vampire`,`Vulture`,
`Wagon`,`Wand`,`Warhammer`,`Warlock`,`Warrior`,`Weasel`,`Werewolf`,`Whale`,`Whip`,`Whistle`,`Wight`,`Will-o'-Wisp`,`Wizard`,`Wolf`,`Worm`,`Wraith`,`Wyrm`,`Wyvern`,
`Yak`,`Yeti`,
`Zombie`
];
let prefixes = [
`Abyssal`,`Acidic`,`Angry`,`Anxious`,`Arcane`,
`Babbling`,`Bear and`,`Bell and`,`Bitter`,`Black`,`Blackened`,`Blade and`,`Blind`,`Block and`,`Bloodied`,`Bloodstained`,`Bloody`,`Bludgeoning`,`Blue`,`Blushing`,`Bony`,`Book and`,`Boot and`,`Brass`,`Brave`,`Broken`,`Bronze`,`Brown`,`Bubbly`,`Bull and`,`Burnt`,
`Carnelian`,`Carved`,`Cat and`,`Celestial`,`Chalk`,`Chaotic`,`Charging`,`Charmed`,`Charming`,`Cloth`,`Concussive`,`Copper`,`Cowardly`,`Crimson`,`Crying`,`Crystal`,
`Dancing`,`Dark`,`Deadly`,`Deaf`,`Demonic`,`Depressed`,`Devilish`,`Diamond`,`Dire`,`Dirty`,`Disfigured`,`Dog and`,`Draconic`,`Dragon's`,`Drunken`,`Dueling`,`Dull`,
`Ecstatic`,`Electric`,`Electrum`,`Emerald`,`Energetic`,`Excited`,`Exhausted`,
`Fevered`,`Fiendish`,`Fighting`,`Filthy`,`Fish and`,`Flaming`,`Flirty`,`Flying`,`Forceful`,`Forged`,`Forgotten`,`Fractured`,`Frightened`,`Frightening`,`Fuchsia`,
`Gambling`,`Giant`,`Gilded`,`Glass`,`Gnarled`,`Goat and`,`Gold`,`Golden`,`Grappled`,`Green`,`Grey`,
`Hammered`,`Happy`,`Hawk and`,`Hidden`,`Hollow`,`Holy`,`Hook and`,`Hoppy`,`Horrific`,`Horse and`,`Hungry`,
`Icy`,`Impatient`,`Incapacitated`,`Indigo`,`Infernal`,`Invisible`,`Iron`,
`Jade`,`Jagged`,`Joyful`,`Jumping`,
`Keen`,`Knotted`,
`Laughing`,`Lavender`,`Lawful`,`Lawless`,`Leaping`,`Little`,`Lonely`,`Lost`,`Loveless`,`Lovely`,`Lucky`,
`Maimed`,`Marroon`,`Mauve`,`Meady`,`Metal`,`Miniature`,`Misshapen`,`Moldy`,`Monstrous`,`Moose and`,`Mossy`,`Mug and`,`Musty`,`Mutated`,
`Necrotic`,`Nervous`,
`Old`,`One-Eyed`,`Orange`,`Orderly`,`Overgrown`,`Overweight`,
`Paralyzed`,`Petrified`,`Piercing`,`Pink`,`Pious`,`Platinum`,`Poisoned`,`Poisonous`,`Polished`,`Priceless`,`Prone`,`Psychic`,`Puce`,`Purple`,
`Radiant`,`Raging`,`Rancid`,`Red`,`Rested`,`Restless`,`Restrained`,`Rogue`,`Rose and`,`Ruby`,`Rusty`,
`Sad`,`Sapphire`,`Screaming`,`Sculpted`,`Shattered`,`Shining`,`Sickly`,`Silk`,`Silver`,`Skinny`,`Slashing`,`Sleeping`,`Smallest`,`Smiling`,`Soiled`,`Sour`,`Spotless`,`Spotted`,`Staff and`,`Steel`,`Stick and`,`Struggling`,`Stuffy`,`Stumbling`,`Stunned`,`Stunning`,`Sultry`,`Surly`,`Sweet`,
`Tangled`,`Tangy`,`Teal`,`Thirsty`,`Tiny`,`Toasted`,`Tooth and`,`Toothless`,`Tranquil`,`Turquoise`,`Twisted`,
`Unconscious`,`Unholy`,`Unlucky`,`Unsoiled`,
`Vampiric`,`Velvet`,`Verdant`,`Violent`,`Violet`,
`Wand and`,`White`,`Wicked`,`Winged`,`Wise`,`Wolf and`,`Wooden`,`Woodland`,`Wounded`,
`Yawning`,`Yellow`,
`Zombified`
];

let details = [`nothing. This isn't a very popular tavern`,//0
`its comfortable seating`,//1
`the cheap booze`,//2
`a nautical theme regardless of the tavern's proximity to any body of water`,//3
`the extensive adventuring paraphernalia adorning the walls`,//4
`the fact that it's one of the only bars in town`,//5
`the surprisingly good quality of the food`,//6
`its rough-and-tumble anything goes atmosphere`,//7
`the cheap food`,//8
`the generous portions of food`,//9
`the quality of the drinks`,//10
`its warm and welcoming atmosphere`,//11
`its surprisingly clandestine atmosphere`,//12
`the band that plays every other night`,//13
`its spacious seating area`,//14
`the hilarious bartender`,//15
`the attractive waitstaff`,//16
`their convenient location`,//17
`an eating challenge—if you can eat it all, you don't have to pay`,//18
`a local legend that says the tavern was built on holy/unholy/magical ground`,//19
`its connection to the criminal underworld`,//20
`its famously rude and abrasive waitstaff`,//21
`the statue of its namesake out front`,//22
`their selection of wines imported from several far away places`,//23
`a petting zoo out back for the kids`,//24
`its extensive drink menu`,//25
`the bartender who remembers every regular's drink order`,//26
`its amateur open-stage night`,//27
`the varied cuisine prepared by a talented chef`,//28
`the fact that it's always a comfortable temperature inside no matter what the weather is like outside`,//29
`a fountain that flows freely with alcohol`,//30
`the dedicated hookah area`,//31
`an enchanted bandstand that plays music at all times`,//32
`the owner's exotic pet`//33
];

let clientele = [`violent`,//0, raucous start rough-and-tumble start
`raucous`,//1
`boisterous`,//2
`loud`,//3
`rambunctious`,//4 rough-and-tumble end
`obnoxious`,//5
`rude`,//6 raucous end
`unfriendly`,//7 average start
`friendly`,//8 warm start
`amicable`,//9
`welcoming`,//10 average end warm end
`secretive`,//11 clandestine start subdued start
`subdued`,//12
`clandestine`,//13 clandestine end
`peaceful`,//14
`elitist`,//15
`snobbish`//16 subdued end
];

const getInn = () => {
  let pref = prefixes[Math.floor(Math.random()*prefixes.length)];
  let suff = suffixes[Math.floor(Math.random()*suffixes.length)];
  let detail = `The party notices ${details[Math.floor(Math.random()*details.length)]}. Its patrons are ${clientele[Math.floor(Math.random()*clientele.length)]}.`;
  return { name: `The ${pref} ${suff}`, detail };
}

module.exports = getInn;
