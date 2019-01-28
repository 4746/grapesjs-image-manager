import {Utils} from "./utils";

export class ImageManager {
  private readonly requestHeader = 'X-Requested-With';

  private editor?: any;
  private modal: any;
  private loader: HTMLImageElement;
  private breadcrumb: HTMLDivElement = document.createElement('div');
  private modalContent: HTMLDivElement = document.createElement('div');

  constructor(
    private options: any = {},
  ) {
    this.loader = document.createElement('img');
    this.loader.src = this.options.imgLoader;
    this.loader.style.position = 'absolute';
    this.loader.style.left = 'calc(50% - 38px)';
    this.loader.style.top = 'calc(50% - 25px)';
  }

  public open(editor: any) {

    if (!this.modal) {
      this.modal = editor.Modal;
      this.modal.setTitle(this.options.modalTitle);

      this.breadcrumb.style.fontSize = '10px';
      this.breadcrumb.style.display = 'flex';
      this.breadcrumb.style.alignItems = 'center';
      this.breadcrumb.style.cursor = 'pointer';
      this.breadcrumb.style.padding = '0 10px 5px';
      this.breadcrumb.style.borderBottom = '1px solid rgba(0,0,0,0.2)';

      this.modalContent.classList.add('content');
      this.modalContent.style.minHeight = '50px';
      this.modalContent.style.display = 'flex';
      this.modalContent.style.flexWrap = 'wrap';
    }

    // console.log('open', editor);
    this.editor = editor;
    if (editor.Commands.isActive('open-assets')) {
      editor.Commands.stop('open-assets');
    }

    if (this.modal.isOpen()) {
      this.modal.close();
    }

    const content = document.createElement('div');
    content.style.position = 'relative';
    content.style.padding = '0 0 10px';
    content.append(this.breadcrumb);
    content.append(this.modalContent);
    content.append(this.loader);

    this.modal.open({
      content: content
    });

    this.fetch('').then((response) => {
      this.setContent(response);
    }).catch((error: any) => {
      console.log(error);
    });
  }

  private selectItem(item: string, isDir = true) {

    if (isDir) {
      this.fetch(item).then((response) => {
        this.setContent(response);
      }).catch((error: any) => {
        console.log(error);
      });
    } else {

      const target = this.editor.getSelected();

      const src = this.getImageSrc(item);

      if (!this.editor.AssetManager.get(src)) {
        this.editor.AssetManager.add(src);
      }

      if (target) {
        if (target.get('type') === 'image' || target.get('tagName') === 'img') {
          target.set('src', src);
        } else {
          target.setStyle({'background-image': `url(${src})`});
        }
        this.modal.close();
        if (this.options.afterChoosingRunOpenAssets) {
          this.editor.runCommand('open-assets');
        }
      }
    }
  }

  private setContent(response: any = {}) {
    if (response) {

      (response.directories || []).reduce((cur: any, directory: string) => cur.then((): any => {

        const dirName: string = directory.split('/').pop() || '';
        const dir = Utils.createContentItem(this.options, dirName);
        dir.onclick = () => this.selectItem(directory);

        return this.modalContent.appendChild(<any>dir);
      }), Promise.resolve()).then((isDir: any) => {

        (response.files || []).reduce((cur: any, file: string) => cur.then((): any => {

          const fileName: string = file.split('/').pop() || '';
          const item = Utils.createContentItem(this.options, fileName, this.getImageSrc(file));
          item.onclick = () => this.selectItem(file, false);

          return this.modalContent.appendChild(<any>item);
        }), Promise.resolve()).then((isFile: any) => {

          if (!isDir && !isFile) {
            this.modalContent.insertAdjacentHTML('beforeend', `<p>${this.options.textEmptyFolder}</p>`);
          }
        });
      });

    } else {
      this.modalContent.insertAdjacentHTML('beforeend', '<p>Wrong answer</p>');
    }
  }

  private getImageSrc(file: string): string {
    let src = file;

    if (typeof this.options.beforeSetSrc === 'function') {
      try {
        src = this.options.beforeSetSrc(file);
      }catch (e) {
        console.log(e);
      }
    }
    return src;
  }

  private fetch(path: string = '') {
    this.loader.hidden = false;

    try {
      // if (this.modalContent.childNodes.length) {
      //   this.modalContent.childNodes.forEach(child => child.remove());
      // }
      while (this.modalContent.firstChild) {
        this.modalContent.removeChild(this.modalContent.firstChild);
      }
    } catch (e) {
      console.log(e);
    }

    let _path: string = path || '';

    if (typeof this.options.beforeSend === 'function') {
      try {
        path = this.options.beforeSend(path);
      } catch (e) {
        this.loader.hidden = true;
        throw new Error('Error function beforeSend()');
      }
    }

    const breadcrumbInnerHTML = path.split('/').slice(0, -1).join(` <img src="${this.options.imgChevronRight}"> `);
    if (breadcrumbInnerHTML.length) {
      this.breadcrumb.innerHTML = `<img src="${this.options.imgReply}"> ${breadcrumbInnerHTML}`;
    } else {
      this.breadcrumb.innerHTML = `<img src="${this.options.imgHome}">`;
    }
    this.breadcrumb.onclick = () => this.selectItem(_path.split('/').slice(0, -1).join('/'));

    if (!this.options.url || typeof this.options.url !== 'string') {
      this.loader.hidden = true;
      throw new Error('Unknown options url');
    }
    const url = new URL(this.options.url);
    const headers = this.options.headers;

    if (!headers[this.requestHeader]) {
      headers[this.requestHeader] = 'XMLHttpRequest';
    }

    let param;
    for (param in this.options.params) {
      url.searchParams.append(param, this.options.params[param]);
    }

    url.searchParams.append(this.options.queryKey, path);

    return fetch(url.toString(), {
      method: 'GET',
      credentials: this.options.credentials,
      headers: headers
    }).then((res) => {
      setTimeout(() => {
        this.loader.hidden = true;
      }, 200);
      if (((res.status / 200) | 0) === 1) {
        let response;
        try {
          response = res.json();
        } catch (e) {
          response = res.text().then(text => Promise.reject(text));
        }
        return response;
      } else {
        return res.text().then(text => Promise.reject(text));
      }
    }).catch((e :any) => {
      setTimeout(() => {
        this.loader.hidden = true;
      }, 200);
      this.modalContent.insertAdjacentHTML('beforeend', `<p>Error connect to server - (<small>${e.toString()}</small>)</p>`);
      return e.text().then((er:  any) => Promise.reject(er));
    });
  }
}
