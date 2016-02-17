import {expect} from 'chai'

const allergyTypes = ['vegan',
                      'vegetarian',
                      'ovo-vegan',
                      'lacto-vegetarian',
                      'lacto-ovo vegetarian',
                      'pescetarian',
                      'peanut',
                      'tree nut'
                      'soy',
                      'gluten',
                      'dairy',
                      'egg',
                      'wheat',
                      'fish',
                      'shellfish',
                      'bahai',
                      'buddhist',
                      'christian',
                      'hindu',
                      'jewish',
                      'muslim',
                      'diabetics',
                      'heart healthy',
                      'low cholesterol']

describe('a panera review', () {
  let review = {
    'panera':{
      'gluten':[
        'greek salad',
        'classic salad'
      ],
      'vegan':[],
      'vegetarian':[],
      'ovo-vegan':[],
      'lacto-vegetarian':[],
    }
  }
})

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
