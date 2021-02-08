export default function contains(a, b) {
    // array matches
    if (Array.isArray(b)) {
        return b.some(x => a.indexOf(x) > -1);
    }
    // string match
    return a.indexOf(b) > -1;
}