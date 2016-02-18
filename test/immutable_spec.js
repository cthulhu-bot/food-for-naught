import {expect} from 'chai'

const allergyTypes = ['vegan',
                      'vegetarian',
                      'ovo-vegan',
                      'lacto-vegetarian',
                      'lacto-ovo vegetarian',
                      'pescetarian',
                      'peanut',
                      'tree nut',
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

/*
  Basic data structure should conform to:
    restaurant
      food-restriction-01
        menu-item-01
        menu-item-02
      food-restriction-02
        menu-item-01
        menu-item-02
*/
describe('a panera review', () => {
  let addMenuItem = function(restaurant, foodRestriction, menuItem) {
    restaurant[foodRestriction] = restaurant[foodRestriction].concat(menuItem)
    return restaurant
  }

  let panera = {
    'name':'panera',
    'location':'boulder',
    'gluten':[],
    'vegan':[],
    'vegetarian':[],
    'ovo-vegan':[],
    'lacto-vegetarian':[]
  }

  let updatedPanera = addMenuItem(panera, 'gluten', 'house salad')

  it('is an updated panera menu', () => {
    expect(updatedPanera['gluten']).to.include('house salad')
  })
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
