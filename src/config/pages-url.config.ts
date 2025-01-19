class PLATFORM {
  private root = '/'

  HOME = this.root
  TASKS = `${this.root}tasks`
  HABITS = `${this.root}habits`
  TIMER = `${this.root}timer`
  TIME_BLOCKING = `${this.root}time-blocking`
  SETTINGS = `${this.root}settings`
}

export const PLATFORM_PAGES = new PLATFORM()
