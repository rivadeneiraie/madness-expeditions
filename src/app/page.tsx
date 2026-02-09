import ImageCarousel from '@/components/Carousel';
import MountainExperience from '@/components/MountainExperience';
import GuidedRoutes from '@/components/GuidedRoutes';

export default function Home() {
  return (
    <main>
      <ImageCarousel />
      <MountainExperience />
      <GuidedRoutes />
      <div style={{ height: '100vh' }}>
        {/* Rest of the page content */}
      </div>
    </main>
  );
}
