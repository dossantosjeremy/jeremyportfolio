/**
 * Extract the text content of a section from a markdown string.
 * Finds the text between `## Heading` and the next `##` (or end of string).
 * Returns empty string if heading not found.
 */
export function extractSection(md: string, heading: string): string {
  const regex = new RegExp(
    `##\\s+${heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?(?=\\n##\\s|$)`,
    'i'
  );
  const match = md.match(regex);
  if (!match) return '';
  // Remove the heading line itself
  return match[0].replace(/^##\s+[^\n]+\n/, '').trim();
}

/**
 * Strip YAML frontmatter (--- ... ---) from a markdown string.
 */
export function stripFrontmatter(md: string): string {
  return md.replace(/^---[\s\S]*?---\s*/m, '').trim();
}

/**
 * Extract the first prose paragraph after stripping frontmatter.
 * Skips blank lines, headings (#), and horizontal rules (---).
 */
export function extractFirstParagraph(md: string): string {
  const body = stripFrontmatter(md);
  const lines = body.split('\n');
  const paragraphLines: string[] = [];
  let started = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (started) break; // end of first paragraph
      continue;
    }
    if (trimmed.startsWith('#') || trimmed === '---' || trimmed.startsWith('|')) {
      if (started) break;
      continue;
    }
    started = true;
    paragraphLines.push(trimmed);
  }

  return stripMarkdown(paragraphLines.join(' '));
}

/**
 * Strip basic markdown formatting from a text string:
 * - YAML frontmatter
 * - Headings (#, ##, ###...)
 * - Bold/italic (**text**, *text*, __text__, _text_)
 * - Inline code (`code`)
 * - Blockquotes (> text)
 * - List markers (- item, * item, 1. item)
 * - Image refs (![alt](url))
 * - Links ([text](url)) → keeps text
 * - Horizontal rules (---, ***)
 * - Table rows (| col | col |)
 * - HTML tags
 */
export function stripMarkdown(text: string): string {
  return text
    // Remove frontmatter
    .replace(/^---[\s\S]*?---\s*/m, '')
    // Remove images
    .replace(/!\[.*?\]\(.*?\)/g, '')
    // Links → keep text only
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Bold + italic
    .replace(/\*{1,3}([^*]+)\*{1,3}/g, '$1')
    .replace(/_{1,3}([^_]+)_{1,3}/g, '$1')
    // Inline code
    .replace(/`[^`]+`/g, '')
    // Headings
    .replace(/^#{1,6}\s+/gm, '')
    // Blockquotes
    .replace(/^>\s+/gm, '')
    // List markers
    .replace(/^[-*+]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    // Horizontal rules
    .replace(/^[-*_]{3,}\s*$/gm, '')
    // Table rows
    .replace(/^\|.*\|$/gm, '')
    // HTML tags
    .replace(/<[^>]+>/g, '')
    // Collapse multiple blank lines
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
