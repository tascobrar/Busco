export interface InitializationResult {
    succeeded: boolean
    message: string
}

export const SUCCESS: InitializationResult = { 
    succeeded: true,
    message: null
};
export function failedInitialization(message: string): InitializationResult {
    return {
        succeeded: false,
        message: message
    };
}