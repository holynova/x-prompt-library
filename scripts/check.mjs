import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const html=readFileSync(new URL('../public/index.html',import.meta.url),'utf8');
const data=JSON.parse(html.match(/<script id="library-data" type="application\/json">([\s\S]*?)<\/script>/)[1]);
assert.equal(data.length,27);assert.equal(data.reduce((n,g)=>n+g.prompts.length,0),71);
assert.equal(new Set(data.map(g=>g.id)).size,27);
for(const g of data){assert(g.name&&g.url.startsWith('https://x.com/'));for(const p of g.prompts){assert(p.original.trim());if(p.lang!=='zh')assert(p.translation.trim());}}
assert.equal(data.flatMap(g=>g.prompts).filter(p=>p.translation).length,28);
const scripts=[...html.matchAll(/<script(?![^>]*type="application\/json")([^>]*)>([\s\S]*?)<\/script>/g)];
for(const m of scripts)if(!m[1].includes('src='))new vm.Script(m[2]);
assert(html.includes('https://github.com/holynova/x-prompt-library'));
assert.equal((html.match(/data-website-id=/g)||[]).length,1);
const pkg=JSON.parse(readFileSync(new URL('../package.json',import.meta.url),'utf8'));
assert(html.includes('v'+pkg.version));
console.log('Validated 27 groups, 71 prompts, 28 translations, JavaScript, version, Repo and analytics.');
