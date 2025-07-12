type Entry = Array<String>;
type Entries = Array<Entry>;

export function getFileContentsAsEntries(fileContents: string): Entries {
    return fileContents
        .split("\n")
        .slice(1)
        .filter((entry) => !!entry)
        .map(entry => entry.split(","));
}