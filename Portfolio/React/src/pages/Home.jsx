import Hero from "../components/Hero/Hero.jsx";
import Collection from "../components/Collection/Collection.jsx";
import Stories, { ScentFinder } from "../components/Stories/Stories.jsx";
import CampaignFilm from "../components/CampaignFilm/CampaignFilm.jsx";
import Newsletter from "../components/Newsletter/Newsletter.jsx";
import Footer from "../components/Footer/Footer.jsx";
import { useReveal } from "../hooks/useReveal.js";
import { media, products, scents, stories } from "../data/portfolioData.js";

export default function Home() {
  useReveal();

  return (
    <main className="site-shell">
      <Hero image={media.heroImage} video={media.heroVideo} />
      <Collection products={products} />
      <ScentFinder scents={scents} background={media.filmImage} />
      <Stories stories={stories} image={media.storyImage} />
      <CampaignFilm image={media.filmImage} video={media.campaignVideo} />
      <Newsletter />
      <Footer />
    </main>
  );
}
