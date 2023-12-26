

type LangTypes = 'en' | 'vi'

class Lang {
  constructor() {

  }

  public htmlLangType!: LangTypes

  public readonly langTypes = ['en', 'vi']

  public readonly flagIndex: Map<LangTypes, number> = new Map([
    ['en', 0],
    ['vi', 1]
  ])
}

const lang = new Lang();
export { lang }
