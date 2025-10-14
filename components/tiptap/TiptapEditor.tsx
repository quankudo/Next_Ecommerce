"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { BulletList, ListItem, OrderedList } from '@tiptap/extension-list'
import Document from "@tiptap/extension-document";
import Highlight from '@tiptap/extension-highlight'
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TipTapImage from "./TipTapImage";
import TipTapLink from "./TipTapLink";
import TipTapListItem from "./TipTapListItem";
import TipTapHighLight from "./TipTapHighLight";

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export default function TiptapEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Document,
      Paragraph,
      Text,
      Highlight.configure({ multicolor: true }),
      BulletList, OrderedList, ListItem,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
        protocols: ['http', 'https'],
        isAllowedUri: (url, ctx) => {
          try {
            // construct URL
            const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`)

            // use default validation
            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false
            }

            // disallowed protocols
            const disallowedProtocols = ['ftp', 'file', 'mailto']
            const protocol = parsedUrl.protocol.replace(':', '')

            if (disallowedProtocols.includes(protocol)) {
              return false
            }

            // only allow protocols specified in ctx.protocols
            const allowedProtocols = ctx.protocols.map(p => (typeof p === 'string' ? p : p.scheme))

            if (!allowedProtocols.includes(protocol)) {
              return false
            }

            // disallowed domains
            const disallowedDomains = ['example-phishing.com', 'malicious-site.net']
            const domain = parsedUrl.hostname

            if (disallowedDomains.includes(domain)) {
              return false
            }

            // all checks have passed
            return true
          } catch {
            return false
          }
        },
        shouldAutoLink: url => {
          try {
            // construct URL
            const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`)

            // only auto-link if the domain is not in the disallowed list
            const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com']
            const domain = parsedUrl.hostname

            return !disallowedDomains.includes(domain)
          } catch {
            return false
          }
        },
      }),
      Image,
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  const btnStyle = (active: boolean) =>
    `px-3 py-1 rounded text-sm border border-gray-300 transition 
     ${active ? "bg-black text-white" : "bg-white hover:bg-gray-100"}`;

  return (
    <div className="border rounded p-3 bg-white shadow-sm">
      {/* Toolbar */}
      <div className="mb-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={btnStyle(editor.isActive("bold"))}
        >
          <b>B</b>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={btnStyle(editor.isActive("italic"))}
        >
          <i>I</i>
        </button>
        <TipTapLink editor={editor} btnStyle={btnStyle} />
        <TipTapImage editor={editor} btnStyle={btnStyle} />
        <TipTapListItem editor={editor} btnStyle={btnStyle} />
        <TipTapHighLight editor={editor} />
      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        className="outline-none prose min-h-[200px] w-full px-3 py-2 border rounded focus:outline-none 
          tiptap
          [&>*:first-child]:mt-0
          [&_code]:bg-purple-100 [&_code]:rounded-md [&_code]:text-black [&_code]:text-sm [&_code]:px-1 [&_code]:py-0.5
          [&_a]:text-purple-600 [&_a]:cursor-pointer hover:[&_a]:text-purple-800"
      />
    </div>
  );
}