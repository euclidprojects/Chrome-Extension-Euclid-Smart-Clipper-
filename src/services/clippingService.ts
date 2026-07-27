import TurndownService from 'turndown';
import DOMPurify from 'dompurify';

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
});

export const clippingService = {
  sanitizeHtml(rawHtml: string): string {
    return DOMPurify.sanitize(rawHtml, {
      ADD_TAGS: ['iframe', 'video', 'audio', 'source', 'canvas'],
      ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'src', 'controls', 'target'],
    });
  },

  htmlToMarkdown(html: string): string {
    try {
      const clean = this.sanitizeHtml(html);
      return turndown.turndown(clean);
    } catch (e) {
      console.warn('Turndown conversion warning', e);
      return html.replace(/<[^>]+>/g, '');
    }
  },

  extractSimplifiedArticle(rawHtml: string, pageUrl: string, fallbackTitle: string) {
    const doc = new DOMParser().parseFromString(rawHtml, 'text/html');

    // Remove clutter elements
    const clutterSelectors = [
      'nav',
      'header',
      'footer',
      'aside',
      '.ad',
      '.ads',
      '.advertisement',
      '.sidebar',
      '.cookie-banner',
      '.popup',
      '.social-share',
      '#comments',
      'script',
      'style',
      'noscript',
    ];
    clutterSelectors.forEach((sel) => {
      doc.querySelectorAll(sel).forEach((el) => el.remove());
    });

    // Main content candidates
    const mainCandidate =
      doc.querySelector('article') ||
      doc.querySelector('main') ||
      doc.querySelector('.content') ||
      doc.querySelector('#content') ||
      doc.body;

    const title =
      doc.querySelector('h1')?.textContent?.trim() ||
      doc.title ||
      fallbackTitle;

    const author =
      doc.querySelector('meta[name="author"]')?.getAttribute('content') ||
      doc.querySelector('.author')?.textContent?.trim() ||
      '';

    const publishedDate =
      doc.querySelector('meta[property="article:published_time"]')?.getAttribute('content') ||
      doc.querySelector('time')?.getAttribute('datetime') ||
      new Date().toLocaleDateString();

    const cleanHtml = this.sanitizeHtml(mainCandidate.innerHTML);
    const markdown = this.htmlToMarkdown(cleanHtml);
    const plainText = mainCandidate.textContent?.trim() || '';
    const wordCount = plainText.split(/\s+/).filter(Boolean).length;
    const readingTime = Math.ceil(wordCount / 200);

    return {
      title,
      author,
      publishedDate,
      cleanHtml,
      markdown,
      plainText,
      wordCount,
      readingTime,
      sourceUrl: pageUrl,
      sourceDomain: new URL(pageUrl || 'https://example.com').hostname,
    };
  },

  extractSelectedText(
    selectionText: string,
    pageTitle: string,
    pageUrl: string,
    userComment?: string
  ) {
    const formattedMarkdown = `> ${selectionText.split('\n').join('\n> ')}\n\n${userComment ? `**Note:** ${userComment}\n\n` : ''}*Clipped from [${pageTitle}](${pageUrl})*`;
    const formattedHtml = `
      <blockquote class="border-l-4 border-emerald-500 pl-4 py-2 my-3 bg-emerald-50/50 text-slate-800 italic rounded-r-md">
        ${selectionText.replace(/\n/g, '<br/>')}
      </blockquote>
      ${userComment ? `<p class="font-medium text-emerald-900 my-2"><strong>Note:</strong> ${userComment}</p>` : ''}
      <p class="text-xs text-slate-500 mt-3">Source: <a href="${pageUrl}" target="_blank" class="text-emerald-600 underline">${pageTitle}</a></p>
    `;

    return {
      markdown: formattedMarkdown,
      html: formattedHtml,
      wordCount: selectionText.split(/\s+/).length,
    };
  },

  extractCodeSnippet(
    code: string,
    language: string,
    pageTitle: string,
    pageUrl: string
  ) {
    const markdown = `\`\`\`${language}\n${code}\n\`\`\`\n\n*Source: [${pageTitle}](${pageUrl})*`;
    const html = `<pre class="bg-slate-900 text-emerald-300 p-4 rounded-xl font-mono text-sm overflow-x-auto my-3"><code>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;

    return {
      markdown,
      html,
      language,
    };
  },
};
