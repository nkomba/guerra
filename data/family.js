/* ==========================================================================
   family.js — THE FAMILY TREE DATA  (edit this file to add your relatives)
   --------------------------------------------------------------------------
   HOW THIS WORKS
   • Everything the Family Tree page shows comes from the two lists below:
       GUERRA_DATA.branches  — the family branches / lines
       GUERRA_DATA.people    — one entry per person
   • This is plain data. You do NOT need to know how to program to edit it.
     Copy an existing { ... } block, paste it, and change the values.
   • Keep every entry separated by a comma. Keep quotation marks around text.

   IMPORTANT — this is clearly-marked SAMPLE data
   • The people below are ILLUSTRATIVE EXAMPLES to show the site working.
     Replace them with your real, documented relatives. Delete any you don't need.

   EVIDENCE STATUS  — pick one for each person:
     "confirmed"  = supported by a primary record you have reviewed
     "likely"     = strong indirect evidence, not yet fully proven
     "unverified" = a lead or claim not yet checked
     "tradition"  = family story / oral history, treat with care
   See sources.html for full definitions.

   LIVING PEOPLE
   • Set  "living": true  for anyone who may still be alive. The site will
     automatically hide their details and show only a placeholder, to protect
     privacy. Never publish details of a living person without their consent
     (see privacy.html).

   IDs & RELATIONSHIPS
   • Each person has a unique "id" (e.g. "p1"). Link relatives by their id:
       "parents": ["p1","p2"]   "spouses": ["p3"]   "children": ["p8","p9"]
   • "gen" is the generation number (1 = earliest known). It only controls
     how people are grouped visually.
   ========================================================================== */

