import React from 'react'

const SayHello = ({ name }: { readonly name: string }): JSX.Element => (
  <div>Hey {name}, say hello to TypeScript.</div>
)
export default SayHello
