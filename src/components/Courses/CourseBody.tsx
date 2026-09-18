import type { ReactNode } from "react";
import { PortableText, type PortableTextBlock } from "@portabletext/react";
import CourseVideo from "./CourseVideo";
import CoursePhoto from "./CoursePhoto";
import CourseSubhead from "./CourseSubhead";
import CourseToolsSection from "./CourseToolsSection";
import CourseHomeworkSection from "./CourseHomeworkSection";
import { courseInline } from "./courseRichText";
import { urlForImage } from "@/sanity/client";
import type { CourseBodyItem } from "@/sanity/queries";

const youtubeId = (url?: string) =>
  url?.match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/)([\w-]{11})/)?.[1];

const isParagraph = (item?: CourseBodyItem) =>
  item?._type === "block" && (item.style ?? "normal") === "normal";

// A course page's description from Sanity, rendered with the same components
// and spacing as the hand-written pages: a blank line (<br />) separates a
// paragraph from a preceding paragraph or fixed section.
export default function CourseBody({ body }: { body: CourseBodyItem[] }) {
  const out: ReactNode[] = [];

  body.forEach((item, i) => {
    const key = item._key ?? String(i);
    const prev = body[i - 1];

    switch (item._type) {
      case "block": {
        const text = (
          <PortableText
            value={item as unknown as PortableTextBlock}
            components={courseInline}
          />
        );
        if (item.style === "h3") {
          out.push(<CourseSubhead key={key}>{text}</CourseSubhead>);
          break;
        }
        if (
          isParagraph(prev) ||
          prev?._type === "toolsSection" ||
          prev?._type === "homeworkSection"
        ) {
          out.push(<br key={`${key}-br`} />);
        }
        out.push(<p key={key}>{text}</p>);
        break;
      }
      case "youtube": {
        const id = youtubeId(item.url);
        if (id) out.push(<CourseVideo key={key} videoId={id} />);
        break;
      }
      case "coursePhoto":
        if (item.asset) {
          out.push(
            <CoursePhoto
              key={key}
              src={urlForImage(item as never).width(1800).url()}
              alt={item.alt || undefined}
            />,
          );
        }
        break;
      case "toolsSection":
        out.push(<CourseToolsSection key={key} />);
        break;
      case "homeworkSection":
        out.push(<CourseHomeworkSection key={key} />);
        break;
    }
  });

  return <div style={{ fontFeatureSettings: "normal" }}>{out}</div>;
}
