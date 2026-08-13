"use client";
import { createContext, useContext, useState, useEffect } from "react";

// საერთო UI ტექსტების ლექსიკონი — ნავიგაცია, ღილაკები, საერთო ჩარჩო.
// გვერდების საკუთარი კონტენტი (სიახლეების ტექსტი და ა.შ.) ცალკე,
// მომავალ ეტაპზე ემატება.
export const DICT = {
  ka: {
    federation: "ფედერაცია",
    news: "სიახლეები",
    teams: "ნაკრებები",
    calendar: "კალენდარი",
    results: "შედეგები",
    gallery: "გალერეა",
    history: "ისტორია",
    contact: "კონტაქტი",
    readMore: "სრულად ნახვა",
    allProjects: "ყველა პროექტი",
    fullCalendar: "სრული კალენდარი",
    officialSite: "ოფიციალური საიტი — სიახლეები, შედეგები და ეროვნული ნაკრების ცხოვრება.",
    rightsReserved: "საქართველოს ძიუდოს ფედერაცია",

    statOlympic: "ოლიმპიური ოქრო",
    statWorld: "მსოფლიოს ჩემპიონატის ოქრო",
    statEurope: "ევროპის ჩემპიონატის ოქრო",
    georgia: "საქართველო",
    international: "საერთაშორისო",
    noEventsInCategory: "ამ კატეგორიაში ღონისძიება არ არის.",
    currentProjects: "მიმდინარე პროექტები",
    project: "პროექტი",
    partners: "პარტნიორები",
    nationalTeam: "ეროვნული ნაკრები",
    coachingStaff: "მწვრთნელთა შტაბი",
    mensTeam: "ვაჟების ნაკრები",
    womensTeam: "ქალების ნაკრები",

    home_bc: "მთავარი",
    seniors: "უფროსები",
    juniors: "ახალგაზრდები",
    cadets: "ჭაბუკები",
    women_bc: "ქალები",
    noResultsYet: "ამ კატეგორიაში შედეგები ჯერ არ არის დამატებული.",
    noAlbumsYet: "ალბომი ჯერ არ არის დამატებული.",
    noVideosYet: "ვიდეო ჯერ არ არის დამატებული.",
    photoGallery: "ფოტო გალერეა",
    videoGallery: "ვიდეო გალერეა",
    calendarGeorgia: "კალენდარი — საქართველო",
    calendarInternational: "კალენდარი — საერთაშორისო",
    resultsGeorgia: "შედეგები — საქართველო",
    resultsInternational: "შედეგები — საერთაშორისო",
    photoCount: "ფოტო",
    viewDetails: "დეტალურად",
    photoGalleryDesc: "ღონისძიებების და ვარჯიშების ფოტოები.",
    videoGalleryDesc: "რეპორტაჟები და საუკეთესო მომენტები.",
    resultsGeorgiaDesc: "ეროვნული ტურნირების შედეგები.",
    resultsInternationalDesc: "საერთაშორისო ტურნირების შედეგები.",

    clubsAndRegions: "კლუბები და რეგიონები",
    clubsSubtitle: "იპოვეთ უახლოესი ძიუდოს კლუბი საქართველოს რეგიონებში.",
    judoHistoryTitle: "ძიუდოს განვითარების ისტორია",
    judoHistoryDesc: "ძიუდოს განვითარების ისტორია საქართველოში.",
    archive: "არქივი",
    archiveDesc: "ისტორიული მასალების არქივი.",
    statistics: "სტატისტიკა",
    statisticsDesc: "ისტორიული სტატისტიკური მონაცემები.",
    open: "გახსნა",
    clubs: "კლუბები",
    staff: "შემადგენლობა",
    staffDesc: "ფედერაციის ხელმძღვანელობა და თანამშრომლები",
    committee: "აღმასკომი",
    committeeDesc: "აღმასრულებელი კომიტეტის შემადგენლობა და გადაწყვეტილებები",
    commissions: "კომისიები",
    commissionsDesc: "სპეციალიზებული კომისიები (მსაჯთა, სამედიცინო, დისციპლინური)",
    statute: "წესდება",
    statuteDesc: "ფედერაციის ოფიციალური წესდება (PDF)",
    regions: "რეგიონები",
    regionsDesc: "საქართველოს 13 რეგიონული ორგანიზაცია",
    projects: "პროექტები",
    projectsDesc: "ფედერაციის მიმდინარე განვითარების პროექტები",

    otherNews: "სხვა სიახლეები",
    resultLabel: "შედეგი",
    weightLabel: "წონა",
    athleteLabel: "სპორტსმენი",
    medalLabel: "მედალი",
    downloadPdf: "დოკუმენტის ჩამოტვირთვა (PDF)",
    noDetailedResults: "დეტალური შედეგები ჯერ არ არის დამატებული.",
    structure: "სტრუქტურა",
    regulations: "დებულებები",
    noMembersYet: "წევრი ჯერ არ არის დამატებული.",
    noStructureYet: "სტრუქტურის ელემენტი ჯერ არ არის დამატებული.",
    noRegulationsYet: "დებულება ჯერ არ არის დამატებული.",
    clubsCount: "კლუბების ნახვა",
    downloadPdfBtn: "PDF ჩამოტვირთვა",
    noDocumentUploaded: "დოკუმენტი ჯერ არ არის ატვირთული",
    weightCategory: "წონითი კატეგორია",
    noRosterYet: "შემადგენლობა ჯერ არ არის დამატებული.",
    seniorsDesc: "ეროვნული ნაკრები უფროსებში.",
    juniorsDesc: "ახალგაზრდული ნაკრები (U23/U21).",
    cadetsDesc: "ჭაბუკთა ნაკრები (კადეტები).",
    womenDesc: "ქალთა ეროვნული ნაკრები.",
    viewRoster: "შემადგენლობის ნახვა",
  },
  en: {
    federation: "Federation",
    news: "News",
    teams: "National Teams",
    calendar: "Calendar",
    results: "Results",
    gallery: "Gallery",
    history: "History",
    contact: "Contact",
    readMore: "Read more",
    allProjects: "All projects",
    fullCalendar: "Full calendar",
    officialSite: "Official site — news, results, and the life of the national team.",
    rightsReserved: "Georgian Judo Federation",

    statOlympic: "Olympic gold medals",
    statWorld: "World Championship gold medals",
    statEurope: "European Championship gold medals",
    georgia: "Georgia",
    international: "International",
    noEventsInCategory: "No events in this category yet.",
    currentProjects: "Current Projects",
    project: "Project",
    partners: "Partners",
    nationalTeam: "National Team",
    coachingStaff: "Coaching Staff",
    mensTeam: "Men's Team",
    womensTeam: "Women's Team",

    home_bc: "Home",
    seniors: "Seniors",
    juniors: "Juniors",
    cadets: "Cadets",
    women_bc: "Women",
    noResultsYet: "No results in this category yet.",
    noAlbumsYet: "No albums added yet.",
    noVideosYet: "No videos added yet.",
    photoGallery: "Photo Gallery",
    videoGallery: "Video Gallery",
    calendarGeorgia: "Calendar — Georgia",
    calendarInternational: "Calendar — International",
    resultsGeorgia: "Results — Georgia",
    resultsInternational: "Results — International",
    photoCount: "photos",
    viewDetails: "Details",
    photoGalleryDesc: "Photos from events and training sessions.",
    videoGalleryDesc: "Reports and best moments.",
    resultsGeorgiaDesc: "Results of national tournaments.",
    resultsInternationalDesc: "Results of international tournaments.",

    clubsAndRegions: "Clubs and Regions",
    clubsSubtitle: "Find the nearest judo club in Georgia's regions.",
    judoHistoryTitle: "History of Judo Development",
    judoHistoryDesc: "History of judo development in Georgia.",
    archive: "Archive",
    archiveDesc: "Archive of historical materials.",
    statistics: "Statistics",
    statisticsDesc: "Historical statistical data.",
    open: "Open",
    clubs: "Clubs",
    staff: "Staff",
    staffDesc: "Federation leadership and staff",
    committee: "Executive Committee",
    committeeDesc: "Executive committee members and decisions",
    commissions: "Commissions",
    commissionsDesc: "Specialized commissions (referees, medical, disciplinary)",
    statute: "Statute",
    statuteDesc: "Official statute of the federation (PDF)",
    regions: "Regions",
    regionsDesc: "13 regional organizations of Georgia",
    projects: "Projects",
    projectsDesc: "Current federation development projects",

    otherNews: "Other News",
    resultLabel: "Result",
    weightLabel: "Weight",
    athleteLabel: "Athlete",
    medalLabel: "Medal",
    downloadPdf: "Download document (PDF)",
    noDetailedResults: "Detailed results have not been added yet.",
    structure: "Structure",
    regulations: "Regulations",
    noMembersYet: "No members added yet.",
    noStructureYet: "No structure elements added yet.",
    noRegulationsYet: "No regulations added yet.",
    clubsCount: "View clubs",
    downloadPdfBtn: "Download PDF",
    noDocumentUploaded: "No document uploaded yet",
    weightCategory: "Weight category",
    noRosterYet: "Roster has not been added yet.",
    seniorsDesc: "National senior team.",
    juniorsDesc: "Junior national team (U23/U21).",
    cadetsDesc: "Cadet national team.",
    womenDesc: "Women's national team.",
    viewRoster: "View roster",
  },
};

const LanguageContext = createContext({ lang: "ka", setLang: () => {}, t: (k) => k });

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState("ka");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("gjf_lang") : null;
    if (saved === "en" || saved === "ka") setLangState(saved);
  }, []);

  function setLang(next) {
    setLangState(next);
    if (typeof window !== "undefined") localStorage.setItem("gjf_lang", next);
  }

  function t(key) {
    return DICT[lang]?.[key] ?? DICT.ka[key] ?? key;
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
