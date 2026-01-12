const fs = require('fs');
const path = require('path');

const TOOLS_DIR = path.join(__dirname, '../tools');
const INDEX_PATH = path.join(__dirname, '../index.html');
const SITEMAP_PATH = path.join(__dirname, '../sitemap.xml');
const BASE_URL = 'https://YOUR_USER_NAME.github.io/Quick-Tools'; // CHANGE THIS

function getToolMetadata(toolPath) {
    try {
        const indexPath = path.join(toolPath, 'index.html');
        if (!fs.existsSync(indexPath)) return null;

        const content = fs.readFileSync(indexPath, 'utf-8');
        
        // Simple regex to extract meta tags. 
        // In a real production app, might use cheerio/jsdom, 
        // but for zero-dep simplicity regex is fine here.
        const titleMatch = content.match(/<title>(.*?)<\/title>/);
        const descMatch = content.match(/<meta name="description" content="(.*?)"/);

        return {
            folder: path.basename(toolPath),
            title: titleMatch ? titleMatch[1] : path.basename(toolPath),
            description: descMatch ? descMatch[1] : 'A useful web tool.',
            path: `tools/${path.basename(toolPath)}/index.html`
        };
    } catch (e) {
        console.error(`Error reading ${toolPath}:`, e);
        return null;
    }
}

function generateSitemap(tools) {
    const today = new Date().toISOString().split('T')[0];
    
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${BASE_URL}/</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>`;

    tools.forEach(tool => {
        xml += `
    <url>
        <loc>${BASE_URL}/${tool.path}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>`;
    });

    xml += `
</urlset>`;

    fs.writeFileSync(SITEMAP_PATH, xml);
    console.log('✅ sitemap.xml generated');
}

function updateIndexHtml(tools) {
    let html = fs.readFileSync(INDEX_PATH, 'utf-8');
    
    const cardsHtml = tools.map(tool => `
                <a href="${tool.path}" class="card">
                    <h3>${tool.title}</h3>
                    <p>${tool.description}</p>
                    <div class="arrow">Use Tool &rarr;</div>
                </a>`).join('\n');

    // Regex to find the grid container and replace its content
    const gridRegex = /(<div class="grid" id="tool-grid">)([\s\S]*?)(<\/div>)/;
    
    if (gridRegex.test(html)) {
        html = html.replace(gridRegex, `$1\n${cardsHtml}\n$3`);
        fs.writeFileSync(INDEX_PATH, html);
        console.log('✅ index.html updated with ' + tools.length + ' tools');
    } else {
        console.error('❌ Could not find #tool-grid in index.html');
    }
}

function main() {
    if (!fs.existsSync(TOOLS_DIR)) {
        console.log('No tools directory found.');
        return;
    }

    const tools = fs.readdirSync(TOOLS_DIR, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => getToolMetadata(path.join(TOOLS_DIR, dirent.name)))
        .filter(t => t !== null);

    updateIndexHtml(tools);
    generateSitemap(tools);
}

main();
