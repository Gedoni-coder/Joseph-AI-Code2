import { makeElementExplainable } from "./joseph-global-explain";

// Demo function to make specific elements explainable
export function initializeDemoExplainableElements() {
  // Wait a bit for components to render
  setTimeout(() => {
    // Make navigation buttons explainable
    document.querySelectorAll('a[href*="/"]').forEach((el, index) => {
      const href = el.getAttribute('href');
      const text = el.textContent?.trim();
      if (href && text && !el.hasAttribute('data-joseph-explainable')) {
        makeElementExplainable(
          el as HTMLElement,
          `Navigation link: ${text}`,
          { 
            type: 'navigation',
            destination: href,
            text: text
          }
        );
      }
    });

    // Make cards explainable
    document.querySelectorAll('[class*="card"]').forEach((el) => {
      const title = el.querySelector('h1, h2, h3, h4, h5, h6')?.textContent?.trim();
      if (title && !el.hasAttribute('data-joseph-explainable')) {
        makeElementExplainable(
          el as HTMLElement,
          `Information card: ${title}`,
          {
            type: 'card',
            title: title,
            content: el.textContent?.substring(0, 200)
          }
        );
      }
    });

    // Make metric displays explainable
    document.querySelectorAll('.text-2xl, .text-3xl, .text-4xl').forEach((el) => {
      const parent = el.closest('[class*="card"], [class*="metric"]');
      const value = el.textContent?.trim();
      if (parent && value && value.match(/[\d$%]/) && !parent.hasAttribute('data-joseph-explainable')) {
        const context = parent.querySelector('.text-sm, .text-xs')?.textContent?.trim();
        makeElementExplainable(
          parent as HTMLElement,
          `Metric display: ${context || 'Key Performance Indicator'}`,
          {
            type: 'metric',
            value: value,
            context: context,
            description: `This shows ${context || 'a key business metric'} with value ${value}`
          }
        );
      }
    });

    // Make charts explainable (if any)
    document.querySelectorAll('canvas, svg, [class*="chart"], [class*="graph"]').forEach((el) => {
      if (!el.hasAttribute('data-joseph-explainable')) {
        const container = el.closest('[class*="card"]');
        const title = container?.querySelector('h1, h2, h3, h4, h5, h6')?.textContent?.trim();
        makeElementExplainable(
          el as HTMLElement,
          `Chart: ${title || 'Data visualization'}`,
          {
            type: 'chart',
            title: title,
            description: `This chart visualizes ${title?.toLowerCase() || 'business data'} to help you understand trends and patterns.`
          }
        );
      }
    });

    // Make badges and status indicators explainable
    document.querySelectorAll('[class*="badge"]').forEach((el) => {
      const text = el.textContent?.trim();
      if (text && !el.hasAttribute('data-joseph-explainable')) {
        makeElementExplainable(
          el as HTMLElement,
          `Status badge: ${text}`,
          {
            type: 'badge',
            status: text,
            description: `This badge indicates the status or category: ${text}`
          }
        );
      }
    });

    // Make buttons explainable (action buttons)
    document.querySelectorAll('button[class*="button"], .btn').forEach((el) => {
      const text = el.textContent?.trim();
      const isIcon = el.querySelector('svg') && (!text || text.length < 3);
      if (!isIcon && text && !el.hasAttribute('data-joseph-explainable')) {
        makeElementExplainable(
          el as HTMLElement,
          `Action button: ${text}`,
          {
            type: 'button',
            action: text,
            description: `This button allows you to ${text.toLowerCase()}. Click to perform this action.`
          }
        );
      }
    });

    console.log('Joseph AI: Demo explainable elements initialized. Click on highlighted elements to get explanations!');
  }, 3000);
}

// Auto-initialize when script loads
if (typeof window !== 'undefined') {
  initializeDemoExplainableElements();
}
