
export function saveSelection(): any {
    if (window.getSelection) {
        const selected = window.getSelection();

        console.log(selected);
        console.log(selected.getRangeAt);
        console.log(selected.rangeCount);
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
            const selected = window.getSelection();
            console.log(selected);
            selected.removeAllRanges();
            selected.addRange(range);
            return;
        } else if (document.getSelection && range.select) {
            range.select();
            return true;
        }
    } else {
        return false;
    }
}

