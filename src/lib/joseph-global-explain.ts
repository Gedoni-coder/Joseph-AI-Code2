// Global utility to make any element clickable for Joseph AI explanation

interface ExplainableElement {
  element: HTMLElement;
  description: string;
  data?: any;
  context?: string;
}

class JosephGlobalExplainer {
  private explainFunction: ((description: string, data?: any) => void) | null = null;
  private explainableElements: Map<HTMLElement, ExplainableElement> = new Map();
  private observer: MutationObserver | null = null;

  constructor() {
    this.initializeGlobalListener();
    this.observeDOM();
  }

  // Set the explain function from the chatbot
  setExplainFunction(fn: (description: string, data?: any) => void) {
    this.explainFunction = fn;
  }

  // Make an element explainable by Joseph
  makeExplainable(
    element: HTMLElement | string,
    description: string,
    data?: any,
    context?: string
  ) {
    const el = typeof element === 'string' ? document.querySelector(element) as HTMLElement : element;
    if (!el) return;

    // Add visual indicator
    el.style.cursor = 'help';
    el.style.position = 'relative';
    
    // Add hover effect
    el.addEventListener('mouseenter', () => {
      el.style.outline = '2px solid rgba(59, 130, 246, 0.5)';
      el.style.outlineOffset = '2px';
    });
    
    el.addEventListener('mouseleave', () => {
      el.style.outline = 'none';
    });

    // Store element info
    this.explainableElements.set(el, { element: el, description, data, context });

    // Add data attribute for identification
    el.setAttribute('data-joseph-explainable', 'true');
    el.setAttribute('data-joseph-description', description);
  }

  // Remove explainable status from element
  removeExplainable(element: HTMLElement | string) {
    const el = typeof element === 'string' ? document.querySelector(element) as HTMLElement : element;
    if (!el) return;

    el.style.cursor = '';
    el.style.outline = 'none';
    el.removeAttribute('data-joseph-explainable');
    el.removeAttribute('data-joseph-description');
    this.explainableElements.delete(el);
  }

  // Auto-make elements explainable based on common patterns
  autoDetectExplainableElements() {
    // Charts and visualizations
    document.querySelectorAll('[class*="chart"], [class*="graph"], canvas, svg').forEach((el) => {
      if (!el.hasAttribute('data-joseph-explainable')) {
        this.makeExplainable(
          el as HTMLElement,
          'Chart or visualization',
          { type: 'chart', element: el.className || el.tagName }
        );
      }
    });

    // Metric cards and key numbers
    document.querySelectorAll('[class*="metric"], [class*="card"], [class*="stat"]').forEach((el) => {
      const text = (el as HTMLElement).textContent?.trim();
      if (text && text.match(/\$|%|\d+/) && !el.hasAttribute('data-joseph-explainable')) {
        this.makeExplainable(
          el as HTMLElement,
          `Metric card: ${text?.substring(0, 50)}...`,
          { type: 'metric', value: text }
        );
      }
    });

    // Tables
    document.querySelectorAll('table, [class*="table"]').forEach((el) => {
      if (!el.hasAttribute('data-joseph-explainable')) {
        this.makeExplainable(
          el as HTMLElement,
          'Data table',
          { type: 'table', rows: el.querySelectorAll('tr').length }
        );
      }
    });

    // Badges and status indicators
    document.querySelectorAll('[class*="badge"], [class*="status"], [class*="tag"]').forEach((el) => {
      const text = (el as HTMLElement).textContent?.trim();
      if (text && !el.hasAttribute('data-joseph-explainable')) {
        this.makeExplainable(
          el as HTMLElement,
          `Status indicator: ${text}`,
          { type: 'badge', status: text }
        );
      }
    });
  }

  // Initialize global click listener
  private initializeGlobalListener() {
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      
      // Check if clicked element or any parent is explainable
      let currentElement: HTMLElement | null = target;
      while (currentElement) {
        if (currentElement.hasAttribute('data-joseph-explainable')) {
          e.preventDefault();
          e.stopPropagation();
          
          const explainableData = this.explainableElements.get(currentElement);
          if (explainableData && this.explainFunction) {
            this.explainFunction(explainableData.description, explainableData.data);
          }
          return;
        }
        currentElement = currentElement.parentElement;
      }
    });
  }

  // Observe DOM changes to auto-detect new explainable elements
  private observeDOM() {
    this.observer = new MutationObserver((mutations) => {
      let shouldAutoDetect = false;
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // Check if new nodes contain charts, metrics, etc.
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as HTMLElement;
              if (element.querySelector && (
                element.querySelector('[class*="chart"], [class*="metric"], [class*="card"]') ||
                element.classList.toString().match(/chart|metric|card|table/)
              )) {
                shouldAutoDetect = true;
              }
            }
          });
        }
      });
      
      if (shouldAutoDetect) {
        // Debounce auto-detection
        setTimeout(() => this.autoDetectExplainableElements(), 1000);
      }
    });

    this.observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // Cleanup
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    this.explainableElements.clear();
  }
}

// Create global instance
const josephExplainer = new JosephGlobalExplainer();

// Export utilities
export const makeElementExplainable = (
  element: HTMLElement | string,
  description: string,
  data?: any,
  context?: string
) => josephExplainer.makeExplainable(element, description, data, context);

export const removeElementExplainable = (element: HTMLElement | string) => 
  josephExplainer.removeExplainable(element);

export const autoDetectExplainableElements = () => 
  josephExplainer.autoDetectExplainableElements();

export const setJosephExplainFunction = (fn: (description: string, data?: any) => void) => 
  josephExplainer.setExplainFunction(fn);

// Initialize auto-detection when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => josephExplainer.autoDetectExplainableElements(), 2000);
  });
} else {
  setTimeout(() => josephExplainer.autoDetectExplainableElements(), 2000);
}

export default josephExplainer;
