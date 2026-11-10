import {readFileSync,readdirSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..'),args=process.argv.slice(2),dry=args.includes('--dry-run');
const input=args.find(a=>a!=='--dry-run')||process.env.PORTFOLIO_DIR;
if(!input)throw Error('Pass the portfolio directory as an argument, or set PORTFOLIO_DIR.');
const repo=resolve(input),git=(dir,...args)=>execFileSync('git',['-C',dir,...args],{encoding:'utf8'}).trim();
for(const [dir,branch] of [[root,'main'],[repo,'master']]){if(git(dir,'branch','--show-current')!==branch)throw Error('Unexpected source branch');if(git(dir,'status','--porcelain','--','.',':(exclude).wrangler'))throw Error('Commit changes before deploying');}
if(!/holynova\/holynova.github.io(?:\.git)?$/.test(git(repo,'remote','get-url','origin')))throw Error('Wrong portfolio repository');
for(const f of readdirSync(resolve(root,'public'))){const hash=p=>createHash('sha256').update(readFileSync(p)).digest('hex');if(hash(resolve(root,'public',f))!==hash(resolve(repo,'x-prompt-library',f)))throw Error('Portfolio files differ: '+f);}
const config=JSON.parse(readFileSync(resolve(repo,'wrangler.jsonc'),'utf8'));
if(config.name!=='xiaosang-portfolio')throw Error('Wrong Worker');
console.log('Project source: '+git(root,'rev-parse','HEAD')+'; portfolio source: '+git(repo,'rev-parse','HEAD'));
execFileSync(resolve(root,'node_modules/.bin/wrangler'),['deploy','--config',resolve(repo,'wrangler.jsonc'),...(dry?['--dry-run']:[])],{cwd:repo,stdio:'inherit'});
