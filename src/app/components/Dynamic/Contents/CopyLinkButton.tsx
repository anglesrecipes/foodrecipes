// CopyLinkButton.tsx
"use client";

import React from 'react';
import { BsCopy } from 'react-icons/bs';

const CopyLinkButton: React.FC<{ postUrl: string }> = ({ postUrl }) => {
  const copyLink = () => {
    navigator.clipboard.writeText(postUrl).then(() => {
      alert('Link copied to clipboard!');
    });
  };

  return (
    <button onClick={copyLink} className="flex justify-center items-center gap-1 text-sm text-slate-800 gap-y-1.5 font-semibold">
      <BsCopy className="text-slate-600 size-5 relative -top-[1px]" />Copy Link
    </button>
  );
};

export default CopyLinkButton;
