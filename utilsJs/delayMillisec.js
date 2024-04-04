// waiting in milliseconds
export async function delayMillisec(delay) {
    await new Promise(resolve => setTimeout(resolve, delay));
}
