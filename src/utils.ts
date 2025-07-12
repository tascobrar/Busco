export type Entry = Array<string>;
export type Entries = Array<Entry>;
export type EntryBook = Map<string, Entries>;

export function getFileContentsAsEntries(fileContents: string): Entries {
    return fileContents
        .split("\n")
        .slice(1)
        .filter((entry) => !!entry)
        .map(entry => entry.split(","));
}