'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
export default function MobileContents({
  headings,
}: {
  headings: { id: string; text: string; level: number }[];
}) {
  if (!headings.length) return null;
  return (
    <Accordion className="mobile-contents">
      <AccordionItem value="contents">
        <AccordionTrigger>本文目录 · {headings.length} 个章节</AccordionTrigger>
        <AccordionContent>
          <nav aria-label="移动端本文目录">
            <ol>
              {headings.map((h) => (
                <li key={h.id}>
                  <a href={'#' + h.id}>{h.text}</a>
                </li>
              ))}
            </ol>
          </nav>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
