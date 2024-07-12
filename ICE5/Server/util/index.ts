export function SanitizeArray(inputString: string): string[]
{
    let unsanitizedArray = inputString.split(",");
    // create a new empty array container
    let sanitizedArray = Array<string>();
    // iterate over the unsanitizedArray and trim each string
    for (const unsanitizedString of unsanitizedArray)
    {
        sanitizedArray.push(unsanitizedString.trim());
    }
    return sanitizedArray;
}