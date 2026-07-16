'use client';

import React, { useMemo, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface ExpandableDescriptionProps {
  text: string;
  className?: string;
  /** Tailwind line-clamp class when collapsed, e.g. line-clamp-3 */
  collapsedClamp?: string;
}

const LONG_TEXT_THRESHOLD = 220;

export const ExpandableDescription: React.FC<ExpandableDescriptionProps> = ({
  text,
  className = '',
  collapsedClamp = 'line-clamp-4',
}) => {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);

  const isLong = useMemo(
    () => text.length > LONG_TEXT_THRESHOLD || text.includes('\n\n'),
    [text]
  );

  return (
    <div className={className}>
      <div
        className={`text-sm sm:text-[15px] text-muted-foreground leading-relaxed whitespace-pre-line ${
          !expanded && isLong ? collapsedClamp : ''
        }`}
      >
        {text}
      </div>
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-2.5 text-sm font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-expanded={expanded}
        >
          {expanded ? t.readLess : t.readMore}
        </button>
      )}
    </div>
  );
};
