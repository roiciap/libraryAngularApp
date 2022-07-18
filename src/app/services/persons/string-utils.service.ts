import { PageName } from 'src/app/enums/page-name.enum';

export class StringUtilsService {
  capitWord(word: string): string {
    if (word.length > 0) {
      // todo: czemu wordRep jest let jak nie zmieniasz nigdzie
      const wordRep = word.replace(/[/[0-9]/g, '');
      return `${wordRep[0].toUpperCase()}${wordRep.slice(1).toLowerCase()}`;
    }
    throw new Error('World cannot be empty');
  }
  pathToPageName(path: string): PageName {
    return <PageName>path.substring(1).split('/')[0];
  }
}
