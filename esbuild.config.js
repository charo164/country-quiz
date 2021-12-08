const esbuild = require('esbuild');
const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');
const postCssPlugin = require('@deanc/esbuild-plugin-postcss');
const { esbuildPluginAliasPath } = require('esbuild-plugin-alias-path');
const { htmlPlugin } = require('@craftamap/esbuild-plugin-html');
const { blog } = require('./tailwind.config');
const { txt, time, loadingAnimation, clearLineAndDebug } = require('@charo164/helper');
const { existsSync, readdir, rmSync } = require('fs');
const { resolve, join } = require('path');
const StaticServer = require('static-server');
const watch = require('node-watch');

const args = process.argv.slice(2);

const nodeEnv = process.env.NODE_ENV || 'production';

const isDevMode = nodeEnv === 'development';

const ENTRY_POINTS = [resolve('src/index.tsx')];
const OUTDIR = resolve('public');
const MAP_FILE_REG = /^.*\.map$/gi;

const server = new StaticServer({
  rootPath: './', // required, the root of the server file tree
  port: 3000, // required, the port to listen
  name: 'my-http-server', // optional, will set "X-Powered-by" HTTP header
  cors: '*', // optional, defaults to undefined
  followSymlink: true, // optional, defaults to a 404 error
});

switch (args[0]) {
  case 'dev':
    dev().catch((err) => {
      clearLineAndDebug('start', err.message || 'Build error!');
      process.exit(1);
    });
    break;
  case 'start':
    if (!existsSync(OUTDIR)) {
      throw new Error(`Run ${txt.cyan("'npm run build'")} before.`);
    }
    server.start(function () {
      clearLineAndDebug('serve', `Server listening to ${server.port}`);
    });
    break;
  case 'build':
    build().catch((err) => {
      clearLineAndDebug('start', err.message || 'Build error!');
      process.exit(1);
    });
  default:
    break;
}

async function dev() {
  time.start();
  let loader = loadingAnimation('Dev starting...');

  const appBuilder = await startBuild();

  const watcher = watch(resolve('src'), { recursive: true });

  watcher.on('change', async function (e, path) {
    const changedFile = 'src/' + path.split('src/')[1];

    clearLineAndDebug('watch', `${txt.cyan('File changed:')} ${changedFile}`);

    try {
      await appBuilder.rebuild();
    } catch (err) {
      clearLineAndDebug('watch', txt.red(err.message || 'Rebuild error!'));
    }
  });

  watcher.on('ready', async function () {
    clearInterval(loader);
    console.clear();
    time.end();
    clearLineAndDebug('watch', 'Ready!');
    clearLineAndDebug('build', txt.green(`Builded in ${time._time()}ms`));
    server.start(function () {
      clearLineAndDebug('serve', `Server listening to ${server.port}`);
    });
    loader = loadingAnimation('watching for file changes...');
  });

  watcher.on('error', function (err) {
    clearLineAndDebug('watch', txt.red(err.message || 'Watch error!'));
    process.exit(1);
  });
}

async function build() {
  time.start();

  let loader = loadingAnimation('Build starting...');

  const appBuilder = await startBuild();

  await clear();

  clearInterval(loader);

  console.clear();

  time.end();

  clearLineAndDebug('build', 'Finish!');
  clearLineAndDebug('build', txt.green(`Builded in ${time._time()}ms`));
  console.log(txt.cyan(await esbuild.analyzeMetafile(appBuilder.metafile)));

  process.exit();
}

async function startBuild() {
  return await builder(ENTRY_POINTS, OUTDIR, [
    postCssPlugin({
      plugins: [tailwindcss(blog), autoprefixer],
    }),
  ]);
}

/**
 *
 * @param {string[]} entryPoints
 * @param {string} outdir
 * @param {string[]} plugins
 */
async function builder(entryPoints, outdir, plugins = []) {
  const builder = await esbuild.build({
    bundle: true,
    minify: !isDevMode,
    sourcemap: isDevMode,
    metafile: true,
    platform: 'browser',
    incremental: true,
    entryPoints,
    loader: {
      '.mp3': 'file',
      '.png': 'file',
    },
    outdir,
    color: true,
    plugins: [...plugins, esbuildPluginAliasPath({ alias: { '@': './src' } })],
  });
  return builder;
}

function clear() {
  return new Promise((res, rej) => {
    readdir(OUTDIR, { encoding: 'utf8', withFileTypes: true }, (err, files) => {
      if (err) return rej(err);
      files.map((f) => {
        if (f.isFile() && f.name.match(MAP_FILE_REG)) {
          rmSync(resolve(join(OUTDIR, f.name)), { force: true });
        }
      });
      res(files);
    });
  });
}
