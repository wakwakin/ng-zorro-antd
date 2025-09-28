/**
 * @fileoverview added by tsickle
 * Generated from: pagination-default.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, Renderer2, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
export class NzPaginationDefaultComponent {
    /**
     * @param {?} renderer
     * @param {?} elementRef
     */
    constructor(renderer, elementRef) {
        this.nzSize = 'default';
        this.itemRender = null;
        this.showTotal = null;
        this.disabled = false;
        this.showSizeChanger = false;
        this.showQuickJumper = false;
        this.total = 0;
        this.pageIndex = 1;
        this.pageSize = 10;
        this.pageSizeOptions = [10, 20, 30, 40];
        this.pageIndexChange = new EventEmitter();
        this.pageSizeChange = new EventEmitter();
        this.ranges = [0, 0];
        this.listOfPageItem = [];
        renderer.removeChild(renderer.parentNode(elementRef.nativeElement), elementRef.nativeElement);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    jumpPage(index) {
        this.onPageIndexChange(index);
    }
    /**
     * @param {?} diff
     * @return {?}
     */
    jumpDiff(diff) {
        this.jumpPage(this.pageIndex + diff);
    }
    /**
     * @param {?} _
     * @param {?} value
     * @return {?}
     */
    trackByPageItem(_, value) {
        return `${value.type}-${value.index}`;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    onPageIndexChange(index) {
        this.pageIndexChange.next(index);
    }
    /**
     * @param {?} size
     * @return {?}
     */
    onPageSizeChange(size) {
        this.pageSizeChange.next(size);
    }
    /**
     * @param {?} total
     * @param {?} pageSize
     * @return {?}
     */
    getLastIndex(total, pageSize) {
        return Math.ceil(total / pageSize);
    }
    /**
     * @return {?}
     */
    buildIndexes() {
        /** @type {?} */
        const lastIndex = this.getLastIndex(this.total, this.pageSize);
        this.listOfPageItem = this.getListOfPageItem(this.pageIndex, lastIndex);
    }
    /**
     * @param {?} pageIndex
     * @param {?} lastIndex
     * @return {?}
     */
    getListOfPageItem(pageIndex, lastIndex) {
        /** @type {?} */
        const concatWithPrevNext = (/**
         * @param {?} listOfPage
         * @return {?}
         */
        (listOfPage) => {
            /** @type {?} */
            const prevItem = {
                type: 'prev',
                disabled: pageIndex === 1
            };
            /** @type {?} */
            const nextItem = {
                type: 'next',
                disabled: pageIndex === lastIndex
            };
            return [prevItem, ...listOfPage, nextItem];
        });
        /** @type {?} */
        const generatePage = (/**
         * @param {?} start
         * @param {?} end
         * @return {?}
         */
        (start, end) => {
            /** @type {?} */
            const list = [];
            for (let i = start; i <= end; i++) {
                list.push({
                    index: i,
                    type: 'page'
                });
            }
            return list;
        });
        if (lastIndex <= 9) {
            return concatWithPrevNext(generatePage(1, lastIndex));
        }
        else {
            /** @type {?} */
            const generateRangeItem = (/**
             * @param {?} selected
             * @param {?} last
             * @return {?}
             */
            (selected, last) => {
                /** @type {?} */
                let listOfRange = [];
                /** @type {?} */
                const prevFiveItem = {
                    type: 'prev_5'
                };
                /** @type {?} */
                const nextFiveItem = {
                    type: 'next_5'
                };
                /** @type {?} */
                const firstPageItem = generatePage(1, 1);
                /** @type {?} */
                const lastPageItem = generatePage(lastIndex, lastIndex);
                if (selected < 5) {
                    // If the 4th is selected, one more page will be displayed.
                    /** @type {?} */
                    const maxLeft = selected === 4 ? 6 : 5;
                    listOfRange = [...generatePage(2, maxLeft), nextFiveItem];
                }
                else if (selected < last - 3) {
                    listOfRange = [prevFiveItem, ...generatePage(selected - 2, selected + 2), nextFiveItem];
                }
                else {
                    // If the 4th from last is selected, one more page will be displayed.
                    /** @type {?} */
                    const minRight = selected === last - 3 ? last - 5 : last - 4;
                    listOfRange = [prevFiveItem, ...generatePage(minRight, last - 1)];
                }
                return [...firstPageItem, ...listOfRange, ...lastPageItem];
            });
            return concatWithPrevNext(generateRangeItem(pageIndex, lastIndex));
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        const { pageIndex, pageSize, total } = changes;
        if (pageIndex || pageSize || total) {
            this.ranges = [(this.pageIndex - 1) * this.pageSize + 1, Math.min(this.pageIndex * this.pageSize, this.total)];
            this.buildIndexes();
        }
    }
}
NzPaginationDefaultComponent.decorators = [
    { type: Component, args: [{
                selector: 'nz-pagination-default',
                preserveWhitespaces: false,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <ng-template #containerTemplate>
      <li class="ant-pagination-total-text" *ngIf="showTotal">
        <ng-template [ngTemplateOutlet]="showTotal" [ngTemplateOutletContext]="{ $implicit: total, range: ranges }"></ng-template>
      </li>
      <li
        *ngFor="let page of listOfPageItem; trackBy: trackByPageItem"
        nz-pagination-item
        [locale]="locale"
        [type]="page.type"
        [index]="page.index"
        [disabled]="!!page.disabled"
        [itemRender]="itemRender"
        [active]="pageIndex === page.index"
        (gotoIndex)="jumpPage($event)"
        (diffIndex)="jumpDiff($event)"
      ></li>
      <div
        nz-pagination-options
        *ngIf="showQuickJumper || showSizeChanger"
        [total]="total"
        [locale]="locale"
        [disabled]="disabled"
        [nzSize]="nzSize"
        [showSizeChanger]="showSizeChanger"
        [showQuickJumper]="showQuickJumper"
        [pageIndex]="pageIndex"
        [pageSize]="pageSize"
        [pageSizeOptions]="pageSizeOptions"
        (pageIndexChange)="onPageIndexChange($event)"
        (pageSizeChange)="onPageSizeChange($event)"
      ></div>
    </ng-template>
  `
            }] }
];
/** @nocollapse */
NzPaginationDefaultComponent.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef }
];
NzPaginationDefaultComponent.propDecorators = {
    template: [{ type: ViewChild, args: ['containerTemplate', { static: true },] }],
    nzSize: [{ type: Input }],
    itemRender: [{ type: Input }],
    showTotal: [{ type: Input }],
    disabled: [{ type: Input }],
    locale: [{ type: Input }],
    showSizeChanger: [{ type: Input }],
    showQuickJumper: [{ type: Input }],
    total: [{ type: Input }],
    pageIndex: [{ type: Input }],
    pageSize: [{ type: Input }],
    pageSizeOptions: [{ type: Input }],
    pageIndexChange: [{ type: Output }],
    pageSizeChange: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    NzPaginationDefaultComponent.prototype.template;
    /** @type {?} */
    NzPaginationDefaultComponent.prototype.nzSize;
    /** @type {?} */
    NzPaginationDefaultComponent.prototype.itemRender;
    /** @type {?} */
    NzPaginationDefaultComponent.prototype.showTotal;
    /** @type {?} */
    NzPaginationDefaultComponent.prototype.disabled;
    /** @type {?} */
    NzPaginationDefaultComponent.prototype.locale;
    /** @type {?} */
    NzPaginationDefaultComponent.prototype.showSizeChanger;
    /** @type {?} */
    NzPaginationDefaultComponent.prototype.showQuickJumper;
    /** @type {?} */
    NzPaginationDefaultComponent.prototype.total;
    /** @type {?} */
    NzPaginationDefaultComponent.prototype.pageIndex;
    /** @type {?} */
    NzPaginationDefaultComponent.prototype.pageSize;
    /** @type {?} */
    NzPaginationDefaultComponent.prototype.pageSizeOptions;
    /** @type {?} */
    NzPaginationDefaultComponent.prototype.pageIndexChange;
    /** @type {?} */
    NzPaginationDefaultComponent.prototype.pageSizeChange;
    /** @type {?} */
    NzPaginationDefaultComponent.prototype.ranges;
    /** @type {?} */
    NzPaginationDefaultComponent.prototype.listOfPageItem;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi1kZWZhdWx0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXpvcnJvLWFudGQvcGFnaW5hdGlvbi8iLCJzb3VyY2VzIjpbInBhZ2luYXRpb24tZGVmYXVsdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUNOLFNBQVMsRUFFVCxXQUFXLEVBQ1gsU0FBUyxFQUNULGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQThDdkIsTUFBTSxPQUFPLDRCQUE0Qjs7Ozs7SUFrQnZDLFlBQVksUUFBbUIsRUFBRSxVQUFzQjtRQWhCOUMsV0FBTSxHQUF3QixTQUFTLENBQUM7UUFDeEMsZUFBVSxHQUFvRCxJQUFJLENBQUM7UUFDbkUsY0FBUyxHQUF1RSxJQUFJLENBQUM7UUFDckYsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUVqQixvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUN4QixvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUN4QixVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsY0FBUyxHQUFHLENBQUMsQ0FBQztRQUNkLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFDZCxvQkFBZSxHQUFhLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbkMsb0JBQWUsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBQzdDLG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUMvRCxXQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDaEIsbUJBQWMsR0FBOEMsRUFBRSxDQUFDO1FBRzdELFFBQVEsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEVBQUUsVUFBVSxD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SUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDL0csSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3JCO0lBQ0gsQ0FBQzs7O1lBckpGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyxtQkFBbUIsRUFBRSxLQUFLO2dCQUMxQixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUNUO2FBQ0Y7Ozs7WUFsREMsU0FBUztZQUxULFVBQVU7Ozt1QkF5RFQsU0FBUyxTQUFDLG1CQUFtQixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtxQkFDL0MsS0FBSzt5QkFDTCxLQUFLO3dCQUNMLEtBQUs7dUJBQ0wsS0FBSztxQkFDTCxLQUFLOzhCQUNMLEtBQUs7OEJBQ0wsS0FBSztvQkFDTCxLQUFLO3dCQUNMLEtBQUs7dUJBQ0wsS0FBSzs4QkFDTCxLQUFLOzhCQUNMLE1BQU07NkJBQ04sTUFBTTs7OztJQWJQLGdEQUFvRjs7SUFDcEYsOENBQWlEOztJQUNqRCxrREFBNEU7O0lBQzVFLGlEQUE4Rjs7SUFDOUYsZ0RBQTBCOztJQUMxQiw4Q0FBNEM7O0lBQzVDLHVEQUFpQzs7SUFDakMsdURBQWlDOztJQUNqQyw2Q0FBbUI7O0lBQ25CLGlEQUF1Qjs7SUFDdkIsZ0RBQXVCOztJQUN2Qix1REFBc0Q7O0lBQ3RELHVEQUFnRTs7SUFDaEUsc0RBQStEOztJQUMvRCw4Q0FBZ0I7O0lBQ2hCLHNEQUErRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT3V0cHV0LFxuICBSZW5kZXJlcjIsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IE56UGFnaW5hdGlvbkkxOG5JbnRlcmZhY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL2kxOG4nO1xuaW1wb3J0IHsgTnpQYWdpbmF0aW9uSXRlbUNvbXBvbmVudCB9IGZyb20gJy4vcGFnaW5hdGlvbi1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQYWdpbmF0aW9uSXRlbVJlbmRlckNvbnRleHQgfSBmcm9tICcuL3BhZ2luYXRpb24udHlwZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei1wYWdpbmF0aW9uLWRlZmF1bHQnLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlICNjb250YWluZXJUZW1wbGF0ZT5cbiAgICAgIDxsaSBjbGFzcz1cImFudC1wYWdpbmF0aW9uLXRvdGFsLXRleHRcIiAqbmdJZj1cInNob3dUb3RhbFwiPlxuICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwic2hvd1RvdGFsXCIgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgJGltcGxpY2l0OiB0b3RhbCwgcmFuZ2U6IHJhbmdlcyB9XCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgIDwvbGk+XG4gICAgICA8bGlcbiAgICAgICAgKm5nRm9yPVwibGV0IHBhZ2Ugb2YgbGlzdE9mUGFnZUl0ZW07IHRyYWNrQnk6IHRyYWNrQnlQYWdlSXRlbVwiXG4gICAgICAgIG56LXBhZ2luYXRpb24taXRlbVxuICAgICAgICBbbG9jYWxlXT1cImxvY2FsZVwiXG4gICAgICAgIFt0eXBlXT1cInBhZ2UudHlwZVwiXG4gICAgICAgIFtpbmRleF09XCJwYWdlLmluZGV4XCJcbiAgICAgICAgW2Rpc2FibGVkXT1cIiEhcGFnZS5kaXNhYmxlZFwiXG4gICAgICAgIFtpdGVtUmVuZGVyXT1cIml0ZW1SZW5kZXJcIlxuICAgICAgICBbYWN0aXZlXT1cInBhZ2VJbmRleCA9PT0gcGFnZS5pbmRleFwiXG4gICAgICAgIChnb3RvSW5kZXgpPVwianVtcFBhZ2UoJGV2ZW50KVwiXG4gICAgICAgIChkaWZmSW5kZXgpPVwianVtcERpZmYoJGV2ZW50KVwiXG4gICAgICA+PC9saT5cbiAgICAgIDxkaXZcbiAgICAgICAgbnotcGFnaW5hdGlvbi1vcHRpb25zXG4gICAgICAgICpuZ0lmPVwic2hvd1F1aWNrSnVtcGVyIHx8IHNob3dTaXplQ2hhbmdlclwiXG4gICAgICAgIFt0b3RhbF09XCJ0b3RhbFwiXG4gICAgICAgIFtsb2NhbGVdPVwibG9jYWxlXCJcbiAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgW256U2l6ZV09XCJuelNpemVcIlxuICAgICAgICBbc2hvd1NpemVDaGFuZ2VyXT1cInNob3dTaXplQ2hhbmdlclwiXG4gICAgICAgIFtzaG93UXVpY2tKdW1wZXJdPVwic2hvd1F1aWNrSnVtcGVyXCJcbiAgICAgICAgW3BhZ2VJbmRleF09XCJwYWdlSW5kZXhcIlxuICAgICAgICBbcGFnZVNpemVdPVwicGFnZVNpemVcIlxuICAgICAgICBbcGFnZVNpemVPcHRpb25zXT1cInBhZ2VTaXplT3B0aW9uc1wiXG4gICAgICAgIChwYWdlSW5kZXhDaGFuZ2UpPVwib25QYWdlSW5kZXhDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgIChwYWdlU2l6ZUNoYW5nZSk9XCJvblBhZ2VTaXplQ2hhbmdlKCRldmVudClcIlxuICAgICAgPjwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgTnpQYWdpbmF0aW9uRGVmYXVsdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lclRlbXBsYXRlJywgeyBzdGF0aWM6IHRydWUgfSkgdGVtcGxhdGUhOiBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+O1xuICBASW5wdXQoKSBuelNpemU6ICdkZWZhdWx0JyB8ICdzbWFsbCcgPSAnZGVmYXVsdCc7XG4gIEBJbnB1dCgpIGl0ZW1SZW5kZXI6IFRlbXBsYXRlUmVmPFBhZ2luYXRpb25JdGVtUmVuZGVyQ29udGV4dD4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgc2hvd1RvdGFsOiBUZW1wbGF0ZVJlZjx7ICRpbXBsaWNpdDogbnVtYmVyOyByYW5nZTogW251bWJlciwgbnVtYmVyXSB9PiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xuICBASW5wdXQoKSBsb2NhbGUhOiBOelBhZ2luYXRpb25JMThuSW50ZXJmYWNlO1xuICBASW5wdXQoKSBzaG93U2l6ZUNoYW5nZXIgPSBmYWxzZTtcbiAgQElucHV0KCkgc2hvd1F1aWNrSnVtcGVyID0gZmFsc2U7XG4gIEBJbnB1dCgpIHRvdGFsID0gMDtcbiAgQElucHV0KCkgcGFnZUluZGV4ID0gMTtcbiAgQElucHV0KCkgcGFnZVNpemUgPSAxMDtcbiAgQElucHV0KCkgcGFnZVNpemVPcHRpb25zOiBudW1iZXJbXSA9IFsxMCwgMjAsIDMwLCA0MF07XG4gIEBPdXRwdXQoKSByZWFkb25seSBwYWdlSW5kZXhDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IHBhZ2VTaXplQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIHJhbmdlcyA9IFswLCAwXTtcbiAgbGlzdE9mUGFnZUl0ZW06IEFycmF5PFBhcnRpYWw8TnpQYWdpbmF0aW9uSXRlbUNvbXBvbmVudD4+ID0gW107XG5cbiAgY29uc3RydWN0b3IocmVuZGVyZXI6IFJlbmRlcmVyMiwgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgIHJlbmRlcmVyLnJlbW92ZUNoaWxkKHJlbmRlcmVyLnBhcmVudE5vZGUoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSwgZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgfVxuXG4gIGp1bXBQYWdlKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLm9uUGFnZUluZGV4Q2hhbmdlKGluZGV4KTtcbiAgfVxuXG4gIGp1bXBEaWZmKGRpZmY6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuanVtcFBhZ2UodGhpcy5wYWdlSW5kZXggKyBkaWZmKTtcbiAgfVxuXG4gIHRyYWNrQnlQYWdlSXRlbShfOiBudW1iZXIsIHZhbHVlOiBQYXJ0aWFsPE56UGFnaW5hdGlvbkl0ZW1Db21wb25lbnQ+KTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCR7dmFsdWUudHlwZX0tJHt2YWx1ZS5pbmRleH1gO1xuICB9XG5cbiAgb25QYWdlSW5kZXhDaGFuZ2UoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMucGFnZUluZGV4Q2hhbmdlLm5leHQoaW5kZXgpO1xuICB9XG5cbiAgb25QYWdlU2l6ZUNoYW5nZShzaXplOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnBhZ2VTaXplQ2hhbmdlLm5leHQoc2l6ZSk7XG4gIH1cblxuICBnZXRMYXN0SW5kZXgodG90YWw6IG51bWJlciwgcGFnZVNpemU6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIE1hdGguY2VpbCh0b3RhbCAvIHBhZ2VTaXplKTtcbiAgfVxuXG4gIGJ1aWxkSW5kZXhlcygpOiB2b2lkIHtcbiAgICBjb25zdCBsYXN0SW5kZXggPSB0aGlzLmdldExhc3RJbmRleCh0aGlzLnRvdGFsLCB0aGlzLnBhZ2VTaXplKTtcbiAgICB0aGlzLmxpc3RPZlBhZ2VJdGVtID0gdGhpcy5nZXRMaXN0T2ZQYWdlSXRlbSh0aGlzLnBhZ2VJbmRleCwgbGFzdEluZGV4KTtcbiAgfVxuXG4gIGdldExpc3RPZlBhZ2VJdGVtKHBhZ2VJbmRleDogbnVtYmVyLCBsYXN0SW5kZXg6IG51bWJlcik6IEFycmF5PFBhcnRpYWw8TnpQYWdpbmF0aW9uSXRlbUNvbXBvbmVudD4+IHtcbiAgICBjb25zdCBjb25jYXRXaXRoUHJldk5leHQgPSAobGlzdE9mUGFnZTogQXJyYXk8UGFydGlhbDxOelBhZ2luYXRpb25JdGVtQ29tcG9uZW50Pj4pID0+IHtcbiAgICAgIGNvbnN0IHByZXZJdGVtID0ge1xuICAgICAgICB0eXBlOiAncHJldicsXG4gICAgICAgIGRpc2FibGVkOiBwYWdlSW5kZXggPT09IDFcbiAgICAgIH07XG4gICAgICBjb25zdCBuZXh0SXRlbSA9IHtcbiAgICAgICAgdHlwZTogJ25leHQnLFxuICAgICAgICBkaXNhYmxlZDogcGFnZUluZGV4ID09PSBsYXN0SW5kZXhcbiAgICAgIH07XG4gICAgICByZXR1cm4gW3ByZXZJdGVtLCAuLi5saXN0T2ZQYWdlLCBuZXh0SXRlbV07XG4gICAgfTtcbiAgICBjb25zdCBnZW5lcmF0ZVBhZ2UgPSAoc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIpOiBBcnJheTxQYXJ0aWFsPE56UGFnaW5hdGlvbkl0ZW1Db21wb25lbnQ+PiA9PiB7XG4gICAgICBjb25zdCBsaXN0ID0gW107XG4gICAgICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPD0gZW5kOyBpKyspIHtcbiAgICAgICAgbGlzdC5wdXNoKHtcbiAgICAgICAgICBpbmRleDogaSxcbiAgICAgICAgICB0eXBlOiAncGFnZSdcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbGlzdDtcbiAgICB9O1xuICAgIGlmIChsYXN0SW5kZXggPD0gOSkge1xuICAgICAgcmV0dXJuIGNvbmNhdFdpdGhQcmV2TmV4dChnZW5lcmF0ZVBhZ2UoMSwgbGFzdEluZGV4KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGdlbmVyYXRlUmFuZ2VJdGVtID0gKHNlbGVjdGVkOiBudW1iZXIsIGxhc3Q6IG51bWJlcikgPT4ge1xuICAgICAgICBsZXQgbGlzdE9mUmFuZ2UgPSBbXTtcbiAgICAgICAgY29uc3QgcHJldkZpdmVJdGVtID0ge1xuICAgICAgICAgIHR5cGU6ICdwcmV2XzUnXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IG5leHRGaXZlSXRlbSA9IHtcbiAgICAgICAgICB0eXBlOiAnbmV4dF81J1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBmaXJzdFBhZ2VJdGVtID0gZ2VuZXJhdGVQYWdlKDEsIDEpO1xuICAgICAgICBjb25zdCBsYXN0UGFnZUl0ZW0gPSBnZW5lcmF0ZVBhZ2UobGFzdEluZGV4LCBsYXN0SW5kZXgpO1xuICAgICAgICBpZiAoc2VsZWN0ZWQgPCA1KSB7XG4gICAgICAgICAgLy8gSWYgdGhlIDR0aCBpcyBzZWxlY3RlZCwgb25lIG1vcmUgcGFnZSB3aWxsIGJlIGRpc3BsYXllZC5cbiAgICAgICAgICBjb25zdCBtYXhMZWZ0ID0gc2VsZWN0ZWQgPT09IDQgPyA2IDogNTtcbiAgICAgICAgICBsaXN0T2ZSYW5nZSA9IFsuLi5nZW5lcmF0ZVBhZ2UoMiwgbWF4TGVmdCksIG5leHRGaXZlSXRlbV07XG4gICAgICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWQgPCBsYXN0IC0gMykge1xuICAgICAgICAgIGxpc3RPZlJhbmdlID0gW3ByZXZGaXZlSXRlbSwgLi4uZ2VuZXJhdGVQYWdlKHNlbGVjdGVkIC0gMiwgc2VsZWN0ZWQgKyAyKSwgbmV4dEZpdmVJdGVtXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBJZiB0aGUgNHRoIGZyb20gbGFzdCBpcyBzZWxlY3RlZCwgb25lIG1vcmUgcGFnZSB3aWxsIGJlIGRpc3BsYXllZC5cbiAgICAgICAgICBjb25zdCBtaW5SaWdodCA9IHNlbGVjdGVkID09PSBsYXN0IC0gMyA/IGxhc3QgLSA1IDogbGFzdCAtIDQ7XG4gICAgICAgICAgbGlzdE9mUmFuZ2UgPSBbcHJldkZpdmVJdGVtLCAuLi5nZW5lcmF0ZVBhZ2UobWluUmlnaHQsIGxhc3QgLSAxKV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFsuLi5maXJzdFBhZ2VJdGVtLCAuLi5saXN0T2ZSYW5nZSwgLi4ubGFzdFBhZ2VJdGVtXTtcbiAgICAgIH07XG4gICAgICByZXR1cm4gY29uY2F0V2l0aFByZXZOZXh0KGdlbmVyYXRlUmFuZ2VJdGVtKHBhZ2VJbmRleCwgbGFzdEluZGV4KSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGNvbnN0IHsgcGFnZUluZGV4LCBwYWdlU2l6ZSwgdG90YWwgfSA9IGNoYW5nZXM7XG4gICAgaWYgKHBhZ2VJbmRleCB8fCBwYWdlU2l6ZSB8fCB0b3RhbCkge1xuICAgICAgdGhpcy5yYW5nZXMgPSBbKHRoaXMucGFnZUluZGV4IC0gMSkgKiB0aGlzLnBhZ2VTaXplICsgMSwgTWF0aC5taW4odGhpcy5wYWdlSW5kZXggKiB0aGlzLnBhZ2VTaXplLCB0aGlzLnRvdGFsKV07XG4gICAgICB0aGlzLmJ1aWxkSW5kZXhlcygpO1xuICAgIH1cbiAgfVxufVxuIl19