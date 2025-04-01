import { MinimumHeap } from "./MinimumHeap";

export function zipText(text: string) {
    const frequencia = contarFrequencia(text);
    const heap = new MinimumHeap();
    frequencia.forEach((num, str) => {
        heap.insert({ str, num });
    });
    heap.log();
}

function contarFrequencia(texto: string): Map<string, number> {
    const frequencia = new Map<string, number>();

    for (const char of texto) {
        frequencia.set(char, (frequencia.get(char) || 0) + 1);
    }

    return frequencia;
}