// ეს ფაილი "use client" არაა — უსაფრთხოდ შემოტანადია სერვერულ (Footer)
// და კლიენტურ (Header) კომპონენტებში ერთდროულად.
// თითოეულ label-ს აქვს { ka, en } — Header/Footer ირჩევენ მიმდინარე ენას.
export const NAV = [
  { href: "/", label: { ka: "მთავარი", en: "Home" } },
  {
    href: "/federation",
    label: { ka: "ფედერაცია", en: "Federation" },
    children: [
      { href: "/federation/staff", label: { ka: "შემადგენლობა", en: "Staff" } },
      { href: "/federation/committee", label: { ka: "აღმასკომი", en: "Executive Committee" } },
      { href: "/federation/regulations", label: { ka: "დებულებები", en: "Regulations" } },
      { href: "/federation/commissions", label: { ka: "კომისიები", en: "Commissions" } },
      { href: "/federation/structure", label: { ka: "სტრუქტურა", en: "Structure" } },
      { href: "/federation/statute", label: { ka: "წესდება", en: "Statute" } },
      { href: "/federation/regions", label: { ka: "რეგიონები", en: "Regions" } },
      { href: "/clubs", label: { ka: "კლუბები", en: "Clubs" } },
      { href: "/federation/projects", label: { ka: "პროექტები", en: "Projects" } },
    ],
  },
  { href: "/news", label: { ka: "სიახლეები", en: "News" } },
  {
    href: "/teams",
    label: { ka: "ნაკრებები", en: "National Teams" },
    children: [
      { href: "/teams/staff", label: { ka: "მწვრთნელთა შტაბი", en: "Coaching Staff" } },
      { href: "/teams/standart", label: { ka: "უფროსები", en: "Seniors" } },
      { href: "/teams/youth", label: { ka: "ახალგაზრდები", en: "Juniors" } },
      { href: "/teams/kids", label: { ka: "ჭაბუკები", en: "Cadets" } },
      { href: "/teams/women", label: { ka: "ქალები", en: "Women" } },
    ],
  },
  {
    href: "/calendar",
    label: { ka: "კალენდარი", en: "Calendar" },
    children: [
      { href: "/calendar/georgia", label: { ka: "საქართველო", en: "Georgia" } },
      { href: "/calendar/international", label: { ka: "საერთაშორისო", en: "International" } },
    ],
  },
  {
    href: "/results",
    label: { ka: "შედეგები", en: "Results" },
    children: [
      { href: "/results/georgia", label: { ka: "საქართველო", en: "Georgia" } },
      { href: "/results/international", label: { ka: "საერთაშორისო", en: "International" } },
    ],
  },
  {
    href: "/gallery",
    label: { ka: "გალერეა", en: "Gallery" },
    children: [
      { href: "/gallery/photo", label: { ka: "ფოტო გალერეა", en: "Photo Gallery" } },
      { href: "/gallery/video", label: { ka: "ვიდეო გალერეა", en: "Video Gallery" } },
    ],
  },
  {
    href: "/judo",
    label: { ka: "ისტორია", en: "History" },
    children: [
      { href: "/judo/history", label: { ka: "ძიუდოს განვითარების ისტორია", en: "History of Judo" } },
      { href: "/judo/archive", label: { ka: "არქივი", en: "Archive" } },
      { href: "/judo/statistic", label: { ka: "სტატისტიკა", en: "Statistics" } },
    ],
  },
  { href: "/contact", label: { ka: "კონტაქტი", en: "Contact" } },
];
