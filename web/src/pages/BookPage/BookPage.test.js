import { render } from '@redwoodjs/testing/web'

import BookPage from './BookPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('BookPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BookPage />)
    }).not.toThrow()
  })
})
