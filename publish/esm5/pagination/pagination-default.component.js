/**
 * @fileoverview added by tsickle
 * Generated from: pagination-default.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __read, __spread } from "tslib";
/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, Renderer2, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
var NzPaginationDefaultComponent = /** @class */ (function () {
    function NzPaginationDefaultComponent(renderer, elementRef) {
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
    NzPaginationDefaultComponent.prototype.jumpPage = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.onPageIndexChange(index);
    };
    /**
     * @param {?} diff
     * @return {?}
     */
    NzPaginationDefaultComponent.prototype.jumpDiff = /**
     * @param {?} diff
     * @return {?}
     */
    function (diff) {
        this.jumpPage(this.pageIndex + diff);
    };
    /**
     * @param {?} _
     * @param {?} value
     * @return {?}
     */
    NzPaginationDefaultComponent.prototype.trackByPageItem = /**
     * @param {?} _
     * @param {?} value
     * @return {?}
     */
    function (_, value) {
        return value.type + "-" + value.index;
    };
    /**
     * @param {?} index
     * @return {?}
     */
    NzPaginationDefaultComponent.prototype.onPageIndexChange = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.pageIndexChange.next(index);
    };
    /**
     * @param {?} size
     * @return {?}
     */
    NzPaginationDefaultComponent.prototype.onPageSizeChange = /**
     * @param {?} size
     * @return {?}
     */
    function (size) {
        this.pageSizeChange.next(size);
    };
    /**
     * @param {?} total
     * @param {?} pageSize
     * @return {?}
     */
    NzPaginationDefaultComponent.prototype.getLastIndex = /**
     * @param {?} total
     * @param {?} pageSize
     * @return {?}
     */
    function (total, pageSize) {
        return Math.ceil(total / pageSize);
    };
    /**
     * @return {?}
     */
    NzPaginationDefaultComponent.prototype.buildIndexes = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var lastIndex = this.getLastIndex(this.total, this.pageSize);
        this.listOfPageItem = this.getListOfPageItem(this.pageIndex, lastIndex);
    };
    /**
     * @param {?} pageIndex
     * @param {?} lastIndex
     * @return {?}
     */
    NzPaginationDefaultComponent.prototype.getListOfPageItem = /**
     * @param {?} pageIndex
     * @param {?} lastIndex
     * @return {?}
     */
    function (pageIndex, lastIndex) {
        /** @type {?} */
        var concatWithPrevNext = (/**
         * @param {?} listOfPage
         * @return {?}
         */
        function (listOfPage) {
            /** @type {?} */
            var prevItem = {
                type: 'prev',
                disabled: pageIndex === 1
            };
            /** @type {?} */
            var nextItem = {
                type: 'next',
                disabled: pageIndex === lastIndex
            };
            return __spread([prevItem], listOfPage, [nextItem]);
        });
        /** @type {?} */
        var generatePage = (/**
         * @param {?} start
         * @param {?} end
         * @return {?}
         */
        function (start, end) {
            /** @type {?} */
            var list = [];
            for (var i = start; i <= end; i++) {
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
            var generateRangeItem = (/**
             * @param {?} selected
             * @param {?} last
             * @return {?}
             */
            function (selected, last) {
                /** @type {?} */
                var listOfRange = [];
                /** @type {?} */
                var prevFiveItem = {
                    type: 'prev_5'
                };
                /** @type {?} */
                var nextFiveItem = {
                    type: 'next_5'
                };
                /** @type {?} */
                var firstPageItem = generatePage(1, 1);
                /** @type {?} */
                var lastPageItem = generatePage(lastIndex, lastIndex);
                if (selected < 5) {
                    // If the 4th is selected, one more page will be displayed.
                    /** @type {?} */
                    var maxLeft = selected === 4 ? 6 : 5;
                    listOfRange = __spread(generatePage(2, maxLeft), [nextFiveItem]);
                }
                else if (selected < last - 3) {
                    listOfRange = __spread([prevFiveItem], generatePage(selected - 2, selected + 2), [nextFiveItem]);
                }
                else {
                    // If the 4th from last is selected, one more page will be displayed.
                    /** @type {?} */
                    var minRight = selected === last - 3 ? last - 5 : last - 4;
                    listOfRange = __spread([prevFiveItem], generatePage(minRight, last - 1));
                }
                return __spread(firstPageItem, listOfRange, lastPageItem);
            });
            return concatWithPrevNext(generateRangeItem(pageIndex, lastIndex));
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NzPaginationDefaultComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var pageIndex = changes.pageIndex, pageSize = changes.pageSize, total = changes.total;
        if (pageIndex || pageSize || total) {
            this.ranges = [(this.pageIndex - 1) * this.pageSize + 1, Math.min(this.pageIndex * this.pageSize, this.total)];
            this.buildIndexes();
        }
    };
    NzPaginationDefaultComponent.decorators = [
        { type: Component, args: [{
                    selector: 'nz-pagination-default',
                    preserveWhitespaces: false,
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n    <ng-template #containerTemplate>\n      <li class=\"ant-pagination-total-text\" *ngIf=\"showTotal\">\n        <ng-template [ngTemplateOutlet]=\"showTotal\" [ngTemplateOutletContext]=\"{ $implicit: total, range: ranges }\"></ng-template>\n      </li>\n      <li\n        *ngFor=\"let page of listOfPageItem; trackBy: trackByPageItem\"\n        nz-pagination-item\n        [locale]=\"locale\"\n        [type]=\"page.type\"\n        [index]=\"page.index\"\n        [disabled]=\"!!page.disabled\"\n        [itemRender]=\"itemRender\"\n        [active]=\"pageIndex === page.index\"\n        (gotoIndex)=\"jumpPage($event)\"\n        (diffIndex)=\"jumpDiff($event)\"\n      ></li>\n      <div\n        nz-pagination-options\n        *ngIf=\"showQuickJumper || showSizeChanger\"\n        [total]=\"total\"\n        [locale]=\"locale\"\n        [disabled]=\"disabled\"\n        [nzSize]=\"nzSize\"\n        [showSizeChanger]=\"showSizeChanger\"\n        [showQuickJumper]=\"showQuickJumper\"\n        [pageIndex]=\"pageIndex\"\n        [pageSize]=\"pageSize\"\n        [pageSizeOptions]=\"pageSizeOptions\"\n        (pageIndexChange)=\"onPageIndexChange($event)\"\n        (pageSizeChange)=\"onPageSizeChange($event)\"\n      ></div>\n    </ng-template>\n  "
                }] }
    ];
    /** @nocollapse */
    NzPaginationDefaultComponent.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
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
    return NzPaginationDefaultComponent;
}());
export { NzPaginationDefaultComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi1kZWZhdWx0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXpvcnJvLWFudGQvcGFnaW5hdGlvbi8iLCJzb3VyY2VzIjpbInBhZ2luYXRpb24tZGVmYXVsdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUtBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFDTixTQUFTLEVBRVQsV0FBVyxFQUNYLFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFNdkI7SUEwREUsc0NBQVksUUFBbUIsRUFBRSxVQUFzQjtRQWhCOUMsV0FBTSxHQUF3QixTQUFTLENBQUM7UUFDeEMsZUFBVSxHQUFvRCxJQUFJLENBQUM7UUFDbkUsY0FBUyxHQUF1RSxJQUFJLENBQUM7UUFDckYsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUVqQixvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUN4QixvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUN4QixVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsY0FBUyxHQUFHLENBQUMsQ0FBQztRQUNkLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFDZCxvQkFBZSxHQUFhLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbkMsb0JBQWUsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBQzdDLG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUMvRCxXQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDaEIsbUJBQWMsR0FBOEMsRUFBRSxDQUFDO1FBRzdELFFBQVEsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEVBQUUsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lB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LENBQUM7U0FDckI7SUFDSCxDQUFDOztnQkFySkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx1QkFBdUI7b0JBQ2pDLG1CQUFtQixFQUFFLEtBQUs7b0JBQzFCLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsUUFBUSxFQUFFLHl1Q0FpQ1Q7aUJBQ0Y7Ozs7Z0JBbERDLFNBQVM7Z0JBTFQsVUFBVTs7OzJCQXlEVCxTQUFTLFNBQUMsbUJBQW1CLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO3lCQUMvQyxLQUFLOzZCQUNMLEtBQUs7NEJBQ0wsS0FBSzsyQkFDTCxLQUFLO3lCQUNMLEtBQUs7a0NBQ0wsS0FBSztrQ0FDTCxLQUFLO3dCQUNMLEtBQUs7NEJBQ0wsS0FBSzsyQkFDTCxLQUFLO2tDQUNMLEtBQUs7a0NBQ0wsTUFBTTtpQ0FDTixNQUFNOztJQWdHVCxtQ0FBQztDQUFBLEFBdEpELElBc0pDO1NBOUdZLDRCQUE0Qjs7O0lBQ3ZDLGdEQUFvRjs7SUFDcEYsOENBQWlEOztJQUNqRCxrREFBNEU7O0lBQzVFLGlEQUE4Rjs7SUFDOUYsZ0RBQTBCOztJQUMxQiw4Q0FBNEM7O0lBQzVDLHVEQUFpQzs7SUFDakMsdURBQWlDOztJQUNqQyw2Q0FBbUI7O0lBQ25CLGlEQUF1Qjs7SUFDdkIsZ0RBQXVCOztJQUN2Qix1REFBc0Q7O0lBQ3RELHVEQUFnRTs7SUFDaEUsc0RBQStEOztJQUMvRCw4Q0FBZ0I7O0lBQ2hCLHNEQUErRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9naXRodWIuY29tL05HLVpPUlJPL25nLXpvcnJvLWFudGQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT3V0cHV0LFxuICBSZW5kZXJlcjIsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTnpTYWZlQW55IH0gZnJvbSAnbmctem9ycm8tYW50ZC9jb3JlL3R5cGVzJztcbmltcG9ydCB7IE56UGFnaW5hdGlvbkkxOG5JbnRlcmZhY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL2kxOG4nO1xuaW1wb3J0IHsgTnpQYWdpbmF0aW9uSXRlbUNvbXBvbmVudCB9IGZyb20gJy4vcGFnaW5hdGlvbi1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQYWdpbmF0aW9uSXRlbVJlbmRlckNvbnRleHQgfSBmcm9tICcuL3BhZ2luYXRpb24udHlwZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduei1wYWdpbmF0aW9uLWRlZmF1bHQnLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlICNjb250YWluZXJUZW1wbGF0ZT5cbiAgICAgIDxsaSBjbGFzcz1cImFudC1wYWdpbmF0aW9uLXRvdGFsLXRleHRcIiAqbmdJZj1cInNob3dUb3RhbFwiPlxuICAgICAgICA8bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwic2hvd1RvdGFsXCIgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInsgJGltcGxpY2l0OiB0b3RhbCwgcmFuZ2U6IHJhbmdlcyB9XCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgIDwvbGk+XG4gICAgICA8bGlcbiAgICAgICAgKm5nRm9yPVwibGV0IHBhZ2Ugb2YgbGlzdE9mUGFnZUl0ZW07IHRyYWNrQnk6IHRyYWNrQnlQYWdlSXRlbVwiXG4gICAgICAgIG56LXBhZ2luYXRpb24taXRlbVxuICAgICAgICBbbG9jYWxlXT1cImxvY2FsZVwiXG4gICAgICAgIFt0eXBlXT1cInBhZ2UudHlwZVwiXG4gICAgICAgIFtpbmRleF09XCJwYWdlLmluZGV4XCJcbiAgICAgICAgW2Rpc2FibGVkXT1cIiEhcGFnZS5kaXNhYmxlZFwiXG4gICAgICAgIFtpdGVtUmVuZGVyXT1cIml0ZW1SZW5kZXJcIlxuICAgICAgICBbYWN0aXZlXT1cInBhZ2VJbmRleCA9PT0gcGFnZS5pbmRleFwiXG4gICAgICAgIChnb3RvSW5kZXgpPVwianVtcFBhZ2UoJGV2ZW50KVwiXG4gICAgICAgIChkaWZmSW5kZXgpPVwianVtcERpZmYoJGV2ZW50KVwiXG4gICAgICA+PC9saT5cbiAgICAgIDxkaXZcbiAgICAgICAgbnotcGFnaW5hdGlvbi1vcHRpb25zXG4gICAgICAgICpuZ0lmPVwic2hvd1F1aWNrSnVtcGVyIHx8IHNob3dTaXplQ2hhbmdlclwiXG4gICAgICAgIFt0b3RhbF09XCJ0b3RhbFwiXG4gICAgICAgIFtsb2NhbGVdPVwibG9jYWxlXCJcbiAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgW256U2l6ZV09XCJuelNpemVcIlxuICAgICAgICBbc2hvd1NpemVDaGFuZ2VyXT1cInNob3dTaXplQ2hhbmdlclwiXG4gICAgICAgIFtzaG93UXVpY2tKdW1wZXJdPVwic2hvd1F1aWNrSnVtcGVyXCJcbiAgICAgICAgW3BhZ2VJbmRleF09XCJwYWdlSW5kZXhcIlxuICAgICAgICBbcGFnZVNpemVdPVwicGFnZVNpemVcIlxuICAgICAgICBbcGFnZVNpemVPcHRpb25zXT1cInBhZ2VTaXplT3B0aW9uc1wiXG4gICAgICAgIChwYWdlSW5kZXhDaGFuZ2UpPVwib25QYWdlSW5kZXhDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgIChwYWdlU2l6ZUNoYW5nZSk9XCJvblBhZ2VTaXplQ2hhbmdlKCRldmVudClcIlxuICAgICAgPjwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgTnpQYWdpbmF0aW9uRGVmYXVsdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lclRlbXBsYXRlJywgeyBzdGF0aWM6IHRydWUgfSkgdGVtcGxhdGUhOiBUZW1wbGF0ZVJlZjxOelNhZmVBbnk+O1xuICBASW5wdXQoKSBuelNpemU6ICdkZWZhdWx0JyB8ICdzbWFsbCcgPSAnZGVmYXVsdCc7XG4gIEBJbnB1dCgpIGl0ZW1SZW5kZXI6IFRlbXBsYXRlUmVmPFBhZ2luYXRpb25JdGVtUmVuZGVyQ29udGV4dD4gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgc2hvd1RvdGFsOiBUZW1wbGF0ZVJlZjx7ICRpbXBsaWNpdDogbnVtYmVyOyByYW5nZTogW251bWJlciwgbnVtYmVyXSB9PiB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xuICBASW5wdXQoKSBsb2NhbGUhOiBOelBhZ2luYXRpb25JMThuSW50ZXJmYWNlO1xuICBASW5wdXQoKSBzaG93U2l6ZUNoYW5nZXIgPSBmYWxzZTtcbiAgQElucHV0KCkgc2hvd1F1aWNrSnVtcGVyID0gZmFsc2U7XG4gIEBJbnB1dCgpIHRvdGFsID0gMDtcbiAgQElucHV0KCkgcGFnZUluZGV4ID0gMTtcbiAgQElucHV0KCkgcGFnZVNpemUgPSAxMDtcbiAgQElucHV0KCkgcGFnZVNpemVPcHRpb25zOiBudW1iZXJbXSA9IFsxMCwgMjAsIDMwLCA0MF07XG4gIEBPdXRwdXQoKSByZWFkb25seSBwYWdlSW5kZXhDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IHBhZ2VTaXplQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIHJhbmdlcyA9IFswLCAwXTtcbiAgbGlzdE9mUGFnZUl0ZW06IEFycmF5PFBhcnRpYWw8TnpQYWdpbmF0aW9uSXRlbUNvbXBvbmVudD4+ID0gW107XG5cbiAgY29uc3RydWN0b3IocmVuZGVyZXI6IFJlbmRlcmVyMiwgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgIHJlbmRlcmVyLnJlbW92ZUNoaWxkKHJlbmRlcmVyLnBhcmVudE5vZGUoZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KSwgZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgfVxuXG4gIGp1bXBQYWdlKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLm9uUGFnZUluZGV4Q2hhbmdlKGluZGV4KTtcbiAgfVxuXG4gIGp1bXBEaWZmKGRpZmY6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuanVtcFBhZ2UodGhpcy5wYWdlSW5kZXggKyBkaWZmKTtcbiAgfVxuXG4gIHRyYWNrQnlQYWdlSXRlbShfOiBudW1iZXIsIHZhbHVlOiBQYXJ0aWFsPE56UGFnaW5hdGlvbkl0ZW1Db21wb25lbnQ+KTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCR7dmFsdWUudHlwZX0tJHt2YWx1ZS5pbmRleH1gO1xuICB9XG5cbiAgb25QYWdlSW5kZXhDaGFuZ2UoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMucGFnZUluZGV4Q2hhbmdlLm5leHQoaW5kZXgpO1xuICB9XG5cbiAgb25QYWdlU2l6ZUNoYW5nZShzaXplOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnBhZ2VTaXplQ2hhbmdlLm5leHQoc2l6ZSk7XG4gIH1cblxuICBnZXRMYXN0SW5kZXgodG90YWw6IG51bWJlciwgcGFnZVNpemU6IG51bWJlcik6IG51bWJlciB7XG4gICAgcmV0dXJuIE1hdGguY2VpbCh0b3RhbCAvIHBhZ2VTaXplKTtcbiAgfVxuXG4gIGJ1aWxkSW5kZXhlcygpOiB2b2lkIHtcbiAgICBjb25zdCBsYXN0SW5kZXggPSB0aGlzLmdldExhc3RJbmRleCh0aGlzLnRvdGFsLCB0aGlzLnBhZ2VTaXplKTtcbiAgICB0aGlzLmxpc3RPZlBhZ2VJdGVtID0gdGhpcy5nZXRMaXN0T2ZQYWdlSXRlbSh0aGlzLnBhZ2VJbmRleCwgbGFzdEluZGV4KTtcbiAgfVxuXG4gIGdldExpc3RPZlBhZ2VJdGVtKHBhZ2VJbmRleDogbnVtYmVyLCBsYXN0SW5kZXg6IG51bWJlcik6IEFycmF5PFBhcnRpYWw8TnpQYWdpbmF0aW9uSXRlbUNvbXBvbmVudD4+IHtcbiAgICBjb25zdCBjb25jYXRXaXRoUHJldk5leHQgPSAobGlzdE9mUGFnZTogQXJyYXk8UGFydGlhbDxOelBhZ2luYXRpb25JdGVtQ29tcG9uZW50Pj4pID0+IHtcbiAgICAgIGNvbnN0IHByZXZJdGVtID0ge1xuICAgICAgICB0eXBlOiAncHJldicsXG4gICAgICAgIGRpc2FibGVkOiBwYWdlSW5kZXggPT09IDFcbiAgICAgIH07XG4gICAgICBjb25zdCBuZXh0SXRlbSA9IHtcbiAgICAgICAgdHlwZTogJ25leHQnLFxuICAgICAgICBkaXNhYmxlZDogcGFnZUluZGV4ID09PSBsYXN0SW5kZXhcbiAgICAgIH07XG4gICAgICByZXR1cm4gW3ByZXZJdGVtLCAuLi5saXN0T2ZQYWdlLCBuZXh0SXRlbV07XG4gICAgfTtcbiAgICBjb25zdCBnZW5lcmF0ZVBhZ2UgPSAoc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIpOiBBcnJheTxQYXJ0aWFsPE56UGFnaW5hdGlvbkl0ZW1Db21wb25lbnQ+PiA9PiB7XG4gICAgICBjb25zdCBsaXN0ID0gW107XG4gICAgICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPD0gZW5kOyBpKyspIHtcbiAgICAgICAgbGlzdC5wdXNoKHtcbiAgICAgICAgICBpbmRleDogaSxcbiAgICAgICAgICB0eXBlOiAncGFnZSdcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbGlzdDtcbiAgICB9O1xuICAgIGlmIChsYXN0SW5kZXggPD0gOSkge1xuICAgICAgcmV0dXJuIGNvbmNhdFdpdGhQcmV2TmV4dChnZW5lcmF0ZVBhZ2UoMSwgbGFzdEluZGV4KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGdlbmVyYXRlUmFuZ2VJdGVtID0gKHNlbGVjdGVkOiBudW1iZXIsIGxhc3Q6IG51bWJlcikgPT4ge1xuICAgICAgICBsZXQgbGlzdE9mUmFuZ2UgPSBbXTtcbiAgICAgICAgY29uc3QgcHJldkZpdmVJdGVtID0ge1xuICAgICAgICAgIHR5cGU6ICdwcmV2XzUnXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IG5leHRGaXZlSXRlbSA9IHtcbiAgICAgICAgICB0eXBlOiAnbmV4dF81J1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBmaXJzdFBhZ2VJdGVtID0gZ2VuZXJhdGVQYWdlKDEsIDEpO1xuICAgICAgICBjb25zdCBsYXN0UGFnZUl0ZW0gPSBnZW5lcmF0ZVBhZ2UobGFzdEluZGV4LCBsYXN0SW5kZXgpO1xuICAgICAgICBpZiAoc2VsZWN0ZWQgPCA1KSB7XG4gICAgICAgICAgLy8gSWYgdGhlIDR0aCBpcyBzZWxlY3RlZCwgb25lIG1vcmUgcGFnZSB3aWxsIGJlIGRpc3BsYXllZC5cbiAgICAgICAgICBjb25zdCBtYXhMZWZ0ID0gc2VsZWN0ZWQgPT09IDQgPyA2IDogNTtcbiAgICAgICAgICBsaXN0T2ZSYW5nZSA9IFsuLi5nZW5lcmF0ZVBhZ2UoMiwgbWF4TGVmdCksIG5leHRGaXZlSXRlbV07XG4gICAgICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWQgPCBsYXN0IC0gMykge1xuICAgICAgICAgIGxpc3RPZlJhbmdlID0gW3ByZXZGaXZlSXRlbSwgLi4uZ2VuZXJhdGVQYWdlKHNlbGVjdGVkIC0gMiwgc2VsZWN0ZWQgKyAyKSwgbmV4dEZpdmVJdGVtXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBJZiB0aGUgNHRoIGZyb20gbGFzdCBpcyBzZWxlY3RlZCwgb25lIG1vcmUgcGFnZSB3aWxsIGJlIGRpc3BsYXllZC5cbiAgICAgICAgICBjb25zdCBtaW5SaWdodCA9IHNlbGVjdGVkID09PSBsYXN0IC0gMyA/IGxhc3QgLSA1IDogbGFzdCAtIDQ7XG4gICAgICAgICAgbGlzdE9mUmFuZ2UgPSBbcHJldkZpdmVJdGVtLCAuLi5nZW5lcmF0ZVBhZ2UobWluUmlnaHQsIGxhc3QgLSAxKV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFsuLi5maXJzdFBhZ2VJdGVtLCAuLi5saXN0T2ZSYW5nZSwgLi4ubGFzdFBhZ2VJdGVtXTtcbiAgICAgIH07XG4gICAgICByZXR1cm4gY29uY2F0V2l0aFByZXZOZXh0KGdlbmVyYXRlUmFuZ2VJdGVtKHBhZ2VJbmRleCwgbGFzdEluZGV4KSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGNvbnN0IHsgcGFnZUluZGV4LCBwYWdlU2l6ZSwgdG90YWwgfSA9IGNoYW5nZXM7XG4gICAgaWYgKHBhZ2VJbmRleCB8fCBwYWdlU2l6ZSB8fCB0b3RhbCkge1xuICAgICAgdGhpcy5yYW5nZXMgPSBbKHRoaXMucGFnZUluZGV4IC0gMSkgKiB0aGlzLnBhZ2VTaXplICsgMSwgTWF0aC5taW4odGhpcy5wYWdlSW5kZXggKiB0aGlzLnBhZ2VTaXplLCB0aGlzLnRvdGFsKV07XG4gICAgICB0aGlzLmJ1aWxkSW5kZXhlcygpO1xuICAgIH1cbiAgfVxufVxuIl19