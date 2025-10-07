import ContentRenderer from '@/components/ContentRenderer';

interface WordPressContentProps {
  content: string;
  className?: string;
}

const WordPressContent = ({ content, className = '' }: WordPressContentProps) => {
  if (!content) {
    return null;
  }

  return (
    <ContentRenderer
      content={content}
      className={className}
      showFullContent
      previewMode="substring"
      collapseAtChars={Number.MAX_SAFE_INTEGER}
    />
  );
};

export default WordPressContent;
