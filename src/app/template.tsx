'use client';

import React from 'react';

export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="voltix-page-enter flex-1 flex flex-col">{children}</div>;
}
