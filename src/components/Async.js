export function Async({
  isLoading,
  error,
  children,
  renderLoading,
  renderError
}) {
  if (isLoading) {
    return renderLoading()
  }
  if (error) {
    return renderError(error)
  }
  return children
}
