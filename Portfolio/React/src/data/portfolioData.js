import { asset } from "../utils/assets.js";

export const media = {
  heroImage: asset("images/시안/Image_시안1.png"),
  storyImage: asset("images/시안/Image_시안3.png"),
  filmImage: asset("images/시안/Image_시안4.png"),
  heroVideo: asset(
    "videos/Korean_Luxury_Video_A_man_in_a_gray_suit_walks_down_a_dimly_lit_LGvzsv3A.mp4"
  ),
  campaignVideo: asset(
    "videos/Korean_Luxury_Video_A_person_walks_through_a_dimly_lit_industrial_T4r4GlGP.mp4"
  ),
};

export const products = [
  {
    slug: "blue-hinoki",
    name: "Blue Hinoki",
    category: "Perfume",
    image: asset("images/Perfume Product/thumbnail_50ml_Perfume_Hinoki2.jpg"),
    alt: "Blue Hinoki perfume",
  },
  {
    slug: "evening-glow",
    name: "Evening Glow",
    category: "Perfume",
    image: asset("images/Perfume Product/thumbnail_Evening_50ml_Perfume.avif"),
    alt: "Evening Glow perfume",
  },
  {
    slug: "chamo",
    name: "Chamo",
    category: "Hand Cream",
    image: asset("images/Hand Cream Product/thumbnail_Shell_30ml_Chamo.avif"),
    alt: "Chamo hand cream",
  },
  {
    slug: "lale",
    name: "Lale",
    category: "Hand Cream",
    image: asset("images/Hand Cream Product/thumbnail_Shell_30ml_Lale.avif"),
    alt: "Lale hand cream",
  },
  {
    slug: "wood-salt-beach",
    name: "Wood Salt Beach",
    category: "Perfume",
    image: asset("images/Perfume Product/thumbnail_50ml_Perfume_WoodSaltBeach.avif"),
    alt: "Wood Salt Beach perfume",
  },
  {
    slug: "pumkini",
    name: "Pumkini",
    category: "Body & Hand",
    image: asset("images/Hand Cream Product/thumbnail_Shell_30ml_Pumkini.avif"),
    alt: "Pumkini hand cream",
  },
];

export const scents = [
  {
    name: "Woody",
    image: asset("images/시안/ChatGPT Image 2026년 5월 14일 오후 06_29_37.png"),
    alt: "Woody scent object",
  },
  {
    name: "Floral",
    image: asset("images/시안/ChatGPT Image 2026년 5월 14일 오후 06_40_32.png"),
    alt: "Floral scent object",
  },
  {
    name: "Musky",
    image: asset("images/시안/ChatGPT Image 2026년 5월 14일 오후 06_42_41.png"),
    alt: "Musky scent object",
  },
  {
    name: "Herbal",
    image: asset("images/시안/ChatGPT Image 2026년 5월 14일 오후 06_43_08.png"),
    alt: "Herbal scent object",
  },
];

export const stories = [
  {
    slug: "perfume-hand",
    title: "Perfume Hand",
    description: "새로운 향의 감각을 손끝으로 경험하는 캠페인 아카이브",
  },
  {
    slug: "berga-sandal",
    title: "Berga Sandal",
    description: "기억 속 여름과 부드러운 샌달우드를 잇는 향의 스토리",
  },
  {
    slug: "unknown-oud",
    title: "Unknown Oud",
    description: "명확하지 않은 우드의 깊이를 천천히 기록한 에디토리얼",
  },
];
