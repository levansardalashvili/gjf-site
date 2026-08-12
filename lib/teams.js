// TODO: მომავალში CMS/API ჩაანაცვლებს — თითოეულ კატეგორიას დაემატება რეალური სპორტსმენების სია.
export const TEAM_CATEGORIES = [
  { slug: "standart", labelKey: "seniors", descKey: "seniorsDesc" },
  { slug: "youth", labelKey: "juniors", descKey: "juniorsDesc" },
  { slug: "kids", labelKey: "cadets", descKey: "cadetsDesc" },
  { slug: "women", labelKey: "women_bc", descKey: "womenDesc" },
];

export function getTeamCategory(slug) {
  return TEAM_CATEGORIES.find((t) => t.slug === slug);
}
