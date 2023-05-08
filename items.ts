const items = [
  [
    "missinguid_repulsionArmorPlate",
    "Repulsion Armor Plate",
    "defense,armor,flat,reduction",
    "armor",
    "Reduce all incoming damage by 5 {+5}. Cannot be reduced below 1.",
  ],
  [
    "missinguid_mocha",
    "Mocha",
    "utility,speed,attack,dual,coffee",
    "mocha",
    "Increases attack speed by 7.5% {+7.5%} and movement speed by 7% {+7%}.",
  ],
  [
    "BarrierOnKill",
    "Topaz Brooch",
    "defense,shield,on,kill",
    "shieldBrooch",
    "Gain a temporary barrier on kill for 15 health {+15}.",
  ],
  [
    "Bear",
    "Tougher Times",
    "defense,block,locked",
    "bear",
    "15% {+15%} chance to block incoming damage.\nUnaffected by the luck.",
    "Die 5 times.",
  ],
  [
    "BleedOnHit",
    "Trip-Tip Dagger",
    "offense,dot",
    "tritip",
    "10% {+10%} chance to bleed an enemy for 240% base damage.",
  ],
  [
    "BossDamageBonus",
    "Armor-Piercing Rounds",
    "offense,boss,ammo,bullet,locked",
    "bossDamage",
    "Deal an additional 20% damage {+20%} to bosses.",
    "Complete a Teleporter event.",
  ],
  [
    "CritGlasses",
    "Lens-Maker's Glasses",
    "offense,critical,chance",
    "glasses",
    'Your attacks have a 10% {+10%} chance to "Critically Strike", dealing double damage.',
  ],
  [
    "Crowbar",
    "Crowbar",
    "attack",
    "crowbar",
    "Deal 75% {+75%} damage to enemies above 90% health.",
    "Discover 10 unique white items.",
  ],
  [
    "Firework",
    "Bundle of Fireworks",
    "offense,on,open,locked",
    "firework",
    "Activating an interactable launches 8 {+4} fireworks that deal 300% base damage.",
    "Duplicate the same item 7 times in a row with a 3D printer.",
  ],
  [
    "RegeOnKill",
    "Fresh Meat",
    "utility,heal,steack,steak,raw,health",
    "steak",
    "Increases maximum health by 25 {+25}.",
  ],
  [
    "missinguid_brokenWatch",
    "Delicate Watch",
    "utility,damage,breakable",
    "brokenWatch",
    "Increase damage by 20% {+20%}. Taking damage to below 25% health breaks this item.",
  ],
  [
    "missinguid_pennies",
    "Roll of Pennies",
    "utility,damage,gold,scales",
    "pennies",
    "Gain 3 {+3} gold on taking damage from an enemy. Scales over time.",
  ],
  [
    "HealWhileSafe",
    "Cautious Slug",
    "defense,heal",
    "slug",
    "Increases base health regeneration by +3 hp/s {+3 hp/s} while outside of combat.",
  ],
  [
    "missinguid_elixir",
    "Power Elixir",
    "utility,heal,low,health",
    "elixir",
    "Taking damage to below 25% health consumes this item, healing you for 75% of maximum health.",
  ],
  [
    "Hoof",
    "Paul's Goat Hoof",
    "defense,movespeed,locked",
    "goat",
    "Increases movement speed by 14% {+14%}.",
    "Fail the Shrine of chance 3 times in a row.",
  ],
  [
    "IgniteOnKill",
    "Gasoline",
    "offense,fire,on,kill",
    "gasoline",
    "Killing an enemy ignites all enemies within 12m {+4m}.\nEnnemies burn for 150% {+75%} base damage.",
  ],
  [
    "Medkit",
    "Medkit",
    "defense,heal,on,hit,locked",
    "medkit",
    "2 seconds after getting hurt, heal for 20 plus an additional 5% {+5%} of maximum health.",
    "Defeat an Elite-type monster.",
  ],
  [
    "Mushroom",
    "Bustling Fungus",
    "defense,heal,stand",
    "fungus",
    "After standing still for 1 seconds create a zone that heals for 4.5% {+2.25%} of your health every second to all allies within 3m {+1.5m}.",
  ],
  [
    "NearbyDamageBonus",
    "Focus Crystal",
    "offense,closen,boost,damage",
    "redCrystal",
    "Increase damage to enemies withing 13m by 20% {+20%}.",
  ],
  [
    "missinguid_opal",
    "Oddly-shaped Opal",
    "defense,armor,safe",
    "opal",
    "Increase armor by 100 {+100} while out of danger.",
  ],
  [
    "PersonalShield",
    "Personal Shield Generator",
    "defense,shield",
    "shield",
    "Gain a shield equal to 8% {+8%} of your maximum healt. Recharges outside of danger.",
  ],
  [
    "missinguid_itemScrapWhite",
    "Item Scrap, White",
    "utility,3d,printer,white",
    "scraps1",
    "Does nothing. Prioritized when used with 3D Printers.",
  ],
  [
    "SecondarySkillMagazine",
    "Backup Magazine",
    "utility,charge,locked",
    "backupMag",
    "Add +1 {+1} charge of your Secondary skill.",
    "Fully charge a Teleporter without getting hit.",
  ],
  [
    "SprintBonus",
    "Energy Drink",
    "defense,movespeed",
    "drink",
    "Sprint speed is improved by 25% {+25%}.",
  ],
  [
    "StickyBomb",
    "Sticky Bomb",
    "offense,on,hit",
    "stickyBomb",
    "5% {+5%} chance on hit to attach a bomb to an enemy, detonating for 180% TOTAL damage.",
  ],
  [
    "StunChanceOnHit",
    "Stun Grenade",
    "offense,stun,on,hit",
    "stunGrenade",
    "5% {+5%} chance on hit to stun enemies for 2 seconds.",
  ],
  [
    "Syringe",
    "Soldier's Syringe",
    "offense,speed",
    "syringe",
    "Increase Attack Speed by 15% {+15%}.",
  ],
  [
    "Tooth",
    "Monster Tooth",
    "defense,heal,on,kill",
    "monsterTooth",
    "Killing an ennemy spawns a healing orb that heals for 8 plus an additional 2% {+2%} of maximum health.",
  ],
  [
    "TreasureCache",
    "Rusted Key",
    "utility,box,locked",
    "key",
    "A hidden cache containing an item (80%/20%) will appear in a random location on each stage.\nOpening the cache {consumes} this item.",
    "Defeat the Teleporter boss under 15 seconds.",
  ],
  [
    "LevelBonus",
    "Warbanner",
    "utility,attack,speed,movespeed,on,level",
    "warbanner",
    "On level up or starting the Teleporter event, drop a banner that strengthens all allies within 16m {+8m}.\nRaise attack and movement speed by 30%.",
  ],
  [
    "AttackSpeedOnCrit",
    "Predatory Instincts",
    "offense,critical,locked",
    "hat",
    "Critical Strikes increase attack speed by 12%.\nMaximum cap of 36% {+24%} attack speed.",
    "Reach +200% attack speed.",
  ],
  [
    "Bandolier",
    "Bandolier",
    "utility",
    "bandolier",
    "18% {+10%} chance on kill to drop an ammo pack that resets all cooldowns.",
  ],
  [
    "BonusGoldPackOnKill",
    "Ghor's Tome",
    "utility,gold,book,treasure,flesh",
    "goldBook",
    "4% {+4%} chance on kill to drop a treasure worth 25$. Scales over time.",
  ],
  [
    "ChainLightning",
    "Ukulele",
    "offense,on,hit",
    "ukulele",
    "25% chance to fire a chain lightning for 80% TOTAL damage up to 3 {+2} targets within 20m {+2m}.",
  ],
  [
    "missinguid_deathMark",
    "Death Mark",
    "offense,mark,death,debuff,increased,damage",
    "deathMark",
    "Enemies with 4 or more debuffs are marked for death, increasing damage taken by 50% from all sources for 7 {+7} seconds.",
  ],
  [
    "EnergizedOnEquipmentUse",
    "War Horn",
    "offense,attack,speed,equipment,locked",
    "warHorn",
    "Activating your Equipment gives you +70% attack speed for 8s {+4s}.",
    "Complete 3 Combat Shrines in a single stage.",
  ],
  [
    "EquipmentMagazine",
    "Fuel Cell",
    "utility,charge,locked",
    "cell",
    "Hold an additional equipment charge {+1}.\nReduce equipment cooldown by 15% {+15%}.",
    "Pickup 5 different types of Equipment.",
  ],
  [
    "ExecuteLowHealthElite",
    "Old Guillotine",
    "offense,boss,locked",
    "guillotine",
    "Instantly kill Elite Monsters below 13% {+13%} health.",
    "Defeat 500 Elite Monsters.",
  ],
  [
    "ExplodeOnDeath",
    "Will-O'-the-wisp",
    "offense,on,kill",
    "wisp",
    "On killing an enemy, spawn a lava pillar in a 12m {+2.4m} radius for 350% {+280%} base damage.",
  ],
  [
    "Feather",
    "Hopoo Feather",
    "utility",
    "feather",
    "Gain +1 {+1} maximum jump count.",
  ],
  [
    "FireRing",
    "Kjaro's Band",
    "offense,on,hit,locked",
    "fireRing",
    "Hits that deals more than 400% damage also blasts enemies with a runic flame tornado, dealing 300% {+300%} TOTAL damage over time. Recharge every 10 seconds.",
    "Discover the hidden chamber in the Abandonned Aqueduct.",
  ],
  [
    "missinguid_for,",
    "Shipping Request Form",
    "utility,item,selector,drop",
    "form",
    "A delivery containing 2 items (79%/20%/1%) will appear in a random location on each stage. {Increases rarity chances of the items}.",
  ],
  [
    "HealOnCrit",
    "Harvester's Scythe",
    "offense,defense,critical,heal,locked",
    "scythe",
    "Gain 5% critical chance.\nCritical strikes heal for 8 {+4} health.",
    "Complete a Prismatic Trial.",
  ],
  [
    "IceRing",
    "Runald's Band",
    "offense,on,hit,locked",
    "iceRing",
    "Hits that deals more than 400% damage also blasts enemies with a runic ice blast, slowing them by 80% for 3s {+3s} and dealing 250% {+250%} TOTAL damage. Recharge every 10 seconds.",
    "Discover the hidden chamber in the Abandonned Aqueduct.",
  ],
  [
    "Infusion",
    "Infusion",
    "defense,life,locked",
    "infusion",
    "Killing an enemy increases your health permanently by 1 {+1}, up to a maximum of 100 {+100} health.",
    "Defeat 3000 enemies.",
  ],
  [
    "JumpBoost",
    "Wax Quail",
    "defense,movespeed,pigeon,locked",
    "quail",
    "Jumping while sprinting boosts you forward by 10m {+10m}.",
    "Reach +300% movespeed (include sprinting).",
  ],
  [
    "Missile",
    "AtG Missile Mk. 1",
    "offense,on,hit",
    "missile_mk",
    "10% chance to fire a missile that deals 300% {+300%} TOTAL damage.",
  ],
  [
    "missinguid_harpoon",
    "Hunter's Harpoon",
    "utility,movement,speed,on,kill",
    "harpoon",
    "Killing an enemy increases movement speed by 125%, fading over 1 {+0.5} seconds.",
  ],
  [
    "Phasing",
    "Old War Stealthkit",
    "defense,phasing,invincible",
    "phasing",
    "Falling below 25% health causes you to gain 40% movement speed and invisibility for 5s.\nRecharges every 30 seconds {-50%}.",
  ],
  [
    "missinguid_shuriken",
    "Shuriken",
    "offense,on,attack,ninja",
    "shuriken",
    "Activation your Primary skill also throws a shuriken that deals 400% {+100%} base damage. You can hold up to 3 {+1} shurikens which all reload over 10 seconds.",
  ],
  [
    "missinguid_orangeScrap",
    "Regenerating Scrap",
    "utility,scrap,rare,shop",
    "orangeScrap",
    "Does nothing. Prioritized when used with Uncommon 3D Printers. At the start of each stage, it regenerates.",
  ],
  [
    "missinguid_itemScrapGreen",
    "Item Scrap, Green",
    "utility,3d,green",
    "scraps2",
    "Does nothing. Prioritized when used with 3D Printers.",
  ],
  [
    "Seed",
    "Leeching Seed",
    "defense,heal,on,hit",
    "seed",
    "Dealing damage heals you for 1 {+1} health.",
  ],
  [
    "SlowOnHit",
    "Chronobauble",
    "offense,on,hit",
    "bauble",
    "Slow enemies for -60% movement speed for 2s {+2s}.",
  ],
  [
    "SprintArmor",
    "Rose Buckler",
    "defense,armour,shield",
    "buckler",
    "Increase armor by 30 {+30} while sprinting.",
  ],
  [
    "SprintOutOfCombat",
    "Red Whip",
    "defense,movespeed",
    "whip",
    "Leaving combat boosts movement speed by 30% {+30%}.",
  ],
  [
    "missinguid_squidPolyp",
    "Squid Polyp",
    "offense,summon,turret,squid,auto",
    "squidTurret",
    "Activating an interactable summons a Squid Turret that attacks nearby enemies at 100% {+100%} attack speed. Lasts 30 seconds.",
    "Activate 6 turrets in a single run.",
  ],
  [
    "missinguid_tank",
    "Ignition Tank",
    "offense,ignite,fire,dot",
    "tank",
    "Ignite effects deal +300% {+300%} more damage over time.",
  ],
  [
    "TPHealingNova",
    "Lepton Daisy",
    "defense,heal,flower",
    "healFlower",
    "Release a healing nova during the Teleporter event, healing all nearby allies for 50% of their maximum health. Occurs 1 {+1} times.",
  ],
  [
    "Thorns",
    "Razorwire",
    "offense,on,hit,radius",
    "razorHeadband",
    "Getting hit causes you to explode in a burst of razors, dealing 160% damage.\nHits up to 5 {+2} targets in a 25m {+10m} radius.",
  ],
  [
    "WarCryOnMultiKill",
    "Berzerker's Pauldron",
    "offense,movespeed,on,kill,locked",
    "berzerk",
    "Killing 3 enemies within 1 second sends you into a frenzy for 6s {+4s}.\nIncreases movement speed by 50% and attack speed by 100%.",
    "Charge the Teleporter with less than 10% health.",
  ],
  [
    "AlienHead",
    "Alien Head",
    "utility",
    "alien",
    "Reduce skill cooldown by 25% {+25%}.",
  ],
  [
    "ArmorReductionOnHit",
    "Shattering Justice",
    "offense,armor,break,hammer,hit",
    "hammer",
    "After hitting an enemy 5 times, reduce their armor by 60 for 8 {+8} seconds.",
  ],
  [
    "BarrierOnOverHeal",
    "Aegis",
    "utility,heal,defense",
    "fullBarrier",
    "Healing past full grants you a temporary barrier for up to 50% {+50%} of the amount you healed.",
  ],
  [
    "Behemoth",
    "Brilliant Behemoth",
    "offense,explosion,on,hit",
    "behemoth",
    "All your attacks explode in a 4m {+1.5m} radius for a bonus 60% TOTAL damage to nearby enemies.",
  ],
  [
    "BounceNearby",
    "Sentient Meat Hook",
    "offense,utility,grab,locked",
    "hook",
    "20% {+20%} chance on hit to fire homing hooks at up to 10 {+5} enemies for 100% TOTAL damage.",
    "Loop back to the first stage.",
  ],
  [
    "missinguid_defensiveMicrobots",
    "Defensive Microbots",
    "defense,projectile,protection,shield",
    "microbot",
    "Shoot down 1 {+1} projectiles within 20m every 0.5 seconds. Recharge rate scales with attack speed.",
  ],
  [
    "Clover",
    "57 Leaf Clover",
    "utility,locked",
    "clover",
    "All random effects are rolled +1 {+1} times for a favorable outcome.",
    "Complete 20 stages in a single run.",
  ],
  [
    "missinguid_",
    "Laser scope",
    "offence,critical,damage,x2",
    "scope",
    "Critical Strikes deal an additional 100% damage {+100%}",
  ],
  [
    "Dagger",
    "Ceremonial Dagger",
    "offense,on,kill,tracking,attack",
    "dagger",
    "Killing an enemy fires out 3 homing daggers that deal 150% {+150%} base damage.",
  ],
  [
    "missinguid_droneBox",
    "Spare Drone Parts",
    "offense,drones,useless",
    "droneBox",
    "Gain Col. Droneman.\nDrones gain +50% {+50%} attack speed and cooldown reduction.\nDrones gain 10% chance to fire a missile on hit, dealing 300% TOTAL damage.\nDrones gain an automatic chain gun that deals 6x100% damage, bouncing to 2 enemies.",
  ],
  [
    "ExtraLife",
    "Dio's Best Friend",
    "utility,bear,death,jojo,revive,res,locked",
    "dio",
    "Upon Death, this item will be consumed and you will return to life with 3 seconds of invulnerability.",
    "Stay alive for 30 consecutive minutes.",
  ],
  [
    "FallBoots",
    "H3AD-5T v2",
    "defense,attack,fall",
    "cuffs",
    "Increase jump height.\nCreates a 5m-100m radius kinetic explosion on hitting the ground, dealing 1000%-10000% base damage that scales up with fall distance.\nRecharges in 10 {-50%} seconds.",
  ],
  [
    "GhostOnKill",
    "Happiest Mask",
    "offense,on,kill",
    "mask",
    "Killing enemies has a 7% chance to spawn a ghost of the killed enemy with 1500% damage. Lasts 30s {+30s}.",
  ],
  [
    "HeadHunter",
    "Wake of Vultures",
    "utility,elite,poe,headhunter",
    "headhunter",
    "Gain the power of any killed elite monster for 8s {+5s}.",
  ],
  [
    "Icicle",
    "Frost Relic",
    "offense,on,kill",
    "ice",
    "Killing an enemy surrounds you with an ice storm that deals 1200% damage per second and slows enemies by 80% for 1.5s.\nThe storm grows with every kill, increasing it's radius by 2m.\nStacks up to 18m {+12m}.",
  ],
  [
    "missinguid_rainCoat",
    "Ben's Raincot",
    "defense,debuff,cleanse,tank",
    "rainCoat",
    "Whenever you would receive a debuff, prevent it. Increases maximum health by 100 {+100}.",
  ],
  [
    "IncreaseHealing",
    "Rejuvenation Rack",
    "defense,heal,double,locked",
    "horn",
    "Heal +100% {+100%} more.",
    "Without healing, reach and complete the 3rd Teleporter event.",
  ],
  [
    "KillEliteFrenzy",
    "Brainstalks",
    "offense,locked",
    "brain",
    "Upon killing an elite monster, enter a frenzy for 4s {+4s} where skills have no cooldowns.",
    "Defeat an Elite boss on Monsoon difficulty.",
  ],
  [
    "LaserTurbine",
    "Resonance Disc",
    "offense,charge,piercing,explode",
    "disc",
    "Killing 4 enemies in 7 seconds charges the Resonance Disc.\nThe disc launches itself toward a target for 300% base damage {+300%}, piercing all enemies it doesn't kill, and then explodes for 1000% base damage {+1000%}.\nReturns to the user, striking all enemies along the way for 300% base damage {+300%}.",
  ],
  [
    "missinguid_hugeMissile",
    "Pocket I.C.B.M",
    "offense,missile,triple",
    "hugeMissile",
    "All missile items and equipments fire an additional 2 missiles. Increase missile damage by 0% {+50%}.",
  ],
  [
    "NovaOnHeal",
    "N'kuhana's Opinion",
    "offense,locked",
    "opinion",
    "Store 100% {+100%} of healing as Soul Energy.\nAfter your Soul Energy reaches 10% of your maximum health, fire a skull that deals 250% of your Soul Energy as damage.",
    "Find the Altar to N'kuhana.",
  ],
  [
    "missinguid_scorpion",
    "Symbiotic Scorpion",
    "utility,debuff,stack",
    "scorpion",
    "100% chance on hit to reduce armor by 2 {+2} permanently.",
  ],
  [
    "missinguid_interstellarDeskPlant",
    "Interstellar Desk Plant",
    "heal,defense,on kill",
    "deskPlant",
    "On kill, plant a healing fruit seed that grows into a plant after 5 seconds.\nThe plant heals for 10% of maximum health every second to all allies withing 5m {+5m}. Last 10 seconds.",
  ],
  [
    "missinguid_bottle",
    "Bottled Chaos",
    "utility,trigger,equipment,useless",
    "bottle",
    "Trigger a random equipment effect 1 {+1} time(s).",
  ],
  [
    "missinguid_itemScrapRed",
    "Item Scrap, Red",
    "utility,3d,rare,red",
    "scraps3",
    "Does nothing. Prioritized when used with 3D Printers.",
  ],
  [
    "ShockNearby",
    "Unstable Tesla Coil",
    "offense,close,locked",
    "tesla",
    "Fire out lightning that hits 3 {+2} enemies for 200% base damage every 0.5s.\nThe Tesla Coil switches off every 10 seconds.",
    "Deal 5000 damage in one shot.",
  ],
  [
    "Talisman",
    "Souldbound Catalyst",
    "utility,equipment,locked",
    "soul",
    "Kills reduce equipment cooldown by 4s {+2s}.",
    "Discover and activate 8 unique Newt Altars.",
  ],
  [
    "UtilitySkillMagazine",
    "Hardlight Afterburner",
    "utility,charge",
    "burner",
    "Add +2 {+2} charges of your Utility skill.\nReduces Utility skill cooldown by 33%.",
  ],
  [
    "missinguid_artifactKey",
    "Artifact Key",
    "activation",
    "artifactKey",
    "A stone shard with immense power.",
  ],
  [
    "BeetleGland",
    "Queen's Gland",
    "utility,invocation",
    "beetle",
    "Every 30 seconds, summon a Beetle Guard with bonus 300% damage and 100% health.\nCan have up to 1 {+1} Guards at a time.",
  ],
  [
    "missinguid_shatterspleen",
    "Shatterspleen",
    "offense,critical hit,bleed,explode,on death",
    "critBleed",
    "Critical Strikes bleed enemies for 240% base damage. Bleeding enemies explode on death for 400% {+400%} damage, plus an additional 15% {+15%} of their maximum health.",
  ],
  [
    "missinguid_moltenPerforator",
    "Molten Perforator",
    "offense,magma,on hit",
    "magmaTooth",
    "10% chance on hit to call forth 3 magma balls from an enemy, dealing 300% {+300%} damage and igniting all enemies.",
  ],
  [
    "Knurl",
    "Titanic Knurl",
    "defense,life",
    "knurl",
    "Increases maximum health by 40 {+40} and base health regeneration by +1.6 hp/s {+1.6 hp/s}.",
  ],
  [
    "missinguid_chargedPerforator",
    "Charged Perforator",
    "offense,lightning,random,new",
    "whiteHook",
    "10% chance on hit to do down a lightning strike, dealing 500% {+500%} damage.",
  ],
  [
    "missinguid_defenseNucleus",
    "Defense Nucleus",
    "utility,summon,triangle",
    "triangleSummon",
    "Killing elite monsters spawns an Alpha Construct. Limited to 4 {+4}.",
  ],
  [
    "NovaOnLowHealth",
    "Genesis Loop",
    "low,health,nova,explode,recharge,cooldown",
    "weirdTail",
    "Falling below 25% health causes you to explode, dealing 6000% base damage. Recharges every 30 seconds {-50%}.",
  ],
  [
    "missinguid_planula",
    "Planula",
    "defense,heal,egg,flat,incoming,new",
    "magmaEgg",
    "Heal from incoming damage for 15 {+15}",
  ],
  [
    "Pearl",
    "Pearl",
    "defense,health,maximum",
    "pearl",
    "Increases maximum health by 10% {+10%}.",
  ],
  [
    "missinguid_empathyCores",
    "Empathy Cores",
    "offense,summon,drone,boost,new",
    "doubleDrone",
    "Every 30 seconds, summon two Solus Probes that gain +100% {+100%} damage per ally on your team.",
  ],
  [
    "missinguid_itemScrapYellow",
    "Item Scrap, Yellow",
    "utility,3d,unique,yelllow",
    "scraps4",
    "Does nothing. Prioritized when used with 3D Printers.",
  ],
  [
    "ShinyPearl",
    "Irradiant Pearl",
    "defense,boost,statistics",
    "shinyPearl",
    "Increases ALL stats by 10% {+10%}.",
  ],
  [
    "missinguid_miredUrn",
    "Mired Urn",
    "offense,heal,slow,near,proximity",
    "tarUrn",
    'While in combat, the nearest 1 {+1} characters to you within 13m whill be "tethered" to you, dealing 100% damage per second, applying tar, and healing your for 100% of the damage dealt.',
  ],
  [
    "SprintWisp",
    "Little Disciple",
    "offense,tracking,sprint,attack",
    "sprintingWisp",
    "Fire a tracking wisp for 300% {+300%} damage.\nFires every 1.6 seconds while sprinting. Fire rate increases with movement speed.",
  ],
  [
    "TitanGoldDuringTP",
    "Halcyon Seed",
    "utility,invocation,boss,summon",
    "goldenSeed",
    "Summon Aurelionite during the teleporter event.\nIt has 100% {+50%} damage and 100% {+100%} health.",
  ],
  [
    "missinguid_corruptedBear",
    "Safer Spaces",
    "defense,cooldown,block",
    "corruptedBear",
    "Block incoming damage once. Recharges after 15 seconds {-10%}.\nCorrupts all Tougher Times.",
  ],
  [
    "missinguid_needletick",
    "Needletick",
    "offense,utility,collapse",
    "needletick",
    "10% {+10%} chance to collapse an enemy for 400% base damage.\nCorrupts all Tri-Tip Daggers.",
  ],
  [
    "missinguid_corruptedGlasses",
    "Lost Seer's Lenses",
    "offense,crit,insta,kill,elite",
    "corruptedGlasses",
    "Your attacks have a 0.5% {+0.5%} chance to instantly kill a non-Boss enemy.\nCorrupts all Lens-Maker's Glasses.",
  ],
  [
    "missinguid_weirdShroom",
    "Weeping Fungus",
    "defense,sprint,heal,percent",
    "weirdShroom",
    "Heals for 2% {+2%} of your health every second while sprinting.\nCorrupts all Bustling Fungi.",
  ],
  [
    "missinguid_corruptedKey",
    "Encrusted Key",
    "uility,chest,void",
    "corruptedKey",
    "A hidden cache containing an item (60%/30%/10%) will appear in a random location on each stage. Opening the cache consumes this item.\nCorrupts all Rusted Key.",
  ],
  [
    "missinguid_corruptedThing",
    "Polylute",
    "offense,lightning,group",
    "corruptedThing",
    "25% chance to fire lightning for 60% TOTAL damage up to 3 {+3} times.\nCorrupts all Ukuleles.",
  ],
  [
    "missinguid_superRing",
    "Singularity Band",
    "offense,blackhole,grab,on,hit",
    "superRing",
    "Hits that deal more than 400% damage also fire a black hole that draws enemies within 15m into its center.\nLasts 5 seconds before collapsing, dealing 100% {+100%} TOTAL damage.\nRecharges every 20 seconds.\nCorrupts all Kjaro's Band and Runald's Band.",
  ],
  [
    "missinguid_superCell",
    "Lysate Cell",
    "utility,stack,add,skill",
    "purpleCell",
    "Add +1 {+1} charge of your Special skill.\nCorrupts all Fuell Cells.",
  ],
  [
    "missinguid_flame",
    "Voidsent Flame",
    "offense,on,hit,burst,damage,zone,great",
    "flame",
    "Upon hitting an enemy at or above 90% health, detonate them in a 12m {+2.4m} radius burst for 260% {+156%} base damage.\nCorrupts all Will-o'-the-wisps.",
  ],
  [
    "missinguid_shrimp",
    "Plasma Shrimp",
    "offense,on,attack,missile",
    "superMissile",
    "Gain a shield equal to 10% of your maximum health. While you have a shield, hitting an enemy fires a missile that deals 40% {+50%} TOTAL damage.\nCorrupts all AtG Missile Mk. 1s.",
  ],
  [
    "missinguid_plantTentacle",
    "Tentabauble",
    "utility,root,on,hit",
    "plantTentacle",
    "5% {+5%} chance on hit to root enemies for 1s {+1s}.\nCorrupts all Chronobaubles.",
  ],
  [
    "missinguid_corruptedClover",
    "Benthic Bloom",
    "utility,upgrade,next,tier",
    "corruptedClover",
    "Upgrades 3 {+3} randoms items to items of the next higher rarity at the start of each stage.\nCorrupts all 57 Leaf Clovers.",
  ],
  [
    "missinguid_hauntedBear",
    "Pluripotent Larva",
    "utility,on,death,corrupt,consume",
    "hauntedBear",
    "Upon death, this item will be consumed and you will return to life with 3 seconds of invulnerability, and all of your items that can be corrupted will be.\nCorrupts all Dio's Best Friends.",
  ],
  [
    "missinguid_corruptedScorpion",
    "Newly Hatched Zoea",
    "offense,summon,void,ally",
    "corruptedScorpion",
    "Every 60 {-50%} seconds, gain a random Void ally. Can have up to 1 {+1} allies at a time.\nCorrupts all Unique Items.",
  ],
  [
    "AutoCastEquipment",
    "Gesture of the Drowned",
    "utility,equipment,locked",
    "fossil",
    "Reduce equipment cooldown by 50% {+15%}.\nForces your Equipment to activate whenever it is off cooldown.",
    "Kill 20 Hermit Crabs by chasing them off the edge of the map.",
  ],
  [
    "missinguid_focusedConvergence",
    "Focused Convergence",
    "utility,teleporter,event,smaller,faster",
    "orb",
    "Teleporters charge 30% {+30%} faster, but the size of the Teleporter zone is 50% {-50%} smaller.",
    "In 4 consecutives stages, don't leave the teleporter radius until it is fully charged.",
  ],
  [
    "GoldOnHit",
    "Brittle Crown",
    "utility",
    "crown",
    "30% chance on hit to gain 2 {+2} gold. Scales over time.\nLose gold equal to 100% {+100%} of amount your are hit for OR lose % gold equal to 100% {+100%} of the maximum health % you lost.\nChooses the greater of the two.",
  ],
  [
    "missinguid_coolJacket",
    "Light Flux Pauldron",
    "utility,skill,cooldown,bad,trade",
    "coolJacket",
    "Decrease skill cooldowns by 50% {+50%}. Decrease attack speed by 50% {+50%}.",
  ],
  [
    "missinguid_pauldron",
    "Stone Flux Pauldron",
    "utility,bad,trade",
    "pauldron",
    "Increase max health by 100% {+100%}. Reduce movement speed by 50% {+50%}.",
  ],
  [
    "missinguid_purity",
    "Purity",
    "utility,cooldown,reduction,bad luck,reroll",
    "snowflake",
    "All skill cooldowns are reduced by 2 {+1} seconds. All random effects are rolled +1 {+1} times for an unfavorable outcome.",
    "Beat the game in Monsoon difficulty.",
  ],
  [
    "LunarDagger",
    "Shaped Glass",
    "offense,suicide",
    "sword",
    "Increase base damage by 100% {+100%}.\nReduce maximum health by 50% {+50%}.",
  ],
  [
    "LunarPrimaryReplacement",
    "Visions of Heresy",
    "active,primary,replace,offense,damage,recharge,cooldown,skill,orb",
    "weirdOrb",
    "Replace your Primary Skill with Hungering Gaze.\nFire a flurry of tracking shards that detonate after a delay, dealing 120% base damage. Hold up to 12 charges {+12} that reload after 2 seconds {+2}.",
  ],
  [
    "missinguid_hookOfHeresy",
    "Hook of Heresy",
    "active,secondary,replace,offense,skill,explode",
    "purpleBlade",
    "Replace your Secondary Skill with Slicing Maelstrom.\nCharge up a projectile that deals 175% damage per second to nearby enemies, exploding after 3 seconds to deal 700% damage and root enemies for 3 {+3} seconds. Recharges after 5 {+5} seconds.",
    "Kill 15 boss monsters in a single run.",
  ],
  [
    "missinguid_essenceOfHeresy",
    "Essence of Heresy",
    "active,special,replace,offense,skill,stack,explode",
    "ocarina",
    "Replace your Special Skill with Ruin.\nDealing damage adds a stack of Ruin for 10 {+10} seconds. Activating the skill detonates all Ruin stack at unlimited range, dealing 300% damage plus 120% damage per stack of Ruin.\nRecharges after 8 {+8} seconds.",
    "Kill 15 boss monsters in a single run.",
  ],
  [
    "missinguid_whiteBall",
    "Egocentrism",
    "utility,sacrifice,item",
    "whiteBall",
    "Every 3 {-50%} seconds, gain an orbiting bomb that detonates on impact for 360% damage, up to a maximum of 3 {+1} bombs.\nEvery 60 seconds, a random item is converted into this item.",
  ],
  [
    "LunarTrinket",
    "Beads of Fealty",
    "secret,unlock,zone,no,effect",
    "beads",
    "Seems to do nothing... but...",
    'Unlock the new zone from the "Hidden Realms" update when you obliterate with this item.',
  ],
  [
    "LunarUtilityReplacement",
    "Strides of Heresy",
    "utility,movement,skill,arm,speed,heal,defense",
    "weirdArm",
    "Replace your Utility Skill with Shadowfade.\nFade away, becoming intangible and gaining +30% movement speed. Heal for 25% {+25%} of your maximum health. Lasts 3 {+3} seconds.",
    "Kill 15 boss monsters in a single run.",
  ],
  [
    "missinguid_defiantGouge",
    "Defiant Gouge",
    "offense,summon,shrine,on use",
    "tools",
    "Using a Shrine summons enemies nearby. Scales over time.",
  ],
  [
    "missinguid_mercurialRachis",
    "Mercurial Rachis",
    "offense,power,zone,damage",
    "spin",
    "Creates a Ward of Power in a random location nearby that buffs both enemies and allies within 16m {+50%}, causing them to deal +50% damage.",
  ],
  [
    "missinguid_domino",
    "Eulogy Zero",
    "utility,convert,chance,lunar",
    "domino",
    "Items have a 5% {+5%} chance to become a Lunar item instead.",
  ],
  [
    "RepeatHeal",
    "Corpsebloom",
    "defense,heal,dot",
    "flower",
    "Heal +100% {+100%} more.\nAll healing is applied over time.\nCan heal for a maximum of 10% {-50%} of your health per second.",
  ],
  [
    "ShieldOnly",
    "Transcendence",
    "defense,chaos",
    "transc",
    "Convert all but 1 health into regenerating shields.\nGain 50% {+25%} maximum health.",
  ],
  [
    "BurnNearby",
    "Helfire Tincture",
    "offense,suicide,fire,equipment,locked",
    "burn",
    "Ignite ALL characters within 8m. Deal 5% of your maximum health/second as burning to yourself.\nThe burn is 0.5x stronger on allies, and 24x stronger on enemies.\nCooldown: 45s",
    "Kill 15 enemies simultaneously.",
  ],
  [
    "CrippleWard",
    "Effigy of Grief",
    "utility,equipment",
    "slow",
    "ALL characters are slowed by 50% and has their armor reduced by 20.\nCan place up to 5.\nCooldown: 15s",
  ],
  [
    "Meteor",
    "Glowing Meteorite",
    "offense,suicide,equipment,locked",
    "meteorite",
    "Rain meteors from the sky, damaging ALL characters for 600% damage per blast.\nLast 20 seconds.",
    "Carry 5 Lunar items in a single run.",
  ],
  [
    "Tonic",
    "Spinel Affliction",
    "utility,buff,debuff,attack,speed,movespeed,health,regen",
    "tonic",
    "Drink the Tonic, gaining a boost for 15 seconds.\nIncreases damage by +100%.\nIncreases attack speed by +70%.\nIncreases armor by +20.\nIncreases maximum health by +50%.\nIncreases passive health regeneration by +300%.\nIncreases movespeed by +30%.\nWhen the tonic wears off, you have 20% chance to gain a Tonic Affliction, reducing all of your stats by -5% {-5%}",
    "Discover and enter three unique portals.",
  ],
  [
    "BFG",
    "Preon Accumulator",
    "offense,locked",
    "beam",
    "Fires preon tendrils, zapping enemies within 35m up to 600% damage/second.\nOn contact, detonate in an enormous 20m explosion for 4000% damage.\nCooldown: 140s",
    "Open the Timed Security Chest on Rallypoint Delta.",
  ],
  [
    "Blackhole",
    "Blackhole",
    "offense,stack",
    "blackhole",
    "Fire a black hole that draws enemies within 30m into it's center. Last 10 seconds.\nCooldown: 60s",
  ],
  [
    "missinguid_oldGun",
    "Trophy Hunter's Tricorn",
    "utility,one,shoot,boss,drop,item",
    "oldGun",
    "Execute any enemy capable of spawning a unique reward, and it will drop that item. Equipment is consumed on use.",
  ],
  [
    "Cleanse",
    "Blast Shower",
    "utility,defense,cleanse,debuff",
    "potThing",
    "Cleanse all negative effects. Includes debuffs, damage over time, and nearby projectiles.\nCooldown: 20s",
    "Die three fiery deaths.",
  ],
  [
    "CommandMissile",
    "Disposable Missile Launcher",
    "attack",
    "missile",
    "Fire a swarm of 12 missiles that deal 12x300% damage.\nCooldown: 45s",
  ],
  [
    "CritOnUse",
    "Ocular HUD",
    "attack",
    "hud",
    "Gain +100% Critical Strike Chance for 8 seconds.\nCooldown: 60s",
  ],
  [
    "missinguid_forgiveMePlease",
    "Forgive Me Please",
    "offense,trigger,on kill",
    "voodoo",
    "Throw a cursed doll out that triggers any On-kill effects you have every 1 second for 8 seconds.\nCooldown: 45",
    "Die 20 times.",
  ],
  [
    "DroneBackup",
    "The Back-up",
    "utility,locked",
    "drone",
    "Call 4 Strike Drones to fight for you.\nLast 25 seconds.\nCooldown: 100s",
    "Repair 30 drones or turrets.",
  ],
  [
    "FireBallDash",
    "Volcania Egg",
    "utility,offense,detonate,movement",
    "egg",
    "Turn into a draconic fireball for 5 seconds. Deal 500% damage on impact.\nDetonates at the end for 800% damage.\nCooldown: 30s",
  ],
  [
    "Fruit",
    "Foreign Fruit",
    "defense,heal",
    "fruit",
    "Instantly heal for 50% of your maximum health.\nCooldown: 45s",
  ],
  [
    "GainArmor",
    "Jade Elephant",
    "utility,defense,resistance,armor",
    "elephant",
    "Gain 500 armor for 5 seconds.\nCooldown: 45s",
  ],
  [
    "Gateway",
    "Eccentric Vase",
    "utility,scan,locked",
    "vase",
    "Create a quantum tunnel of up to 1000m in length. Lasts 30 seconds.\nCooldown: 45s",
    "Defeat the guardian of Gilded Coast without any beacons deactivating.",
  ],
  [
    "GoldGat",
    "The Crowdfunder",
    "offense,troll,locked",
    "gatling",
    "Fires a continuous barrage that deals 100% damage per bullet.\nCosts $1 per bullet. Costs increases over time.\nCooldown: 5s",
    "Collect $30,480 total gold.",
  ],
  [
    "missinguid_goobo",
    "Goobo Jr.",
    "utility,clone,summon",
    "goobo",
    "Spawn a gummy clone that has 700% damage and 700% health. Expires in 30 seconds.\nCooldown: 100s",
  ],
  [
    "Jetpack",
    "Milky Chrisalis",
    "utility,movespeed",
    "larva",
    "Sprout wings and fly for 15 seconds.\nGain +20% movement speed for the duration.\nCooldown: 60s",
  ],
  [
    "missinguid_superMassiveLeech",
    "Super Massive Leech",
    "defense,heal,leech,on hit",
    "leech",
    "Heal for 20% of the damage you deal. Lasts 8 seconds.\nCooldown: 60s",
  ],
  [
    "Lightning",
    "Royal Capacitor",
    "offense,locked",
    "lightning",
    "Call down a lightning strike on a targeted monster, dealing 3000% damage and stunning nearby monsters.\nCooldown: 20s",
    "Defeat the Teleporter bosses after activating 2 Shrines of the Moutain.",
  ],
  [
    "missinguid_molotov",
    "Molotov (6-Pack)",
    "offense,fire",
    "molotov",
    "Throw 6 molotov cocktails that ignites enemies for 500% base damage. Each molotov leaves a burning area for 200% damage per second.\nCooldown: 45s",
  ],
  [
    "missinguid_creditCard",
    "Executive Card",
    "utility,shop,money,gold",
    "creditCard",
    "Whenever you make a gold purchase, get 10% of the spent gold back. If the purchase is a multishop terminal, the other terminals will remaing open.\nCooldown: 0.1s",
  ],
  [
    "PassiveHealing",
    "Gnarled Woodsprite",
    "defense,heal,locked",
    "spirit",
    "Gain a Woodsprite follower that heals a friendly target for 10% of their maximum health instantly, then 1.5% of your maximum health every second.\nActivating the equipment assigns a new target, or yourself if there are no targets available.\nCooldown: 15s",
    "Fully upgrade a Shrine of the Woods.",
  ],
  [
    "missinguid_recycler",
    "Recycler",
    "utility,reroll,recycle,transform",
    "recycler",
    "Transform an Item or Equipment into a different one. Can only be converted in the same tier one time.\nCooldown: 45s",
    "Destroy  20 flying rocks in Sky Meadow.",
  ],
  [
    "missinguid_sawmerang",
    "Sawmerang",
    "offense,boomerang",
    "metalSpin",
    "Throw three large saw blades that slice through enemies for 3x400% damage.\nAlso deals an additional 3x100% damage per second while bleeding enemies.\nCan strike enemies again on the way back.\nCooldown: 45s",
  ],
  [
    "Scanner",
    "Radar Scanner",
    "utility,scan,locked",
    "radar",
    "Reveal all interactables within 500m for 10 seconds.\nCooldown: 45s",
    "Collect 10 Monster or Environment Logs.",
  ],
  [
    "missinguid_goragsOpus",
    "Gorag's Opus",
    "utility,offense,frenzy,movement speed,attack speed",
    "drum",
    "All allies enter a frenzy for 7 seconds. Increases movement speed by 50% and attack speed by 100%.\nCooldown: 45s",
  ],
  [
    "missinguid_fridge",
    "Remote Caffeinator",
    "utility,heal,drop,coffee,deliver",
    "fridge",
    "Request an Eclipse Zero Vending Machine from the UES Safe Travels. Delivery guaranteed in 5 seconds, dealing 2000% damage. Heal up to 3 targets for 25% of their maximum health.\nCooldown: 60s",
  ],
];

// var itemData = ["id", "name", "tags", "icon", "description", "unlock"];

const itemsAsObjects = items.map((item) => {
  return {
    id: item[0],
    name: item[1],
    tags: item[2],
    icon: item[3],
    description: item[4],
    unlock: item[5],
  };
});

export default itemsAsObjects;
