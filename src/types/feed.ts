interface TodaysFeaturedArticle {
  type: string;
  title: string;
  displaytitle: string;
  namespace: {
    id: number;
    text: string;
  };
  wikibase_item: string;
  titles: {
    canonical: string;
    normalized: string;
    display: string;
  };
  pageid: number;
  thumbnail: Thumbnail;
  originalimage: OriginalImage;
  lang: string;
  dir: string;
  revision: string;
  tid: string;
  timestamp: string;
  description: string;
  description_source: string;
  content_urls: ContentUrls;
  extract: string;
  extract_html: string;
  normalizedtitle: string;
}

interface ArticleViewHistory {
  date: string;
  views: number;
}

interface Thumbnail {
  source: string;
  width: number;
  height: number;
}

interface OriginalImage {
  source: string;
  width: number;
  height: number;
}

interface ContentUrls {
  desktop: {
    page: string;
    revisions: string;
    edit: string;
    talk: string;
  };
  mobile: {
    page: string;
    revisions: string;
    edit: string;
    talk: string;
  };
}

interface MostReadArticles {
  date: string;
  articles: Article[];
}

interface Article {
  views: number;
  rank: number;
  view_history: ArticleViewHistory[];
  type: string;
  title: string;
  displaytitle: string;
  namespace: {
    id: number;
    text: string;
  };
  wikibase_item: string;
  titles: {
    canonical: string;
    normalized: string;
    display: string;
  };
  pageid: number;
  thumbnail: Thumbnail;
  originalimage: OriginalImage;
  lang: string;
  dir: string;
  revision: string;
  tid: string;
  timestamp: string;
  description: string;
  description_source: string;
  content_urls: ContentUrls;
  extract: string;
  extract_html: string;
  normalizedtitle: string;
}

interface Image {
  title: string;
  thumbnail: Thumbnail;
  image: OriginalImage;
  file_page: string;
  artist: {
    html: string;
    text: string;
  };
  credit: {
    html: string;
    text: string;
  };
  license: {
    type: string;
    code: string;
    url: string;
  };
  description: {
    html: string;
    text: string;
    lang: string;
  };
  wb_entity_id: string;
  structured: {
    captions: {
      [language: string]: string;
    };
  };
}

interface Page {
  type: string;
  title: string;
  displaytitle: string;
  namespace: {
    id: number;
    text: string;
  };
  wikibase_item: string;
  titles: {
    canonical: string;
    normalized: string;
    display: string;
  };
  pageid: number;
  thumbnail?: Thumbnail;
  originalimage?: OriginalImage;
  lang: string;
  dir: string;
  revision: string;
  tid: string;
  timestamp: string;
  description: string;
  description_source: string;
  coordinates?: {
    lat: number;
    lon: number;
  };
  content_urls: ContentUrls;
  extract: string;
  extract_html: string;
  normalizedtitle: string;
}

interface OnThisDayEvent {
  text: string;
  pages: Page[];
  year: number;
}

interface NewsLink {
  type: string;
  title: string;
  displaytitle: string;
  namespace: {
    id: number;
    text: string;
  };
  wikibase_item?: string;
  titles: {
    canonical: string;
    normalized: string;
    display: string;
  };
  pageid?: number;
  thumbnail?: Thumbnail;
  originalimage?: OriginalImage;
  lang: string;
  dir: string;
  revision?: string;
  tid?: string;
  timestamp: string;
  description: string;
  description_source: string;
  content_urls: ContentUrls;
  extract: string;
  extract_html: string;
  normalizedtitle: string;
}

interface NewsItem {
  links: NewsLink[];
  story: string;
}

export interface FeedType {
  tfa: TodaysFeaturedArticle;
  mostread: MostReadArticles;
  news: NewsItem[];
  image: Image;
  onthisday: OnThisDayEvent[];
}
