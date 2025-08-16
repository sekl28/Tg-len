'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FAQItem } from '@/types/casino';

interface FAQProps {
  items: FAQItem[];
  title?: string;
  className?: string;
}

const FAQ: React.FC<FAQProps> = ({ items, title = "FAQ – Your Privacy Questions Answered", className = "" }) => {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(
    new Set(items.filter(item => item.attributes.isExpanded).map(item => item.id))
  );

  const toggleItem = (id: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <section className={`${className}`}>
      <h2 className="text-3xl font-bold text-gray-300 mb-8 text-center">
        {title}
      </h2>
      
      <div className="space-y-4">
        {items.map((item) => {
          const isExpanded = expandedItems.has(item.id);
          
          return (
            <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-6">
              <button 
                className="flex items-center justify-between w-full text-left"
                onClick={() => toggleItem(item.id)}
              >
                <h3 className="text-lg font-bold text-gray-300 pr-4">
                  {item.attributes.question}
                </h3>
                <Image 
                  src={isExpanded ? "/CaretUp.svg" : "/CaretDown.svg"} 
                  alt="" 
                  width={20} 
                  height={20}
                  className="flex-shrink-0"
                />
              </button>
              
              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-base leading-relaxed text-gray-100 font-onest">
                    {item.attributes.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQ;
