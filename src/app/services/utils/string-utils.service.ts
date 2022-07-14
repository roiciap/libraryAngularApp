export class StringUtilsService {
  capitWord(word: string): string {
    if (word.length > 0) {
      let wordRep = word.replace(/[/[0-9]/g, '');
      return `${wordRep[0].toUpperCase()}${wordRep.slice(1).toLowerCase()}`;
    }
    throw new Error('World cannot be empty');
  }
}
