export async function serverRequest(url) {
    const request = await fetch(url);
    return request.json();
}