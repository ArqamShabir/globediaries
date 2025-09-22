import { useEffect, useMemo, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Clock, User, Tag } from 'lucide-react';

interface ContentRendererProps {
  content: string;
  excerpt?: string;
  className?: string;
  showFullContent?: boolean;
  maxHeight?: string;
  collapseAtChars?: number; // show toggle if content longer than this
  previewMode?: 'substring' | 'mask'; // how to collapse
  scrollOnToggle?: boolean; // whether to auto-scroll when toggling
  title?: string;
  publishDate?: string;
  author?: string;
  tags?: string[];
  readingTime?: number;
}

const ContentRenderer = ({ 
  content, 
  excerpt,
  className = "",
  showFullContent = true,
  maxHeight = "300px",
  collapseAtChars = 10000,
  previewMode = 'substring',
  scrollOnToggle = false,
  title,
  publishDate,
  author,
  tags = [],
  readingTime
}: ContentRendererProps) => {
  const [isExpanded, setIsExpanded] = useState(showFullContent);
  const [measuredOverflow, setMeasuredOverflow] = useState(false);
  
  // Utilities to sanitize and enhance WP HTML content
  const enhanceImages = (html: string) =>
    html
      // Add lazy loading and async decoding to all <img> tags
      .replace(/<img(?![^>]*\bloading=)[^>]*?>/gi, (m) =>
        m.replace('<img', '<img loading="lazy" decoding="async"')
      )
      // Ensure images don't overflow container (fallback if prose-img styles don’t apply)
      .replace(/<img([^>]*)style=("|')(.*?)(\2)([^>]*)>/gi, (m, a1, q, styles, _q2, a2) => {
        const merged = styles.includes('max-width') ? styles : `${styles};max-width:100%;height:auto;`;
        return `<img${a1}style=${q}${merged}${q}${a2}>`;
      })
      .replace(/<img(?![^>]*style=)([^>]*)>/gi, '<img style="max-width:100%;height:auto;" $1>');

  // Clean and process content
  const cleanContent = useMemo(() => {
    const stripped = content
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      .replace(/<!--([\s\S]*?)-->/g, '');
    return enhanceImages(stripped);
  }, [content]);
  
  const hasLongContentByChars = cleanContent.length > collapseAtChars;
  // Final decision will also consider measured overflow (pixel height)
  const hasLongContent = hasLongContentByChars || measuredOverflow;
  const displayContent = isExpanded
    ? cleanContent
    : previewMode === 'mask'
      ? cleanContent
      : (excerpt || cleanContent.slice(0, 500) + '...');

  // Ref for smooth scroll on toggle
  const rootRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  // Enhance WordPress block markup (TOC, FAQ, code, tables, etc.)
  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const markEnhanced = (el: Element) => el.setAttribute('data-wp-enhanced', 'true');
    const isEnhanced = (el: Element) => el.getAttribute('data-wp-enhanced') === 'true';

    // Table of Contents blocks
    const tocSelectors = ['.wp-block-table-of-contents', '#ez-toc-container', '.toc-container'];
    tocSelectors.forEach((selector) => {
      container.querySelectorAll<HTMLElement>(selector).forEach((toc) => {
        if (isEnhanced(toc)) return;
        markEnhanced(toc);
        toc.classList.add('border', 'border-border', 'rounded-xl', 'bg-card/70', 'p-5', 'shadow-sm', 'backdrop-blur-sm');

        const heading = toc.querySelector<HTMLElement>('h1, h2, h3, h4, h5, h6, .ez-toc-title, .toc-title, p:first-child');
        if (heading) {
          heading.classList.add('text-xs', 'uppercase', 'tracking-widest', 'font-semibold', 'text-muted-foreground', 'mb-3');
        }

        toc.querySelectorAll<HTMLUListElement>('ul').forEach((ul) => {
          ul.classList.add('space-y-2', 'pl-4', 'text-sm');
        });

        toc.querySelectorAll<HTMLLIElement>('li').forEach((li) => {
          li.classList.add('text-muted-foreground', 'transition-colors', 'hover:text-primary');
        });

        toc.querySelectorAll<HTMLAnchorElement>('a').forEach((anchor) => {
          anchor.classList.add('hover:text-primary', 'focus-visible:outline-none', 'focus-visible:ring-1', 'focus-visible:ring-primary', 'rounded');
        });
      });
    });

    // FAQ blocks (Yoast, core details, etc.)
    const faqSelectors = [
      '.wp-block-yoast-faq-block',
      '.schema-faq-section',
      '.wp-block-details',
      '.faq',
    ];

    container.querySelectorAll<HTMLElement>(faqSelectors.join(',')).forEach((faqWrapper) => {
      // If this is a Yoast wrapper, handle its sections individually
      if (faqWrapper.classList.contains('wp-block-yoast-faq-block')) {
        if (isEnhanced(faqWrapper)) return;
        faqWrapper.classList.add('space-y-3');
        faqWrapper.querySelectorAll<HTMLElement>('.schema-faq-section').forEach((section) => {
          if (isEnhanced(section)) return;
          const question = section.querySelector<HTMLElement>('.schema-faq-question');
          const answer = section.querySelector<HTMLElement>('.schema-faq-answer');
          if (!question || !answer) return;

          const details = document.createElement('details');
          details.className = 'group border border-border rounded-xl bg-card/70 px-5 py-4 shadow-sm transition-all duration-200';

          const summary = document.createElement('summary');
          summary.className = 'flex items-center justify-between cursor-pointer text-foreground font-semibold';
          summary.innerHTML = `${question.innerHTML}`;

          const chevron = document.createElement('span');
          chevron.className = 'ml-3 text-muted-foreground transition-transform duration-200 group-open:-rotate-180';
          chevron.innerHTML = '&#9662;';
          summary.appendChild(chevron);

          const answerWrap = document.createElement('div');
          answerWrap.className = 'mt-3 text-muted-foreground leading-relaxed space-y-2';
          answerWrap.innerHTML = answer.innerHTML;

          details.appendChild(summary);
          details.appendChild(answerWrap);

          section.replaceWith(details);
          markEnhanced(details);
        });
        markEnhanced(faqWrapper);
        return;
      }

      if (faqWrapper.tagName.toLowerCase() === 'details') {
        faqWrapper.classList.add('group', 'border', 'border-border', 'rounded-xl', 'bg-card/70', 'px-5', 'py-4', 'shadow-sm');
        const summary = faqWrapper.querySelector('summary');
        if (summary && !summary.querySelector('.faq-chevron')) {
          summary.classList.add('flex', 'items-center', 'justify-between', 'cursor-pointer', 'font-semibold', 'text-foreground');
          const chevron = document.createElement('span');
          chevron.className = 'faq-chevron ml-3 text-muted-foreground transition-transform duration-200 group-open:-rotate-180';
          chevron.innerHTML = '&#9662;';
          summary.appendChild(chevron);
        }
        faqWrapper.querySelectorAll('*:not(summary)').forEach((el) => {
          (el as HTMLElement).classList.add('text-muted-foreground');
        });
        markEnhanced(faqWrapper);
        return;
      }

      if (faqWrapper.matches('.schema-faq-section, .faq-item')) {
        if (isEnhanced(faqWrapper)) return;
        const question = faqWrapper.querySelector('h2, h3, h4, strong, .schema-faq-question');
        const answer = faqWrapper.querySelector('p, div, .schema-faq-answer');
        if (!question || !answer) return;
        const details = document.createElement('details');
        details.className = 'group border border-border rounded-xl bg-card/70 px-5 py-4 shadow-sm';
        const summary = document.createElement('summary');
        summary.className = 'flex items-center justify-between cursor-pointer text-foreground font-semibold';
        summary.innerHTML = question.innerHTML;
        const chevron = document.createElement('span');
        chevron.className = 'ml-3 text-muted-foreground transition-transform duration-200 group-open:-rotate-180';
        chevron.innerHTML = '&#9662;';
        summary.appendChild(chevron);
        const body = document.createElement('div');
        body.className = 'mt-3 text-muted-foreground leading-relaxed space-y-2';
        body.innerHTML = answer.innerHTML;
        details.appendChild(summary);
        details.appendChild(body);
        faqWrapper.replaceWith(details);
        markEnhanced(details);
      }
    });

    // Code blocks
    container.querySelectorAll<HTMLPreElement>('pre').forEach((pre) => {
      if (isEnhanced(pre)) return;
      pre.classList.add('bg-muted/80', 'rounded-xl', 'border', 'border-border', 'p-4', 'overflow-x-auto', 'shadow-inner');
      pre.setAttribute('tabindex', '0');
      markEnhanced(pre);
    });

    container.querySelectorAll<HTMLElement>('pre code').forEach((code) => {
      if (isEnhanced(code)) return;
      code.classList.add('block', 'text-sm', 'leading-relaxed');
      markEnhanced(code);
    });

    container.querySelectorAll<HTMLTableElement>('table').forEach((table) => {
      if (isEnhanced(table)) return;
      table.classList.add('w-full', 'border', 'border-border', 'rounded-xl', 'overflow-hidden');
      const wrapper = document.createElement('div');
      wrapper.className = 'overflow-x-auto rounded-xl border border-border bg-card/70 shadow-sm';
      table.parentElement?.insertBefore(wrapper, table);
      wrapper.appendChild(table);
      table.querySelectorAll('th').forEach((th) => {
        th.classList.add('bg-muted/70', 'p-3', 'text-left', 'font-semibold', 'text-foreground');
      });
      table.querySelectorAll('td').forEach((td) => {
        td.classList.add('p-3', 'text-muted-foreground', 'align-top');
      });
      markEnhanced(table);
    });

    // Blockquotes tidy
    container.querySelectorAll<HTMLQuoteElement>('blockquote').forEach((blockquote) => {
      if (isEnhanced(blockquote)) return;
      blockquote.classList.add('relative', 'border-l-4', 'border-primary', 'bg-primary/5', 'p-5', 'rounded-r-xl');
      markEnhanced(blockquote);
    });
  }, [displayContent, isExpanded]);

  // Measure content height vs provided maxHeight (supports px and em) and set measuredOverflow
  useEffect(() => {
    if (!contentRef.current) return;

    const parseMaxHeight = (val: string | undefined): number | undefined => {
      if (!val) return undefined;
      const s = String(val).trim();
      if (s.endsWith('px')) return parseFloat(s.replace('px', ''));
      if (s.endsWith('em')) return parseFloat(s.replace('em', '')) * 16; // assume 16px base
      if (s.endsWith('%')) return undefined; // percent-based heights are tricky
      const n = parseFloat(s);
      return isNaN(n) ? undefined : n;
    };

    const measure = () => {
      requestAnimationFrame(() => {
        const el = contentRef.current as HTMLDivElement;
        const maxH = parseMaxHeight((maxHeight as string) || undefined);
        if (maxH && el) {
          const scrollH = el.scrollHeight;
          setMeasuredOverflow(scrollH > maxH + 2); // small tolerance
        } else {
          // if no pixel maxHeight provided, fallback to char-based
          setMeasuredOverflow(false);
        }
      });
    };

    measure();
    // also measure when images/fonts load (try a short interval for dynamic content)
    const iv = setInterval(measure, 500);
    const to = setTimeout(() => clearInterval(iv), 3000);
    return () => {
      clearInterval(iv);
      clearTimeout(to);
    };
  }, [cleanContent, maxHeight]);

  const firstToggle = useRef(true);
  useEffect(() => {
    if (!scrollOnToggle) return;
    // Skip on initial mount
    if (firstToggle.current) {
      firstToggle.current = false;
      return;
    }
    if (rootRef.current) {
      requestAnimationFrame(() => {
        rootRef.current?.scrollIntoView({ behavior: 'auto', block: 'start' });
      });
    }
  }, [isExpanded, scrollOnToggle]);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Article Meta */}
      {(publishDate || author || readingTime || tags.length > 0) && (
        <Card className="border-none bg-muted/30">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {publishDate && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{new Date(publishDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
              )}
              
              {author && (
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{author}</span>
                </div>
              )}
              
              {readingTime && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{readingTime} min read</span>
                </div>
              )}
              
              {tags.length > 0 && (
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  <div className="flex flex-wrap gap-1">
                    {tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{tags.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Content */}
      <Card ref={rootRef} className="border-none shadow-none bg-transparent">
        <CardContent className="p-0">
          <div
            ref={contentRef}
            className={`
              prose prose-lg max-w-none
              prose-headings:font-display prose-headings:text-foreground
              prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-base
              prose-strong:text-foreground prose-strong:font-semibold
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground
              prose-code:bg-muted prose-code:text-foreground prose-code:px-1 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-muted prose-pre:border
              prose-img:rounded-lg prose-img:shadow-md
              prose-ul:text-muted-foreground prose-ol:text-muted-foreground
              prose-li:text-muted-foreground
              prose-table:border prose-th:border prose-td:border
              prose-hr:border-border
              ${!isExpanded && hasLongContent ? 'overflow-hidden' : ''}
            `}
            style={!isExpanded && hasLongContent ? { maxHeight, maskImage: 'linear-gradient(to bottom, black 70%, transparent)' } : {}}
            dangerouslySetInnerHTML={{ __html: displayContent }}
          />
          
          {hasLongContent && (
            <div className="mt-6 text-center">
              <Button
                variant="outline"
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2"
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="h-4 w-4" />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4" />
                    Read More
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentRenderer;
