import { Locales } from '~/@types';
import { SubpageHeader, HomeFooter } from '~/components';
import { getFooterFromCache } from '~/utils';

export const dynamic = 'force-static';

async function getData() {
  const locale: Locales = 'hu';

  const footer = await getFooterFromCache(locale);

  return { footer };
}

export default async function SubpageLayout({ children }: { children: React.ReactNode }) {
  const { footer } = await getData();

  return (
    <div className="flex flex-col justify-between min-h-safe_screen gap-16">
      <SubpageHeader />
      {children}
      <HomeFooter data={footer} />
    </div>
  );
}
