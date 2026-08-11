// ეს ფაილი "use client" არაა — უსაფრთხოდ შემოტანადია სერვერულ (Footer)
// და კლიენტურ (Header) კომპონენტებში ერთდროულად.
export const NAV = [
  { href: "/", label: "მთავარი" },
  {
    href: "/federation",
    label: "ფედერაცია",
    children: [
      { href: "/federation/staff", label: "შემადგენლობა" },
      { href: "/federation/committee", label: "აღმასკომი" },
      { href: "/federation/regulations", label: "დებულებები" },
      { href: "/federation/commissions", label: "კომისიები" },
      { href: "/federation/structure", label: "სტრუქტურა" },
      { href: "/federation/statute", label: "წესდება" },
      { href: "/federation/regions", label: "რეგიონები" },
      { href: "/clubs", label: "კლუბები" },
      { href: "/federation/projects", label: "პროექტები" },
    ],
  },
  { href: "/news", label: "სიახლეები" },
  {
    href: "/teams",
    label: "ნაკრებები",
    children: [
      { href: "/teams/staff", label: "მწვრთნელთა შტაბი" },
      { href: "/teams/standart", label: "უფროსები" },
      { href: "/teams/youth", label: "ახალგაზრდები" },
      { href: "/teams/kids", label: "ჭაბუკები" },
      { href: "/teams/women", label: "ქალები" },
    ],
  },
  {
    href: "/calendar",
    label: "კალენდარი",
    children: [
      { href: "/calendar/georgia", label: "საქართველო" },
      { href: "/calendar/international", label: "საერთაშორისო" },
    ],
  },
  {
    href: "/results",
    label: "შედეგები",
    children: [
      { href: "/results/georgia", label: "საქართველო" },
      { href: "/results/international", label: "საერთაშორისო" },
    ],
  },
  {
    href: "/gallery",
    label: "გალერეა",
    children: [
      { href: "/gallery/photo", label: "ფოტო გალერეა" },
      { href: "/gallery/video", label: "ვიდეო გალერეა" },
    ],
  },
  {
    href: "/judo",
    label: "ისტორია",
    children: [
      { href: "/judo/history", label: "ძიუდოს განვითარების ისტორია" },
      { href: "/judo/archive", label: "არქივი" },
      { href: "/judo/statistic", label: "სტატისტიკა" },
    ],
  },
  { href: "/contact", label: "კონტაქტი" },
];
