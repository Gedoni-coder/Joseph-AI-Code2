from django.urls import get_resolver

def list_urls():
    resolver = get_resolver()
    url_patterns = resolver.url_patterns
    urls = []
    def extract_urls(patterns, prefix=''):
        for pattern in patterns:
            if hasattr(pattern, 'url_patterns'):
                extract_urls(pattern.url_patterns, prefix + pattern.pattern.regex.pattern)
            else:
                urls.append(prefix + pattern.pattern.regex.pattern)
    extract_urls(url_patterns)
    return urls

if __name__ == "__main__":
    urls = list_urls()
    for url in urls:
        print(url)
