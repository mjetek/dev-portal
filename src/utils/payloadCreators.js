import { normalize } from 'normalizr'

export function makeNormalizedPayload(schema) {
  return (payload, addtionalProps) =>
    Object.assign(
      payload instanceof Error ? payload : normalize(payload, schema),
      addtionalProps
    )
}
