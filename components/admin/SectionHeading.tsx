import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface SectionHeadingProps {
  text: string;
  links?: { label: string; href: string }[];
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ text, links }) => {
  return (
    <div className="bg-white shadow rounded p-4 flex items-center gap-3">
      {links && (
        <div className="flex gap-3">
          {links.map((link, idx) => (
            <div key={idx} className="flex items-center gap-3">
                <Link
                    href={link.href}
                    className="text-black hover:underline text-xl"
                    >
                    {link.label}
                </Link>
                <ChevronRight className="w-5 h-5"/>
            </div>
          ))}
        </div>
      )}
      <h4 className={`${links ? 'text-sm' : 'text-xl'}`}>{text}</h4>
    </div>
  );
};

export default SectionHeading;