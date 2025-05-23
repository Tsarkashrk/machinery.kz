class PLATFORM {
  public root = '/'

  HOME = this.root
  DEALERS = `${this.root}dealers`
  // PURCHASE = `${this.root}purchase`
  // RENT = `${this.root}rent`
  CATEGORIES = `${this.root}categories`
  LOGIN = `${this.root}auth/login`
  REGISTER = `${this.root}auth/register`
  NEW = `${this.root}new`
  PROFILE = `${this.root}profile`
  MESSAGES = `${this.root}messages`
  PRODUCT = `${this.root}product`
  FAVORITES = `${this.root}favorites`
  BRANDS = `${this.root}brands`
  DASHBOARD = `${this.root}dashboard`
}

export const PLATFORM_PAGES = new PLATFORM()
