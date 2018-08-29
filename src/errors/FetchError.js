export class FetchError extends Error {
  constructor(json = {}, response) {
    super(json.error || response.statusText)

    this.statusCode = response.status
  }
}

export default FetchError
