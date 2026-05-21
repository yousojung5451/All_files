const assets = {
  "images/시안/Image_시안1.png": new URL("../assets/images/시안/Image_시안1.png", import.meta.url).href,
  "images/시안/Image_시안3.png": new URL("../assets/images/시안/Image_시안3.png", import.meta.url).href,
  "images/시안/Image_시안4.png": new URL("../assets/images/시안/Image_시안4.png", import.meta.url).href,
  "images/시안/ChatGPT Image 2026년 5월 14일 오후 06_29_37.png": new URL(
    "../assets/images/시안/ChatGPT Image 2026년 5월 14일 오후 06_29_37.png",
    import.meta.url
  ).href,
  "images/시안/ChatGPT Image 2026년 5월 14일 오후 06_40_32.png": new URL(
    "../assets/images/시안/ChatGPT Image 2026년 5월 14일 오후 06_40_32.png",
    import.meta.url
  ).href,
  "images/시안/ChatGPT Image 2026년 5월 14일 오후 06_42_41.png": new URL(
    "../assets/images/시안/ChatGPT Image 2026년 5월 14일 오후 06_42_41.png",
    import.meta.url
  ).href,
  "images/시안/ChatGPT Image 2026년 5월 14일 오후 06_43_08.png": new URL(
    "../assets/images/시안/ChatGPT Image 2026년 5월 14일 오후 06_43_08.png",
    import.meta.url
  ).href,
  "images/Perfume Product/thumbnail_50ml_Perfume_Hinoki2.jpg": new URL(
    "../assets/images/Perfume Product/thumbnail_50ml_Perfume_Hinoki2.jpg",
    import.meta.url
  ).href,
  "images/Perfume Product/thumbnail_Evening_50ml_Perfume.avif": new URL(
    "../assets/images/Perfume Product/thumbnail_Evening_50ml_Perfume.avif",
    import.meta.url
  ).href,
  "images/Perfume Product/thumbnail_50ml_Perfume_WoodSaltBeach.avif": new URL(
    "../assets/images/Perfume Product/thumbnail_50ml_Perfume_WoodSaltBeach.avif",
    import.meta.url
  ).href,
  "images/Hand Cream Product/thumbnail_Shell_30ml_Chamo.avif": new URL(
    "../assets/images/Hand Cream Product/thumbnail_Shell_30ml_Chamo.avif",
    import.meta.url
  ).href,
  "images/Hand Cream Product/thumbnail_Shell_30ml_Lale.avif": new URL(
    "../assets/images/Hand Cream Product/thumbnail_Shell_30ml_Lale.avif",
    import.meta.url
  ).href,
  "images/Hand Cream Product/thumbnail_Shell_30ml_Pumkini.avif": new URL(
    "../assets/images/Hand Cream Product/thumbnail_Shell_30ml_Pumkini.avif",
    import.meta.url
  ).href,
  "videos/Korean_Luxury_Video_A_man_in_a_gray_suit_walks_down_a_dimly_lit_LGvzsv3A.mp4": new URL(
    "../assets/videos/Korean_Luxury_Video_A_man_in_a_gray_suit_walks_down_a_dimly_lit_LGvzsv3A.mp4",
    import.meta.url
  ).href,
  "videos/Korean_Luxury_Video_A_person_walks_through_a_dimly_lit_industrial_T4r4GlGP.mp4": new URL(
    "../assets/videos/Korean_Luxury_Video_A_person_walks_through_a_dimly_lit_industrial_T4r4GlGP.mp4",
    import.meta.url
  ).href,
};

export const asset = (path) => {
  const resolved = assets[path];

  if (!resolved) {
    throw new Error(`Asset not found: ${path}`);
  }

  return resolved;
};