window.GUERRA_DATA = {

  /* ---- BRANCHES ------------------------------------------------------ */
  /* Each PERSON may also carry a "migration" tag used for tree colour-coding
     and the games: "portugal" (default, stayed), "us", or "brazil". Only the
     people who emigrated need the tag; everyone else defaults to Portugal. */
  branches: [
    {
      id: "casa-do-alto",
      name: "Casa do Alto (Main Paternal Line)",
      lead: "The senior Guerra line traced continuously in Freixo da Serra.",
      description: "The best-documented line of the family, farming the high ground above the village. This branch anchors most of the confirmed records in the tree.",
      keyAncestors: "João Guerra & Maria dos Santos → Manuel Guerra & Rosa Nunes",
      migration: "Remained rooted in Freixo da Serra through the 19th century, with later members moving to Gouveia town and Lisbon for work in the wool trade."
    },
    {
      id: "ramo-eua",
      name: "From Freixo da Serra to America (United States)",
      lead: "The family's principal emigration story — Guerra relatives who crossed the Atlantic to the United States.",
      description: "The largest and most significant migration branch of the family. Like many from mainland Beira Alta, our people left the Serra da Estrela for the United States — most often the textile cities of New England (Fall River, New Bedford, Lowell, Providence) and later New Jersey. This is the branch that carries the family into its American generations.",
      keyAncestors: "[U.S. emigrant ancestor — name to add] (arrived c. 19—)",
      migration: "Freixo da Serra → port of departure → Ellis Island / New York → New England textile cities (and later New Jersey). Passenger manifests after 1906 often name the exact village of origin."
    },
    {
      id: "ramo-antonia",
      name: "Antónia's Line (Maternal Connection)",
      lead: "Descends from Antónia Guerra, who married into the Lopes family.",
      description: "A sister line that married into the Lopes family of the same parish. Included here to show how maternal connections are recorded alongside the surname line.",
      keyAncestors: "Antónia Guerra & Francisco Lopes",
      migration: "Largely stayed in the Gouveia municipality."
    },
    {
      id: "ramo-brasil",
      name: "The Brazil Emigrants",
      lead: "Guerra relatives who emigrated to Brazil in the early 1900s.",
      description: "Members of the family who left the Serra da Estrela for Brazil during the great wave of Portuguese emigration. Their descendants are actively sought — see Contribute.",
      keyAncestors: "Joaquim Guerra (emigrated 1901)",
      migration: "Freixo da Serra → Porto → São Paulo, Brazil (passenger records under review)."
    }
  ],

  /* ---- PEOPLE -------------------------------------------------------- */
  people: [
    /* GENERATION 1 ---------------------------------------------------- */
    {
      id: "p1", name: "João Guerra", sex: "M", gen: 1, branch: "casa-do-alto",
      living: false, status: "likely",
      birth: { date: "abt 1820", place: "Freixo da Serra, Gouveia, Portugal" },
      death: { date: "1889", place: "Freixo da Serra, Gouveia, Portugal" },
      parents: [], spouses: ["p2"], children: ["p3", "p4"],
      notes: "SAMPLE ENTRY. Earliest reliably identified ancestor of the Casa do Alto line. Birth year estimated from age at marriage; parish baptism not yet located.",
      sources: ["Parish marriage register, Freixo da Serra (transcription on file)", "Family tradition of the Casa do Alto"]
    },
    {
      id: "p2", name: "Maria dos Santos", sex: "F", gen: 1, branch: "casa-do-alto",
      living: false, status: "likely",
      birth: { date: "abt 1824", place: "Gouveia, Portugal" },
      death: { date: "1901", place: "Freixo da Serra, Gouveia, Portugal" },
      parents: [], spouses: ["p1"], children: ["p3", "p4"],
      notes: "SAMPLE ENTRY. Wife of João Guerra. Maiden surname 'dos Santos' recorded in the marriage entry; her own parents not yet identified.",
      sources: ["Parish marriage register, Freixo da Serra (transcription on file)"]
    },

    /* GENERATION 2 ---------------------------------------------------- */
    {
      id: "p3", name: "Manuel Guerra", sex: "M", gen: 2, branch: "casa-do-alto",
      living: false, status: "confirmed",
      birth: { date: "12 Mar 1848", place: "Freixo da Serra, Gouveia, Portugal" },
      death: { date: "1922", place: "Freixo da Serra, Gouveia, Portugal" },
      parents: ["p1", "p2"], spouses: ["p5"], children: ["p6", "p7", "p8", "p16"],
      notes: "SAMPLE ENTRY. Head of the Casa do Alto in the late 19th century. Baptism record reviewed and confirms parents and date.",
      sources: ["Baptism register, Freixo da Serra parish, 1848", "Civil death record, Gouveia, 1922"]
    },
    {
      id: "p4", name: "Antónia Guerra", sex: "F", gen: 2, branch: "ramo-antonia",
      living: false, status: "confirmed",
      birth: { date: "1851", place: "Freixo da Serra, Gouveia, Portugal" },
      death: { date: "1929", place: "Gouveia, Portugal" },
      parents: ["p1", "p2"], spouses: ["p9"], children: ["p10"],
      notes: "SAMPLE ENTRY. Sister of Manuel; founder of the maternal Lopes connection.",
      sources: ["Baptism register, Freixo da Serra parish, 1851"]
    },
    {
      id: "p5", name: "Rosa Nunes", sex: "F", gen: 2, branch: "casa-do-alto",
      living: false, status: "confirmed",
      birth: { date: "1852", place: "Figueiró da Serra, Gouveia, Portugal" },
      death: { date: "1930", place: "Freixo da Serra, Gouveia, Portugal" },
      parents: [], spouses: ["p3"], children: ["p6", "p7", "p8", "p16"],
      notes: "SAMPLE ENTRY. Married Manuel Guerra in 1874. Born in the neighbouring parish of Figueiró da Serra.",
      sources: ["Parish marriage register, 1874"]
    },
    {
      id: "p9", name: "Francisco Lopes", sex: "M", gen: 2, branch: "ramo-antonia",
      living: false, status: "likely",
      birth: { date: "abt 1848", place: "Gouveia, Portugal" },
      death: { date: "1915", place: "Gouveia, Portugal" },
      parents: [], spouses: ["p4"], children: ["p10"],
      notes: "SAMPLE ENTRY. Married into the family through Antónia Guerra.",
      sources: ["Parish marriage register, 1874"]
    },

    /* GENERATION 3 ---------------------------------------------------- */
    {
      id: "p6", name: "José Guerra", sex: "M", gen: 3, branch: "casa-do-alto",
      living: false, status: "confirmed",
      birth: { date: "1876", place: "Freixo da Serra, Gouveia, Portugal" },
      death: { date: "1954", place: "Gouveia, Portugal" },
      parents: ["p3", "p5"], spouses: ["p11"], children: ["p12", "p13"],
      notes: "SAMPLE ENTRY. Continued the Casa do Alto line; later moved to Gouveia town for the textile mills.",
      sources: ["Baptism register, Freixo da Serra parish, 1876", "1900 parish census (rol de confessados)"]
    },
    {
      id: "p7", name: "Joaquim Guerra", sex: "M", gen: 3, branch: "ramo-brasil",
      migration: "brazil", living: false, status: "unverified",
      birth: { date: "1879", place: "Freixo da Serra, Gouveia, Portugal" },
      death: { date: "unknown", place: "Brazil (presumed)" },
      parents: ["p3", "p5"], spouses: [], children: [],
      notes: "SAMPLE ENTRY. Family tradition says Joaquim emigrated to São Paulo, Brazil around 1901. Passenger list not yet confirmed — HELP WANTED (see Contribute). Descendants in Brazil are actively sought.",
      sources: ["Oral history from the Casa do Alto (recorded 1998)"]
    },
    {
      id: "p8", name: "Ana Guerra", sex: "F", gen: 3, branch: "casa-do-alto",
      living: false, status: "likely",
      birth: { date: "1882", place: "Freixo da Serra, Gouveia, Portugal" },
      death: { date: "1961", place: "Seia, Portugal" },
      parents: ["p3", "p5"], spouses: [], children: [],
      notes: "SAMPLE ENTRY. Baptism located; later life in Seia known only from family accounts.",
      sources: ["Baptism register, Freixo da Serra parish, 1882"]
    },

    /* ---- U.S. EMIGRANT BRANCH (placeholders — fill in from records) ---- */
    {
      id: "p16", name: "[U.S. emigrant ancestor — name to add]", sex: "?", gen: 3, branch: "ramo-eua",
      migration: "us", living: false, status: "unverified",
      birth: { date: "[birth year — to add]", place: "Freixo da Serra, Gouveia, Portugal" },
      death: { date: "[to add]", place: "[U.S. city / state — to add]" },
      parents: ["p3", "p5"], spouses: [], children: ["p17"],
      notes: "PLACEHOLDER — the family's U.S. emigrant. Fill in from records: full name; year of departure and arrival; port of departure; ship name; Ellis Island / New York manifest reference; first U.S. city and state (often a New England textile city such as Fall River, New Bedford, Lowell, or Providence, or later New Jersey); naturalization details.",
      sources: ["To add: Ellis Island / New York passenger manifest (post-1906 lists the village of origin)", "To add: U.S. Census 1920 / 1930", "To add: Petition for Naturalization"]
    },
    {
      id: "p17", name: "[U.S.-born descendant — name to add]", sex: "?", gen: 4, branch: "ramo-eua",
      migration: "us", living: false, status: "unverified",
      birth: { date: "[to add]", place: "[U.S. state — to add]" },
      death: { date: "", place: "" },
      parents: ["p16"], spouses: [], children: [],
      notes: "PLACEHOLDER — first American-born generation of the family. Replace with a real relative (mark living:true, with consent, if they may be alive).",
      sources: []
    },
    {
      id: "p11", name: "Amélia Figueiredo", sex: "F", gen: 3, branch: "casa-do-alto",
      living: false, status: "likely",
      birth: { date: "1881", place: "Gouveia, Portugal" },
      death: { date: "1959", place: "Gouveia, Portugal" },
      parents: [], spouses: ["p6"], children: ["p12", "p13"],
      notes: "SAMPLE ENTRY. Wife of José Guerra.",
      sources: ["Parish marriage register, 1903"]
    },
    {
      id: "p10", name: "Domingos Lopes", sex: "M", gen: 3, branch: "ramo-antonia",
      living: false, status: "unverified",
      birth: { date: "abt 1878", place: "Gouveia, Portugal" },
      death: { date: "1946", place: "Gouveia, Portugal" },
      parents: ["p4", "p9"], spouses: [], children: [],
      notes: "SAMPLE ENTRY. Son of Antónia Guerra and Francisco Lopes. Details need review.",
      sources: []
    },

    /* GENERATION 4 ---------------------------------------------------- */
    {
      id: "p12", name: "Carlos Guerra", sex: "M", gen: 4, branch: "casa-do-alto",
      living: false, status: "confirmed",
      birth: { date: "1908", place: "Gouveia, Portugal" },
      death: { date: "1989", place: "Lisbon, Portugal" },
      parents: ["p6", "p11"], spouses: ["p14"], children: ["p15"],
      notes: "SAMPLE ENTRY. Moved to Lisbon in the 1930s. Grandfather of living family members.",
      sources: ["Civil birth record, Gouveia, 1908", "Civil death record, Lisbon, 1989"]
    },
    {
      id: "p13", name: "Deolinda Guerra", sex: "F", gen: 4, branch: "casa-do-alto",
      living: false, status: "likely",
      birth: { date: "1911", place: "Gouveia, Portugal" },
      death: { date: "1993", place: "Gouveia, Portugal" },
      parents: ["p6", "p11"], spouses: [], children: [],
      notes: "SAMPLE ENTRY. Sister of Carlos Guerra; remained in Gouveia. Details from family accounts.",
      sources: ["Civil birth record, Gouveia, 1911"]
    },
    {
      id: "p14", name: "Beatriz Ramos", sex: "F", gen: 4, branch: "casa-do-alto",
      living: false, status: "likely",
      birth: { date: "1912", place: "Lisbon, Portugal" },
      death: { date: "1995", place: "Lisbon, Portugal" },
      parents: [], spouses: ["p12"], children: ["p15"],
      notes: "SAMPLE ENTRY. Wife of Carlos Guerra.",
      sources: []
    },
    {
      id: "p15", name: "Living Descendant", sex: "?", gen: 4, branch: "casa-do-alto",
      living: true, status: "confirmed",
      birth: { date: "living", place: "withheld" },
      death: { date: "", place: "" },
      parents: ["p12", "p14"], spouses: [], children: [],
      notes: "SAMPLE ENTRY showing how a LIVING person appears: details are hidden automatically. Replace with a real relative only with their consent.",
      sources: []
    }
  ]
};
