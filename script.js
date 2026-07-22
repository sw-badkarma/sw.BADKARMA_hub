// ========================================================================================
// BAZA DE DATE GLOBALĂ CU STATISTICILE REALE DIN JOC (VALORI OFICIALE DIN MENIUL CODM)
// ========================================================================================
const CODM_OFFICIAL_SPECS = {
    // --- PUȘTI DE ASALT (AR) ---
    'ak117':    { dmg: 25, fir: 76, acc: 62, mob: 75, ran: 47, con: 46 },
    'type19':   { dmg: 28, fir: 75, acc: 54, mob: 83, ran: 53, con: 50 },
    'm13':      { dmg: 24, fir: 88, acc: 56, mob: 72, ran: 53, con: 43 },
    'ak47':     { dmg: 33, fir: 54, acc: 67, mob: 74, ran: 58, con: 44 },
    'grau':     { dmg: 27, fir: 73, acc: 50, mob: 85, ran: 54, con: 59 },
    'krig6':    { dmg: 30, fir: 65, acc: 62, mob: 79, ran: 56, con: 56 },
    'bp50':     { dmg: 24, fir: 81, acc: 54, mob: 83, ran: 53, con: 50 },
    'kilo':     { dmg: 29, fir: 68, acc: 57, mob: 79, ran: 54, con: 55 },
    'xm4':      { dmg: 28, fir: 75, acc: 53, mob: 68, ran: 47, con: 50 },
    'asval':    { dmg: 28, fir: 80, acc: 44, mob: 83, ran: 50, con: 47 },
    'asm10':    { dmg: 34, fir: 54, acc: 72, mob: 68, ran: 48, con: 52 },
    'cr56':     { dmg: 25, fir: 70, acc: 50, mob: 76, ran: 51, con: 51 },
    'drh':      { dmg: 32, fir: 57, acc: 63, mob: 79, ran: 54, con: 57 },
    'hbra3':    { dmg: 26, fir: 69, acc: 55, mob: 77, ran: 52, con: 56 },
    'kn44':     { dmg: 29, fir: 62, acc: 55, mob: 80, ran: 51, con: 58 },
    'lk24':     { dmg: 28, fir: 63, acc: 61, mob: 78, ran: 54, con: 51 },
    'm4':       { dmg: 26, fir: 68, acc: 59, mob: 81, ran: 58, con: 54 },
    'm16':      { dmg: 30, fir: 82, acc: 81, mob: 83, ran: 62, con: 68 },
    'manowar':  { dmg: 37, fir: 50, acc: 69, mob: 69, ran: 56, con: 53 },
    'type25':   { dmg: 25, fir: 85, acc: 44, mob: 83, ran: 47, con: 46 },

    // --- PISTOALE MITRALIERE (SMG) ---
    'switchblade': { dmg: 27, fir: 84, acc: 48, mob: 107, ran: 42, con: 37 },
    'fennec':      { dmg: 23, fir: 111, acc: 29, mob: 108, ran: 41, con: 24 },
    'agr556':      { dmg: 27, fir: 75, acc: 37, mob: 98,  ran: 47, con: 47 },
    'cbr4':        { dmg: 24, fir: 80, acc: 43, mob: 94,  ran: 47, con: 42 },
    'mx9':         { dmg: 30, fir: 85, acc: 45, mob: 95, ran: 41, con: 40 },
    'pp19bizon':   { dmg: 30, fir: 65, acc: 62, mob: 102, ran: 52, con: 64 },
    'qq9':         { dmg: 28, fir: 83, acc: 40, mob: 102, ran: 42, con: 42 },
    'razorback':   { dmg: 33, fir: 62, acc: 60, mob: 94,  ran: 47, con: 57 },
    'rus79u':      { dmg: 28, fir: 76, acc: 51, mob: 98,  ran: 46, con: 50 },

    // --- MITRALIERE GRELE (LMG) ---
    'dingo':   { dmg: 30, fir: 72, acc: 54, mob: 53, ran: 49, con: 54 },
    'mg42':    { dmg: 22, fir: 103, acc: 40, mob: 49, ran: 54, con: 40 },
    'rpd':     { dmg: 31, fir: 65, acc: 61, mob: 52, ran: 60, con: 47 },
    'ul736':   { dmg: 25, fir: 61, acc: 58, mob: 66, ran: 70, con: 65 },

    // --- SHOTGUNS ---
    'hs0405':  { dmg: 420, fir: 27, acc: 45, mob: 74, ran: 37, con: 42 },
    'striker': { dmg: 190, fir: 38, acc: 49, mob: 73, ran: 34, con: 42 },
    'krm':     { dmg: 288, fir: 28, acc: 51, mob: 73, ran: 39, con: 42 },

    // --- SNIPERE & MARKSMAN ---
    'dlq33':    { dmg: 90, fir: 27, acc: 59, mob: 32, ran: 99, con: 32 },
    'locus':    { dmg: 95, fir: 28, acc: 59, mob: 35, ran: 95, con: 34 },
    'rytecamr': { dmg: 80, fir: 31, acc: 62, mob: 24, ran: 92, con: 32 },
    'xpr50':    { dmg: 80, fir: 37, acc: 73, mob: 51, ran: 90, con: 40 },
    'arctic50': { dmg: 85, fir: 31, acc: 59, mob: 33, ran: 95, con: 68 },
    '3linerifle': { dmg: 80, fir: 27, acc: 70, mob: 33, ran: 54, con: 32 },
    'sks':      { dmg: 60, fir: 43, acc: 82, mob: 46, ran: 62, con: 57 }
};

// ==================================================
// MOTOR AI INVIZIBIL DE PROFILARE ȘI ÎNVĂȚARE (LOCAL)
// ==================================================
const InvisibleAI = {
    brain: JSON.parse(localStorage.getItem('hub_ai_brain')) || {
        interactions: {}, 
        preferredMode: { mp: 0, br: 0 }, 
        searchHabits: {}, 
        lastActiveTime: Date.now()
    },

    trackActivity: function(type, detail) {
        if (type === 'weapon_click') {
            this.brain.interactions[detail] = (this.brain.interactions[detail] || 0) + 1;
        } 
        else if (type === 'mode_view') {
            if (detail === 'mp') this.brain.preferredMode.mp += 1;
            if (detail === 'br') this.brain.preferredMode.br += 1;
        }
        else if (type === 'category_click') {
            this.brain.searchHabits[detail] = (this.brain.searchHabits[detail] || 0) + 1;
        }
        
        this.saveBrain();
        this.adaptInterfacediscreetly();
    },

    saveBrain: function() {
        localStorage.setItem('hub_ai_brain', JSON.stringify(this.brain));
    },

    adaptInterfacediscreetly: function() {
        const isMpUser = this.brain.preferredMode.mp >= this.brain.preferredMode.br;
        const styleId = 'ai-discreet-styles';
        let aiStyle = document.getElementById(styleId);
        if (!aiStyle) {
            aiStyle = document.createElement('style');
            aiStyle.id = styleId;
            document.head.appendChild(aiStyle);
        }

        if (isMpUser && this.brain.preferredMode.mp > 3) {
            aiStyle.innerHTML = `
                .attachments-column-box:has(h4[style*="#0055ff"]) {
                    border-color: rgba(0, 85, 255, 0.25) !important;
                    box-shadow: 0 0 10px rgba(0, 85, 255, 0.05);
                }
            `;
        } else if (!isMpUser && this.brain.preferredMode.br > 3) {
            aiStyle.innerHTML = `
                .attachments-column-box:has(h4[style*="#ffb703"]) {
                    border-color: rgba(255, 183, 3, 0.25) !important;
                    box-shadow: 0 0 10px rgba(255, 183, 3, 0.05);
                }
            `;
        }
    }
};

