class PLATFORM {
  public root = '/'

  HOME = this.root
  DEALERS = `${this.root}dealers`
  PURCHASE = `${this.root}purchase`
  RENT = `${this.root}rent`
  LOGIN = `${this.root}auth/login`
  REGISTER = `${this.root}auth/register`
  NEW = `${this.root}new`
  PROFILE = `${this.root}profile`
}

export const PLATFORM_PAGES = new PLATFORM()
