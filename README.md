# Quick Tools Platform ⚡

A professional, client-side-only web platform for hosting utility tools and mini-apps. Designed for speed, privacy, and ease of expansion ("vibe coding").

## 🚀 Features

*   **Zero Backend**: Runs entirely in the browser (GitHub Pages).
*   **Automated Management**: A Node.js build script automatically adds new tools to the homepage and generates a sitemap.
*   **Premium Design**: Glassmorphism UI with dark mode support.
*   **SEO Optimized**: Automatic Sitemap generation and JSON-LD Schema integration.
*   **Monetization Ready**: Placeholders for Google Analytics and AdSense.

## 🛠️ Project Structure

```text
Quick-Tools/
├── .github/workflows/   # CI/CD for auto-deployment
├── assets/              # Shared CSS, JS, and Images
│   ├── css/style.css    # Premium Glassmorphism Theme
├── scripts/             # Build automation
│   ├── build.js         # Scans tools/ and updates index.html
├── tools/               # Directory for all tools
│   ├── template/        # Starter template for new tools
│   ├── content-prompt/  # Example tool
├── index.html           # Main Landing Page (Auto-updated)
└── sitemap.xml          # SEO Sitemap (Auto-generated)
```

## ✨ How to Add a New Tool ("Vibe Coding")

Adding a new tool is effortless. You don't need to touch the homepage.

1.  **Duplicate the Template**:
    Copy the `tools/template` folder and rename it (e.g., `tools/my-calculator`).
2.  **Edit your Tool**:
    *   Open `tools/my-calculator/index.html`.
    *   Update the `<title>` and `<meta name="description">`.
    *   Write your code!
3.  **Push**:
    Commit and push your changes to `main`.
    *   The **Build Script** will detect your new folder.
    *   It will add a card to `index.html`.
    *   It will update `sitemap.xml`.
    *   GitHub Actions will deploy the live site.

## 📝 Coding Practices

We follow specific standards to ensure high quality and SEO performance.

### 1. SEO Schema (JSON-LD)
Every page MUST include JSON-LD structured data in the `<head>` tag.
*   **Homepage (`index.html`)**: Uses `WebSite` schema.
*   **Tools**: Use `SoftwareApplication` schema.

**Example:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "My Tool Name",
  "operatingSystem": "Any",
  "description": "Short description..."
}
</script>
```

### 2. Client-Side Only
*   Do not use server-side languages (PHP, Python, etc.) for the runtime.
*   All logic must be in JavaScript within the browser.
*   Use local storage if data persistence is needed.

### 3. Glassmorphism Design
*   Use the shared `assets/css/style.css`.
*   Wrap content in container classes provided by the specific tool design (or creating new standard cards).
*   Avoid inline styles where possible, use CSS variables (e.g., `var(--primary-color)`).

## 🌍 Deployment

The project is hosted on GitHub Pages.
*   **URL**: `https://<YOUR-USERNAME>.github.io/Quick-Tools/`
*   **Workflow**: `.github/workflows/deploy.yml` handles the build and deploy process automatically on every push to `main`.