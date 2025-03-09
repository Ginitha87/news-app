export const NEWS_CATEGORY_LIST = [
  { label: "Select category", value: "" },
  { label: "Business", value: "business" },
  { label: "Science", value: "science" },
  { label: "Sport", value: "sport" },
  { label: "Technology", value: "technology" },
  { label: "Politics", value: "politics" },
];

export const SOURCE_LIST = [
  { label: "Select source", value: "" },
  { label: "BBC News", value: "bbcnews" },
  { label: "Spiegel", value: "spiegel" },
  { label: "Bloomberg", value: "bloomberg" },
  { label: "El Mundo", value: "el-mundo" },
  { label: "New York Magazine", value: "new-york-magazine" },
];

export const AUTHOR_LIST = [
  { label: "Select author", value: "" },
  { label: "Marina Hyde", value: "marinahyde" },
  { label: "Owen Jones", value: "owenjones" },
  { label: "Simon Jenkins", value: "simonjenkins" },
  { label: "George Monbiot", value: "georgemonbiot" },
  { label: "Zoe Williams", value: "zoewilliams" },
  { label: "Hadley Freeman", value: "hadleyfreeman" },
  { label: "David Hytner", value: "davidhytner" },
  { label: "Stephen Bates", value: "stephenbates" },
  { label: "Andrew Roth", value: "andrewroth" },
];

export const skeletonStructure = [
  { className: "skeleton medium" },
  { className: "skeleton" },
  { className: "skeleton" },
];

export const filtersInitialState = {
  searchQuery: "",
  category: "",
  source: "",
  date: "",
  author: "",
};

export const READ_MORE = "Read more";
export const ENTER = "Enter";
