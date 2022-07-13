export class StringUtilsService {
  capitWord(word: string): string {
    if (word.length > 0) {
      return `${word[0].toUpperCase().replace(/[/[0-9]/g, '')}${word
        .slice(1)
        .toLowerCase()
        .replace(/[0-9]/g, '')}`;
    }
    throw new Error('World cannot be empty');
  }
}
