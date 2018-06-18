export function canEnableToolbarOptions(value: string, toolbar: any): boolean {
    if (value) {
        if(toolbar['length'] === 0) {
            return true;
        } else {
            const found = toolbar.filter(array => {
                return array.indexOf(value) != -1;
            });
            return found.length ? true : false;
        }
    } else {
        return false;
    }
}

export function saveSelection(): any {
    if (window.getSelection) {
        const selected = window.getSelection();

       
        console.log(selected.toString());
        if(selected.getRangeAt && selected.rangeCount) {
            return selected.getRangeAt(0);
        }
    } else if (document.getSelection && document.createRange) {
            return document.createRange();
    }
    return null;
}

export function restoreSelection(range): boolean {
    if (range) {
        if (window.getSelection) {
            const sel = window.getSelection();
            console.log(sel.toString());
            sel.removeAllRanges();
            sel.addRange(range);
            return true;
        } else if (document.getSelection && range.select) {
            range.select();
            return true;
        }
    } else {
        return false;
    }
}

