const { hasher, hashes } = require('./alpha.node')
const { randomBytes } = require('crypto')

console.log('------------------------------------------------------')
console.time('Generate 100K hashes in Rust')
hashes(100000);
console.timeEnd('Generate 100K hashes in Rust')
console.log('------------------------------------------------------')

const inputStrings = Array.from({ length: 100000 }, () => randomBytes(18).toString('hex'))

let time = 0n
for (let i = 0; i < inputStrings.length - 1; i++) {
    const start = process.hrtime.bigint()
    hasher(inputStrings[i])
    const end = process.hrtime.bigint()
    time = time + (end - start)
}

console.log('Generate 100K hashes using Rust hash function:')
const averageTime = time / 100000n
console.log('Average time in nanoseconds:', Number(averageTime), 'ns')
console.log('Average time in milliseconds:', Number((averageTime * 10000n) / 1000000n) / 10000, 'ms')
console.log('------------------------------------------------------')