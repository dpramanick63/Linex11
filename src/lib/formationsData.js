export const formationsData = [
  // --- CATEGORY 1: TOTAL OFFENSE ---
  {
    id: 1, 
    category: "Total Offense", 
    title: "4-2-4",
    desc: "A throwback to the golden era of Brazilian football. This formation effectively splits the team into two distinct units: a defensive block of six and an attacking line of four. By bypassing the midfield build-up, it looks to create immediate 4v4 duels against the opponent's back line.",
    roles: "Midfielders must be elite box-to-box engines to cover the huge gaps.", 
    weakness: "Easily overrun by a 3-man midfield. The two CMs can get isolated."
  },
  {
    id: 2, 
    category: "Total Offense", 
    title: "4-3-3 Attack",
    desc: "An aggressive evolution of the 4-3-3. It replaces the defensive anchor (CDM) with a pure creator (CAM). This forms a midfield triangle pointing towards the goal, prioritizing chance creation and through-balls over defensive stability.",
    roles: "The CAM needs total freedom to roam. Wingers stay high and wide.", 
    weakness: "The back four is exposed. Counter-attacks through the middle are fatal."
  },
  {
    id: 3, 
    category: "Total Offense", 
    title: "4-2-1-3",
    desc: "A balanced juggernaut. It keeps the dangerous front four of the 4-2-4 but inserts a playmaker (CAM) to link play. The two CDMs provide a safety net, allowing the attackers to press high without fear.",
    roles: "Front 4 stay high to press. CDMs hold position strictly.", 
    weakness: "A disconnect can form between the CDMs and the CAM if marked."
  },
  {
    id: 4, 
    category: "Total Offense", 
    title: "3-4-3 Flat",
    desc: "Provides extreme width. The Left and Right Midfielders are essentially wingers, meaning you attack with a line of 5. The wide center-backs must be comfortable defending in wide areas when the mids push up.",
    roles: "LM/RM need elite stamina to cover the entire flank.", 
    weakness: "The space behind the wide midfielders is the 'kill zone' for opponents."
  },
  {
    id: 5, 
    category: "Total Offense", 
    title: "3-4-3 Diamond",
    desc: "Chaotic and overwhelming. It packs the center with a diamond midfield (CDM, LM, RM, CAM) while keeping a front three. It creates passing triangles everywhere but abandons the flanks defensively.",
    roles: "Complete central dominance. Players must swap positions fluidly.", 
    weakness: "Extremely vulnerable to long balls into the wide channels."
  },
  {
    id: 6, 
    category: "Total Offense", 
    title: "3-4-1-2",
    desc: "Designed to pin the opponent deep. The CAM plays 'in the hole' behind two strikers, forcing the opposition defense to stay narrow. This creates massive space for your wide midfielders to attack.",
    roles: "The CAM is the conductor. Strikers must split to create gaps.", 
    weakness: "Requires very specific player profiles. Wingers must also defend."
  },
  {
    id: 7, 
    category: "Total Offense", 
    title: "3-4-2-1",
    desc: "The 'Box Midfield' favorite of modern coaches like Tuchel. Instead of wingers, two 'Number 10s' play narrowly behind the striker. This overloads the central channel and frees up the wings for overlapping wingbacks.",
    roles: "The two AMs operate in the 'half-spaces'. Wingbacks provide all width.", 
    weakness: "If the wingbacks are pinned back, the team has no outlet."
  },
  {
    id: 8, 
    category: "Total Offense", 
    title: "4-4-1-1 Attack",
    desc: "Deceptively attacking. It looks like a standard flat formation, but the CF plays just off the shoulder of the striker, looking for knockdowns. It provides a bridge between midfield and attack.",
    roles: "The CF acts as a shadow striker, arriving late into the box.", 
    weakness: "Can lack creativity if the two CMs are too defensive."
  },

  // --- CATEGORY 2: THE CONTROLLERS ---
  {
    id: 9, 
    category: "The Controllers", 
    title: "4-3-3 Standard",
    desc: "The Holy Grail of football. It creates natural triangles across the pitch, allowing for tiki-taka passing. It covers every zone evenly, with three midfielders rotating roles between defense and attack.",
    roles: "Requires high technical ability. CMs must attack and defend equally.", 
    weakness: "Complex rotation needed. Bad positioning leads to isolation."
  },
  {
    id: 10, 
    category: "The Controllers", 
    title: "4-3-3 Holding",
    desc: "The 'Pivot' system. A single CDM sits deep to protect the defense and recycle possession. This allows the fullbacks to push up high, effectively creating a 2-3-5 formation in possession.",
    roles: "The CDM (Busquets role) is the key. They dictate the tempo.", 
    weakness: "If the CDM is man-marked, the build-up play completely stalls."
  },
  {
    id: 11, 
    category: "The Controllers", 
    title: "4-3-3 False 9",
    desc: "The Messi Role. The 'Striker' drops deep into midfield, dragging defenders out of position. If they follow, the wingers sprint into the gap. If they don't, you overload the midfield 4v3.",
    roles: "CF needs high passing stats. Wingers must be goal scorers.", 
    weakness: "Requires intelligent movement. Without runs, it becomes stagnant."
  },
  {
    id: 12, 
    category: "The Controllers", 
    title: "4-2-3-1 Narrow",
    desc: "Forces the game through the middle. Uses 3 Central Attacking Midfielders to create a dense block of technical players. They use quick, short passes to unlock defenses through the center.",
    roles: "Quick 1-2 passing is essential. Fullbacks provide the only width.", 
    weakness: "Zero natural width. Easy to defend by packing the box."
  },
  {
    id: 13, 
    category: "The Controllers", 
    title: "4-2-3-1 Wide",
    desc: "The most popular formation in the world. It offers perfect balance: 2 holders to protect, 3 creators to attack, and 1 finisher. It adapts to any situation, defending in a 4-5-1 and attacking in a 4-2-4.",
    roles: "Double pivot allows the front 4 to take risks.", 
    weakness: "Can become predictable. Relies heavily on the CAM."
  },
  {
    id: 14, 
    category: "The Controllers", 
    title: "4-1-2-1-2 Narrow",
    desc: "The Midfield Diamond. It packs the center with 4 midfielders, ensuring you dominate possession. The two strikers can split wide to chase balls or combine centrally.",
    roles: "Fullbacks must be tireless runners to provide width.", 
    weakness: "Weak against wing play. Opposing fullbacks have acres of space."
  },
  {
    id: 15, 
    category: "The Controllers", 
    title: "4-1-2-1-2 Wide",
    desc: "A stretched diamond. It pulls the CMs out to become wide midfielders (LM/RM). This adds width but isolates the single CDM in the middle, leaving them exposed to counter-attacks.",
    roles: "End-to-end play. Strikers thrive on crosses from wide.", 
    weakness: "The single CDM can be destroyed by a strong opposing midfield."
  },
  {
    id: 16, 
    category: "The Controllers", 
    title: "4-1-4-1",
    desc: "The Guardiola shape. It looks defensive, but in possession, the two central midfielders push up to become 'Free 8s', effectively making it a 4-3-3. Seamless transition between defense and attack.",
    roles: "CMs must be creative playmakers. CDM anchors the team.", 
    weakness: "High defensive line risk. CDM can be left alone on counters."
  },
  {
    id: 17, 
    category: "The Controllers", 
    title: "4-4-1-1 Flat",
    desc: "A variation of the 4-4-2 where one striker drops deep to link play. Good for teams that lack a true 'Number 10' but want a bridge between the midfield and the striker.",
    roles: "The CF drops deep to receive and turn.", 
    weakness: "Lower goal threat. Relies heavily on the lone striker."
  },
  {
    id: 18, 
    category: "The Controllers", 
    title: "3-5-2",
    desc: "A matchup nightmare. It allows you to match a 3-man midfield while keeping two strikers. It is flexible, shifting between a 5-3-2 in defense and a 3-5-2 in attack.",
    roles: "Wingbacks dictate success. If they are lazy, the system fails.", 
    weakness: "Exhausting for wide players. Space behind wingbacks is open."
  },
  {
    id: 19, 
    category: "The Controllers", 
    title: "3-5-1-1",
    desc: "A conservative 3-5-2. Instead of two strikers, one drops off to mark the opponent's CDM or pick up the ball deep. It floods the midfield with 6 bodies.",
    roles: "Tactical marking. CF disrupts opponent build-up.", 
    weakness: "Lone striker isolation. Goals depend on midfield runners."
  },
  {
    id: 20, 
    category: "The Controllers", 
    title: "3-1-4-2",
    desc: "Similar to the 3-5-2 but with a dedicated defensive anchor. This allows the other two Central Midfielders to push much higher into the box, acting almost as auxiliary strikers.",
    roles: "Aggressive central mids. CDM protects the back three alone.", 
    weakness: "Space behind the CMs. CDM can be overwhelmed."
  },
  {
    id: 21, 
    category: "The Controllers", 
    title: "4-3-1-2",
    desc: "The Central Wall. Three CMs play closely together in a flat line, making the middle impenetrable. The CAM sits ahead to feed two strikers. It forces opponents wide.",
    roles: "Hard to break down centrally. Strikers work the channels.", 
    weakness: "No width. Opponents can double-team your fullbacks."
  },
  {
    id: 22, 
    category: "The Controllers", 
    title: "4-3-2-1",
    desc: "The 'Christmas Tree'. A narrow formation where 3 CMs protect the defense, and two CAMs play just behind a lone striker. It funnels the ball centrally for intricate combinations.",
    roles: "Attacking fullbacks are mandatory. CAMs must be creative.", 
    weakness: "Congested middle. Can become stagnant without width."
  },

  // --- CATEGORY 3: IRON FORTRESSES ---
  {
    id: 23, 
    category: "Iron Fortresses", 
    title: "4-4-2 Flat",
    desc: "The classic structure. Two banks of four cover the width of the pitch perfectly. It relies on discipline, shape, and rapid counter-attacks via the wings.",
    roles: "Discipline is key. Everyone must hold position.", 
    weakness: "Midfield outnumbered against a 4-3-3."
  },
  {
    id: 24, 
    category: "Iron Fortresses", 
    title: "4-4-2 Holding",
    desc: "A purely defensive block. The two central midfielders are CDMs who refuse to move forward, creating a block of 6 defensive players that is incredibly hard to break.",
    roles: "Best for securing a lead in the final minutes.", 
    weakness: "Very little creativity. Strikers are often stranded."
  },
  {
    id: 25, 
    category: "Iron Fortresses", 
    title: "4-3-3 Defend",
    desc: "Transforms the 4-3-3 into a counter-attacking machine. Two CDMs sit deep to screen the defense, while one CM acts as a launcher to the fast wingers.",
    roles: "Fast wingers required for the outlet pass.", 
    weakness: "Low possession. You invite pressure constantly."
  },
  {
    id: 26, 
    category: "Iron Fortresses", 
    title: "4-2-2-2",
    desc: "The 'Magic Rectangle'. Two CDMs and two inverted CAMs form a box in the middle. It creates massive congestion, forcing opponents wide where they are trapped.",
    roles: "Box midfield domination. CAMs act as wide playmakers.", 
    weakness: "Complex to organize. Requires high tactical IQ."
  },
  {
    id: 27, 
    category: "Iron Fortresses", 
    title: "4-5-1 Flat",
    desc: "Parking the Bus. The goal is not to score, but not to concede. The midfield line sits on the toes of the defenders, creating a double barrier.",
    roles: "Closing out games. Striker is just a defensive runner.", 
    weakness: "Zero attack intent. Impossible to chase a game."
  },
  {
    id: 28, 
    category: "Iron Fortresses", 
    title: "4-5-1 Attack",
    desc: "A slight variation where CMs are positioned higher to retain some possession, allowing the team to defend with the ball rather than just absorbing pressure.",
    roles: "Holding the ball to kill time.", 
    weakness: "Lone striker is still very isolated."
  },
  {
    id: 29, 
    category: "Iron Fortresses", 
    title: "5-3-2",
    desc: "A defensive fortress. 3 CBs deal with crosses, while 3 CMs clog the middle. When the ball is won, it is played immediately to the two strikers who counter 2v2.",
    roles: "Counter via strikers. Wingbacks are primarily defenders.", 
    weakness: "Passive. You surrender control to the opponent."
  },
  {
    id: 30, 
    category: "Iron Fortresses", 
    title: "5-2-1-2",
    desc: "A 5-back formation designed for counter-attacking through the middle. The CAM links the deep defense to the two strikers for rapid transitions.",
    roles: "CAM is the sole link. Fast strikers are needed.", 
    weakness: "The 2-man midfield can be dominated."
  },
  {
    id: 31, 
    category: "Iron Fortresses", 
    title: "5-2-2-1",
    desc: "Solid defense with a pincer attack. Two wide forwards play narrowly behind the striker, allowing for 3-man counters while keeping 7 players back.",
    roles: "Wide forwards support the striker on counters.", 
    weakness: "Isolated striker if the wide men are pinned back."
  },
  {
    id: 32, 
    category: "Iron Fortresses", 
    title: "5-4-1 Flat",
    desc: "The most defensive formation in football. A double wall of 5 and 4. Used strictly for survival against vastly superior opponents.",
    roles: "Pure survival. Clearances and blocks.", 
    weakness: "No outlet. The ball comes right back after clearing."
  },
  {
    id: 33, 
    category: "Iron Fortresses", 
    title: "5-4-1 Diamond",
    desc: "Uses the security of a back 5 but attempts to keep possession with a diamond midfield. Tries to frustrate opponents by holding the ball in harmless areas.",
    roles: "Control without risk. Slowing the tempo.", 
    weakness: "Lack of penetration in the final third."
  },
  {
    id: 34, 
    category: "Iron Fortresses", 
    title: "4-1-3-2",
    desc: "A narrow variation intended to clog the middle. It creates a funnel shape that forces the opponent wide. Your center-backs must be dominant in the air.",
    roles: "Aerial CBs are essential. Strikers press the center.", 
    weakness: "Flanks are exposed to good wingers."
  },
];