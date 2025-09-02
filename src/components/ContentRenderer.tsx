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
  title,
  publishDate,
  author,
  tags = [],
  readingTime
}: ContentRendererProps) => {
  const [isExpanded, setIsExpanded] = useState(showFullContent);
  
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
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
    return enhanceImages(stripped);
  }, [content]);
  
  const hasLongContent = cleanContent.length > 10000;
  const displayContent = isExpanded ? cleanContent : (excerpt || cleanContent.slice(0, 500) + '...');

  // Ref for smooth scroll on toggle
  const rootRef = useRef<HTMLDivElement | null>(null);

  const firstToggle = useRef(true);
  useEffect(() => {
    // Skip on initial mount to avoid auto-scrolling on first render
    if (firstToggle.current) {
      firstToggle.current = false;
      return;
    }
    // Scroll to the top of the content on both expand and collapse
    if (rootRef.current) {
      requestAnimationFrame(() => {
        rootRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, [isExpanded]);

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
