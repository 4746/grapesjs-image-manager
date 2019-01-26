export declare class ImageManager {
    private options;
    private readonly requestHeader;
    private editor?;
    private modal;
    private loader;
    private breadcrumb;
    private modalContent;
    constructor(options?: any);
    open(editor: any): void;
    private selectItem;
    private setContent;
    private getImageSrc;
    private fetch;
}
