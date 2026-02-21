const fs = require('fs');
const path = require('path');

const DIRS = ['.', 'admin', 'owner', 'salesteam', 'user'];

function processDir(dir) {
    const files = fs.readdirSync(dir);
    
    for(const file of files) {
        if(file.endsWith('.html')) {
            const filePath = path.join(dir, file);
            let content = fs.readFileSync(filePath, 'utf-8');
            let modified = false;

            // 1. Determine relative path
            const relPath = dir === '.' ? '' : '../';
            const scriptTag = `<script src="${relPath}assets/js/theme.js"></script>`;
            
            // 2. Inject script tag into head before main.css or before </head>
            if(!content.includes('theme.js')) {
                const mainCssRe = new RegExp(`<link[^>]*href="${relPath}assets/css/main.css"[^>]*>`);
                if(mainCssRe.test(content)) {
                    content = content.replace(mainCssRe, match => `${scriptTag}\n    ${match}`);
                    modified = true;
                } else if(content.includes('</head>')) {
                    content = content.replace('</head>', `    ${scriptTag}\n</head>`);
                    modified = true;
                }
            }

            // 3. Inject Toggle Button
            if(!content.includes('theme-toggle-btn')) {
                if(dir === 'user') {
                    // Inject into user-header-actions
                    const userActionsRe = /<div class="user-header-actions">/;
                    if(userActionsRe.test(content)) {
                        const btn = `<button class="user-icon-btn theme-toggle-btn" onclick="toggleTheme()"><i class="fas fa-sun"></i></button>`;
                        content = content.replace(userActionsRe, `<div class="user-header-actions">\n        ${btn}`);
                        modified = true;
                    }
                } else if (dir === 'admin' || dir === 'owner' || dir === 'salesteam') {
                    // Inject into topbar-actions
                    const topbarActionsRe = /<div class="topbar-actions">/;
                    if(topbarActionsRe.test(content)) {
                        const btn = `<button class="topbar-btn theme-toggle-btn" onclick="toggleTheme()" data-tooltip="Switch Theme"><i class="fas fa-sun"></i></button>`;
                        content = content.replace(topbarActionsRe, `<div class="topbar-actions">\n        ${btn}`);
                        modified = true;
                    }
                } else if (dir === '.') {
                    if (file === 'index.html') {
                        // Inject into nav-actions
                        const navActionsRe = /<div class="nav-actions">/;
                        if(navActionsRe.test(content)) {
                            const btn = `<button class="btn btn-ghost btn-icon theme-toggle-btn" onclick="toggleTheme()" style="padding: 10px; font-size: 1.1rem; border-radius: 50%;"><i class="fas fa-sun"></i></button>`;
                            content = content.replace(navActionsRe, `<div class="nav-actions">\n        ${btn}`);
                            modified = true;
                        }
                        
                        // Also inject into mobile-nav
                        const mobileNavRe = /<div class="mobile-nav" id="mobileNav">/;
                        if(mobileNavRe.test(content)) {
                            const mobileBtn = `<a href="javascript:void(0)" onclick="toggleTheme()" class="theme-toggle-btn">☀️ Toggle Theme</a>`;
                            content = content.replace(mobileNavRe, `<div class="mobile-nav" id="mobileNav">\n      ${mobileBtn}`);
                            modified = true;
                        }

                    } else if (file === 'login.html' || file === 'register.html') {
                        // Inject absolute pos button
                        const bodyStart = /<body>/;
                        if(bodyStart.test(content)) {
                            const btn = `\n  <button class="theme-toggle-btn" onclick="toggleTheme()" style="position: absolute; top: 20px; right: 20px; background: var(--bg-card); border: 1px solid var(--border); border-radius: 50%; width: 44px; height: 44px; color: var(--text-primary); cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; z-index: 100; box-shadow: var(--shadow-sm);"><i class="fas fa-sun"></i></button>`;
                            content = content.replace(bodyStart, `<body>${btn}`);
                            modified = true;
                        }
                    }
                }
            }

            if(modified) {
                fs.writeFileSync(filePath, content, 'utf-8');
                console.log(`Updated ${filePath}`);
            }
        }
    }
}

DIRS.forEach(processDir);
console.log('Done injecting theme script and toggles.');
