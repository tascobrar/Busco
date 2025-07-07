export function getFileContentsAsEntries(fileContents) {
    return fileContents
        .split("\n")
        .slice(1)
        .filter((entry) => !!entry)
        .map(entry => entry.split(","));
}

export function flattenMap(map) {
    let result = [];
    map.forEach((value, key) => {
        result = result.concat(value);
    });
    return result;
}

export function flattenDesignations(designations) {
    let result = new Map();
    designations.forEach((value, key) => {
        value.forEach((value1, key1) => {
            result.set(key1, value1);
        })
    });
    return result;
} 