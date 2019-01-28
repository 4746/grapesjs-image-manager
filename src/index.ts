import {ImageManager} from "./image-manager";
import {Utils} from "./utils";
export {ImageManager};
export {Utils};
export default grapesjs.plugins.add('gjs-image-manager', (editor: any, options = {}) => {

  const config = {
    url: null,
    credentials: 'include',
    beforeSend: null,
    beforeSetSrc: (src: string) => src,
    afterChoosingRunOpenAssets: false,
    headers: {},
    params: {},
    queryKey: 'path',
    modalTitle: 'File Explorer',
    btnText: 'Explorer images',
    textEmptyFolder: 'Empty folder',
    imgLoader: "data:image/svg+xml,%3Csvg width='38' height='38' viewBox='0 0 38 38' xmlns='http://www.w3.org/2000/svg' stroke='%23fff'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg transform='translate(1 1)' stroke-width='2'%3E%3Ccircle stroke-opacity='.5' cx='18' cy='18' r='18'/%3E%3Cpath d='M36 18c0-9.94-8.06-18-18-18'%3E%3CanimateTransform attributeName='transform' type='rotate' from='0 18 18' to='360 18 18' dur='1s' repeatCount='indefinite'/%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
    imgFolder: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='35' height='35' viewBox='0 0 24 24'%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Cpath fill='%23ffffff' d='M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z'/%3E%3C/svg%3E",
    imgHome: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 24 24'%3E%3Cpath fill='%23ffffff' d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E",
    imgReply: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 24 24'%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Cpath fill='%23ffffff' d='M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z'/%3E%3C/svg%3E",
    imgChevronRight: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 24 24'%3E%3Cpath fill='%23ffffff' d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E",
    ...options
  };

  editor.on('load', () => {});

  const stylePrefix = editor.getConfig('stylePrefix');
  const assetManager = editor.AssetManager;

  const imageExplorer = new ImageManager(config);
  editor.ImageExplorer = imageExplorer;

  editor.on('run:open-assets', (child: any) => {

    if (!assetManager.getContainer().querySelector(`.${stylePrefix}btn-explorer-images`)) {

      const button = document.createElement('button');
      button.classList.add(`${stylePrefix}btn-prim`);
      button.classList.add(`${stylePrefix}btn-explorer-images`);
      button.onclick = () => imageExplorer.open(editor);
      button.textContent = config.btnText;
      button.style.width = '100%';

      assetManager.getContainer().insertAdjacentElement('beforeend', button);
    }
  });
});
