import { Subject } from "rxjs"

class ErrorService {
  private readonly subject = new Subject<Error>()

  subscribe(callback: (error: Error) => void) {
    const sub = this.subject.subscribe(callback)
    return {
      unsubscribe: () => sub.unsubscribe(),
    }
  }

  submitError(error: Error) {
    this.subject.next(error)
  }
}

export default new ErrorService()
