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
      name: "The Ludlow, Massachusetts Branch (United States)",
      lead: "The family's principal — and best-documented — emigration story: the line that settled in Ludlow, Massachusetts.",
      description: "Founded by Antonio Jacquim Guerra and Angela Rebelo (also recorded 'Rubello') Guerra, who settled in Ludlow, Hampden County, Massachusetts — a major destination for Portuguese immigrants, many from the Serra da Estrela, who came to work at the Ludlow Manufacturing Associates jute mills. Their American descendants spread from Massachusetts to Maryland and Virginia. This is now the most extensively documented emigration line from the family, supported by published obituaries.",
      keyAncestors: "Antonio Jacquim Guerra & Angela Rebelo (Rubello) Guerra → Ludlow, Massachusetts",
      migration: "Portugal (Freixo da Serra? — origin parish not yet confirmed) → Ludlow, Massachusetts → later branches in Maryland and Virginia. Passenger/emigration records still being sought."
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
      living: false, status: "likely", treeRoot: true,
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
      parents: ["p1", "p2"], spouses: ["p5"], children: ["p6", "p7", "p8"],
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
      parents: [], spouses: ["p3"], children: ["p6", "p7", "p8"],
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

    /* ---- THE LUDLOW, MASSACHUSETTS BRANCH (documented U.S. line) --------
       A REAL, separately-rooted line. It is intentionally NOT linked to the
       sample Freixo da Serra tree above, because whether founder Antonio's
       birthplace was Freixo da Serra is still an OPEN research question.
       `treeRoot: true` makes Antonio a starting point of the family tree. */
    {
      id: "lu1", name: "Antonio Jacquim Guerra", sex: "M", gen: 1, branch: "ramo-eua",
      migration: "us", living: false, status: "likely", treeRoot: true,
      birth: { date: "unknown", place: "Portugal (Freixo da Serra? — origin parish not yet confirmed)" },
      death: { date: "unknown", place: "Ludlow, Hampden County, Massachusetts, USA" },
      parents: [], spouses: ["lu2"], children: ["lu3", "lu4", "lu5", "lu6", "lu7"],
      notes: "Founding immigrant of the Ludlow, Massachusetts branch, with his wife Angela. Settled in Ludlow, Hampden County, MA — a major destination for Portuguese immigrants (many from the Serra da Estrela) who worked at the Ludlow Manufacturing Associates jute mills. OPEN QUESTION: whether his birthplace was specifically Freixo da Serra or a neighbouring Gouveia/Guarda parish is not yet confirmed; ship passenger manifests / Ellis Island records are still being sought.",
      sources: ["Named as father in the obituaries of his children (see Sources & Method)"]
    },
    {
      id: "lu2", name: "Angela Rebelo Guerra", sex: "F", gen: 1, branch: "ramo-eua",
      migration: "us", living: false, status: "likely",
      birth: { date: "unknown", place: "Portugal (origin parish not yet confirmed)" },
      death: { date: "unknown", place: "Ludlow, Massachusetts, USA" },
      parents: [], spouses: ["lu1"], children: ["lu3", "lu4", "lu5", "lu6", "lu7"],
      notes: "Matriarch of the Ludlow branch; surname also recorded as 'Rubello'. Her given name, Angela, carries down to a later generation (Angela Guerra Roelse). OPEN QUESTION: which 'Angela Guerra' family stories refer to — this immigrant matriarch or the later-generation Angela Guerra Roelse.",
      sources: ["Named as mother in the obituaries of her children (see Sources & Method)"]
    },
    {
      id: "lu3", name: "Grace Guerra (Fitzsimmons)", sex: "F", gen: 2, branch: "ramo-eua",
      migration: "us", living: false, status: "confirmed",
      birth: { date: "8 May 1920", place: "Ludlow, Massachusetts, USA" },
      death: { date: "26 Apr 2020", place: "Woodstock, Virginia, USA" },
      parents: ["lu1", "lu2"], spouses: [], children: [],
      notes: "Eldest of the five Ludlow-born children; married surname Fitzsimmons. Lived to nearly 100.",
      sources: ["Obituary of Grace Fitzsimmons (Legacy.com / Northern Virginia Daily / Valley Funeral Service, 2020)"]
    },
    {
      id: "lu4", name: "Lourdes Guerra (Lourenço)", sex: "F", gen: 2, branch: "ramo-eua",
      migration: "us", living: false, status: "confirmed",
      birth: { date: "2 Aug 1921", place: "Ludlow, Massachusetts, USA" },
      death: { date: "25 Nov 2018", place: "Ludlow, Massachusetts, USA" },
      parents: ["lu1", "lu2"], spouses: [], children: [],
      notes: "Married surname Lourenço; remained in Ludlow. Her obituary lists all five siblings by name.",
      sources: ["Obituary of Lourdes (Guerra) Lourenco (The Republican / MassLive, 2018)"]
    },
    {
      id: "lu5", name: "John M. Guerra", sex: "M", gen: 2, branch: "ramo-eua",
      migration: "us", living: false, status: "confirmed",
      birth: { date: "1922", place: "Ludlow, Massachusetts, USA" },
      death: { date: "19 Dec 2006", place: "Ludlow, Massachusetts, USA" },
      parents: ["lu1", "lu2"], spouses: [], children: [],
      notes: "Remained in Ludlow, Massachusetts.",
      sources: ["Obituary of John M. Guerra (Ludlow Funeral Home / Legacy.com, 2006)"]
    },
    {
      id: "lu6", name: "Serafim \"Serf\" Lawrence Guerra", sex: "M", gen: 2, branch: "ramo-eua",
      migration: "us", living: false, status: "confirmed",
      birth: { date: "1926", place: "Ludlow, Massachusetts, USA" },
      death: { date: "2019", place: "Virginia, USA" },
      parents: ["lu1", "lu2"], spouses: ["lu8"], children: ["lu9"],
      notes: "U.S. Navy veteran (WWII); chemistry degree; interpreter for the Brazilian Embassy in Washington, DC; founded Guerra Technical Sales. Married Constance Amber Bell (a 74-year marriage) and raised eight children: Tony, Marvin, Chuck, Larry, Connie, Melissa, Michelle, and Pamela. Active in Maryland civic life, then Virginia (Virginia Tech planning bodies, Fauquier County zoning, Library of Virginia board). Buried at Gate of Heaven Cemetery, Silver Spring, Maryland. (Only his eldest son, Tony, is shown as a node here; the other seven children are named in his story.)",
      sources: ["Obituary of Serafim Lawrence Guerra (ForeverMissed.com online memorial, 1926–2019)"]
    },
    {
      id: "lu7", name: "James Guerra", sex: "M", gen: 2, branch: "ramo-eua",
      migration: "us", living: false, status: "likely",
      birth: { date: "unknown", place: "Ludlow, Massachusetts, USA" },
      death: { date: "unknown", place: "Ludlow, Massachusetts, USA" },
      parents: ["lu1", "lu2"], spouses: [], children: [],
      notes: "One of the five Ludlow-born siblings; remained in Ludlow, Massachusetts.",
      sources: ["Named among the siblings in the obituary of Lourdes (Guerra) Lourenco, 2018"]
    },
    {
      id: "lu8", name: "Constance Amber Bell Guerra", sex: "F", gen: 2, branch: "ramo-eua",
      migration: "us", living: false, status: "likely",
      birth: { date: "unknown", place: "USA" },
      death: { date: "unknown", place: "USA" },
      parents: [], spouses: ["lu6"], children: ["lu9"],
      notes: "Wife of Serafim Guerra; their marriage lasted 74 years.",
      sources: ["Named in the obituary of Serafim Lawrence Guerra, 2019"]
    },
    {
      id: "lu9", name: "Anthony \"Tony\" Lawrence Guerra Sr.", sex: "M", gen: 3, branch: "ramo-eua",
      migration: "us", living: false, status: "confirmed",
      birth: { date: "1945", place: "USA" },
      death: { date: "2024", place: "Frederick, Maryland, USA" },
      parents: ["lu6", "lu8"], spouses: [], children: ["lu10"],
      notes: "Eldest son of Serafim; later settled in Frederick, Maryland. Father of Angela Guerra Roelse, whose name carries the immigrant matriarch's name into a new generation.",
      sources: ["Obituary of Anthony Lawrence Guerra Sr. (Beltway Cremation Center, 2024)"]
    },
    {
      id: "lu10", name: "Angela Guerra Roelse", sex: "F", gen: 4, branch: "ramo-eua",
      migration: "us", living: true, status: "likely",
      birth: { date: "living", place: "withheld" },
      death: { date: "", place: "" },
      parents: ["lu9"], spouses: [], children: [],
      notes: "Daughter of Anthony 'Tony' Guerra Sr.; carries the given name of the immigrant matriarch, Angela. Shown without personal details as she may be living.",
      sources: ["Mentioned in the obituary of Anthony Lawrence Guerra Sr., 2024"]
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
