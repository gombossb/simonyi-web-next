import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { PageProps } from "~/@types";
import { AboutTimeline } from "~/components/app/about";
import { Typography } from "~/components";
import { contentfulDocumentToReactComponents, query } from "~/utils";

export async function generateMetadata({
  params: {
    locale,
  },
}: {
  params: {
    locale: string
  }
}) {
  const t = await getTranslations({ locale, namespace: "pages.subpages.aboutUs" });

  return {
    title: t("title"),
  } satisfies Metadata;
}

async function getData({ params: { locale } }: PageProps) {
  const aboutEntries = await query.about(locale);
  const timelineEntries = await query.timeline(locale);

  if (!aboutEntries) {
    throw notFound();
  }

  return { before: aboutEntries.before, after: aboutEntries.after, timelineEntries };
}

export default async function AboutPage(props: PageProps) {
  unstable_setRequestLocale(props.params.locale);
  const { before, after, timelineEntries } = await getData(props);

  return (
    <div className="flex w-full max-w-home flex-col gap-8 self-center p-4">
      <div className="flex max-w-3xl flex-col self-center">
        {before.title && <Typography as="h1" variant="h1" className="mb-10 text-center">{before.title}</Typography>}
        {contentfulDocumentToReactComponents(before.description)}
      </div>
      <AboutTimeline timelineEntries={timelineEntries} />
      <div className="flex max-w-3xl flex-col self-center">{contentfulDocumentToReactComponents(after.description)}</div>
    </div>
  );
}
