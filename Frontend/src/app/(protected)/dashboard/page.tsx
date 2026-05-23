import { CommunityFeed } from "./components/CommunityFeed";
import { ContentDrafts } from "./components/ContentDrafts";

export default function DashboardPage() {
  return (
    <main className="max-w-7xl mx-auto p-6 md:p-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 order-2 lg:order-1">
          <CommunityFeed />
        </div>
        <div className="lg:col-span-7 order-1 lg:order-2">
          <ContentDrafts />
        </div>
      </div>
    </main>
  );
}