import { render } from '@redwoodjs/testing/web'

import Booking from './Booking'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Booking', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Booking />)
    }).not.toThrow()
  })
})
