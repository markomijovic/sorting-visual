// mergesort
export function mergeSort(array) {
    const animations = [];
    if (array.length <= 1) {return array;}
    const aux = array.slice();
    sort(array, aux, 0, array.length-1, animations);
    return animations;
}

function sort(array, aux, start, end, animations) {
    if (end <= start) return;
    const mid = Math.floor((start + end) / 2);
    sort(aux, array, start, mid, animations);
    sort(aux, array, mid + 1, end, animations);
    merge(array, aux, start, mid, end, animations);
}

function merge(array, aux, start, mid, end, animations) {
    let k = start;
    let i = start;
    let j = mid + 1;
    while (i <= mid && j <= end) {
        // 1st push to chagne color, second push to revert color
        animations.push([i, j]);
        animations.push([i, j]);
        if (aux[i] <= aux[j]) {
            animations.push([k, aux[i]]);
            array[k++] = aux[i++];
        } else {
            animations.push([k, aux[j]]);
            array[k++] = aux[j++];
        }
    }
    while (i <= mid) {
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([k, aux[i]]);
        array[k++] = aux[i++];
    }
    while (j <= end) {
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([k, aux[j]]);
        array[k++] = aux[j++];
    }
}

// quicksort
const quickAnimations = [];
export function quickSort(array, left, right) {
    var index;
    if (array.length > 1) {
        var animation = [];
        index = partition(array, left, right);
        if (left < index - 1) {
            quickSort(array, left, index - 1);
        }
        if (index < right) {
            quickSort(array, index, right);
        }
    }
    return quickAnimations;
}

function partition(array, left, right) {
    const mid = Math.floor((right + left) / 2)
    const pivot = array[mid];
    while (left <= right) {
        while (array[left] < pivot) {
            left++;
        }
        while (array[right] > pivot) {
            right--;
        }
        if (left <= right) {
            quickAnimations.push([left, right]);
            quickAnimations.push([left, right]);
            quickAnimations.push([left, right, array[left], array[right]]);
            swap(array, left, right);
            left++;
            right--;
        }
    }
    return left; // left = right at this step
}
// Selection Sort
export function selectionSort(array) {
    let len = array.length;
    // main animations array that keeps subarray of each swap (each outer loop)
    const animations = [];
    for (let i = 0; i < len; i++) {
        let min = i;
        var animation = [];
        for (let j = i + 1; j < len; j++) {
            animation.push([min, j]);
            animation.push([min, j]);
            if (array[min] > array[j]) min = j;
        }
        animation.push([min, i, array[min], array[i]]);
        if (min !== i) {
            let tmp = array[i];
            array[i] = array[min];
            array[min] = tmp;
        }
        animations.push(animation);
    }
    return animations;
}

// Insertion Sort
export function insertionSort(array) {
    let len = array.length;
    const animations = [];
    for (let i = 1; i < len; i++) {
        var animation = [];
        let val = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > val) {
            animation.push([i, j]);
            animation.push([i, j]);
            animation.push([j + 1, j, array[j + 1], array[j]]);
            array[j + 1] = array[j--];
        }
        animation.push([j + 1, i, array[j + 1], val]);
        array[j + 1] = val;
        animations.push(animation);
    }
    return animations;
}

// Bubble Sort
export function bubbleSort(array) {
    let len = array.length;
    const animations = [];
    for (let i = 0; i < len; i++) {
        var animation = [];
        // -1 to prevent animations out of bounds error error :/
        for (let j = 0; j < len - i - 1; j++) {
            animation.push([j, j + 1]);
            animation.push([j, j + 1]);
            if (array[j] > array[j + 1]) {
                animation.push([j, j + 1, array[j], array[j + 1]]);
                swap(array, j, j + 1);
            }
        }
        animations.push(animation);
    }
    return animations;
}

function swap(array, idxBigger, idxSmaller) {
    let tmp = array[idxBigger];
    array[idxBigger] = array[idxSmaller];
    array[idxSmaller] = tmp;
}