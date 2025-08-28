
export function parseImageTextBlock(htmlString: string): string {
  const paragraphs = htmlString.split('</p>').filter(p => p.includes('<p>')).map(p => p + '</p>');

  return paragraphs.map(paragraph => {
    const text = paragraph.replace(/<[^>]*>/g, '').trim();

    const className = paragraph.includes('<strong') ? 'body_1' : 'body_2';

    return `<p class="${className}">\n  ${text}\n</p>`;
  }).join('\n');
}
