// ==========================================
// LOGICA CHATBOT-ULUI KARMA AI (Ediția cu Diacritice, Online & Securizată Cloudflare)
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    const chatWindow = document.getElementById('chat-window');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const resetBtn = document.getElementById('reset-btn');

    let botState = { 
        lastQuery: null,
        awaitingContext: null,
        selectedMode: null 
    };

    const loadoutDatabase = {
        'br': {
            'ak47': "<strong>AK-47 (BR):</strong> Țeavă OWC Ranger, Lunetă 3x, Extinsă, Grip Tactic, Compensator.",
            'ak117': "<strong>AK117 (BR):</strong> Țeavă OWC Marksman, Lunetă 3x, Extinsă, Laser OWC, Grip Tactic.",
            'krig': "<strong>Krig 6 (BR):</strong> Țeavă OWC Ranger, Lunetă 3x, Extinsă, Grip Tactic, Compensator.",
            'dlq': "<strong>DL Q33 (BR):</strong> OTR, Extinsă, Lunetă Tactical, Laser OWC, Compensator."
        },
        'mp': {
            'ak47': "<strong>AK-47 (MP):</strong> Fără pat, Laser OWC, Grip Tactic, Extinsă, Compensator.",
            'switchblade': "<strong>Switchblade X9 (MP):</strong> Fără pat, Laser OWC, Grip Tactic, Extinsă, Compensator.",
            'krig': "<strong>Krig 6 (MP):</strong> Fără pat, Laser OWC, Grip Tactic, Extinsă, Compensator."
        }
    };

    function saveChatHistory() {
        if (chatWindow) {
            localStorage.setItem('karma_chat_history', chatWindow.innerHTML);
        }
    }

    function loadChatHistory() {
        if (!chatWindow) return;
        const savedHistory = localStorage.getItem('karma_chat_history');
        if (savedHistory && savedHistory.trim() !== '') {
            chatWindow.innerHTML = savedHistory;
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }
    }

    function setupOnlineIndicator() {
        const chatContainer = chatWindow ? chatWindow.parentNode : null;
        if (!chatContainer || document.getElementById('online-status-indicator')) return;

        const statusContainer = document.createElement('div');
        statusContainer.id = 'online-status-indicator';
        statusContainer.style.cssText = 'display: flex; align-items: center; gap: 8px; padding: 4px 0 8px 4px; font-size: 0.75rem; color: #fff; font-weight: bold;';

        const greenDot = document.createElement('span');
        greenDot.style.cssText = 'width: 8px; height: 8px; background-color: #00ff66; border-radius: 50%; display: inline-block; box-shadow: 0 0 8px #00ff66;';

        const statusText = document.createElement('span');
        statusText.innerText = 'ONLINE';
        statusText.style.cssText = 'letter-spacing: 0.5px; opacity: 0.9;';

        statusContainer.appendChild(greenDot);
        statusContainer.appendChild(statusText);

        chatContainer.insertBefore(statusContainer, chatWindow);
    }

    // Funcția care vorbește cu Cloudflare Worker securizat (fără cheie expusă în cod!)
    async function getSmartBotResponse(input) {
        const systemPrompt = "Ești KARMA AI, un asistent virtual expert în Call of Duty: Mobile, setări, armamente, meta și degetare de gaming. Răspunde scurt, la obiect, prietenos, formatat cu HTML (folosește <strong>, <br>, <i>) în limba română.";
        
        // ATENȚIE: Înlocuiește link-ul de mai jos cu adresa ta reală copiată din Cloudflare Worker (cea cu .workers.dev)
        const secureProxyUrl = "https://karma-proxy.badkarma-hub.workers.dev/"; 

        try {
            const response = await fetch(secureProxyUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [
                        {
                            role: "user",
                            parts: [{ text: `${systemPrompt}\n\nUtilizatorul întreabă: ${input}` }]
                        }
                    ]
                })
            });

            const data = await response.json();
            return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
            
        } catch (error) {
            console.error("Eroare de conexiune securizată:", error);
            return null;
        }
    }

    async function getBotResponse(input) {
        // Aici păstrăm logica ta locală și adăugăm normalizarea diacriticelor
        const text = input.toLowerCase().trim()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            
        const normalizedText = text.replace(/lodout/g, 'loadout');
        const cleanText = normalizedText.replace(/[^a-z0-9]/g, '');
        
        // 1. Dacă utilizatorul scrie "lucky draw", îi cerem regiunea
        if (cleanText.includes('luckydraw') || cleanText.includes('draw')) {
            botState.awaitingContext = 'awaiting_draw_region';
            return "Pentru ce regiune vrei să calculez costul? Alege una dintre următoarele: <strong>EU</strong> (inclusiv România), <strong>Global</strong> sau <strong>Asia</strong>.";
        }

        // 2. Dacă botul așteaptă regiunea pentru Lucky Draw
        if (botState.awaitingContext === 'awaiting_draw_region') {
            if (!cleanText.includes('ro') && !cleanText.includes('romania') && !cleanText.includes('europa') && 
                !cleanText.includes('eu') && !cleanText.includes('asia') && !cleanText.includes('as') && 
                !cleanText.includes('global') && !cleanText.includes('us')) {
                botState.awaitingContext = null; 
            } else {
                botState.awaitingContext = null; 

                let total = 14730;
                let regionName = "Global / US";

                if (cleanText.includes('ro') || cleanText.includes('romania') || cleanText.includes('europa') || cleanText.includes('eu')) {
                    total = 10075;
                    regionName = "Europa (inclusiv România)";
                } else if (cleanText.includes('asia') || cleanText.includes('as')) {
                    total = 5810;
                    regionName = "Asia";
                } else if (cleanText.includes('global') || cleanText.includes('us')) {
                    total = 14730;
                    regionName = "Global / US";
                }

                return `<strong>📊 Calculator CP (Regiune selectată: ${regionName}):</strong><br>` +
                       `Costul total estimativ pentru un Lucky Draw complet (10 extrageri) este de <strong>${total.toLocaleString()} CP</strong>.<br>` +
                       `<em>Dorești să calculez și pentru altă regiune? Scrie din nou "Lucky Draw".</em>`;
            }
        }

        if (botState.awaitingContext === 'awaiting_weapon') {
            const mode = botState.selectedMode;
            botState.awaitingContext = null;
            botState.selectedMode = null;

            if (loadoutDatabase[mode]) {
                const weaponMatch = Object.keys(loadoutDatabase[mode]).find(w => cleanText.includes(w));
                if (weaponMatch) return loadoutDatabase[mode][weaponMatch];
            }
            return "Nu am găsit un loadout pentru această armă. Încearcă alta.";
        }

        if (botState.awaitingContext === 'loadout_type') {
            if (cleanText.includes('br')) {
                botState.awaitingContext = 'awaiting_weapon';
                botState.selectedMode = 'br';
                return "Am înțeles, Battle Royale. Ce armă cauți (ex: Krig, DLQ)?";
            } 
            if (cleanText.includes('mp')) {
                botState.awaitingContext = 'awaiting_weapon';
                botState.selectedMode = 'mp';
                return "Am înțeles, Multiplayer. Ce armă cauți (ex: Switchblade, Krig)?";
            }
            return "Te rog alege: <strong>BR</strong> sau <strong>MP</strong>.";
        }

        if (['loadout', 'echipare', 'build'].some(word => cleanText.includes(word))) {
            botState.awaitingContext = 'loadout_type';
            return "Pentru ce mod dorești loadout-ul: <strong>BR</strong> sau <strong>MP</strong>?";
        }

        const responses = {
            'salut,salutare,buna': "<strong>Salut</strong>, cu ce te pot ajuta?",
            'meta,arma,arme': "<strong>Meta Arme Curente:</strong><br>• <strong>MP:</strong> RAM-7, Krig 6, BP50; FSS Hurricane, QQ9.<br>• <strong>BR:</strong> SO-14, Oden, AK-47 și KRM-262 / HS0405.",
            'setari br,battle royale': "<strong>Setări BR:</strong> Activează <em>Quick Run from Prone</em> și <em>Joystick Auto-Sprint</em>. Folosește stilul grafic <em>Dynamic</em> sau <em>Colorful</em>.",
            'setari mp,multiplayer': "<strong>Setări MP:</strong> <em>Aim Assist:</em> Pornit | <em>Fixed R-Fire BTN:</em> Pornit | <i>Sync ADS FOV:</i> Oprit.",
            'lag,anti lag,fps,optimizare': "<strong>Anti-Lag:</strong> Setează Graphics pe <em>Low</em>, Frame Rate pe <em>Max/Ultra</em> și dezactivează efectele de umbre și ragdoll.",
            'perk,perks,abilitati': "<strong>Perk-uri Meta MP:</strong> Lightweight (Roșu), Toughness (Verde) și Dead Silence (Albastru).",
            'scorestreak,killstreak': "<strong>Scorestreak-uri:</strong> UAV, Care Package/Napalm și Advanced UAV.",
            'miscare,movement,slide': "<strong>Mișcare:</strong> Stăpânește <em>Slide-Cancel-ul</em> pentru a păstra viteza maximă în timpul duelurilor.",
            'harti,map,ranked': "<strong>Hărți Ranked:</strong> Firing Range, Raid, Summit și Standoff.",
            'clase br,clase battle royale,clase': "<strong>Clase BR:</strong> Ninja (pentru flank-uri și verticalitate) și Medic.",
            'utilitare,grenade,tactic,lethal': "<strong>Utilitare:</strong> Trophy System (esențial în Hardpoint) și Smoke Grenade (pentru S&D).",
            'skiluri,operator,specialist': "<strong>Operator Skills:</strong> K9 Unit și Ballistic Shield.",
            
            'degetare,mansoane,finger sleeves,alegere degetare,tactile': "<strong>Cum să îți alegi Manșoanele Tactile (Degetare):</strong><br>" +
                "Alegerea manșoanelor tactile potrivite poate face o diferență enormă în precizia și timpul de reacție, mai ales în shooterele mobile cu ritm alert. Iată criteriile principale:<br>" +
                "• <strong>Fibră de Sticlă (Glass Fiber):</strong> Reprezintă opțiunea premium pentru o glisare cu frecare aproape de zero și control absolut. Datorită profilului ultra-subțire și capacității excelente de disipare termică, mențin degetele reci și previn complet agățarea pe ecran, fiind perfecte pentru micro-ajustări precise ale reculului în shootout-uri intense. Ca dezavantaj, alunecarea extrem de rapidă pe sticlă necesită o scurtă perioadă de acomodare a memoriei musculare.<br>" +
                "• <strong>Fibră de Argint (Silver Fiber):</strong> Oferă cea mai mare sensibilitate și conductivitate. Sunt ideale pentru mișcări extrem de rapide (flick-uri, slide-canceling) și răspund instantaneu pe ecran. Ca dezavantaj, tind să se uzeze puțin mai repede.<br>" +
                "• <strong>Fibră de Carbon (Carbon Fiber):</strong> Reprezintă un echilibru excelent între durabilitate și performanță. Oferă o alunecare fluidă și constantă, fiind extrem de rezistente la uzură—perfecte pentru sesiunile lungi de rank.<br>" +
                "• <strong>Fibră de Cupru:</strong> Absorb bine transpirația și sunt de obicei mai ieftine, o conductivitate și o precizie inferioare variantelor cu argint sau carbon.<br>" +
                "• <strong>Criterii:</strong> Grosime de ~0.3 mm, densitate 18/24-pin, structură fără cusături (seamless) și bandă manșonului fermă cu bandă elastică de fixare.",

            'intretinere,spalare degetare,curatare mansoane,pastrare,gaming,intretinere degetare,intretinere mansoane': "<strong>Întreținerea Manșoanelor de Gaming:</strong><br>" +
                "1. <strong>Spălare Periodică:</strong> Spală-le manual în apă călduță cu un strop de săpun delicat. Evită detergenții agresivi.<br>" +
                "2. <strong>Uscare Naturală:</strong> Nu le pune niciodată pe calorifer sau la soare direct. Lasă-le să se usuce cât mai natural pe o suprafață plană.<br>" +
                "3. <strong>Protecție:</strong> După fiecare sesiune păstrează-le într-o cutiuță mică din plastic etanșă sau într-o cutiuță metalică dedicată pentru ele pe care o poți găsi în magazinele de specialitate.",

            'atasament,atasamente,gunsmith,ghid atasament,ghid complet atasamente': "<strong>Ghidul Complet al Atașamentelor în Gunsmith:</strong><br>" +
                "• <strong>Muzzle:</strong> Monolithic Suppressor ascunde tragerea pe radar și crește raza de acțiune, dar încetinește ADS-ul. Compensatoarele și frânele de gură reduc masiv reculul vertical și orizontal.<br>" +
                "• <strong>Barrel:</strong> Țevile lungi (Ranger/Marksman) măresc raza și precizia, dar scad mobilitatea. Țevile scurte (Light/Short) cresc viteza de reacție și mobilitatea, dar scad raza.<br>" +
                "• <strong>Optic:</strong> Red Dot sau lunete dedicate oferă claritate pe distanță, dar consumă un slot prețios de pe armă.<br>" +
                "• <strong>Stock:</strong> <i>No Stock</i> oferă mobilitate și viteză ADS extreme, dar crește drastic reculul. <i>Steady Stock</i> aduce stabilitate maximă.<br>" +
                "• <strong>Laser:</strong> <i>OWC Laser - Tactical</i> este esențial (oferă precizie mare la tragerea din alergare și viteză ADS imense, deși fasciculul e vizibil pentru inamici).<br>" +
                "• <strong>Underbarrel:</strong> Strike sau Ranger Foregrip reduc semnificativ reculul și tremurul armei la distanță.<br>" +
                "• <strong>Ammunition:</strong> Încărcătoarele mărite sau Fast Mag te scapă de reîncărcări dese; munițiile speciale (OTM, Stopping Power) schimbă radical profilul daunelor.<br>" +
                "• <strong>Rear Grip:</strong> <i>Granulated Grip Tape</i> oferă precizie pură (reduce dispersia gloanțelor). <i>Stippled Grip Tape</i> crește viteza de reacție (ADS rapid).", 

            'muzzle,gura tevei': "<strong>Ghid Muzzle (Gura țevei):</strong><br>" +
                "• <strong>Monolithic Suppressor:</strong> Oferă ascundere completă pe radar (Sound Suppression) și crește raza de acțiune, dar încetinește timpul ADS.<br>" +
                "• <strong>Tactical Suppressor:</strong> Ascunde tragerea pe radar fără alte bonusuri sau penalizări majore.<br>" +
                "• <strong>Compensator / Muzzle Brake:</strong> Reduc drastic reculul vertical sau orizontal.<br>" +
                "• <strong>Marauder Suppressor / Choke:</strong> Strâng dispersia gloanțelor la shotgun-uri pentru o forță letală la distanță.",

            'barrel,teava': "<strong>Ghid Barrel (Țeava):</strong><br>" +
                "• <strong>OWC Marksman / Ranger:</strong> Măresc masiv raza de acțiune, precizia și controlul. Dezavantaj: scad mobilitatea și timpul ADS.<br>" +
                "• <strong>RTC Recon / Extended:</strong> Variante echilibrate pentru rază și control moderat.<br>" +
                "• <strong>Light / Short Barrel:</strong> Măresc enorm mobilitatea și viteza de reacție, dar scad raza și cresc dispersia gloanțelor.<br>" +
                "• <strong>YKM Integral Suppressor:</strong> Atașament hibrid care combină efectul de Muzzle și Barrel. Oferă ascundere pe radar, păstrează mobilitatea și viteza de reacție ridicată, fiind excelent pentru stilul agresiv.",

            'optic,luneta,red dot': "<strong>Ghid Optic (Sisteme de ochire):</strong><br>" +
                "• <strong>Classic Red Dot / Holographic:</strong> Oferă un punct de ochire curat și vizibilitate pe distanțe medii.<br>" +
                "• <strong>Tactical Scopes (3x / 4.4x):</strong> Lunete cu zoom superior pentru asalturi pe distanțe lungi sau în Battle Royale.<br>" +
                "• <i>Notă:</i> Majoritatea armelor au un iron-sight excelent, așa că folosirea unui optic ocupă un slot prețios de customizare.",

            'stock,patul armei': "<strong>Ghid Stock (Patul armei):</strong><br>" +
                "• <strong>No Stock:</strong> Cel mai popular pat în MP. Oferă mobilitate și viteză ADS extreme, dar crește drastic reculul și tremurul armei.<br>" +
                "• <strong>RTC Steady / Combat Stock:</strong> Oferă stabilitate maximă, reduc tremurul la impact (Flinch) și stabilizează ținta la distanță.",

            'laser': "<strong>Ghid Laser:</strong><br>" +
                "• <strong>OWC Laser - Tactical:</strong> Cel mai important laser. Oferă precizie masivă la tragerea din alergare și viteză ADS imensă. <i>Dezavantaj:</i> Fasciculul laser este vizibil pentru inamici.<br>" +
                "• <strong>MIP Laser 5mW:</strong> Mărește precizia la tragerea 'din șold' (Hip Fire), excelent pentru SMG-uri agresive.",

            'underbarrel,maner': "<strong>Ghid Underbarrel (Mâner inferior):</strong><br>" +
                "• <strong>Operator / Ranger Foregrip:</strong> Reduc masiv reculul vertical, făcând arma extrem de stabilă.<br>" +
                "• <strong>Strike Foregrip:</strong> Un echilibru excelent care reduce reculul și crește precizia ADS cu penalizări minime la viteză.",

            'munitie,ammo,incarcator': "<strong>Ghid Ammunition (Muniția):</strong><br>" +
                "• <strong>Extended Mag / Fast Mag:</strong> Măresc numărul de gloanțe din încărcător (și viteza de reîncărcare în cazul variantei Fast).<br>" +
                "• <strong>Special Ammo (OTM, Stopping Power, Slug):</strong> Modifică radical profilul daunelor per glonț sau comportamentul balistic.",

            'grip,rear grip,maner posterior': "<strong>Ghid Rear Grip (Mâner posterior):</strong><br>" +
                "• <strong>Granulated Grip Tape:</strong> Oferă precizie pură (reduce dispersia gloanțelor la distanță). Obligatoriu pe asalturi și snipere.<br>" +
                "• <strong>Stippled Grip Tape:</strong> Crește viteza de reacție (ADS rapid și Sprint-to-Fire), dar scade precizia la distanță.",

            'call of duty mobile,codm,despre codm': "• <strong>Call of Duty: Mobile</strong> este un joc free-to-play shooter first-person dezvoltat de TiMi Studios și publicat de Activision pentru Android și iOS. Lansat la 1 octombrie 2019 în prima lună acesta a avut aproximativ 150 de milioane de descărcări și a generat venituri de peste 50 de milioane de dolari SUA, aceasta însemnând cea mai mare lansare de jocuri mobile din istorie.",

            'call of duty mobile,cod,codm': "Ce anume dorești să știi despre Call of Duty: Mobile? Întreabă-mă despre loadout-uri, setări, degetare, întreținere sau atașamente!"
        };

        // 1. Încercăm mai întâi răspunsul inteligent via Cloudflare Worker (AI)
        let aiResponse = await getSmartBotResponse(input);
        if (aiResponse) {
            return aiResponse;
        }

        // 2. Dacă AI-ul nu răspunde sau e o eroare de rețea, căutăm în dicționarul local de mesaje prestabilite
        let celMaiBunRaspuns = "Încă mă documentez despre asta... Întreabă-mă despre loadout-uri, setări pro, degetare, întreținere sau atașamente!";
        let scorMaxim = 0;
        
        for (const [keywords, reply] of Object.entries(responses)) {
            const matchedKeywords = keywords.split(',').filter(kw => normalizedText.includes(kw.trim().toLowerCase())).length;
            if (matchedKeywords > scorMaxim) {
                scorMaxim = matchedKeywords;
                celMaiBunRaspuns = reply;
            }
        }
        return celMaiBunRaspuns;
    }

    function addMessage(sender, message) {
        if (!chatWindow) return;
        const p = document.createElement('p');
        p.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatWindow.appendChild(p);
        chatWindow.scrollTop = chatWindow.scrollHeight;
        saveChatHistory();
    }

    loadChatHistory();
    setupOnlineIndicator();

    if (sendBtn && userInput) {
        sendBtn.addEventListener('click', async () => {
            const text = userInput.value;
            if (text.trim() === "") return;
            addMessage('Tu', text);
            userInput.value = "";
            
            const typingP = document.createElement('p');
            typingP.id = 'typing-indicator';
            typingP.innerHTML = "<em>KARMA AI scrie...</em>";
            if(chatWindow) {
                chatWindow.appendChild(typingP);
                chatWindow.scrollTop = chatWindow.scrollHeight;
            }
            
            // Așteptăm răspunsul asincron (de la AI sau local)
            const response = await getBotResponse(text);
            
            const indicator = document.getElementById('typing-indicator');
            if (indicator) indicator.remove();
            
            addMessage('KARMA AI', response);
        });

        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendBtn.click();
        });
    }

    if (resetBtn && chatWindow) {
        resetBtn.addEventListener('click', () => {
            botState = { lastQuery: null, awaitingContext: null, selectedMode: null };
            chatWindow.innerHTML = '<center>Începutul conversației</center>';
            localStorage.removeItem('karma_chat_history');
        });
    }
});
