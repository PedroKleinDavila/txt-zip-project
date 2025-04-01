export class MinimumHeap {
    public heap: Array<{ str: string, num: number }> = new Array<{ str: string, num: number }>();
    constructor() { }
    public insert(value: { str: string, num: number }): void {
        this.heap.push(value);
        this.bubbleUp();
    }
    public remove(): { str: string, num: number } | null {
        if (this.isEmpty()) {
            return null;
        }
        const min = this.heap[0];
        const last = this.heap.pop();
        if (last && this.size() > 0) {
            this.heap[0] = last;
            this.bubbleDown();
        }
        return min;
    }
    public peek(): { str: string, num: number } | null {
        if (this.isEmpty()) {
            return null;
        }
        return this.heap[0];
    }
    public size(): number {
        return this.heap.length;
    }
    public isEmpty(): boolean {
        return this.size() === 0;
    }
    public log(): void {
        console.log(this.heap);
    }
    private bubbleUp(): void {
        let index = this.size() - 1;
        const element = this.heap[index];
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            const parent = this.heap[parentIndex];
            if (element.num >= parent.num) {
                break;
            }
            this.heap[index] = parent;
            index = parentIndex;
        }
        this.heap[index] = element;
    }
    private bubbleDown(): void {
        let index = 0;
        const length = this.size();
        const element = this.heap[index];
        while (true) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            let leftChild: { str: string, num: number } | null = null;
            let rightChild: { str: string, num: number } | null = null;
            let swap: number | null = null;

            if (leftChildIndex < length) {
                leftChild = this.heap[leftChildIndex];
                if (leftChild.num < element.num) {
                    swap = leftChildIndex;
                }
            }
            if (rightChildIndex < length) {
                rightChild = this.heap[rightChildIndex];
                if (
                    (swap === null && rightChild!.num < element.num) ||
                    (swap !== null && rightChild!.num < (leftChild?.num ?? Infinity))
                ) {
                    swap = rightChildIndex;
                }
            }
            if (swap === null) {
                break;
            }
            this.heap[index] = this.heap[swap];
            index = swap;
        }
        this.heap[index] = element;
    }
}