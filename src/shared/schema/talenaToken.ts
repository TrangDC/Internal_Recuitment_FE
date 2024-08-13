class TalenaToken {
  accessToken: string
  constructor({ accessToken }: TalenaToken) {
    this.accessToken = accessToken
  }

  static fromJson(data: Record<string, any>): TalenaToken {
    return new TalenaToken({
      accessToken: (data.access_token as string) ?? '',
    })
  }
}

export default TalenaToken
