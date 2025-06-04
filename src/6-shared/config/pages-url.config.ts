class PLATFORM {
  public root = '/'

  HOME = this.root
  DEALERS = `${this.root}dealers`
  CATEGORIES = `${this.root}categories`
  LOGIN = `${this.root}auth/login`
  REGISTER = `${this.root}auth/register`
  NEW = `${this.root}new`
  MESSAGES = `${this.root}messages`
  PRODUCTS = `${this.root}products`
  FAVORITES = `${this.root}favorites`
  BRANDS = `${this.root}brands`
  RESET = `${this.root}reset-password`
  ACTIVATE = `${this.root}activate`
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

class PROFILE {
  public root = '/profile'

  PROFILE = this.root
  PUBLICATIONS = `${this.root}/publications`
  ORDERS = `${this.root}/orders`
  SETTINGS = `${this.root}/settings`
}

export const PROFILE_PAGES = new PROFILE()
export const PLATFORM_PAGES = new PLATFORM()
export const DASHBOARD_PAGES = new DASHBOARD()
