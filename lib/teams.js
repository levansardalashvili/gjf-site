// TODO: მომავალში CMS/API ჩაანაცვლებს — თითოეულ კატეგორიას დაემატება რეალური სპორტსმენების სია.
export const TEAM_CATEGORIES = [
  { slug: "standart", label: "უფროსები", desc: "ეროვნული ნაკრები უფროსებში." },
  { slug: "youth", label: "ახალგაზრდები", desc: "ახალგაზრდული ნაკრები (U23/U21)." },
  { slug: "kids", label: "ჭაბუკები", desc: "ჭაბუკთა ნაკრები (კადეტები)." },
  { slug: "women", label: "ქალები", desc: "ქალთა ეროვნული ნაკრები." },
];

export function getTeamCategory(slug) {
  return TEAM_CATEGORIES.find((t) => t.slug === slug);
}
