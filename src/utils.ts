export class Utils {

  static createContentItem(options: any, dirName: string, src: any = null): HTMLElement {
    const item = document.createElement('div');

    if (!src) {
      item.insertAdjacentHTML('beforeend', `<img src="${options.imgFolder}" alt="${dirName || ''}">`);
    } else {
      item.insertAdjacentHTML('beforeend', `<img src="${src}" alt="${dirName || ''}" style="max-width: 100%;max-height: calc(100% - 19px);">`);
    }

    item.insertAdjacentHTML(
      'beforeend',
      `<p style="margin: 5px 0 10px;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;font-size: 11px;">${dirName || ''}</p>`
    );

    item.style.width = '10%';
    item.style.maxWidth = '100px';
    item.style.height = '70px';
    item.style.textAlign = 'center';
    item.style.margin = '5px';
    item.style.cursor = 'pointer';
    item.id = Date.now().toString();

    return item;
  }
}
