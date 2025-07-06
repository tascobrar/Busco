export function getFileContentsAsEntries(fileContents) {
    return tripFileContents
        .split("\n")
        .slice(1)
        .filter((entry) => !!entry)
        .map(entry => entry.split(","));
}