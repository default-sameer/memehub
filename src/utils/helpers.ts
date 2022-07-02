export function shortenText(description: string, descriptionLength: number) {
  if (description.length > descriptionLength) {
    return `${description.substring(0, descriptionLength)}...`
  }
  return description
}