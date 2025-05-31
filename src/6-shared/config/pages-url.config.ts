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
}

class DASHBOARD {
  public root = '/dashboard'

  DASHBOARD = this.root
  USERS = `${this.root}/users`
  COMPANIES = `${this.root}/companies`
  CATEGORIES = `${this.root}/categories`
  COMPLAINTS = `${this.root}/complaints`
  PUBLICATIONS = `${this.root}/publications`
  REVIEWS = `${this.root}/reviews`
  BRANDS = `${this.root}/brands`
  VERIFICATION = `${this.root}/verification`
}

export const PLATFORM_PAGES = new PLATFORM()
export const DASHBOARD_PAGES = new DASHBOARD()