// ========================================================================================
// ENGINE INDUSTRIAL DE OPTIMIZARE MULTI-ARMĂ (6 STATISTICI META - PRO-PLAYERS 2026)
// ========================================================================================
const GunsmithOptimizer = {
    database: {
        'ak117': {
            'recul': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: OWC Marksman", "Stock: RTC Steady Stock", "Underbarrel: Ranger Foregrip", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 12, mob: -10, ran: 5, con: 18 } },
            'ads': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 0, fir: 0, acc: -5, mob: 18, ran: 4, con: -8 } },
            'mobility': { attachments: ["Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Ammunition: 48 Round Extended Mag", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 0, fir: 0, acc: -10, mob: 22, ran: -4, con: -12 } },
            'range': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: OWC Marksman", "Laser: OWC Laser - Tactical", "Ammunition: 48 Round Extended Mag", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 8, mob: -12, ran: 15, con: 8 } },
            'hybrid': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 6, mob: 12, ran: -2, con: 8 } }
        },
        'type19': {
            'recul': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: Support Long Barrel", "Stock: Heavy Stock", "Underbarrel: Tactical Foregrip A", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 15, mob: -10, ran: 6, con: 16 } },
            'ads': { attachments: ["Muzzle: MIP Custom Suppressor", "Barrel: Light Short Barrel", "Stock: Agile Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 0, fir: 0, acc: -6, mob: 18, ran: -2, con: -6 } },
            'mobility': { attachments: ["Barrel: Light Short Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Ammunition: Fast Reload Mag", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 0, fir: 0, acc: -12, mob: 24, ran: -5, con: -10 } },
            'range': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: Support Long Barrel", "Laser: OWC Laser - Tactical", "Ammunition: 40 Round Extended Mag", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 10, mob: -12, ran: 18, con: 6 } },
            'hybrid': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: Light Short Barrel", "Stock: Agile Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 8, mob: 10, ran: 2, con: 10 } }
        },
        'm13': {
            'recul': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: RTC Heavy Long Barrel", "Stock: RTC Steady Stock", "Underbarrel: Operator Foregrip", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 12, mob: -12, ran: 8, con: 15 } },
            'ads': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: MIP Mini Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Ammunition: .300 RTC 30 Round Reload"], stats: { dmg: 3, fir: 0, acc: -6, mob: 16, ran: 5, con: -8 } },
            'mobility': { attachments: ["Barrel: MIP Mini Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Ammunition: Large Extended Mag B", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 0, fir: 0, acc: -10, mob: 20, ran: -4, con: -10 } },
            'range': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: RTC Heavy Long Barrel", "Laser: OWC Laser - Tactical", "Ammunition: .300 RTC 40 Round Reload", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 4, fir: 0, acc: 8, mob: -15, ran: 20, con: 6 } },
            'hybrid': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: MIP Mini Barrel", "Stock: No Stock", "Ammunition: .300 RTC 40 Round Reload", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 2, fir: 0, acc: 5, mob: 12, ran: 6, con: 8 } }
        },
        'ak47': {
            'recul': { attachments: ["Muzzle: OWC Light Compensator", "Barrel: OWC Ranger", "Stock: MIP Strike Stock", "Underbarrel: Ranger Foregrip", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 18, mob: -14, ran: 10, con: 20 } },
            'ads': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 0, fir: 0, acc: -6, mob: 16, ran: -4, con: -8 } },
            'mobility': { attachments: ["Stock: No Stock", "Laser: OWC Laser - Tactical", "Underbarrel: Strike Foregrip", "Ammunition: 5.45 Caliber Ammo", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 0, fir: 0, acc: -10, mob: 22, ran: -8, con: -12 } },
            'range': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: OWC Ranger", "Laser: OWC Laser - Tactical", "Ammunition: 5.45 Caliber Ammo", "Rear Grip: Granulated Grip Tape"], stats: { dmg: -4, fir: 12, acc: 10, mob: -8, ran: 12, con: 8 } },
            'hybrid': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 6, mob: 14, ran: -2, con: 8 } }
        },
        'grau': {
            'recul': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: FSS 20.8\" Nexus", "Stock: FSS Raider Stock", "Underbarrel: Commando Foregrip", "Rear Grip: Cronen Sniper Elite"], stats: { dmg: 0, fir: 0, acc: 12, mob: -8, ran: 10, con: 14 } },
            'ads': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: FSS 11.8\" Squall", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Rear Grip: XRK Void II"], stats: { dmg: 0, fir: 0, acc: -8, mob: 18, ran: -4, con: -8 } },
            'mobility': { attachments: ["Barrel: FSS 11.8\" Squall", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Ammunition: 50 Round Fast Mag", "Rear Grip: XRK Void II"], stats: { dmg: 0, fir: 0, acc: -12, mob: 22, ran: -6, con: -12 } },
            'range': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: Tempus 26.4\" Archangel", "Laser: OWC Laser - Tactical", "Ammunition: 50 Round Fast Mag", "Rear Grip: Cronen Sniper Elite"], stats: { dmg: 0, fir: 0, acc: 14, mob: -12, ran: 22, con: 10 } },
            'hybrid': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: FSS 20.8\" Nexus", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Cronen Sniper Elite"], stats: { dmg: 0, fir: 0, acc: 8, mob: 12, ran: 10, con: 8 } }
        },
        'krig6': {
            'recul': { attachments: ["Muzzle: Agency Suppressor", "Barrel: 4.4\" Take Down", "Stock: Field Agent Stock", "Underbarrel: Field Agent Foregrip", "Rear Grip: Firm Grip Tape"], stats: { dmg: 0, fir: 0, acc: 12, mob: -10, ran: 5, con: 15 } },
            'ads': { attachments: ["Muzzle: Flash Guard", "Barrel: 6.2\" Cavalry", "Stock: Raider Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Airborne Elastic Wrap"], stats: { dmg: 0, fir: 0, acc: -5, mob: 16, ran: -2, con: -6 } },
            'mobility': { attachments: ["Barrel: 6.2\" Cavalry", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Ammunition: Large Extended Mag B", "Rear Grip: Airborne Elastic Wrap"], stats: { dmg: 0, fir: 0, acc: -10, mob: 22, ran: -4, con: -10 } },
            'range': { attachments: ["Muzzle: Agency Suppressor", "Barrel: 6.2\" Cavalry", "Laser: OWC Laser - Tactical", "Ammunition: Large Extended Mag B", "Rear Grip: Firm Grip Tape"], stats: { dmg: 0, fir: 0, acc: 8, mob: -12, ran: 16, con: 8 } },
            'hybrid': { attachments: ["Muzzle: Agency Suppressor", "Barrel: Task Force Barrel", "Stock: Light Stock", "Laser: Aim Assist Laser", "Rear Grip: Firm Grip Tape"], stats: { dmg: 0, fir: 0, acc: 8, mob: 10, ran: 8, con: 10 } }
        },
        'bp50': {
            'recul': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: Leroy Custom Long", "Stock: Heavy Support Stock", "Underbarrel: Tactical Foregrip B", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 14, mob: -12, ran: 6, con: 16 } },
            'ads': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: MIP Rapid Light", "Stock: Leroy Custom Short", "Laser: OWC Laser - Tactical", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 0, fir: 0, acc: -6, mob: 20, ran: -2, con: -8 } },
            'mobility': { attachments: ["Barrel: MIP Rapid Light", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Ammunition: 45 Round Fast Mag", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 0, fir: 0, acc: -12, mob: 24, ran: -5, con: -12 } },
            'range': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: Leroy Custom Long", "Laser: OWC Laser - Tactical", "Ammunition: 45 Round Fast Mag", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 10, mob: -10, ran: 18, con: 8 } },
            'hybrid': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: Leroy Custom Long", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 7, mob: 14, ran: 8, con: 8 } }
        },
        'kilo': {
            'recul': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: OWC Marksman", "Stock: RTC Steady Stock", "Underbarrel: Ranger Foregrip", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 15, mob: -14, ran: 8, con: 18 } },
            'ads': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 0, fir: 0, acc: -6, mob: 16, ran: -4, con: -8 } },
            'mobility': { attachments: ["Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Ammunition: Large Extended Mag", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 0, fir: 0, acc: -12, mob: 22, ran: -6, con: -12 } },
            'range': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: OWC Marksman", "Laser: OWC Laser - Tactical", "Ammunition: 50 Round Extended Mag", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 10, mob: -14, ran: 20, con: 10 } },
            'hybrid': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 6, mob: 12, ran: -2, con: 8 } }
        },
        'xm4': {
            'recul': { attachments: ["Muzzle: OWC Light Compensator", "Barrel: Ranger Barrel", "Stock: RTC Steady Stock", "Underbarrel: Tactical Foregrip A", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 12, mob: -8, ran: 4, con: 14 } },
            'ads': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: MIP Light Barrel", "Stock: Raider Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 0, fir: 0, acc: -5, mob: 18, ran: -2, con: -6 } },
            'mobility': { attachments: ["Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Ammunition: Fast Extended Mag", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 0, fir: 0, acc: -10, mob: 22, ran: -5, con: -10 } },
            'range': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: Ranger Barrel", "Laser: OWC Laser - Tactical", "Ammunition: 45 Round Extended Mag", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 8, mob: -12, ran: 15, con: 8 } },
            'hybrid': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: Ranger Barrel", "Stock: Raider Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 8, mob: 10, ran: 6, con: 10 } }
        },
        'asval': {
            'recul': { attachments: ["Barrel: OWC 200mm Mid-Long", "Stock: YKM Combat Stock", "Underbarrel: Operator Foregrip", "Ammunition: 30 Round Large Extended Mag", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 14, mob: -10, ran: 8, con: 16 } },
            'ads': { attachments: ["Barrel: MIP Quick Barrel", "Stock: OWC Skeleton Stock", "Laser: OWC Laser - Tactical", "Ammunition: 30 Round Large Extended Mag", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 0, fir: 0, acc: -8, mob: 18, ran: -4, con: -8 } },
            'mobility': { attachments: ["Barrel: MIP Quick Barrel", "Stock: OWC Skeleton Stock", "Laser: MIP Laser 5mW", "Ammunition: 30 Round Large Extended Mag", "Perk: Sleight of Hand"], stats: { dmg: 0, fir: 0, acc: -12, mob: 22, ran: -6, con: -12 } },
            'range': { attachments: ["Barrel: OWC 200mm Mid-Long", "Laser: OWC Laser - Tactical", "Ammunition: 15 Round FMJ Large Mag", "Rear Grip: Granulated Grip Tape", "Optic: Classic Red Dot Sight"], stats: { dmg: 18, fir: -35, acc: 15, mob: -12, ran: 24, con: 12 } },
            'hybrid': { attachments: ["Barrel: OWC 200mm Mid-Long", "Stock: OWC Skeleton Stock", "Laser: OWC Laser - Tactical", "Ammunition: 30 Round Large Extended Mag", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 8, mob: 12, ran: 6, con: 10 } }
        },
        'asm10': {
            'recul': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: OWC Marksman", "Stock: RTC Steady Stock", "Underbarrel: Ranger Foregrip", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 16, mob: -14, ran: 8, con: 18 } },
            'ads': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 0, fir: 0, acc: -8, mob: 16, ran: -3, con: -8 } },
            'mobility': { attachments: ["Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Underbarrel: Branson Signature Barrel", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 4, fir: 0, acc: -10, mob: 20, ran: -5, con: -10 } },
            'range': { attachments: ["Muzzle: Monolithic Suppressor", "Underbarrel: Branson Signature Barrel", "Laser: OWC Laser - Tactical", "Ammunition: 40 Round Extended Mag", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 4, fir: 0, acc: 10, mob: -12, ran: 18, con: 10 } },
            'hybrid': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 8, mob: 10, ran: -2, con: 10 } }
        },
        'cr56': {
            'recul': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: Custom Long Barrel", "Stock: RTC Steady Stock", "Underbarrel: Operator Foregrip", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 14, mob: -10, ran: 6, con: 15 } },
            'ads': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: MIP Custom Short", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 0, fir: 0, acc: -6, mob: 18, ran: -3, con: -6 } },
            'mobility': { attachments: ["Barrel: MIP Custom Short", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Ammunition: Extended Mag A", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 0, fir: 0, acc: -10, mob: 22, ran: -5, con: -10 } },
            'range': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: Custom Long Barrel", "Laser: OWC Laser - Tactical", "Ammunition: M67 Ammo", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 25, fir: -40, acc: 18, mob: -8, ran: 22, con: 12 } },
            'hybrid': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: Custom Long Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 8, mob: 12, ran: 8, con: 10 } }
        },
        'drh': {
            'recul': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: OWC Marksman", "Stock: MIP Strike Stock", "Underbarrel: Tactical Foregrip A", "Ammunition: 25 Round OTM Mag"], stats: { dmg: 8, fir: 0, acc: 12, mob: -10, ran: 5, con: 14 } },
            'ads': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Ammunition: 25 Round OTM Mag"], stats: { dmg: 8, fir: 0, acc: -6, mob: 18, ran: -2, con: -6 } },
            'mobility': { attachments: ["Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Ammunition: 25 Round OTM Mag", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 8, fir: 0, acc: -12, mob: 22, ran: -5, con: -10 } },
            'range': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: OWC Marksman", "Stock: MIP Strike Stock", "Ammunition: 30 Round OTM Mag", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 10, fir: 0, acc: 10, mob: -14, ran: 18, con: 12 } },
            'hybrid': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: OWC Ranger", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Ammunition: 25 Round OTM Mag"], stats: { dmg: 8, fir: 0, acc: 6, mob: 10, ran: 8, con: 8 } }
        },
        'hbra3': {
            'recul': { attachments: ["Muzzle: OWC Light Compensator", "Barrel: OWC Ranger", "Stock: RTC Steady Stock", "Underbarrel: Tactical Foregrip A", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 15, mob: -10, ran: 5, con: 16 } },
            'ads': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 0, fir: 0, acc: -5, mob: 16, ran: -2, con: -6 } },
            'mobility': { attachments: ["Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Ammunition: Extended Mag A", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 0, fir: 0, acc: -10, mob: 20, ran: -4, con: -10 } },
            'range': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: OWC Ranger", "Laser: OWC Laser - Tactical", "Ammunition: Extended Mag A", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 10, mob: -12, ran: 16, con: 10 } },
            'hybrid': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 8, mob: 12, ran: -2, con: 10 } }
        },
        'kn44': {
            'recul': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: OWC Ranger", "Stock: RTC Steady Stock", "Underbarrel: Strike Foregrip", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 12, mob: -8, ran: 6, con: 14 } },
            'ads': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: -5, mob: 16, ran: -2, con: -6 } },
            'mobility': { attachments: ["Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Ammunition: 38 Round Fast Mag", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 0, fir: 0, acc: -10, mob: 22, ran: -4, con: -10 } },
            'range': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: OWC Ranger", "Laser: OWC Laser - Tactical", "Ammunition: 44 Round Extended Mag", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 10, mob: -12, ran: 18, con: 10 } },
            'hybrid': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 8, mob: 12, ran: -2, con: 10 } }
        },
        'lk24': {
            'recul': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: OWC Ranger", "Stock: MIP Strike Stock", "Underbarrel: Tactical Foregrip A", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 16, mob: -10, ran: 8, con: 18 } },
            'ads': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Optic: Classic Red Dot Sight"], stats: { dmg: 0, fir: 0, acc: -6, mob: 14, ran: -2, con: -6 } },
            'mobility': { attachments: ["Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Ammunition: 40 Round Extended Mag", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 0, fir: 0, acc: -12, mob: 20, ran: -4, con: -10 } },
            'range': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: OWC Ranger", "Laser: OWC Laser - Tactical", "Ammunition: 50 Round Extended Mag", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 12, mob: -14, ran: 20, con: 12 } },
            'hybrid': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 8, mob: 10, ran: -2, con: 10 } }
        },
        'm4': {
            'recul': { attachments: ["Muzzle: OWC Light Compensator", "Barrel: OWC Marksman", "Stock: RTC Steady Stock", "Underbarrel: Tactical Foregrip A", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 14, mob: -10, ran: 6, con: 15 } },
            'ads': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 0, fir: 0, acc: -5, mob: 18, ran: -2, con: -6 } },
            'mobility': { attachments: ["Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Ammunition: 40 Round Extended Mag", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 0, fir: 0, acc: -10, mob: 22, ran: -4, con: -10 } },
            'range': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: OWC Marksman", "Laser: OWC Laser - Tactical", "Ammunition: 50 Round Extended Mag", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 10, mob: -14, ran: 18, con: 10 } },
            'hybrid': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 6, mob: 14, ran: -2, con: 8 } }
        },
        'm16': {
            'recul': { attachments: ["Muzzle: OWC Light Compensator", "Barrel: OWC Marksman", "Stock: RTC Steady Stock", "Rear Grip: Granulated Grip Tape", "Optic: Classic Red Dot Sight"], stats: { dmg: 0, fir: 0, acc: 16, mob: -12, ran: 8, con: 18 } },
            'ads': { attachments: ["Perk: Wild Fire", "Muzzle: Tactical Suppressor", "Stock: YKM Combat Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 4, fir: 15, acc: -8, mob: 12, ran: -3, con: -8 } },
            'mobility': { attachments: ["Perk: Wild Fire", "Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 4, fir: 15, acc: -14, mob: 20, ran: -5, con: -12 } },
            'range': { attachments: ["Perk: Wild Fire", "Muzzle: Monolithic Suppressor", "Barrel: OWC Marksman", "Laser: OWC Laser - Tactical", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 6, fir: 15, acc: 10, mob: -14, ran: 18, con: 8 } },
            'hybrid': { attachments: ["Perk: Wild Fire", "Muzzle: Tactical Suppressor", "Barrel: MIP Light Barrel", "Stock: No Stock", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 4, fir: 15, acc: 4, mob: 12, ran: -2, con: 8 } }
        },
        'manowar': {
            'recul': { attachments: ["Muzzle: OWC Light Compensator", "Barrel: OWC Ranger", "Stock: RTC Steady Stock", "Underbarrel: Ranger Foregrip", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 18, mob: -16, ran: 10, con: 20 } },
            'ads': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: MIP Light Short", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 0, fir: 0, acc: -8, mob: 16, ran: -4, con: -10 } },
            'mobility': { attachments: ["Underbarrel: Thermite Reload", "Barrel: MIP Light Short", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 12, fir: -15, acc: -12, mob: 20, ran: 6, con: -12 } },
            'range': { attachments: ["Underbarrel: Thermite Reload", "Muzzle: Monolithic Suppressor", "Barrel: OWC Ranger", "Laser: OWC Laser - Tactical", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 18, fir: -15, acc: 12, mob: -18, ran: 22, con: 12 } },
            'hybrid': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: MIP Light Short", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 6, mob: 12, ran: -4, con: 8 } }
        },
        'type25': {
            'recul': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: OWC Ranger", "Stock: RTC Steady Stock", "Underbarrel: Operator Foregrip", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 14, mob: -12, ran: 6, con: 16 } },
            'ads': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Ammunition: Stopping Power Reload"], stats: { dmg: 6, fir: 0, acc: -8, mob: 14, ran: 5, con: -10 } },
            'mobility': { attachments: ["Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Ammunition: 46 Round Extended Mag", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 0, fir: 0, acc: -12, mob: 22, ran: -4, con: -12 } },
            'range': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: OWC Ranger", "Laser: OWC Laser - Tactical", "Ammunition: Stopping Power Reload", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 8, fir: 0, acc: 10, mob: -14, ran: 16, con: 10 } },
            'hybrid': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: MIP Light Barrel", "Stock: No Stock", "Ammunition: Stopping Power Reload", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 6, fir: 0, acc: 8, mob: 10, ran: 4, con: 8 } }
        },
        'switchblade': {
            'recul': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: OWC Ranger", "Underbarrel: Tactical Foregrip A", "Ammunition: Extended Mag A", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 10, mob: -5, ran: 4, con: 12 } },
            'ads': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: -4, mob: 18, ran: 2, con: -5 } },
            'mobility': { attachments: ["Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Ammunition: Extended Mag A", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 0, fir: 0, acc: -10, mob: 24, ran: -3, con: -10 } },
            'range': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: OWC Ranger", "Laser: OWC Laser - Tactical", "Ammunition: Extended Mag A", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 8, mob: -8, ran: 12, con: 6 } },
            'hybrid': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 5, mob: 12, ran: 4, con: 5 } }
        },
        'fennec': {
            'recul': { attachments: ["Muzzle: RTC Light Muzzle Brake", "Barrel: OWC Marksman", "Stock: RTC Steady Stock", "Underbarrel: Operator Foregrip", "Ammunition: Extended Mag A"], stats: { dmg: 0, fir: 0, acc: 15, mob: -10, ran: 5, con: 18 } },
            'ads': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Ammunition: Extended Mag A"], stats: { dmg: 0, fir: 0, acc: -6, mob: 20, ran: 2, con: -6 } },
            'mobility': { attachments: ["Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Ammunition: Extended Mag A", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 0, fir: 0, acc: -12, mob: 26, ran: -4, con: -12 } },
            'range': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: OWC Marksman", "Laser: OWC Laser - Tactical", "Ammunition: Extended Mag A", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 10, mob: -12, ran: 15, con: 10 } },
            'hybrid': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Ammunition: Extended Mag A"], stats: { dmg: 0, fir: 0, acc: 4, mob: 12, ran: 4, con: 5 } }
        },
        'agr556': {
            'recul': { attachments: ["Muzzle: Tactical Suppressor", "Stock: RTC Steady Stock", "Underbarrel: Tactical Foregrip A", "Ammunition: 30 Round 5.56 Reload", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 12, mob: -6, ran: 4, con: 14 } },
            'ads': { attachments: ["Muzzle: Monolithic Suppressor", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Ammunition: 60 Round 5.56 Reload", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 6, fir: -5, acc: -6, mob: 12, ran: 5, con: -6 } },
            'mobility': { attachments: ["Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Ammunition: 30 Round 5.56 Reload", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 0, fir: 0, acc: -10, mob: 24, ran: -3, con: -10 } },
            'range': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: OWC Marksman", "Laser: OWC Laser - Tactical", "Ammunition: 30 Round 5.56 Reload", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 10, fir: -5, acc: 10, mob: -8, ran: 16, con: 8 } },
            'hybrid': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: MIP Light Barrel", "Stock: No Stock", "Ammunition: 60 Round 5.56 Reload", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 6, fir: -5, acc: 5, mob: 10, ran: 6, con: 6 } }
        },
        'cbr4': {
            'recul': { attachments: ["Muzzle: Tactical Suppressor", "Stock: RTC Steady Stock", "Underbarrel: Tactical Foregrip A", "Ammunition: Large Extended Mag", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 12, mob: -8, ran: 4, con: 14 } },
            'ads': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: MIP Light Barrel", "Stock: YKM Light Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: -4, mob: 18, ran: 2, con: -5 } },
            'mobility': { attachments: ["Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Ammunition: Fast Extended Mag", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 0, fir: 0, acc: -10, mob: 24, ran: -3, con: -10 } },
            'range': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: OWC Marksman", "Laser: OWC Laser - Tactical", "Stock: YKM Light Stock", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 8, mob: -10, ran: 14, con: 8 } },
            'hybrid': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: MIP Light Barrel", "Stock: YKM Light Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 6, mob: 12, ran: 0, con: 8 } }
        },
        'mx9': {
            'recul': { attachments: ["Muzzle: Tactical Suppressor", "Stock: RTC Steady Stock", "Underbarrel: Tactical Foregrip A", "Ammunition: Hybrid Mag", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 10, mob: -6, ran: 3, con: 12 } },
            'ads': { attachments: ["Barrel: MIP Extended Light Barrel", "Stock: Agile Stock", "Laser: OWC Laser - Tactical", "Ammunition: Hybrid Mag", "Rear Grip: Rustle Grip Tape"], stats: { dmg: 0, fir: 0, acc: -4, mob: 20, ran: 2, con: -5 } },
            'mobility': { attachments: ["Barrel: MIP Extended Light Barrel", "Stock: Agile Stock", "Laser: OWC Laser - Tactical", "Ammunition: Fast Reload Mag", "Rear Grip: Rustle Grip Tape"], stats: { dmg: 0, fir: 0, acc: -10, mob: 24, ran: -4, con: -10 } },
            'range': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: MIP Extended Light Barrel", "Laser: OWC Laser - Tactical", "Ammunition: Hybrid Mag", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 6, mob: -8, ran: 12, con: 6 } },
            'hybrid': { attachments: ["Barrel: MIP Extended Light Barrel", "Stock: Agile Stock", "Laser: OWC Laser - Tactical", "Ammunition: Hybrid Mag", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, mob: 12, acc: 4, ran: 4, con: 6 } }
        },
        'pp19bizon': {
            'recul': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: OWC Ranger", "Stock: RTC Steady Stock", "Underbarrel: Operator Foregrip", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 12, mob: -8, ran: 5, con: 14 } },
            'ads': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: -4, mob: 16, ran: 2, con: -5 } },
            'mobility': { attachments: ["Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Stippled Grip Tape", "Perk: Sleight of Hand"], stats: { dmg: 0, fir: 0, acc: -8, mob: 22, ran: -3, con: -8 } },
            'range': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: OWC Marksman", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 8, mob: -6, ran: 14, con: 10 } },
            'hybrid': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 4, mob: 12, ran: 4, con: 6 } }
        },
        'qq9': {
            'recul': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: RTC Recon Tactical", "Underbarrel: Operator Foregrip", "Ammunition: 45 Round Extended Mag", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 10, mob: -5, ran: 4, con: 12 } },
            'ads': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 0, fir: 0, acc: -4, mob: 20, ran: 2, con: -6 } },
            'mobility': { attachments: ["Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: MIP Laser 5mW", "Ammunition: 45 Round Extended Mag", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 0, fir: 0, acc: -10, mob: 26, ran: -4, con: -12 } },
            'range': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: RTC Recon Tactical", "Stock: No Stock", "Ammunition: 10mm 30 Round Reload", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 12, fir: -5, acc: 6, mob: -4, ran: 12, con: 6 } },
            'hybrid': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: RTC Recon Tactical", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Ammunition: 45 Round Extended Mag"], stats: { dmg: 0, fir: 0, acc: 5, mob: 12, ran: 2, con: 6 } }
        },
        'razorback': {
            'recul': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: OWC Ranger", "Stock: RTC Steady Stock", "Underbarrel: Operator Foregrip", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 12, mob: -8, ran: 5, con: 14 } },
            'ads': { attachments: ["Muzzle: Monolithic Suppressor", "Stock: YKM Light Stock", "Laser: OWC Laser - Tactical", "Perk: Rapid Fire", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 6, fir: 10, acc: -4, mob: 12, ran: 2, con: -5 } },
            'mobility': { attachments: ["Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Perk: Rapid Fire", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 4, fir: 10, acc: -10, mob: 20, ran: -3, con: -10 } },
            'range': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: OWC Marksman", "Perk: Rapid Fire", "Stock: YKM Light Stock", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 8, fir: 10, acc: 10, mob: -8, ran: 15, con: 8 } },
            'hybrid': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: MIP Light Barrel", "Laser: OWC Laser - Tactical", "Perk: Rapid Fire", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 4, fir: 10, acc: 6, mob: 8, ran: 0, con: 8 } }
        },
        'rus79u': {
            'recul': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: OWC Ranger", "Stock: RTC Steady Stock", "Underbarrel: Operator Foregrip", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 12, mob: -6, ran: 4, con: 12 } },
            'ads': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Ammunition: 38 Round Fast Mag"], stats: { dmg: 0, fir: 0, acc: -4, mob: 18, ran: 2, con: -5 } },
            'mobility': { attachments: ["Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: MIP Laser 5mW", "Ammunition: 38 Round Fast Mag", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 0, fir: 0, acc: -10, mob: 24, ran: -3, con: -10 } },
            'range': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: OWC Ranger", "Laser: OWC Laser - Tactical", "Ammunition: 38 Round Fast Mag", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 8, mob: -8, ran: 12, con: 8 } },
            'hybrid': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 6, mob: 12, ran: -2, con: 8 } }
        },
        'dingo': {
            'recul': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: Steel Rain Long", "Stock: Steady Stock", "Underbarrel: Ranger Foregrip", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 14, mob: -10, ran: 5, con: 15 } },
            'ads': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: Steel Rain Long", "Stock: Agile Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Steel Rain Grip"], stats: { dmg: 0, fir: 0, acc: -4, mob: 14, ran: 2, con: -5 } },
            'mobility': { attachments: ["Barrel: Lightweight Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Stippled Grip Tape", "Perk: Sleight of Hand"], stats: { dmg: 0, fir: 0, acc: -10, mob: 20, ran: -4, con: -10 } },
            'range': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: Steel Rain Long", "Laser: OWC Laser - Tactical", "Ammunition: Extended Mag", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 10, mob: -12, ran: 16, con: 8 } },
            'hybrid': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: Lightweight Barrel", "Stock: Agile Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 6, mob: 10, ran: -2, con: 8 } }
        },
        'mg42': {
            'recul': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: OWC Marksman", "Stock: RTC Steady Stock", "Underbarrel: Ranger Foregrip", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 18, mob: -14, ran: 8, con: 20 } },
            'ads': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: MIP Light Barrel", "Stock: Combat Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 0, fir: 0, acc: -6, mob: 14, ran: -2, con: -8 } },
            'mobility': { attachments: ["Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: MIP Laser 5mW", "Ammunition: Fast Drum Mag", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 0, fir: 0, acc: -12, mob: 20, ran: -5, con: -12 } },
            'range': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: OWC Marksman", "Laser: OWC Laser - Tactical", "Ammunition: 150 Round Drum", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 12, mob: -16, ran: 18, con: 10 } },
            'hybrid': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: MIP Light Barrel", "Stock: Combat Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 6, mob: 8, ran: -2, con: 8 } }
        },
        'rpd': {
            'recul': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: Cooling Compressor Barrel", "Stock: RTC Steady Stock", "Underbarrel: Tactical Foregrip A", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 15, mob: -12, ran: 6, con: 16 } },
            'ads': { attachments: ["Barrel: Cooling Compressor Barrel", "Stock: YKM Combat Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Stippled Grip Tape", "Optic: Classic Red Dot Sight"], stats: { dmg: 0, fir: 0, acc: -5, mob: 14, ran: 2, con: -6 } },
            'mobility': { attachments: ["Barrel: Cooling Compressor Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Stippled Grip Tape", "Perk: Sleight of Hand"], stats: { dmg: 0, fir: 0, acc: -10, mob: 24, ran: -4, con: -12 } },
            'range': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: Cooling Compressor Barrel", "Laser: OWC Laser - Tactical", "Rear Grip: Granulated Grip Tape", "Perk: FMJ"], stats: { dmg: 0, fir: 0, acc: 10, mob: -14, ran: 18, con: 8 } },
            'hybrid': { attachments: ["Barrel: Cooling Compressor Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Granulated Grip Tape", "Optic: Classic Red Dot Sight"], stats: { dmg: 0, fir: 0, acc: 8, mob: 12, ran: 2, con: 10 } }
        },
        'ul736': {
            'recul': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: OWC Marksman", "Stock: RTC Steady Stock", "Underbarrel: Ranger Foregrip", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 16, mob: -14, ran: 8, con: 18 } },
            'ads': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: MIP Light Barrel", "Stock: Combat Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 0, fir: 0, acc: -5, mob: 12, ran: -2, con: -6 } },
            'mobility': { attachments: ["Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Ammunition: 50 Round Reload", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 0, fir: 0, acc: -10, mob: 18, ran: -4, con: -10 } },
            'range': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: OWC Marksman", "Laser: OWC Laser - Tactical", "Ammunition: 60 Round Reload", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 12, mob: -12, ran: 20, con: 10 } },
            'hybrid': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 8, mob: 10, ran: -2, con: 10 } }
        },
        'hs0405': {
            'recul': { attachments: ["Muzzle: Marauder Suppressor", "Barrel: RTC Extended Barrel", "Stock: RTC Steady Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 12, mob: -8, ran: 4, con: 12 } },
            'ads': { attachments: ["Muzzle: Choke", "Barrel: Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Perk: Sleight of Hand"], stats: { dmg: 5, fir: 0, acc: -8, mob: 20, ran: -2, con: -10 } },
            'mobility': { attachments: ["Muzzle: Choke", "Barrel: RTC Extended Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 10, fir: 0, acc: -10, mob: 22, ran: -4, con: -12 } },
            'range': { attachments: ["Muzzle: Marauder Suppressor", "Barrel: RTC Extended Barrel", "Laser: OWC Laser - Tactical", "Ammunition: 500gr Slug Reload", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 15, fir: 0, acc: 8, mob: -10, ran: 15, con: 6 } },
            'hybrid': { attachments: ["Muzzle: Marauder Suppressor", "Barrel: Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 8, fir: 0, acc: 4, mob: 14, ran: 6, con: 4 } }
        },
        'striker': {
            'recul': { attachments: ["Muzzle: RTC Light Muzzle Brake", "Barrel: OWC Ranger", "Stock: RTC Steady Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 10, mob: -6, ran: 3, con: 10 } },
            'ads': { attachments: ["Muzzle: Choke", "Barrel: Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Perk: Sleight of Hand"], stats: { dmg: 5, fir: 0, acc: -10, mob: 22, ran: -3, con: -12 } },
            'mobility': { attachments: ["Barrel: Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Ammunition: 16 Round Reload", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 0, fir: 0, acc: -14, mob: 26, ran: -5, con: -15 } },
            'range': { attachments: ["Muzzle: Marauder Suppressor", "Barrel: OWC Ranger", "Laser: OWC Laser - Tactical", "Ammunition: 12 Round Slug Reload", "Perk: Sleight of Hand"], stats: { dmg: 18, fir: 0, acc: 6, mob: -10, ran: 16, con: 6 } },
            'hybrid': { attachments: ["Muzzle: Marauder Suppressor", "Barrel: Light Barrel", "Laser: OWC Laser - Tactical", "Ammunition: 16 Round Reload", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 10, fir: 0, acc: 4, mob: 12, ran: 8, con: 4 } }
        },
        'krm': { 
            'recul': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: Extended Barrel", "Stock: RTC Steady Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, fir: 0, acc: 10, mob: -6, ran: 3, con: 10 } },
            'ads': { attachments: ["Muzzle: Choke", "Barrel: Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Perk: Sleight of Hand"], stats: { dmg: 5, fir: 0, acc: -10, mob: 22, ran: -3, con: -12 } },
            'mobility': { attachments: ["Muzzle: Marauder Suppressor", "Barrel: Extended Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 8, fir: 0, acc: -12, mob: 24, ran: -4, con: -14 } },
            'range': { attachments: ["Muzzle: Marauder Suppressor", "Barrel: Extended Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 12, fir: 0, acc: 6, mob: 20, ran: 14, con: -6 } },
            'hybrid': { attachments: ["Muzzle: Marauder Suppressor", "Barrel: Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 10, fir: 0, acc: 5, mob: 15, ran: 8, con: -2 } }
        },
        'dlq33': {
            'recul': { attachments: ["Muzzle: RTC Compensator", "Stock: RTC Steady Stock", "Underbarrel: Bipod", "Rear Grip: Rubberized Grip Tape", "Perk: Hold Breath"], stats: { dmg: 0, mob: -10, acc: 14, ran: 0, con: 15 } },
            'ads': { attachments: ["Barrel: MIP Light Barrel", "Stock: YKM Combat Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Granulated Grip Tape", "Perk: FMJ"], stats: { dmg: 0, mob: 18, acc: -4, ran: 0, con: -6 } },
            'mobility': { attachments: ["Barrel: MIP Light Barrel", "Stock: YKM Combat Stock", "Laser: OWC Laser - Tactical", "Ammunition: Extended Mag A", "Perk: Fast Switch"], stats: { dmg: 0, mob: 22, acc: -8, ran: -4, con: -10 } },
            'range': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: OWC Memorial Cowboy", "Ammunition: Extended Mag A", "Rear Grip: Granulated Grip Tape", "Perk: FMJ"], stats: { dmg: 5, mob: -14, acc: 10, ran: 15, con: 8 } },
            'hybrid': { attachments: ["Barrel: MIP Light Barrel", "Stock: YKM Combat Stock", "Laser: OWC Laser - Tactical", "Perk: Sleight of Hand", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 0, mob: 15, acc: -5, ran: 0, con: -5 } }
        },
        'locus': {
            'recul': { attachments: ["Muzzle: RTC Compensator", "Stock: RTC Steady Stock", "Underbarrel: Bipod", "Rear Grip: Rubberized Grip Tape", "Perk: Hold Breath"], stats: { dmg: 0, mob: -8, acc: 12, ran: 0, con: 14 } },
            'ads': { attachments: ["Barrel: YKM Lightweight Short", "Stock: OWC Skeleton Stock", "Ammunition: OWC Stopping Power Reload", "Laser: OWC Laser - Tactical", "Perk: Sleight of Hand"], stats: { dmg: 10, mob: 16, acc: -6, ran: 5, con: -8 } },
            'mobility': { attachments: ["Barrel: YKM Lightweight Short", "Stock: OWC Skeleton Stock", "Ammunition: OWC Stopping Power Reload", "Rear Grip: Stippled Grip Tape", "Perk: FMJ"], stats: { dmg: 10, mob: 20, acc: -10, ran: 4, con: -12 } },
            'range': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: OWC Marksman", "Stock: YKM Combat Stock", "Ammunition: OWC Stopping Power Reload", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 15, mob: -15, acc: 8, ran: 18, con: 10 } },
            'hybrid': { attachments: ["Barrel: YKM Lightweight Short", "Stock: OWC Skeleton Stock", "Ammunition: OWC Stopping Power Reload", "Laser: OWC Laser - Tactical", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 10, mob: 18, acc: -8, ran: 5, con: -6 } }
        },
        'rytecamr': {
            'recul': { attachments: ["Muzzle: RTC Compensator", "Barrel: RTC Heavy Barrel", "Stock: RTC Steady Stock", "Underbarrel: Bipod", "Rear Grip: Rubberized Grip Tape"], stats: { dmg: 0, mob: -12, acc: 14, ran: 0, con: 16 } },
            'ads': { attachments: ["Barrel: MIP Light Barrel", "Stock: OWC Skeleton Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Stippled Grip Tape", "Perk: Sleight of Hand"], stats: { dmg: 0, mob: 16, acc: -6, ran: 0, con: -8 } },
            'mobility': { attachments: ["Barrel: MIP Light Barrel", "Stock: OWC Skeleton Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Stippled Grip Tape", "Perk: Fast Switch"], stats: { dmg: 0, mob: 20, acc: -10, ran: -4, con: -12 } },
            'range': { attachments: ["Muzzle: RTC Compensator", "Barrel: RTC Heavy Barrel", "Ammunition: 25X59mm Explosive Mag", "Stock: RTC Steady Stock", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 22, mob: -18, acc: 10, ran: 18, con: 10 } },
            'hybrid': { attachments: ["Barrel: MIP Light Barrel", "Stock: OWC Skeleton Stock", "Ammunition: 25X59mm Explosive Mag", "Laser: OWC Laser - Tactical", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 15, mob: 12, acc: -5, ran: 8, con: -5 } }
        },
        'xpr50': {
            'recul': { attachments: ["Muzzle: RTC Compensator", "Stock: RTC Steady Stock", "Underbarrel: Bipod", "Rear Grip: Rubberized Grip Tape", "Perk: Hold Breath"], stats: { dmg: 0, mob: -6, acc: 12, ran: 0, con: 14 } },
            'ads': { attachments: ["Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Ammunition: OWC Stopping Power Reload", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 12, mob: 20, acc: -6, ran: 2, con: -8 } },
            'mobility': { attachments: ["Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Stippled Grip Tape", "Perk: Fast Switch"], stats: { dmg: 8, mob: 24, acc: -10, ran: -2, con: -12 } },
            'range': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: RTC Long Barrel", "Ammunition: OWC Stopping Power Reload", "Stock: RTC Steady Stock", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 16, mob: -12, acc: 10, ran: 16, con: 12 } },
            'hybrid': { attachments: ["Barrel: MIP Light Barrel", "Stock: No Stock", "Ammunition: OWC Stopping Power Reload", "Laser: OWC Laser - Tactical", "Perk: Sleight of Hand"], stats: { dmg: 12, mob: 18, acc: -4, ran: 2, con: -5 } }
        },
        'arctic50': {
            'recul': { attachments: ["Muzzle: RTC Compensator", "Barrel: Anti-Material Heavy", "Stock: RTC Steady Stock", "Underbarrel: Bipod", "Rear Grip: Rubberized Grip Tape"], stats: { dmg: 0, mob: -14, acc: 18, ran: 0, con: 20 } },
            'ads': { attachments: ["Barrel: MIP Custom Assassin Short", "Stock: YKM Combat Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Stippled Grip Tape", "Perk: Sleight of Hand"], stats: { dmg: 0, mob: 18, acc: -4, ran: 0, con: -6 } },
            'mobility': { attachments: ["Barrel: MIP Custom Assassin Short", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Stippled Grip Tape", "Perk: Fast Switch"], stats: { dmg: 0, mob: 22, acc: -8, ran: -3, con: -10 } },
            'range': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: Anti-Material Heavy", "Ammunition: Stopping Power Reload", "Rear Grip: Granulated Grip Tape", "Perk: FMJ"], stats: { dmg: 12, mob: -16, acc: 10, ran: 15, con: 12 } },
            'hybrid': { attachments: ["Barrel: MIP Custom Assassin Short", "Stock: YKM Combat Stock", "Laser: OWC Laser - Tactical", "Ammunition: Stopping Power Reload", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 8, mob: 14, acc: -5, ran: 8, con: -5 } }
        },
        '3linerifle': {
            'recul': { attachments: ["Muzzle: RTC Light Muzzle Brake", "Stock: Steady Stock", "Underbarrel: Bipod", "Ammunition: 20 Round Belt", "Rear Grip: Rubberized Grip Tape"], stats: { dmg: 0, mob: -12, acc: 16, ran: 0, con: 18 } },
            'ads': { attachments: ["Barrel: Light Barrel", "Stock: YKM Combat Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Stippled Grip Tape", "Perk: Sleight of Hand"], stats: { dmg: 0, mob: 16, acc: -4, ran: 0, con: -6 } },
            'mobility': { attachments: ["Barrel: Light Barrel", "Stock: Lightweight Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Stippled Grip Tape", "Perk: Fast Switch"], stats: { dmg: 0, mob: 20, acc: -8, ran: -3, con: -10 } },
            'range': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: Heavy Barrel", "Ammunition: 20 Round Belt", "Rear Grip: Granulated Grip Tape", "Perk: FMJ"], stats: { dmg: 6, mob: -14, acc: 10, ran: 14, con: 12 } },
            'hybrid': { attachments: ["Barrel: Light Barrel", "Stock: YKM Combat Stock", "Laser: OWC Laser - Tactical", "Perk: FMJ", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 0, mob: 14, acc: -2, ran: 0, con: -4 } }
        },
        'sks': {
            'recul': { attachments: ["Muzzle: OWC Light Compensator", "Stock: Custom Steady Stock", "Underbarrel: Tactical Foregrip A", "Rear Grip: Granulated Grip Tape", "Perk: Toughness"], stats: { dmg: 0, mob: -8, acc: 14, ran: 0, con: 16 } },
            'ads': { attachments: ["Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Stippled Grip Tape", "Perk: Sleight of Hand"], stats: { dmg: 0, mob: 16, acc: -4, ran: 0, con: -6 } },
            'mobility': { attachments: ["Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Ammunition: 30 Round Extended Mag", "Rear Grip: Stippled Grip Tape"], stats: { dmg: 0, mob: 20, acc: -10, ran: -4, con: -10 } },
            'range': { attachments: ["Muzzle: Monolithic Suppressor", "Barrel: Custom Long Barrel", "Laser: OWC Laser - Tactical", "Ammunition: 30 Round Extended Mag", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 6, mob: -14, acc: 10, ran: 15, con: 12 } },
            'hybrid': { attachments: ["Muzzle: Tactical Suppressor", "Barrel: MIP Light Barrel", "Stock: No Stock", "Laser: OWC Laser - Tactical", "Rear Grip: Granulated Grip Tape"], stats: { dmg: 0, mob: 12, acc: 5, ran: -2, con: 6 } }
        }
    },

    generateBuild: function(weaponId, weaponType, priority) {
        if (this.database[weaponId] && this.database[weaponId][priority]) {
            return this.database[weaponId][priority];
        }
        return null;
    }
};

// --- FUNCȚIA DE DESCHIDERE MODAL DETALII ARMĂ DIN CARD ---
function toggleAttachments(cardElement) {
    if (!cardElement) return;

    const idAttr = cardElement.getAttribute('data-id') || '';
    const cleanId = idAttr.toLowerCase().trim();
    const type = cardElement.getAttribute('data-type');
    
    if (typeof InvisibleAI !== 'undefined') {
        InvisibleAI.trackActivity('weapon_click', idAttr);
    }

    let finalDmg = 30, finalFir = 50, finalAcc = 50, finalMob = 60, finalRan = 50, finalCon = 50;

    if (CODM_OFFICIAL_SPECS[cleanId]) {
        finalDmg = CODM_OFFICIAL_SPECS[cleanId].dmg;
        finalFir = CODM_OFFICIAL_SPECS[cleanId].fir;
        finalAcc = CODM_OFFICIAL_SPECS[cleanId].acc;
        finalMob = CODM_OFFICIAL_SPECS[cleanId].mob;
        finalRan = CODM_OFFICIAL_SPECS[cleanId].ran;
        finalCon = CODM_OFFICIAL_SPECS[cleanId].con;
    } else {
        finalDmg = parseInt(cardElement.getAttribute('data-dmg')) || 30;
        finalAcc = parseInt(cardElement.getAttribute('data-acc')) || 50;
        finalMob = parseInt(cardElement.getAttribute('data-mob')) || 60;
    }

    const weapon = {
        id: idAttr,
        name: cardElement.querySelector('.weapon-title').innerText,
        type: type,
        desc: cardElement.querySelector('.weapon-desc').innerText,
        stats: {
            dmg: finalDmg,
            fir: finalFir,
            acc: finalAcc,
            mob: finalMob,
            ran: finalRan,
            con: finalCon
        },
        build: cardElement.getAttribute('data-build') || '',
        attachmentsBR: cardElement.getAttribute('data-attachments-br') ? cardElement.getAttribute('data-attachments-br').split(',') : [],
        attachmentsMP: cardElement.getAttribute('data-attachments-mp') ? cardElement.getAttribute('data-attachments-mp').split(',') : []
    };
    
    openModal(weapon);
}

let currentCategory = 'all';
let selectedRegionValue = 'eu';
let favoritesList = JSON.parse(localStorage.getItem('codm-favs')) || [];

const categoryDescriptions = {
    'favorites': { title: "⭐ Favoritele Tale", text: "Aici găsești salvate armele tale de suflet și configurațiile pregătite direct pentru meciurile ranked." },
    'Asalt': { title: "Puști de Asalt (AR)", text: "Echilibru perfect între control, daune și raza de acțiune. Sunt armele de bază versatile, perfecte pentru orice tip de angajament pe hartă." },
    'SMG': { title: "Pistoale Mitralieră (SMG)", text: "Cadență infernală, mobilitate fulgerătoare și viteză ADS de top. Domină duelurile de proximitate și spațiile extrem de strânse." },
    'LMG': { title: "Mitraliere Grele (LMG)", text: "Capacitate masivă de stocare a muniției și putere mare de foc continuă. Excelente pentru blocarea liniilor inamice și combat pe distanțe mari." },
    'Shotgun': { title: "Shotgun-uri", text: "Forță de impact masivă la distanță minimă. Capabile de eliminări dintr-un singur foc (one-tap) dacă ești suficient de aproape de țintă." },
    'Marksman': { title: "Puști Marksman", text: "Arme semi-automate de mare precizie. Recompensează acuratețea chirurgicală, oferind un timp de eliminare (TTK) extrem de redus." },
    'Sniper': { title: "Puști cu Lunetă (Sniper)", text: "Precizie absolută de la distanțe extreme. Controlul perfect al hărții dintr-un singur glonț precis plasat în zona toracelui sau capului." }
};

function filterWeapons() {
    const searchInput = document.getElementById('weaponSearch');
    if (!searchInput) return;
    const searchValue = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll('#weaponsContainer .weapon-card');

    cards.forEach((card) => {
        const name = card.querySelector('.weapon-title').innerText.toLowerCase();
        const type = card.getAttribute('data-type');
        const id = card.getAttribute('data-id');
        const isFav = favoritesList.includes(id);

        const favBtn = card.querySelector('.favorite-btn');
        if (favBtn) {
            if (isFav) {
                favBtn.classList.add('active');
                favBtn.innerHTML = '<i class="fa-solid fa-star"></i>';
            } else {
                favBtn.classList.remove('active');
                favBtn.innerHTML = '<i class="fa-regular fa-star"></i>';
            }
        }

        const matchesSearch = name.includes(searchValue);
        let matchesCategory = currentCategory === 'all' || type === currentCategory;
        if (currentCategory === 'favorites') { matchesCategory = isFav; }

        if (matchesSearch && matchesCategory) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

function setupWeaponCardsClick() {
    const cards = document.querySelectorAll('#weaponsContainer .weapon-card');
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.favorite-btn')) return;

            const idAttr = card.getAttribute('data-id') || '';
            const cleanId = idAttr.toLowerCase().trim();
            const type = card.getAttribute('data-type');
            
            let finalDmg = 30, finalFir = 50, finalAcc = 50, finalMob = 60, finalRan = 50, finalCon = 50;

            if (CODM_OFFICIAL_SPECS[cleanId]) {
                finalDmg = CODM_OFFICIAL_SPECS[cleanId].dmg;
                finalFir = CODM_OFFICIAL_SPECS[cleanId].fir;
                finalAcc = CODM_OFFICIAL_SPECS[cleanId].acc;
                finalMob = CODM_OFFICIAL_SPECS[cleanId].mob;
                finalRan = CODM_OFFICIAL_SPECS[cleanId].ran;
                finalCon = CODM_OFFICIAL_SPECS[cleanId].con;
            } else {
                finalDmg = parseInt(card.getAttribute('data-dmg')) || 30;
                finalAcc = parseInt(card.getAttribute('data-acc')) || 50;
                finalMob = parseInt(card.getAttribute('data-mob')) || 60;
            }

            const weapon = {
                id: idAttr,
                name: card.querySelector('.weapon-title').innerText,
                type: type,
                desc: card.querySelector('.weapon-desc').innerText,
                stats: {
                    dmg: finalDmg,
                    fir: finalFir,
                    acc: finalAcc,
                    mob: finalMob,
                    ran: finalRan,
                    con: finalCon
                },
                build: card.getAttribute('data-build') || '',
                attachmentsBR: card.getAttribute('data-attachments-br') ? card.getAttribute('data-attachments-br').split(',') : [],
                attachmentsMP: card.getAttribute('data-attachments-mp') ? card.getAttribute('data-attachments-mp').split(',') : []
            };
            openModal(weapon);
        });
    });
}

function toggleFavorite(event, weaponId) {
    event.stopPropagation();
    if (favoritesList.includes(weaponId)) {
        favoritesList = favoritesList.filter(id => id !== weaponId);
    } else {
        favoritesList.push(weaponId);
    }
    localStorage.setItem('codm-favs', JSON.stringify(favoritesList));
    filterWeapons();
}

function filterCategory(cat, btn) {
    currentCategory = cat;

    if (typeof InvisibleAI !== 'undefined') {
        InvisibleAI.trackActivity('category_click', cat);
    }

    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    const descPanel = document.getElementById('categoryDescPanel');
    const titleElem = document.getElementById('categoryTitle');
    const textElem = document.getElementById('categoryText');

    if (descPanel && titleElem && textElem) {
        if (cat === 'all') {
            descPanel.style.display = 'none'; 
        } else if (categoryDescriptions[cat]) {
            titleElem.textContent = categoryDescriptions[cat].title;
            textElem.textContent = categoryDescriptions[cat].text;
            descPanel.style.display = 'block'; 
        } else {
            descPanel.style.display = 'none';
        }
    }
    filterWeapons();
}

function openModal(weapon) {
    const overlay = document.getElementById('weaponModal');
    const content = document.getElementById('modalContent');
    if (!overlay || !content) return;
    
    document.body.style.overflow = 'hidden';
    const isLightMode = document.body.classList.contains('light-mode') || document.documentElement.classList.contains('light-mode');

    const textColor = isLightMode ? '#111111' : '#ffffff';
    const boxBg = isLightMode ? 'rgba(0, 0, 0, 0.03)' : 'rgba(255, 255, 255, 0.01)';
    const boxBorder = isLightMode ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.03)';

    const formatAttachment = (att) => {
        const trimmed = att.trim();
        if (trimmed.includes('|')) {
            const parts = trimmed.split('|');
            return `
                <li style="display: flex; justify-content: space-between; align-items: center; width: 100%; padding: 5px 0; border-bottom: 1px solid rgba(255,255,255,0.03); font-size: 0.85rem;">
                    <span style="font-weight: bold; text-align: left; color: ${textColor};">${parts[0].trim()}</span>
                    <span style="text-align: right; color: #ff003c; font-weight: bold; font-style: italic;">${parts[1].trim()}</span>
                </li>
            `;
        }
        const firstSpace = trimmed.indexOf(' ');
        if (firstSpace === -1) return `<li style="padding: 5px 0; color: ${textColor};">${trimmed} <span style="color: #ff003c; font-weight: bold;">Standard</span></li>`;
        return `<li style="padding: 5px 0; color: ${textColor};">${trimmed.substring(0, firstSpace)} <span style="color: #ff003c; font-weight: bold;">${trimmed.substring(firstSpace + 1)}</span></li>`;
    };

    content.innerHTML = `
        <style>
            #weaponModal .stat-bar-bg {
                position: relative !important;
                height: 10px !important;
                background: ${isLightMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'} !important;
                border-radius: 6px !important;
                overflow: hidden !important;
                display: block !important;
                width: 100% !important;
            }
            #weaponModal .custom-navy-fill {
                position: absolute !important;
                left: 0 !important;
                top: 0 !important;
                height: 100% !important;
                z-index: 1 !important;
                background-color: #002060 !important;
                background: #002060 !important;
                transition: width 0.3s ease !important;
            }
            #weaponModal .custom-indicator {
                position: absolute !important;
                left: 50% !important;
                top: 50% !important;
                transform: translate(-50%, -50%) !important;
                z-index: 100 !important;
                font-weight: 900 !important;
                font-size: 1.3rem !important;
                pointer-events: none !important;
                line-height: 1 !important;
                text-shadow: 0px 1px 4px rgba(0,0,0,0.9) !important;
                margin: 0 !important;
                padding: 0 !important;
            }
        </style>

        <div class="modal-weapon-name" style="color: ${textColor} !important;">${weapon.name} [${weapon.type}]</div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px 15px;">
            <div class="stat-bar-wrapper">
                <div class="stat-bar-label" style="display: flex; justify-content: space-between; margin-bottom: 3px; font-size: 0.8rem;">
                    <span style="color: ${textColor}; font-weight: 500;">Damage</span>
                    <span style="color: ${textColor}; font-weight: bold;" id="valDmg">${weapon.stats.dmg}</span>
                </div>
                <div class="stat-bar-bg">
                    <div class="custom-navy-fill" id="dmgBar" style="width: 0%;"></div>
                    <div id="indDmg" class="custom-indicator"></div>
                </div>
            </div>

            <div class="stat-bar-wrapper">
                <div class="stat-bar-label" style="display: flex; justify-content: space-between; margin-bottom: 3px; font-size: 0.8rem;">
                    <span style="color: ${textColor}; font-weight: 500;">Fire Rate</span>
                    <span style="color: ${textColor}; font-weight: bold;" id="valFir">${weapon.stats.fir}</span>
                </div>
                <div class="stat-bar-bg">
                    <div class="custom-navy-fill" id="firBar" style="width: 0%;"></div>
                    <div id="indFir" class="custom-indicator"></div>
                </div>
            </div>

            <div class="stat-bar-wrapper">
                <div class="stat-bar-label" style="display: flex; justify-content: space-between; margin-bottom: 3px; font-size: 0.8rem;">
                    <span style="color: ${textColor}; font-weight: 500;">Accuracy</span>
                    <span style="color: ${textColor}; font-weight: bold;" id="valAcc">${weapon.stats.acc}</span>
                </div>
                <div class="stat-bar-bg">
                    <div class="custom-navy-fill" id="accBar" style="width: 0%;"></div>
                    <div id="indAcc" class="custom-indicator"></div>
                </div>
            </div>

            <div class="stat-bar-wrapper">
                <div class="stat-bar-label" style="display: flex; justify-content: space-between; margin-bottom: 3px; font-size: 0.8rem;">
                    <span style="color: ${textColor}; font-weight: 500;">Mobility</span>
                    <span style="color: ${textColor}; font-weight: bold;" id="valMob">${weapon.stats.mob}</span>
                </div>
                <div class="stat-bar-bg">
                    <div class="custom-navy-fill" id="mobBar" style="width: 0%;"></div>
                    <div id="indMob" class="custom-indicator"></div>
                </div>
            </div>

            <div class="stat-bar-wrapper">
                <div class="stat-bar-label" style="display: flex; justify-content: space-between; margin-bottom: 3px; font-size: 0.8rem;">
                    <span style="color: ${textColor}; font-weight: 500;">Range</span>
                    <span style="color: ${textColor}; font-weight: bold;" id="valRan">${weapon.stats.ran}</span>
                </div>
                <div class="stat-bar-bg">
                    <div class="custom-navy-fill" id="ranBar" style="width: 0%;"></div>
                    <div id="indRan" class="custom-indicator"></div>
                </div>
            </div>

            <div class="stat-bar-wrapper">
                <div class="stat-bar-label" style="display: flex; justify-content: space-between; margin-bottom: 3px; font-size: 0.8rem;">
                    <span style="color: ${textColor}; font-weight: 500;">Control</span>
                    <span style="color: ${textColor}; font-weight: bold;" id="valCon">${weapon.stats.con}</span>
                </div>
                <div class="stat-bar-bg">
                    <div class="custom-navy-fill" id="conBar" style="width: 0%;"></div>
                    <div id="indCon" class="custom-indicator"></div>
                </div>
            </div>
        </div>

        <div class="ai-optimizer-panel" style="margin-top: 20px; padding: 12px; background: ${boxBg}; border: 1px dashed ${boxBorder}; border-radius: 12px; text-align: center;">
            <div style="font-size: 0.85rem; font-weight: bold; color: #ff003c; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">
                <i class="fa-solid fa-wand-magic-sparkles"></i> Gunsmith Optimizer (AI Generativ)
            </div>
            <div style="font-size: 0.75rem; color: ${textColor}; opacity: 0.7; margin-bottom: 12px;">
                Alege ce vrei să optimizezi pe <strong>${weapon.name}</strong> pentru a genera atașamente custom:
            </div>
            
            <div class="optimizer-options" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; margin-bottom: 15px;">
                <button class="opt-btn" onclick="applyGunsmithOptimization('${weapon.id}', '${weapon.type}', ${weapon.stats.dmg}, ${weapon.stats.fir}, ${weapon.stats.acc}, ${weapon.stats.mob}, ${weapon.stats.ran}, ${weapon.stats.con}, 'recul')" style="background: rgba(255,255,255,0.05); border: 1px solid ${boxBorder}; padding: 8px; color: ${textColor}; border-radius: 8px; font-size: 0.75rem; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px; transition: all 0.2s;">
                    🎯 Control/Acuratețe
                </button>
                <button class="opt-btn" onclick="applyGunsmithOptimization('${weapon.id}', '${weapon.type}', ${weapon.stats.dmg}, ${weapon.stats.fir}, ${weapon.stats.acc}, ${weapon.stats.mob}, ${weapon.stats.ran}, ${weapon.stats.con}, 'ads')" style="background: rgba(255,255,255,0.05); border: 1px solid ${boxBorder}; padding: 8px; color: ${textColor}; border-radius: 8px; font-size: 0.75rem; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px; transition: all 0.2s;">
                    ⚡ ADS Rapid
                </button>
                <button class="opt-btn" onclick="applyGunsmithOptimization('${weapon.id}', '${weapon.type}', ${weapon.stats.dmg}, ${weapon.stats.fir}, ${weapon.stats.acc}, ${weapon.stats.mob}, ${weapon.stats.ran}, ${weapon.stats.con}, 'mobility')" style="background: rgba(255,255,255,0.05); border: 1px solid ${boxBorder}; padding: 8px; color: ${textColor}; border-radius: 8px; font-size: 0.75rem; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px; transition: all 0.2s;">
                    🏃‍♂️ Mobilitate
                </button>
                <button class="opt-btn" onclick="applyGunsmithOptimization('${weapon.id}', '${weapon.type}', ${weapon.stats.dmg}, ${weapon.stats.fir}, ${weapon.stats.acc}, ${weapon.stats.mob}, ${weapon.stats.ran}, ${weapon.stats.con}, 'range')" style="background: rgba(255,255,255,0.05); border: 1px solid ${boxBorder}; padding: 8px; color: ${textColor}; border-radius: 8px; font-size: 0.75rem; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px; transition: all 0.2s;">
                    🤫 Rază & Stealth
                </button>
                <button class="opt-btn" onclick="applyGunsmithOptimization('${weapon.id}', '${weapon.type}', ${weapon.stats.dmg}, ${weapon.stats.fir}, ${weapon.stats.acc}, ${weapon.stats.mob}, ${weapon.stats.ran}, ${weapon.stats.con}, 'hybrid')" style="grid-column: span 2; background: rgba(255,255,255,0.05); border: 1px solid ${boxBorder}; padding: 8px; color: ${textColor}; border-radius: 8px; font-size: 0.75rem; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px; transition: all 0.2s;">
                    ⚖️ Control Recoil / Quick Scope
                </button>
            </div>

            <div id="aiGeneratedOutput" style="display: none; background: rgba(0,0,0,0.15); padding: 10px; border-radius: 8px; text-align: left; border: 1px solid rgba(255,0,60,0.15);">
                <div style="font-size: 0.75rem; font-weight: bold; color: #ff003c; margin-bottom: 6px; text-transform: uppercase;">Atașamente recomandate:</div>
                <ul id="aiAttachmentsList" style="margin: 0; padding-left: 15px; font-size: 0.8rem; color: ${textColor}; line-height: 1.4;"></ul>
                <div style="text-align: right; margin-top: 5px;">
                    <span id="resetAiBtn" onclick="resetToStandardBuild(${weapon.stats.dmg}, ${weapon.stats.fir}, ${weapon.stats.acc}, ${weapon.stats.mob}, ${weapon.stats.ran}, ${weapon.stats.con})" style="font-size: 0.70rem; color: #ffb703; cursor: pointer; text-decoration: underline; font-weight: bold;">Revenire la Build Standard</span>
                </div>
            </div>
        </div>

        <div class="modal-attachments-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 20px; text-align: left; width: 100%; box-sizing: border-box;">
            <div class="attachments-column-box" style="background: ${boxBg}; padding: 12px; border-radius: 10px; border: 1px solid ${boxBorder}; box-sizing: border-box;">
                <h4 style="margin: 0 0 10px 0; font-size:0.85rem; color: #ffb703; text-transform: uppercase; letter-spacing: 0.5px; display: flex; align-items: center; justify-content: center; text-align: center; gap: 5px;"><i class="fa-solid fa-earth-americas"></i> Atașamente BR</h4>
                <ul class="attachments-list" style="margin: 0; padding: 0; list-style: none;">${weapon.attachmentsBR.map(att => formatAttachment(att)).join('')}</ul>
            </div>
            <div class="attachments-column-box" style="background: ${boxBg}; padding: 12px; border-radius: 10px; border: 1px solid ${boxBorder}; box-sizing: border-box;">
                <h4 style="margin: 0 0 10px 0; font-size:0.85rem; color: #0055ff; text-transform: uppercase; letter-spacing: 0.5px; display: flex; align-items: center; justify-content: center; text-align: center; gap: 5px;"><i class="fa-solid fa-crosshairs"></i> Atașamente MP</h4>
                <ul class="attachments-list" style="margin: 0; padding: 0; list-style: none;">${weapon.attachmentsMP.map(att => formatAttachment(att)).join('')}</ul>
            </div>
        </div>
    `;

    overlay.style.display = 'flex';
    overlay.style.alignItems = 'flex-start';
    overlay.style.justifyContent = 'center';
    overlay.style.overflowY = 'auto';
    overlay.style.padding = '20px 10px';
    overlay.style.boxSizing = 'border-box';
    
    if (isLightMode) { overlay.style.background = 'rgba(255, 255, 255, 0.2)'; } 
    else { overlay.style.background = 'rgba(0, 0, 0, 0.2)'; }
    overlay.style.backdropFilter = 'blur(15px)';

    const modalCard = overlay.querySelector('.modal-card');
    if (modalCard) {
        modalCard.style.top = '0';
        modalCard.style.transform = 'none';
        modalCard.style.marginTop = '20px';
        modalCard.style.marginBottom = '20px';
        if (isLightMode) { modalCard.style.background = 'rgba(255, 255, 255, 0.4)'; } 
        else { modalCard.style.background = 'rgba(255, 255, 255, 0.03)'; }
    }

    overlay.classList.add('active');
    overlay.scrollTop = 0;

    setTimeout(() => {
        const dmgBar = document.getElementById('dmgBar');
        const firBar = document.getElementById('firBar');
        const accBar = document.getElementById('accBar');
        const mobBar = document.getElementById('mobBar');
        const ranBar = document.getElementById('ranBar');
        const conBar = document.getElementById('conBar');

        if(dmgBar) dmgBar.style.width = weapon.stats.dmg + '%';
        if(firBar) firBar.style.width = weapon.stats.fir + '%';
        if(accBar) accBar.style.width = weapon.stats.acc + '%';
        if(mobBar) mobBar.style.width = weapon.stats.mob + '%';
        if(ranBar) ranBar.style.width = weapon.stats.ran + '%';
        if(conBar) conBar.style.width = weapon.stats.con + '%';
    }, 50);

    setTimeout(() => {
        const boxes = document.querySelectorAll('.attachments-column-box');
        if(boxes.length >= 2) {
            boxes[0].addEventListener('mouseenter', () => InvisibleAI.trackActivity('mode_view', 'br'));
            boxes[0].addEventListener('touchstart', () => InvisibleAI.trackActivity('mode_view', 'br'), { passive: true });

            boxes[1].addEventListener('mouseenter', () => InvisibleAI.trackActivity('mode_view', 'mp'));
            boxes[1].addEventListener('touchstart', () => InvisibleAI.trackActivity('mode_view', 'mp'), { passive: true });
        }
    }, 100);
}

function applyGunsmithOptimization(weaponId, weaponType, baseDmg, baseFir, baseAcc, baseMob, baseRan, baseCon, priority) {
    const build = GunsmithOptimizer.generateBuild(weaponId.toLowerCase().trim(), weaponType, priority);
    if (!build) return;

    document.querySelectorAll('.opt-btn').forEach(btn => { 
        btn.style.background = 'rgba(255,255,255,0.05)'; 
        btn.style.borderColor = 'rgba(255,255,255,0.03)'; 
        btn.style.color = 'inherit'; 
    });
    const clickedBtn = window.event ? window.event.target.closest('.opt-btn') : null;
    if (clickedBtn) { clickedBtn.style.background = 'rgba(255, 0, 60, 0.15)'; clickedBtn.style.borderColor = '#ff003c'; clickedBtn.style.color = '#ff003c'; }

    let finalDmg = baseDmg + (build.stats.dmg || 0);
    let finalFir = baseFir + (build.stats.fir || 0);
    let finalAcc = baseAcc + (build.stats.acc || 0);
    let finalMob = baseMob + (build.stats.mob || 0);
    let finalRan = baseRan + (build.stats.ran || 0);
    let finalCon = baseCon + (build.stats.con || 0);

    if (priority === 'recul') { finalMob -= 5; finalCon += 8; }
    if (priority === 'ads') { finalMob += 10; finalCon -= 5; finalRan -= 3; }
    if (priority === 'mobility') { finalMob += 15; finalAcc -= 8; }
    if (priority === 'range') { finalRan += 12; finalMob -= 6; }

    const clamp = (v) => Math.max(5, Math.min(120, v));
    const vals = [clamp(finalDmg), clamp(finalFir), clamp(finalAcc), clamp(finalMob), clamp(finalRan), clamp(finalCon)];
    const bases = [baseDmg, baseFir, baseAcc, baseMob, baseRan, baseCon];

    const stats = ['Dmg','Fir','Acc','Mob','Ran','Con'];
    const keys = ['dmg','fir','acc','mob','ran','con'];
    
    stats.forEach((s, i) => {
        const valElem = document.getElementById('val'+s);
        const indElem = document.getElementById('ind'+s);
        const barElem = document.getElementById(keys[i] + 'Bar');

        if(valElem) valElem.innerText = bases[i];
        const diff = vals[i] - bases[i];
        if(indElem) indElem.innerHTML = diff > 0 ? '<span style="color:#00ff66">+</span>' : diff < 0 ? '<span style="color:#ff003c">-</span>' : '<span style="color:#00f0ff">=</span>';
        if(barElem) barElem.style.width = vals[i] + '%';
    });

    const list = document.getElementById('aiAttachmentsList');
    if(list) list.innerHTML = build.attachments.map(a => `<li style="color:#fff; font-size:0.75rem; margin-bottom:2px;">${a}</li>`).join('');
    const outputElem = document.getElementById('aiGeneratedOutput');
    if(outputElem) outputElem.style.display = 'block';
}

function resetToStandardBuild(baseDmg, baseFir, baseAcc, baseMob, baseRan, baseCon) {
    document.querySelectorAll('.opt-btn').forEach(btn => {
        btn.style.background = 'rgba(255,255,255,0.05)';
        btn.style.borderColor = 'rgba(255,255,255,0.03)';
        btn.style.color = '';
    });

    const outputElem = document.getElementById('aiGeneratedOutput');
    if(outputElem) outputElem.style.display = 'none';

    ['Dmg', 'Fir', 'Acc', 'Mob', 'Ran', 'Con'].forEach(s => {
        const ind = document.getElementById('ind' + s);
        if(ind) ind.innerHTML = '';
    });

    ['Dmg', 'Fir', 'Acc', 'Mob', 'Ran', 'Con'].forEach((s, idx) => {
        const val = [baseDmg, baseFir, baseAcc, baseMob, baseRan, baseCon][idx];
        const valElem = document.getElementById('val' + s);
        if(valElem) valElem.innerText = val;
    });

    ['dmg', 'fir', 'acc', 'mob', 'ran', 'con'].forEach((k, idx) => {
        const val = [baseDmg, baseFir, baseAcc, baseMob, baseRan, baseCon][idx];
        const bar = document.getElementById(k + 'Bar');
        if(bar) bar.style.width = val + '%';
    });
}

function closeModal(e) {
    const modal = document.getElementById('weaponModal');
    if(!e || (modal && e.target === modal) || (e.target && e.target.closest('.modal-close'))) {
        if(modal) modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function toggleDropdown(e) {
    if(e) e.stopPropagation();
    const dropdown = document.getElementById('regionDropdown');
    if (!dropdown) return;
    const menu = dropdown.querySelector('.dropdown-menu');
    dropdown.classList.toggle('open');
    if(menu) menu.classList.toggle('show');
}

function selectRegion(value, label) {
    selectedRegionValue = value;
    const valElem = document.getElementById('dropdownSelectedValue');
    if(valElem) valElem.innerText = label;
    const dropdown = document.getElementById('regionDropdown');
    if (dropdown) {
        dropdown.classList.remove('open');
        const menu = dropdown.querySelector('.dropdown-menu');
        if(menu) menu.classList.remove('show');
    }
    const simulator = document.getElementById('simulatorContainer');
    if(simulator) simulator.style.display = 'block';
    calculateCP();
}

function calculateCP() {
    let total = 14730;
    let steps = [30, 80, 120, 300, 500, 800, 1300, 2400, 3400, 5800];
    if (selectedRegionValue === 'ro') {
        total = 10075;
        steps = [20, 55, 80, 210, 350, 560, 900, 1600, 2300, 4000];
    }
    if (selectedRegionValue === 'as') {
        total = 5810;
        steps = [10, 30, 50, 120, 200, 320, 520, 960, 1300, 2300];
    }
    const cpRes = document.getElementById('cpResult');
    if(cpRes) cpRes.innerText = `Cost Total Estimativ: ${total.toLocaleString()} CP`;
    
    const stepsContainer = document.getElementById('drawSteps');
    if(stepsContainer) {
        stepsContainer.innerHTML = '';
        steps.forEach((cost, index) => {
            const row = document.createElement('div');
            row.className = 'draw-step-row';
            row.innerHTML = `Extragerea ${index + 1}: <span class="step-highlight">${cost} CP</span>`;
            stepsContainer.appendChild(row);
        });
    }
}

function switchTab(pageId, button) {
    const sections = ['page-gunsmith', 'page-tutoriale', 'page-calculator-cp', 'page-despre'];
    sections.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
            section.classList.remove('active');
            section.style.display = 'none';
        }
    });

    const activeSection = document.getElementById(pageId);
    if (activeSection) {
        activeSection.classList.add('active');
        activeSection.style.display = 'block';
    }

    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    if (button) {
        button.classList.add('active');
    }

    const footer = document.querySelector('footer');
    if (footer && window.innerWidth < 768) {
        if (pageId === 'page-gunsmith') {
            footer.style.setProperty('padding-bottom', '180px', 'important');
        } else {
            footer.style.setProperty('padding-bottom', '80px', 'important');
        }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleTheme() {
    const htmlElement = document.documentElement;
    const newTheme = htmlElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('hub-theme', newTheme);
}

function updateClock() {
    const clockElem = document.getElementById('live-clock');
    if(!clockElem) return;
    const now = new Date();
    clockElem.innerText = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')} | ${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')}.${now.getFullYear()}`;
}

window.addEventListener('scroll', () => {
    const toTopBtn = document.getElementById('btnToTop');
    if(toTopBtn) {
        if (window.scrollY > 300) { toTopBtn.classList.add('visible'); } 
        else { toTopBtn.classList.remove('visible'); }
    }
});

function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

function fixMobileLayoutStructure() {
    if (window.innerWidth < 768) {
        const toTopBtn = document.getElementById('btnToTop');
        if (toTopBtn) {
            toTopBtn.style.setProperty('bottom', '178px', 'important');
            toTopBtn.style.setProperty('z-index', '1000000', 'important');
        }
    }
}

function openAboutModal() {
    const overlay = document.getElementById('aboutModal');
    if (overlay) {
        document.body.style.overflow = 'hidden';
        overlay.style.display = 'flex';
        overlay.classList.add('active');
    }
}

function closeAboutModal(e) {
    const aboutModal = document.getElementById('aboutModal');
    if (!e || (aboutModal && e.target === aboutModal) || (e.target && e.target.closest('.modal-close'))) {
        if(aboutModal) aboutModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function switchToDonationModal() {
    const aboutModal = document.getElementById('aboutModal');
    if (aboutModal) {
        aboutModal.classList.remove('active');
        aboutModal.style.display = 'none';
    }
    window.location.href = 'donatii.html';
}

function openFeedbackForm() {
    const urlFormular = 'https://forms.gle/2WgdUPTYtV2v77ct8'; 
    window.open(urlFormular, '_blank');
}
function toggleUpDropdown(e) {
    if(e) e.stopPropagation();
    const menu = document.getElementById('upMenu');
    const dropdown = document.getElementById('regionDropdown');
    if(!menu || !dropdown) return;
    
    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'flex';
        dropdown.classList.add('open');
    } else {
        menu.style.display = 'none';
        dropdown.classList.remove('open');
    }
}

// ==========================================
// INIȚIALIZARE GENERALĂ PAGINĂ
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    setInterval(updateClock, 1000);
    updateClock();
    setupWeaponCardsClick();
    filterWeapons();
    calculateCP();
    fixMobileLayoutStructure();
    
    if (typeof InvisibleAI !== 'undefined') {
        InvisibleAI.adaptInterfacediscreetly();
    }
});

// Gestionare click global pentru închiderea meniurilor deschise
document.addEventListener('click', () => {
    const menu = document.getElementById('upMenu');
    if (menu) menu.style.display = 'none';
    const dropdown = document.getElementById('regionDropdown');
    if (dropdown) dropdown.classList.remove('open');
});
