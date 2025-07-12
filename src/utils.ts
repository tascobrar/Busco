export type Entry = String[];
export type Entries = Entry[];
export type EntryBook = Map<string, Entries>;
export type CoordinatePair = number[];

export function getFileContentsAsEntries(fileContents: string): Entries {
    return fileContents
        .split("\n")
        .slice(1)
        .filter((entry) => !!entry)
        .map(entry => entry.split(","));
}