/* ==========================================================================
   family.js — THE FAMILY TREE DATA
   --------------------------------------------------------------------------
   Imported from the family's Ancestry.com export
   ("Guerra Robelo Sala Nkomba Family Tree", Aug 2026).

   PRIVACY: every LIVING person is stored ONLY as "Living relative" with NO
   personal details (name, dates, places all withheld) so that nothing private
   about a living person appears in this public file. The tree still shows them
   as a masked node so the structure holds. Deceased individuals are shown from
   the documented tree. See privacy.html.

   Migration tag drives tree colour: "portugal" (stayed), "us", or "brazil".
   `treeRoot: true` marks a person who starts a line in the family tree.
   ========================================================================== */

window.GUERRA_DATA = {

  branches: [
    {
      id: "guerra", name: "The Guerra Family — Freixo da Serra to Ludlow, MA",
      lead: "The paternal line: from Freixo da Serra, Portugal, to Ludlow, Massachusetts and across the United States.",
      description: "Founded in America by Antonio J. Guerra (born 1893 in Freixo da Serra, Gouveia, Guarda) and Angela Rebello Guerra, who settled in Ludlow, Massachusetts and worked in its jute mills. Their children and grandchildren spread across Massachusetts, Washington D.C., Maryland and Virginia. Imported from the family's Ancestry.com tree.",
      keyAncestors: "Antonio J. Guerra (Freixo da Serra, 1893) & Angela Rebello Guerra",
      migration: "Freixo da Serra, Portugal → Ludlow, Massachusetts → Washington D.C., Maryland, Virginia."
    },
    {
      id: "sala", name: "The Sala Family",
      lead: "A maternal American line joined to the Guerra family by marriage.",
      description: "The Sala family and its connected American ancestors (Blair, Huddleston, and others), documented in the family's Ancestry.com tree. Details are being reviewed and expanded.",
      keyAncestors: "The Sala line and connected families",
      migration: "United States."
    },
    {
      id: "nkomba", name: "The Nkomba Family",
      lead: "A family line joined to the tree in the most recent generations.",
      description: "The Nkomba family, connected to the Guerra and Sala lines in recent generations. Details are being reviewed and expanded.",
      keyAncestors: "The Nkomba line",
      migration: "United States."
    },
  ],

  people: [
    {
      id: "i1", name: "Valentine Jacob Sala", sex: "M", gen: 1, branch: "sala",
      migration: "us", living: false, status: "confirmed", treeRoot: true,
      birth: { date: "1724", place: "Worms, Rhineland-Palatinate, Germany" },
      death: { date: "1799", place: "Lancaster County, Pennsylvania, USA" },
      parents: [], spouses: [], children: ["i3"],
      notes: "Imported from the family's Ancestry.com tree.",
      photo: "assets/img/valentine-j-sala.jpg",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i2", name: "Daniel Morgan", sex: "M", gen: 1, branch: "sala",
      migration: "us", living: false, status: "confirmed", treeRoot: true,
      birth: { date: "25 Mar 1736", place: "Hunterdon, NJ, USA" },
      death: { date: "25 Mar 1790", place: "" },
      parents: [], spouses: [], children: [],
      notes: "Imported from the family's Ancestry.com tree.",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i3", name: "Jacob Otto Sala", sex: "M", gen: 2, branch: "sala",
      migration: "us", living: false, status: "confirmed",
      birth: { date: "Jul 1769", place: "Hesse, Darmstadt, Hessen, Germany, " },
      death: { date: "26 Sep 1858", place: "West Point, Lee, Iowa, USA" },
      parents: ["i1"], spouses: [], children: ["i4", "i84", "i74", "i73", "i62"],
      notes: "Imported from the family's Ancestry.com tree.",
      photo: "assets/img/jacob-otto-sala.jpg",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i4", name: "Benjamin Sala", sex: "M", gen: 3, branch: "sala",
      migration: "us", living: false, status: "confirmed",
      birth: { date: "20 Jul 1817", place: "Summerhill, Cambria, Pennsylvania, USA" },
      death: { date: "16 Aug 1885", place: "Toledo, Lucas, Ohio, USA" },
      parents: ["i3"], spouses: ["i5"], children: ["i8"],
      notes: "Imported from the family's Ancestry.com tree.",
      photo: "assets/img/benjamin-sala.jpg",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i5", name: "Theisbe B Sala", sex: "F", gen: 1, branch: "sala",
      migration: "us", living: false, status: "confirmed", treeRoot: true,
      birth: { date: "1819", place: "Pennsylvania, United States of America" },
      death: { date: "4 September 1898", place: "Toledo, Lucas County, Ohio, United States of America" },
      parents: [], spouses: ["i4"], children: ["i8"],
      notes: "Imported from the family's Ancestry.com tree.",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i6", name: "Lucinda J Staton", sex: "F", gen: 1, branch: "sala",
      migration: "us", living: false, status: "confirmed", treeRoot: true,
      birth: { date: "7 December 1822", place: "Virginia" },
      death: { date: "15 November 1902", place: "Kanawha County, West Virginia" },
      parents: [], spouses: ["i7"], children: ["i13", "i15", "i14", "i12", "i16", "i17"],
      notes: "Imported from the family's Ancestry.com tree.",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i7", name: "Samuel W. Blair", sex: "M", gen: 1, branch: "sala",
      migration: "us", living: false, status: "confirmed", treeRoot: true,
      birth: { date: "10 Jan 1824", place: "Pennsylvania" },
      death: { date: "5 January 1892", place: "Kanawha, West Virginia" },
      parents: [], spouses: ["i6"], children: ["i13", "i15", "i14", "i12", "i16", "i17"],
      notes: "Imported from the family's Ancestry.com tree.",
      photo: "assets/img/samuel-c-blair.jpg",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i8", name: "James Milton Sala", sex: "M", gen: 2, branch: "sala",
      migration: "us", living: false, status: "confirmed",
      birth: { date: "11 April 1843", place: "Stark County, Ohio, United States of America" },
      death: { date: "19 August 1912", place: "Canton, Stark County, Ohio, United States of America" },
      parents: ["i4", "i5"], spouses: ["i10"], children: ["i20", "i18", "i27"],
      notes: "Imported from the family's Ancestry.com tree.",
      photo: "assets/img/james-milton-sala.jpg",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i9", name: "George Milton Huddleston", sex: "M", gen: 1, branch: "sala",
      migration: "us", living: false, status: "confirmed", treeRoot: true,
      birth: { date: "25 Dec 1846", place: "Kanawha, West Virginia, USA" },
      death: { date: "29 Dec 1928", place: "Kanawha, West Virginia, USA" },
      parents: [], spouses: ["i11"], children: ["i21"],
      notes: "Imported from the family's Ancestry.com tree.",
      photo: "assets/img/george-m-huddleston.jpg",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i10", name: "Hannah Perdue", sex: "F", gen: 1, branch: "sala",
      migration: "us", living: false, status: "confirmed", treeRoot: true,
      birth: { date: "27 July 1846", place: "Minerva, Stark County, Ohio, United States of America" },
      death: { date: "23 February 1936", place: "Decatur, Macon County, Illinois, United States of America" },
      parents: [], spouses: ["i8"], children: ["i20", "i18", "i27"],
      notes: "Imported from the family's Ancestry.com tree.",
      photo: "assets/img/hannah-perdue.jpg",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i11", name: "Leatha Annie Peters", sex: "F", gen: 1, branch: "sala",
      migration: "us", living: false, status: "confirmed", treeRoot: true,
      birth: { date: "Nov 27 1847", place: "Fayette, Virginia, United States" },
      death: { date: "May 08 1931", place: "Montgomery, West Virginia, USA" },
      parents: [], spouses: ["i9"], children: ["i21"],
      notes: "Imported from the family's Ancestry.com tree.",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i12", name: "Mary W Blair", sex: "F", gen: 2, branch: "sala",
      migration: "us", living: false, status: "likely",
      birth: { date: "1852", place: "" },
      death: { date: "", place: "" },
      parents: ["i7", "i6"], spouses: [], children: [],
      notes: "Imported from the family's Ancestry.com tree.",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i13", name: "Samuel Caldwell Blair", sex: "M", gen: 2, branch: "sala",
      migration: "us", living: false, status: "confirmed",
      birth: { date: "Oct 1852", place: "Buckingham, Buckingham, Virginia, United States" },
      death: { date: "bef 1952", place: "" },
      parents: ["i7", "i6"], spouses: [], children: ["i23"],
      notes: "Imported from the family's Ancestry.com tree.",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i14", name: "Andrew C Blair", sex: "M", gen: 2, branch: "sala",
      migration: "us", living: false, status: "likely",
      birth: { date: "1857", place: "" },
      death: { date: "", place: "" },
      parents: ["i7", "i6"], spouses: [], children: [],
      notes: "Imported from the family's Ancestry.com tree.",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i15", name: "William Rush Blair", sex: "M", gen: 2, branch: "sala",
      migration: "us", living: false, status: "likely",
      birth: { date: "3 May 1860", place: "Putnam, West Virginia" },
      death: { date: "", place: "" },
      parents: ["i7", "i6"], spouses: [], children: [],
      notes: "Imported from the family's Ancestry.com tree.",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i16", name: "Henry L Blair", sex: "M", gen: 2, branch: "sala",
      migration: "us", living: false, status: "likely",
      birth: { date: "1863", place: "" },
      death: { date: "", place: "" },
      parents: ["i7", "i6"], spouses: [], children: [],
      notes: "Imported from the family's Ancestry.com tree.",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i17", name: "Emma J Blair", sex: "F", gen: 2, branch: "sala",
      migration: "us", living: false, status: "likely",
      birth: { date: "1867", place: "" },
      death: { date: "", place: "" },
      parents: ["i7", "i6"], spouses: [], children: [],
      notes: "Imported from the family's Ancestry.com tree.",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i18", name: "Charles Bennet Sala", sex: "M", gen: 2, branch: "sala",
      migration: "us", living: false, status: "confirmed",
      birth: { date: "1871", place: "" },
      death: { date: "1949", place: "" },
      parents: ["i8", "i10"], spouses: ["i31"], children: [],
      notes: "Imported from the family's Ancestry.com tree.",
      photo: "assets/img/charles-b-sala.jpg",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i19", name: "Grace Geraldine Trescott", sex: "F", gen: 1, branch: "sala",
      migration: "us", living: false, status: "confirmed", treeRoot: true,
      birth: { date: "14 May 1873", place: "Marlborough, Stark, Ohio, USA" },
      death: { date: "23 Mar 1931", place: "Buffalo, Erie, New York, USA" },
      parents: [], spouses: [], children: [],
      notes: "Imported from the family's Ancestry.com tree.",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i20", name: "John Perdue Sala", sex: "M", gen: 2, branch: "sala",
      migration: "us", living: false, status: "confirmed",
      birth: { date: "30 Jun 1875", place: "Stark, Ohio" },
      death: { date: "3 Jun 1967", place: "Indianapolis, Marion, Indiana, USA" },
      parents: ["i8", "i10"], spouses: ["i30"], children: ["i34", "i38"],
      notes: "Imported from the family's Ancestry.com tree.",
      photo: "assets/img/john-p-sala.jpg",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i21", name: "Edward Emmett Huddleston", sex: "M", gen: 2, branch: "sala",
      migration: "us", living: false, status: "confirmed",
      birth: { date: "17 April 1876", place: "Pratt, Kanawha County, West Virginia, United States of America" },
      death: { date: "14 April 1945", place: "Charleston, Kanawha County, West Virginia, United States of America" },
      parents: ["i9", "i11"], spouses: ["i23"], children: ["i35"],
      notes: "Imported from the family's Ancestry.com tree.",
      photo: "assets/img/edward-e-huddleston.jpg",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i22", name: "Antonio Almeida Robelo", sex: "M", gen: 1, branch: "guerra",
      migration: "us", living: false, status: "confirmed", treeRoot: true,
      birth: { date: "1878", place: "Portugal" },
      death: { date: "1964", place: "Ludlow, Massachusetts, USA" },
      parents: [], spouses: ["i24"], children: ["i32", "i36", "i37", "i40", "i42", "i47"],
      notes: "Imported from the family's Ancestry.com tree.",
      photo: "assets/img/antonio-a-robelo.jpg",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i23", name: "Hattie Caldwell Huddleston", sex: "?", gen: 3, branch: "sala",
      migration: "us", living: false, status: "confirmed",
      birth: { date: "23 September 1878", place: "London, Kanawha County, West Virginia, United States of America" },
      death: { date: "30 June 1963", place: "Lynchburg, Lynchburg City, Virginia, United States of America" },
      parents: ["i13"], spouses: ["i21"], children: ["i35"],
      notes: "Imported from the family's Ancestry.com tree.",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i24", name: "Ermalinda Mello D’Oliveira", sex: "F", gen: 2, branch: "guerra",
      migration: "us", living: false, status: "confirmed",
      birth: { date: "1881", place: "Freixo da Serra, Guarda, Portugal" },
      death: { date: "1956", place: "Massachusetts" },
      parents: ["i77"], spouses: ["i22"], children: ["i32", "i36", "i37", "i40", "i42", "i47"],
      notes: "Imported from the family's Ancestry.com tree.",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i25", name: "Ermelinda D'Oliveira Melo", sex: "F", gen: 1, branch: "guerra",
      migration: "us", living: false, status: "confirmed", treeRoot: true,
      birth: { date: "1881", place: "Casal Vasco, Guarda, Portugal" },
      death: { date: "1956", place: "Massachusetts" },
      parents: [], spouses: [], children: ["i87"],
      notes: "Imported from the family's Ancestry.com tree.",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i26", name: "Gertrude Wells Doyle?", sex: "F", gen: 1, branch: "sala",
      migration: "us", living: false, status: "confirmed", treeRoot: true,
      birth: { date: "1881", place: "" },
      death: { date: "1951", place: "" },
      parents: [], spouses: ["i27"], children: [],
      notes: "Imported from the family's Ancestry.com tree.",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i27", name: "Reverend Homer E Sala", sex: "M", gen: 2, branch: "sala",
      migration: "us", living: false, status: "confirmed",
      birth: { date: "23 Mar 1885", place: "Ohio" },
      death: { date: "28 Mar 1945", place: "Jefferson, Kentucky, USA" },
      parents: ["i8", "i10"], spouses: ["i28", "i26"], children: ["i75"],
      notes: "Imported from the family's Ancestry.com tree.",
      photo: "assets/img/reverend-h-sala.jpg",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i28", name: "Laura A. Ash", sex: "F", gen: 1, branch: "sala",
      migration: "us", living: false, status: "confirmed", treeRoot: true,
      birth: { date: "1886", place: "" },
      death: { date: "1924", place: "" },
      parents: [], spouses: ["i27"], children: ["i75"],
      notes: "Imported from the family's Ancestry.com tree.",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i29", name: "Antonio J Guerra", sex: "M", gen: 1, branch: "guerra",
      migration: "us", living: false, status: "confirmed", treeRoot: true,
      birth: { date: "12 Oct 1893", place: "Freixo da Serra, Guarda, Portugal" },
      death: { date: "7 Dec 1950", place: "Ludlow City, Hampden, Massachusetts, USA" },
      parents: [], spouses: ["i32", "i87"], children: ["i51", "i41", "i45", "i44", "i48", "i52", "i43"],
      notes: "Imported from the family's Ancestry.com tree.",
      photo: "assets/img/antonio-j-guerra.jpg",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i30", name: "Joy Taylor Sala", sex: "F", gen: 1, branch: "sala",
      migration: "us", living: false, status: "confirmed", treeRoot: true,
      birth: { date: "5 April 1896", place: "Chicago, Cook County, Illinois, United States of America" },
      death: { date: "20 January 1979", place: "North Manchester, Wabash County, Indiana, United States of America" },
      parents: [], spouses: ["i20"], children: ["i34", "i38"],
      notes: "Imported from the family's Ancestry.com tree.",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i31", name: "Bertie E Barker", sex: "F", gen: 1, branch: "sala",
      migration: "us", living: false, status: "confirmed", treeRoot: true,
      birth: { date: "1899", place: "" },
      death: { date: "1967", place: "" },
      parents: [], spouses: ["i18"], children: [],
      notes: "Imported from the family's Ancestry.com tree.",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i32", name: "Angela Rebello Guerra", sex: "F", gen: 2, branch: "guerra",
      migration: "us", living: false, status: "confirmed",
      birth: { date: "abt 1901", place: "Guarda, Portugal" },
      death: { date: "1997", place: "Ludlow, Hampden, Massachusetts" },
      parents: ["i22", "i24"], spouses: ["i29"], children: ["i51", "i41", "i45", "i44", "i48", "i52", "i43"],
      notes: "Imported from the family's Ancestry.com tree.",
      photo: "assets/img/angela-r-guerra.jpg",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i33", name: "Casemira R. Alves", sex: "F", gen: 1, branch: "guerra",
      migration: "us", living: false, status: "confirmed", treeRoot: true,
      birth: { date: "11 Nov 1902", place: "Portugal" },
      death: { date: "13 Mar 1982", place: "Ludlow, Hampden, Massachusetts, USA" },
      parents: [], spouses: [], children: [],
      notes: "Imported from the family's Ancestry.com tree.",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i34", name: "John Robert Sala", sex: "M", gen: 2, branch: "sala",
      migration: "us", living: false, status: "confirmed",
      birth: { date: "30 Apr 1905", place: "Elyria, Lorain County, Ohio, United States of America" },
      death: { date: "30 May 1969", place: "Ohio County, West Virginia, USA" },
      parents: ["i20", "i30"], spouses: ["i35"], children: ["i50"],
      notes: "Imported from the family's Ancestry.com tree.",
      photo: "assets/img/john-robert-sala.jpg",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i35", name: "Helen Huddleston Sala", sex: "F", gen: 3, branch: "sala",
      migration: "us", living: false, status: "confirmed",
      birth: { date: "10 June 1906", place: "Beckley, Raleigh County, West Virginia, United States of America" },
      death: { date: "4 September 1967", place: "Bethany, Brooke County, West Virginia, United States of America" },
      parents: ["i21", "i23"], spouses: ["i34"], children: ["i50"],
      notes: "Imported from the family's Ancestry.com tree.",
      photo: "assets/img/helen-h-sala.jpg",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i36", name: "Serafin Rebelo", sex: "M", gen: 2, branch: "guerra",
      migration: "portugal", living: false, status: "confirmed",
      birth: { date: "abt 1908", place: "Portugal" },
      death: { date: "7 Nov 2003", place: "Coral Springs FL" },
      parents: ["i22", "i24"], spouses: [], children: [],
      notes: "Imported from the family's Ancestry.com tree.",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i37", name: "Alfred Rebelo", sex: "M", gen: 2, branch: "guerra",
      migration: "portugal", living: false, status: "likely",
      birth: { date: "29 Nov 1910", place: "Casal-Vasco, Portugal" },
      death: { date: "", place: "" },
      parents: ["i22", "i24"], spouses: [], children: [],
      notes: "Imported from the family's Ancestry.com tree.",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i38", name: "James W. Sala", sex: "M", gen: 2, branch: "sala",
      migration: "us", living: false, status: "confirmed",
      birth: { date: "1910", place: "Ohio" },
      death: { date: "6 Dec 1985", place: "Polk, Florida, United States" },
      parents: ["i20", "i30"], spouses: ["i70"], children: ["i81", "i67"],
      notes: "Imported from the family's Ancestry.com tree.",
      photo: "assets/img/james-m-sala.jpg",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i39", name: "James Elma Fitzsimmons", sex: "M", gen: 1, branch: "guerra",
      migration: "us", living: false, status: "likely", treeRoot: true,
      birth: { date: "abt 1915", place: "" },
      death: { date: "", place: "" },
      parents: [], spouses: ["i41"], children: ["i55"],
      notes: "Imported from the family's Ancestry.com tree.",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i40", name: "Grace Rebelo", sex: "F", gen: 2, branch: "guerra",
      migration: "portugal", living: false, status: "likely",
      birth: { date: "abt 1917", place: "Portugal" },
      death: { date: "", place: "" },
      parents: ["i22", "i24"], spouses: [], children: [],
      notes: "Imported from the family's Ancestry.com tree.",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i41", name: "Grace Guerra", sex: "F", gen: 2, branch: "guerra",
      migration: "us", living: false, status: "confirmed",
      birth: { date: "May 08, 1920", place: "Ludlow, Hampden, Massachusetts, USA" },
      death: { date: "26 Apr 2020", place: "Woodstock, Shenandoah, Virginia, USA" },
      parents: ["i29", "i32"], spouses: ["i39"], children: ["i55"],
      notes: "Imported from the family's Ancestry.com tree.",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i42", name: "Selvina Rebelo", sex: "F", gen: 2, branch: "guerra",
      migration: "us", living: false, status: "confirmed",
      birth: { date: "13 Sep 1920", place: "Ludlow, Hampden, Massachusetts" },
      death: { date: "26 July 2006", place: "Massachusetts" },
      parents: ["i22", "i24"], spouses: [], children: [],
      notes: "Imported from the family's Ancestry.com tree.",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i43", name: "Mary L Guerra", sex: "F", gen: 2, branch: "guerra",
      migration: "us", living: false, status: "likely",
      birth: { date: "abt 1921", place: "Massachusetts" },
      death: { date: "", place: "" },
      parents: ["i29", "i32"], spouses: [], children: [],
      notes: "Imported from the family's Ancestry.com tree.",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i44", name: "John Guerra", sex: "M", gen: 2, branch: "guerra",
      migration: "us", living: false, status: "confirmed",
      birth: { date: "30 Aug 1922", place: "Ludlow, Hampden, Massachusetts" },
      death: { date: "19 Dec 2006", place: "Ludlow Town, Ludlow, Hampden, Massachusetts, USA" },
      parents: ["i29", "i32"], spouses: ["i46"], children: ["i65", "i68", "i64", "i72", "i54"],
      notes: "Imported from the family's Ancestry.com tree.",
      photo: "assets/img/john-guerra.jpg",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i45", name: "Lourdes Guerra Lourenco", sex: "F", gen: 2, branch: "guerra",
      migration: "us", living: false, status: "confirmed",
      birth: { date: "abt 1922", place: "Massachusetts" },
      death: { date: "25 Nov 2018", place: "Ludlow, Hampden, Massachusetts, USA" },
      parents: ["i29", "i32"], spouses: [], children: [],
      notes: "Imported from the family's Ancestry.com tree.",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i46", name: "Francesca Guerra", sex: "F", gen: 1, branch: "guerra",
      migration: "us", living: false, status: "confirmed", treeRoot: true,
      birth: { date: "5 Dec 1924", place: "Ludlow, MA" },
      death: { date: "30 Apr 2020", place: "Westboro, Massachusetts" },
      parents: [], spouses: ["i44"], children: ["i65", "i68", "i64", "i72", "i54"],
      notes: "Imported from the family's Ancestry.com tree.",
      photo: "assets/img/francesca-guerra.jpg",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i47", name: "Mario A. Rebelo", sex: "M", gen: 2, branch: "guerra",
      migration: "us", living: false, status: "likely",
      birth: { date: "abt 1924", place: "Massachusetts" },
      death: { date: "", place: "" },
      parents: ["i22", "i24"], spouses: [], children: [],
      notes: "Imported from the family's Ancestry.com tree.",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i48", name: "Serafin Lawrence Guerra Sr", sex: "M", gen: 2, branch: "guerra",
      migration: "us", living: false, status: "confirmed",
      birth: { date: "22 Oct 1926", place: "Ludlow, Massachusetts, USA" },
      death: { date: "3 Oct 2019", place: "Midland, Cabarrus, North Carolina, USA" },
      parents: ["i29", "i32"], spouses: ["i49"], children: ["i53", "i56", "i78", "i63", "i79", "i82", "i80"],
      notes: "Imported from the family's Ancestry.com tree.",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i49", name: "Constance Mary Bell", sex: "F", gen: 1, branch: "guerra",
      migration: "us", living: false, status: "confirmed", treeRoot: true,
      birth: { date: "1927", place: "Ludlow, Hampden County, Massachusetts, United States of America" },
      death: { date: "4 Feb 2019", place: "Midland, Cabarrus, North Carolina, USA" },
      parents: [], spouses: ["i48"], children: ["i53", "i56", "i78", "i63", "i79", "i82", "i80"],
      notes: "Imported from the family's Ancestry.com tree.",
      photo: "assets/img/constance-bell-guerra.jpg",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i50", name: "Marilyn L Guerra", sex: "F", gen: 3, branch: "guerra",
      migration: "us", living: false, status: "confirmed",
      birth: { date: "17 Jun 1931", place: "Rochester, Monroe, New York, USA" },
      death: { date: "20 Dec 1999", place: "Rockville, Montgomery, Maryland, USA" },
      parents: ["i34", "i35"], spouses: ["i51", "i85"], children: ["i60", "i57", "i58", "i59", "i71"],
      notes: "Imported from the family's Ancestry.com tree.",
      photo: "assets/img/marilyn-guerra.jpg",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i51", name: "Charles Guerra", sex: "M", gen: 2, branch: "guerra",
      migration: "us", living: false, status: "confirmed",
      birth: { date: "04/18/1933", place: "Ludlow, Hampden, Massachusetts, USA" },
      death: { date: "09/17/2019", place: "Germantown, Montgomery, Maryland, USA" },
      parents: ["i29", "i32"], spouses: ["i50"], children: ["i60", "i57", "i58", "i59"],
      notes: "Imported from the family's Ancestry.com tree.",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i52", name: "Living relative", sex: "M", gen: 2, branch: "guerra",
      migration: "us", living: true, status: "likely",
      birth: { date: "living", place: "withheld" },
      death: { date: "", place: "" },
      parents: ["i29", "i32"], spouses: [], children: [],
      notes: "Living relative — details withheld to protect privacy.",
      sources: []
    },
    {
      id: "i53", name: "Anthony Lawrence Guerra", sex: "M", gen: 2, branch: "guerra",
      migration: "us", living: false, status: "confirmed",
      birth: { date: "07/24/1945", place: "Ludlow City, Hampden, Massachusetts, USA" },
      death: { date: "06/17/2024", place: "Frederick, Frederick, Maryland, USA" },
      parents: ["i48", "i49"], spouses: [], children: [],
      notes: "Imported from the family's Ancestry.com tree.",
      photo: "assets/img/anthony-l-guerra.jpg",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i54", name: "Living relative", sex: "F", gen: 2, branch: "guerra",
      migration: "us", living: true, status: "likely",
      birth: { date: "living", place: "withheld" },
      death: { date: "", place: "" },
      parents: ["i44", "i46"], spouses: ["i66"], children: [],
      notes: "Living relative — details withheld to protect privacy.",
      sources: []
    },
    {
      id: "i55", name: "Living relative", sex: "M", gen: 2, branch: "guerra",
      migration: "us", living: true, status: "likely",
      birth: { date: "living", place: "withheld" },
      death: { date: "", place: "" },
      parents: ["i39", "i41"], spouses: [], children: [],
      notes: "Living relative — details withheld to protect privacy.",
      sources: []
    },
    {
      id: "i56", name: "Serafim Lawrence Guerra Jr", sex: "M", gen: 2, branch: "guerra",
      migration: "us", living: false, status: "confirmed",
      birth: { date: "3 May 1953", place: "Washington, District of Columbia, USA" },
      death: { date: "18 Jan 2020", place: "Winchester, Virginia, USA" },
      parents: ["i48", "i49"], spouses: [], children: [],
      notes: "Imported from the family's Ancestry.com tree.",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i57", name: "Charles Robert Guerra", sex: "M", gen: 3, branch: "guerra",
      migration: "us", living: false, status: "confirmed",
      birth: { date: "3 Nov 1955", place: "Washington, District of Columbia, USA" },
      death: { date: "25 Mar 2014", place: "Jacksonville, Duval, Florida, USA" },
      parents: ["i51", "i50"], spouses: [], children: [],
      notes: "Imported from the family's Ancestry.com tree.",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i58", name: "Living relative", sex: "M", gen: 3, branch: "guerra",
      migration: "us", living: true, status: "likely",
      birth: { date: "living", place: "withheld" },
      death: { date: "", place: "" },
      parents: ["i51", "i50"], spouses: ["i76"], children: ["i83", "i88"],
      notes: "Living relative — details withheld to protect privacy.",
      sources: []
    },
    {
      id: "i59", name: "Living relative", sex: "M", gen: 3, branch: "guerra",
      migration: "us", living: true, status: "likely",
      birth: { date: "living", place: "withheld" },
      death: { date: "", place: "" },
      parents: ["i51", "i50"], spouses: ["i86"], children: [],
      notes: "Living relative — details withheld to protect privacy.",
      sources: []
    },
    {
      id: "i60", name: "Living relative", sex: "F", gen: 3, branch: "nkomba",
      migration: "us", living: true, status: "likely",
      birth: { date: "living", place: "withheld" },
      death: { date: "", place: "" },
      parents: ["i51", "i50"], spouses: ["i61"], children: [],
      notes: "Living relative — details withheld to protect privacy.",
      sources: []
    },
    {
      id: "i61", name: "Living relative", sex: "M", gen: 1, branch: "nkomba",
      migration: "us", living: true, status: "likely", treeRoot: true,
      birth: { date: "living", place: "withheld" },
      death: { date: "", place: "" },
      parents: [], spouses: ["i60"], children: [],
      notes: "Living relative — details withheld to protect privacy.",
      sources: []
    },
    {
      id: "i62", name: "Living relative", sex: "F", gen: 3, branch: "sala",
      migration: "us", living: true, status: "likely",
      birth: { date: "living", place: "withheld" },
      death: { date: "", place: "" },
      parents: ["i3"], spouses: [], children: [],
      notes: "Living relative — details withheld to protect privacy.",
      sources: []
    },
    {
      id: "i63", name: "Living relative", sex: "F", gen: 2, branch: "guerra",
      migration: "us", living: true, status: "likely",
      birth: { date: "living", place: "withheld" },
      death: { date: "", place: "" },
      parents: ["i48", "i49"], spouses: [], children: [],
      notes: "Living relative — details withheld to protect privacy.",
      sources: []
    },
    {
      id: "i64", name: "Living relative", sex: "?", gen: 2, branch: "guerra",
      migration: "us", living: true, status: "likely",
      birth: { date: "living", place: "withheld" },
      death: { date: "", place: "" },
      parents: ["i44", "i46"], spouses: [], children: [],
      notes: "Living relative — details withheld to protect privacy.",
      sources: []
    },
    {
      id: "i65", name: "Living relative", sex: "?", gen: 2, branch: "guerra",
      migration: "us", living: true, status: "likely",
      birth: { date: "living", place: "withheld" },
      death: { date: "", place: "" },
      parents: ["i44", "i46"], spouses: [], children: [],
      notes: "Living relative — details withheld to protect privacy.",
      sources: []
    },
    {
      id: "i66", name: "Living relative", sex: "M", gen: 1, branch: "guerra",
      migration: "us", living: true, status: "likely", treeRoot: true,
      birth: { date: "living", place: "withheld" },
      death: { date: "", place: "" },
      parents: [], spouses: ["i54"], children: [],
      notes: "Living relative — details withheld to protect privacy.",
      sources: []
    },
    {
      id: "i67", name: "Living relative", sex: "F", gen: 2, branch: "sala",
      migration: "us", living: true, status: "likely",
      birth: { date: "living", place: "withheld" },
      death: { date: "", place: "" },
      parents: ["i38", "i70"], spouses: [], children: [],
      notes: "Living relative — details withheld to protect privacy.",
      sources: []
    },
    {
      id: "i68", name: "Living relative", sex: "?", gen: 2, branch: "guerra",
      migration: "us", living: true, status: "likely",
      birth: { date: "living", place: "withheld" },
      death: { date: "", place: "" },
      parents: ["i44", "i46"], spouses: [], children: [],
      notes: "Living relative — details withheld to protect privacy.",
      sources: []
    },
    {
      id: "i69", name: "Living relative", sex: "?", gen: 2, branch: "guerra",
      migration: "us", living: true, status: "likely",
      birth: { date: "living", place: "withheld" },
      death: { date: "", place: "" },
      parents: ["i76"], spouses: [], children: [],
      notes: "Living relative — details withheld to protect privacy.",
      sources: []
    },
    {
      id: "i70", name: "Living relative", sex: "F", gen: 1, branch: "sala",
      migration: "us", living: true, status: "likely", treeRoot: true,
      birth: { date: "living", place: "withheld" },
      death: { date: "", place: "" },
      parents: [], spouses: ["i38"], children: ["i81", "i67"],
      notes: "Living relative — details withheld to protect privacy.",
      sources: []
    },
    {
      id: "i71", name: "Living relative", sex: "F", gen: 2, branch: "sala",
      migration: "us", living: true, status: "likely",
      birth: { date: "living", place: "withheld" },
      death: { date: "", place: "" },
      parents: ["i85", "i50"], spouses: [], children: [],
      notes: "Living relative — details withheld to protect privacy.",
      sources: []
    },
    {
      id: "i72", name: "Living relative", sex: "?", gen: 2, branch: "guerra",
      migration: "us", living: true, status: "likely",
      birth: { date: "living", place: "withheld" },
      death: { date: "", place: "" },
      parents: ["i44", "i46"], spouses: [], children: [],
      notes: "Living relative — details withheld to protect privacy.",
      sources: []
    },
    {
      id: "i73", name: "Living relative", sex: "M", gen: 3, branch: "sala",
      migration: "us", living: true, status: "likely",
      birth: { date: "living", place: "withheld" },
      death: { date: "", place: "" },
      parents: ["i3"], spouses: [], children: [],
      notes: "Living relative — details withheld to protect privacy.",
      sources: []
    },
    {
      id: "i74", name: "Living relative", sex: "M", gen: 3, branch: "sala",
      migration: "us", living: true, status: "likely",
      birth: { date: "living", place: "withheld" },
      death: { date: "", place: "" },
      parents: ["i3"], spouses: [], children: [],
      notes: "Living relative — details withheld to protect privacy.",
      sources: []
    },
    {
      id: "i75", name: "Living relative", sex: "F", gen: 2, branch: "sala",
      migration: "us", living: true, status: "likely",
      birth: { date: "living", place: "withheld" },
      death: { date: "", place: "" },
      parents: ["i27", "i28"], spouses: [], children: [],
      notes: "Living relative — details withheld to protect privacy.",
      sources: []
    },
    {
      id: "i76", name: "Living relative", sex: "F", gen: 1, branch: "guerra",
      migration: "us", living: true, status: "likely", treeRoot: true,
      birth: { date: "living", place: "withheld" },
      death: { date: "", place: "" },
      parents: [], spouses: ["i58"], children: ["i83", "i69", "i88"],
      notes: "Living relative — details withheld to protect privacy.",
      sources: []
    },
    {
      id: "i77", name: "Maria Oliveira Melo", sex: "F", gen: 1, branch: "guerra",
      migration: "portugal", living: false, status: "unverified", treeRoot: true,
      birth: { date: "unknown", place: "Portugal" },
      death: { date: "", place: "Portugal" },
      parents: [], spouses: [], children: ["i24"],
      notes: "Imported from the family's Ancestry.com tree.",
      sources: ["Ancestry.com Member Tree: Guerra Robelo Sala Nkomba Family Tree (2026)"]
    },
    {
      id: "i78", name: "Living relative", sex: "M", gen: 2, branch: "guerra",
      migration: "us", living: true, status: "likely",
      birth: { date: "living", place: "withheld" },
      death: { date: "", place: "" },
      parents: ["i48", "i49"], spouses: [], children: [],
      notes: "Living relative — details withheld to protect privacy.",
      sources: []
    },
    {
      id: "i79", name: "Living relative", sex: "F", gen: 2, branch: "guerra",
      migration: "us", living: true, status: "likely",
      birth: { date: "living", place: "withheld" },
      death: { date: "", place: "" },
      parents: ["i48", "i49"], spouses: [], children: [],
      notes: "Living relative — details withheld to protect privacy.",
      sources: []
    },
    {
      id: "i80", name: "Living relative", sex: "F", gen: 2, branch: "guerra",
      migration: "us", living: true, status: "likely",
      birth: { date: "living", place: "withheld" },
      death: { date: "", place: "" },
      parents: ["i48", "i49"], spouses: [], children: [],
      notes: "Living relative — details withheld to protect privacy.",
      sources: []
    },
    {
      id: "i81", name: "Living relative", sex: "F", gen: 2, branch: "sala",
      migration: "us", living: true, status: "likely",
      birth: { date: "living", place: "withheld" },
      death: { date: "", place: "" },
      parents: ["i38", "i70"], spouses: [], children: [],
      notes: "Living relative — details withheld to protect privacy.",
      sources: []
    },
    {
      id: "i82", name: "Living relative", sex: "F", gen: 2, branch: "guerra",
      migration: "us", living: true, status: "likely",
      birth: { date: "living", place: "withheld" },
      death: { date: "", place: "" },
      parents: ["i48", "i49"], spouses: [], children: [],
      notes: "Living relative — details withheld to protect privacy.",
      sources: []
    },
    {
      id: "i83", name: "Living relative", sex: "U", gen: 2, branch: "guerra",
      migration: "us", living: true, status: "likely",
      birth: { date: "living", place: "withheld" },
      death: { date: "", place: "" },
      parents: ["i58", "i76"], spouses: [], children: [],
      notes: "Living relative — details withheld to protect privacy.",
      sources: []
    },
    {
      id: "i84", name: "Living relative", sex: "M", gen: 3, branch: "sala",
      migration: "us", living: true, status: "likely",
      birth: { date: "living", place: "withheld" },
      death: { date: "", place: "" },
      parents: ["i3"], spouses: [], children: [],
      notes: "Living relative — details withheld to protect privacy.",
      sources: []
    },
    {
      id: "i85", name: "Living relative", sex: "M", gen: 1, branch: "guerra",
      migration: "us", living: true, status: "likely", treeRoot: true,
      birth: { date: "living", place: "withheld" },
      death: { date: "", place: "" },
      parents: [], spouses: ["i50"], children: ["i71"],
      notes: "Living relative — details withheld to protect privacy.",
      sources: []
    },
    {
      id: "i86", name: "Living relative", sex: "F", gen: 1, branch: "guerra",
      migration: "us", living: true, status: "likely", treeRoot: true,
      birth: { date: "living", place: "withheld" },
      death: { date: "", place: "" },
      parents: [], spouses: ["i59"], children: [],
      notes: "Living relative — details withheld to protect privacy.",
      sources: []
    },
    {
      id: "i87", name: "Living relative", sex: "F", gen: 2, branch: "sala",
      migration: "us", living: true, status: "likely",
      birth: { date: "living", place: "withheld" },
      death: { date: "", place: "" },
      parents: ["i25"], spouses: ["i29"], children: [],
      notes: "Living relative — details withheld to protect privacy.",
      sources: []
    },
    {
      id: "i88", name: "Living relative", sex: "M", gen: 2, branch: "guerra",
      migration: "us", living: true, status: "likely",
      birth: { date: "living", place: "withheld" },
      death: { date: "", place: "" },
      parents: ["i58", "i76"], spouses: [], children: [],
      notes: "Living relative — details withheld to protect privacy.",
      sources: []
    },
  ]
};