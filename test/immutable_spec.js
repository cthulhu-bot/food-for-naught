import {expect} from 'chai'

describe('immutability', () => {
  describe('number of reviews', () => {
    function increment(currentReviewCount) {
      return currentReviewCount + 1
    }

    it('is immutable', () => {
      let reviews = 42
      let nextState = increment(reviews)

      expect(nextState).to.equal(43)
      expect(reviews).to.equal(42)
    })
  })
})
