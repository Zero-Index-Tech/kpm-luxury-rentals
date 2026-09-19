import { test } from 'node:test'
import assert from 'node:assert/strict'
import { normaliseCart, addToCart, subtotal, itemKey } from '../src/store/cart.ts'

const tee = { productId: 'signature-tee-black', size: 'M', quantity: 1 }
test('rejects tampered storage, invalid products, sizes and quantities', () => {
  assert.deepEqual(normaliseCart({ items: [tee] }), [])
  assert.deepEqual(normaliseCart([null, {}, { ...tee, productId: 'fake' }, { ...tee, size: 'XXXL' }, { ...tee, quantity: -1 }, { ...tee, quantity: 1.5 }, { ...tee, quantity: '2' }]), [])
})
test('merges matching variants, keeps sizes distinct and caps quantities', () => {
  const result = addToCart([tee, { ...tee, size: 'S', quantity: 2 }], { ...tee, quantity: 100 })
  assert.deepEqual(result, [{ ...tee, quantity: 10 }, { ...tee, size: 'S', quantity: 2 }])
  assert.notEqual(itemKey(result[0]), itemKey(result[1]))
})
test('calculates ZAR cents from the catalogue, ignoring injected prices', () => {
  assert.equal(subtotal([{ ...tee, quantity: 2, price: 1 }, { productId: 'signature-cap', size: 'One size', quantity: 1 }]), 225000)
  assert.equal(subtotal([]), 0)
  assert.deepEqual(normaliseCart([{ ...tee, quantity: 0 }]), [])
})
