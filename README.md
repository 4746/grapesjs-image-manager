# GrapesJS  image manager

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]

## Options

* `url` Server url, default: `null`,
* `credentials` Always send user credentials (cookies, basic http auth, etc..), default: `'include'`,
* `beforeSend` Processing url before sending, default: `null`,
* `beforeSetSrc` Processing src before displaying image, default: `(src) => src`,
* `afterChoosingRunOpenAssets` Open asset manager, default: `false`,
* `headers` To add headers, default: `{}`,
* `params` Query parameters, default: `{}`,
* `queryKey` Query parameter key, default: `'path'`,
* `modalTitle` Label modal title, default: `'File Explorer'`,
* `btnText` Label button text, default: `'Explorer images'`,
* `textEmptyFolder` Label text empty folder, default: `'Empty folder'`,
* `imgLoader` image src loader, default: `'data:image/svg+xml,...'`,
* `imgFolder` image src folder, default: `'data:image/svg+xml,...'`,
* `imgHome` image src breadcrum home, default: `'data:image/svg+xml,...'`,
* `imgReply` image src breadcrum reply, default: `'data:image/svg+xml,...'`,
* `imgChevronRight` image src breadcrum previous, default: `'data:image/svg+xml,...'`,


## Download

* `npm i grapesjs-image-manager`



## Usage

```html
<link href="path/to/grapes.min.css" rel="stylesheet"/>
<script src="path/to/grapes.min.js"></script>
<script src="path/to/grapesjs-image-manager.min.js"></script>

<div id="gjs"></div>

<script type="text/javascript">
  var editor = grapesjs.init({
      container : '#gjs',
      plugins: ['grapesjs-image-manager'],
      pluginsOpts: {
        'grapesjs-image-manager': {/* ...options */}
      }
  });
</script>
```



## Development

Clone the repository

```sh 
$ git clone https://github.com/4746/grapesjs-image-manager.git
$ cd grapesjs-image-manager
```

Install it

```sh
$ npm i
```

The plugin relies on GrapesJS via `peerDependencies` so you have to install it manually (without adding it to package.json)

```sh
$ npm i grapesjs --no-save
```

Start the dev server

```sh
$ npm serve
```


## MIT License

[npm-url]: https://www.npmjs.com/package/@107v/grapesjs-image-manager
[npm-image]: https://img.shields.io/npm/v/@107v/grapesjs-image-manager.svg

[downloads-image]: https://img.shields.io/npm/dm/@107v/grapesjs-image-manager.svg
[downloads-url]: https://npmjs.org/package/@107v/grapesjs-image-manager
